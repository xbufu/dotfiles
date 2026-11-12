# Deployment and Operations

## Approval
- Never deploy to production or customer-facing environments without explicit user approval
- Before asking, present: what changes, target environment, deployment strategy, rollback command, and how success will be verified
- If approval is withheld, stop and report the deployment as blocked
- Homelab and personal dev environments don't need approval unless the change is destructive (data loss, wiping volumes, destroying infrastructure)

## Before Deploying
- Changes have passed tests in staging (or an equivalent non-production environment)
- Database migrations are backward compatible with the currently running version (expand → migrate → contract)
- Risky features are behind a feature flag where practical
- The rollback procedure is written down in the PR or change ticket, including the verification step
- Monitoring and alerts cover the changed service
- Avoid deploying right before you or the team will be unavailable to watch it

## Strategy
Pick the strategy that fits the risk:
| Strategy | Use When |
|----------|----------|
| Rolling | Default for stateless services that tolerate mixed versions |
| Blue-green | Instant rollback needed, can afford duplicate capacity |
| Canary | High-risk changes; shift traffic gradually with automated metric checks |
| Recreate | Versions can't run side by side; accept downtime |

## After Deploying
- Watch the rollout to completion (`kubectl rollout status`, Argo CD sync status, etc.)
- Run smoke tests against health endpoints and one or two critical paths
- Check error rate, latency, and resource usage against the pre-deploy baseline
- Roll back promptly if checks fail, rather than debugging forward in production

## Rollback Reference
```bash
kubectl rollout undo deployment/<name> -n <namespace>
kubectl rollout status deployment/<name> -n <namespace>
argocd app rollback <app> <revision>
```
For IaC, roll back by reverting the commit and applying a reviewed plan, not by editing state.

## Incidents
- Mitigate first (rollback, scale, disable flag), then find the root cause
- Preserve evidence before restarting or deleting anything: logs, pod descriptions, events, the deployed commit SHA
- For suspected security incidents, isolate rather than delete, and keep a timeline
- Write a blameless postmortem with concrete, owned action items for significant incidents
