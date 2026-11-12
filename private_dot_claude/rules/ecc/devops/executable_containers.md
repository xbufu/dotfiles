# Containers and Kubernetes

## Dockerfiles
- Use multi-stage builds: build tools stay in the builder stage, the final stage contains only the runtime and the built output
- Use minimal base images (`-slim`, `-alpine`, distroless) and pin them to a specific version, ideally with a digest (`image:1.2.3@sha256:...`)
- Run as a non-root user with a fixed UID; create the user in the Dockerfile before `USER`
- Order layers from least to most frequently changing (dependency manifests and install before copying source) to maximize cache hits
- Clean package manager caches in the same `RUN` layer (`--no-cache-dir`, `npm cache clean`, `rm -rf /var/lib/apt/lists/*`)
- Never bake secrets into images, including through `ARG`, `ENV`, or copied `.env` files; use BuildKit secret mounts at build time and injected secrets at runtime
- Maintain a `.dockerignore` that excludes `.git`, `.env*`, `node_modules`, build output, and local tooling
- Add a `HEALTHCHECK` using a tool that exists in the final image (don't call `curl` in an image without curl)
- Use exec form for `CMD` / `ENTRYPOINT` (`["node", "main.js"]`) so signals reach the process
- Scan the built image before pushing

## Docker Compose
- Use `depends_on` with `condition: service_healthy` and real healthchecks instead of sleep loops
- Keep credentials out of the compose file; use an untracked `.env` or Docker secrets
- Bind published ports to `127.0.0.1` unless the service must be reachable from the network
- Drop the obsolete top-level `version:` key

## Kubernetes Workloads
- Set resource requests and limits on every container
- Define readiness and liveness probes (and a startup probe for slow-starting apps); readiness and liveness should check different things
- Reference images by immutable tag or digest; never `latest`
- Apply a restrictive `securityContext`: `runAsNonRoot: true`, `allowPrivilegeEscalation: false`, `readOnlyRootFilesystem: true`, drop all capabilities, `seccompProfile: RuntimeDefault`
- Disable service account token automounting unless the pod needs API access, and use dedicated, minimally scoped service accounts and RBAC
- Add NetworkPolicies with default deny, then allow required traffic
- Run at least 2 replicas for anything that needs availability, with a PodDisruptionBudget
- Kubernetes Secrets are only base64-encoded; encrypt them at rest and source them from a secret manager (External Secrets, Sealed Secrets, SOPS) rather than committing them
- Keep manifests in Git and apply them through GitOps (Argo CD, Flux) for shared or production clusters; avoid manual `kubectl apply/edit` drift
- Validate manifests before committing (`kubeconform`, `kubectl --dry-run=server`, `helm lint`, policy checks such as Kyverno or kube-linter)
