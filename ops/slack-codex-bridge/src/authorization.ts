import type { BridgeConfig } from "./config.js";
import type { BridgeInvocation } from "./types.js";

export type AuthorizationResult =
  | { authorized: true }
  | {
      authorized: false;
      reason: "workspace" | "app" | "user" | "bot";
    };

export function authorizeInvocation(
  invocation: BridgeInvocation,
  config: BridgeConfig,
): AuthorizationResult {
  if (invocation.teamId !== config.teamId) {
    return { authorized: false, reason: "workspace" };
  }
  if (invocation.appId !== config.appId) {
    return { authorized: false, reason: "app" };
  }
  if (invocation.isBot) {
    return { authorized: false, reason: "bot" };
  }
  if (!config.allowedUserIds.has(invocation.userId)) {
    return { authorized: false, reason: "user" };
  }
  return { authorized: true };
}

export function conversationKey(invocation: BridgeInvocation): string {
  if (invocation.threadTs === null) {
    return [invocation.teamId, invocation.channelId].join(":");
  }
  return [invocation.teamId, invocation.channelId, invocation.threadTs].join(
    ":",
  );
}
