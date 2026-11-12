# CI/CD Pipelines

Applies to GitHub Actions, GitLab CI, and other pipeline systems.

## Pipeline Structure
- Order stages to fail fast: lint and unit tests first, then build, then scan, then deploy
- Run independent jobs in parallel; declare real dependencies explicitly (`needs:` in both GitHub Actions and GitLab) instead of relying on stage order
- Build an artifact once and promote that same artifact through environments; never rebuild per environment
- Tag images and artifacts by commit SHA (plus semver for releases); never deploy `latest`
- Cache dependencies keyed on the lockfile hash; keep caches for protected and unprotected refs separate
- Set timeouts on jobs so a hung step doesn't burn runner time
- Make pipelines reproducible: pinned tool versions, lockfiles, `npm ci` / `pip install -r` with hashes, not floating installs

## Supply Chain Security
- Pin third-party actions and CI components to a full commit SHA, not a tag or branch (tags can be moved, and actions have been compromised this way). Add the version as a comment: `uses: actions/checkout@<sha> # v4.2.2`
- Never use `@master`, `@main`, or `~latest` for external actions, components, or orbs
- Scan images and dependencies in the pipeline (e.g. Trivy, Grype, `npm audit`, `pip-audit`) and fail on high/critical findings unless explicitly waived
- Generate an SBOM and sign release artifacts (cosign or notation)
- Use Renovate or Dependabot for dependency and action updates so pins don't go stale

## Secrets and Credentials
- Prefer OIDC federation to cloud providers over long-lived static keys
- Never print secrets, and never write them to artifacts, caches, or logs; avoid `set -x` in steps that handle them
- Scope secrets to the environment and job that needs them; production secrets only in protected environments
- Pass build-time secrets via BuildKit secret mounts (`--mount=type=secret`), never `ARG` or `ENV`
- Run secret scanning (e.g. gitleaks, trufflehog) in CI and as a pre-commit hook

## Least Privilege
### GitHub Actions
- Set `permissions: {}` (or `contents: read`) at the workflow level and grant extra scopes per job
- Treat `pull_request_target` and `workflow_run` as dangerous: never check out or run code from an untrusted PR in them, since they run with secrets and a write token
- Never interpolate untrusted input (`github.event.*.title`, `body`, branch names, etc.) directly into `run:` scripts; pass it through an `env:` variable and quote it, to prevent script injection
- Require approval for workflows from first-time and fork contributors
- Self-hosted runners must not be used for public repositories

### GitLab CI
- Use `workflow:rules` at the top to decide when pipelines run and avoid duplicate branch + MR pipelines
- Treat merge requests from forks as untrusted; keep protected variables on protected refs only
- Limit the `CI_JOB_TOKEN` allow-list
- Register runners at the narrowest scope (project < group < instance); avoid privileged mode and Docker-in-Docker except on isolated, ephemeral runners; prefer rootless BuildKit for image builds
- Separate runner pools/tags for protected and unprotected jobs

## Feedback
- Publish test results and coverage in the format the platform renders (JUnit, Cobertura) so failures show in the PR/MR
- Keep failure output, screenshots, and logs as short-lived artifacts with an expiry
- Run checks on the merge result (merged-results pipelines / merge queue) for busy repos

## Verification Before Committing Pipeline Changes
- Lint workflow files (`actionlint`, `gitlab-ci-lint` / CI Lint API, `yamllint`)
- Check new third-party actions/components for maintenance status and what permissions they require
- Pipeline changes follow the commit rules in `../common/git-workflow.md`, using the `ci:` type
