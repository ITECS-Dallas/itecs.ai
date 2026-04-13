Commit, push, build, and activate the current changes to production.

## Steps:

1. **Commit** — Stage all changed files and create a descriptive commit message summarizing the work done in this session.

2. **Push** — Push the commit to the remote repository.

3. **Build** — Run `npm run build` to generate the production build and verify zero errors.

4. **Activate** — Run `./scripts/prod-deploy.sh` to deploy the new build and bring the updated instance live. If prod-deploy.sh is not available, fall back to `docker compose up -d --build`.

Always confirm each step succeeded before proceeding to the next.
