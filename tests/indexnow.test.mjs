import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, writeFileSync, readFileSync, chmodSync, existsSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { canonical, changes, digest, readKey, verifyDeleted, verifyKey, submitChanges, ENDPOINT, KEY_URL, savePrivate, notify } from '../scripts/indexnow.mjs';

const key = 'synthetic-indexnow-test-key';
const snapshot = pages => ({version:1,pages:Object.fromEntries(Object.entries(pages).map(([path,text])=>['https://itecs.ai'+path,digest(text)]))});
const temporary = () => mkdtempSync(join(tmpdir(),'itecs-indexnow-test-'));

test('only canonical public site URLs are eligible, including root normalization',()=>{
  assert.equal(canonical('https://itecs.ai'),'https://itecs.ai/');
  assert.equal(canonical('https://itecs.ai/contact'),'https://itecs.ai/contact');
  for(const url of ['http://itecs.ai/','https://www.itecs.ai/','https://example.com/','https://itecs.ai/p/client','https://itecs.ai/api/contact','https://itecs.ai/%70/private','https://itecs.ai/x?token=a','https://itecs.ai/#private','https://user:pass@itecs.ai/','https://itecs.ai/a/../contact']) assert.throws(()=>canonical(url));
});

test('content delta identifies added, updated and deleted pages, not capture timestamps',()=>{
  const before=snapshot({'/':'old','/gone':'gone','/same':'same'}),after=snapshot({'/':'new','/new':'new','/same':'same'});
  assert.deepEqual(changes(before,after),{added:['https://itecs.ai/new'],updated:['https://itecs.ai/'],deleted:['https://itecs.ai/gone']});
  assert.deepEqual(changes({...after,capturedAt:'yesterday'},{...after,capturedAt:'today'}),{added:[],updated:[],deleted:[]});
  assert.throws(()=>changes(null,{version:1,pages:{}}));
});

test('private receiving file rejects symlinks, loose permissions, empty and invalid values',()=>{
  const dir=temporary(),file=join(dir,'ownership-key');writeFileSync(file,key,{mode:0o600});assert.equal(readKey(file),key);
  chmodSync(file,0o644);assert.throws(()=>readKey(file));chmodSync(file,0o600);
  writeFileSync(file,'');assert.throws(()=>readKey(file));writeFileSync(file,'bad\nvalue');assert.throws(()=>readKey(file));
  writeFileSync(file,key);symlinkSync(file,join(dir,'link'));assert.throws(()=>readKey(join(dir,'link')));
});

test('public proof requires an exact 200 response and matching bytes',async()=>{
  assert.deepEqual(await verifyKey(key,'https://itecs.ai',async()=>new Response(key,{status:200})),{status:200,matches:true});
  for(const status of [202,301,403,404])await assert.rejects(verifyKey(key,'https://itecs.ai',async()=>new Response(key,{status})));
  await assert.rejects(verifyKey(key,'https://itecs.ai',async()=>new Response('wrong')));
});

test('deletion requires 404/410 or permanent same-site redirect, not transient outage',async()=>{
  for(const status of [404,410])await verifyDeleted(['https://itecs.ai/gone'],async()=>new Response(null,{status}));
  await verifyDeleted(['https://itecs.ai/gone'],async()=>new Response(null,{status:301,headers:{location:'/contact'}}));
  for(const status of [200,302,500,503])await assert.rejects(verifyDeleted(['https://itecs.ai/gone'],async()=>new Response(null,{status})));
  await assert.rejects(verifyDeleted(['https://itecs.ai/gone'],async()=>new Response(null,{status:301,headers:{location:'https://example.com/'}})));
});

test('200 receipt and 202 pending-validation semantics remain distinct; never log key/body',async()=>{
  const delta={added:['https://itecs.ai/'],updated:[],deleted:[]};
  for(const [status,outcome] of [[200,'received'],[202,'received-key-validation-pending'],[403,'rejected'],[429,'rejected']]){
    let calls=0;
    const receipt=await submitChanges(delta,key,async(url,options)=>{calls++;assert.equal(url,ENDPOINT);assert.equal(options.method,'POST');assert.equal(options.redirect,'manual');const body=JSON.parse(options.body);assert.equal(body.host,'itecs.ai');assert.equal(body.keyLocation,KEY_URL);assert.equal(body.key,key);assert.deepEqual(body.urlList,delta.added);return new Response(key,{status});});
    assert.equal(calls,1);assert.equal(receipt.outcome,outcome);assert.ok(!JSON.stringify(receipt).includes(key));
  }
  assert.equal((await submitChanges(delta,key,async()=>{throw Error(key);})).outcome,'uncertain-transport');
});

test('production notification function sends only changed URLs and persists a receipt; repeated no-op does not POST',async()=>{
  const dir=temporary(),stateFile=join(dir,'state.json');savePrivate(stateFile,snapshot({'/':'old','/gone':'gone','/same':'same'}));
  let posts=0,submitted;
  const request=async(url,options)=>{
    if(url===KEY_URL)return new Response(key);
    if(url==='https://itecs.ai/gone')return new Response(null,{status:410});
    assert.equal(url,ENDPOINT);posts++;submitted=JSON.parse(options.body).urlList;return new Response(null,{status:200});
  };
  const after=snapshot({'/':'new','/new':'added','/same':'same'});
  const receipt=await notify({after,key,stateFile,receiptFile:join(dir,'receipt.json'),request});
  assert.equal(receipt.status,200);assert.equal(posts,1);assert.deepEqual(submitted,['https://itecs.ai/new','https://itecs.ai/','https://itecs.ai/gone']);
  const noop=await notify({after,key,stateFile,receiptFile:join(dir,'noop.json'),request});assert.equal(noop.count,0);assert.equal(posts,1);
  assert.ok(!readFileSync(join(dir,'receipt.json'),'utf8').includes(key));assert.ok(!existsSync(stateFile+'.pending.json'));
});

test('initial 98-URL discovery is one POST and 202 does not trigger a duplicate retry',async()=>{
  const dir=temporary(),stateFile=join(dir,'state.json');const after=snapshot(Object.fromEntries(Array.from({length:98},(_,i)=>[i?'/article-'+i:'/','content-'+i])));let posts=0;
  const request=async url=>{if(url===KEY_URL)return new Response(key);posts++;return new Response(null,{status:202});};
  const receipt=await notify({after,key,stateFile,receiptFile:join(dir,'receipt.json'),request});
  assert.equal(receipt.count,98);assert.equal(receipt.outcome,'received-key-validation-pending');assert.equal(posts,1);
  const again=await notify({after,key,stateFile,receiptFile:join(dir,'again.json'),request});assert.equal(again.count,0);assert.equal(posts,1);
});

test('failed/uncertain submission does not advance state or retry automatically',async()=>{
  const dir=temporary(),stateFile=join(dir,'state.json'),before=snapshot({'/':'old'});savePrivate(stateFile,before);let posts=0;
  const request=async url=>{if(url===KEY_URL)return new Response(key);posts++;throw Error('simulated transport failure');};
  const receipt=await notify({after:snapshot({'/':'new'}),key,stateFile,receiptFile:join(dir,'receipt.json'),request});
  assert.equal(receipt.outcome,'uncertain-transport');assert.deepEqual(JSON.parse(readFileSync(stateFile,'utf8')),before);
  const retry=await notify({after:snapshot({'/':'new'}),key,stateFile,receiptFile:join(dir,'retry.json'),request:async url=>{if(url===KEY_URL)return new Response(key);posts++;return new Response(null,{status:200});}});assert.equal(retry.status,200);assert.equal(posts,2);assert.deepEqual(JSON.parse(readFileSync(stateFile,'utf8')).pages,snapshot({'/':'new'}).pages);
});

test('production entry point is web-only and invokes the native notification workflow',()=>{
  const script=readFileSync(new URL('../scripts/prod-deploy.sh',import.meta.url),'utf8');
  assert.match(script,/exec node scripts\/indexnow\.mjs notify "\$@"/);assert.doesNotMatch(script,/remove-orphans|certbot/);
  assert.match(script,/--no-deps --no-build --force-recreate web/);
});
