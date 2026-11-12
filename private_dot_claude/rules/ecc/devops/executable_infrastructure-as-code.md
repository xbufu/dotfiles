# Infrastructure as Code

Applies to Terraform/OpenTofu, Pulumi, and similar tools.

## Principles
- All infrastructure changes go through code and version control; no manual console changes. If an emergency manual change happens, import or codify it immediately
- Use remote state with locking and encryption (e.g. S3 with locking, GCS, Terraform Cloud); never commit state files
- Separate state per environment and per component to limit blast radius
- Pin provider and module versions (`~>` constraints plus a committed `.terraform.lock.hcl`)
- Build reusable modules for repeated patterns, with typed, described variables and validation blocks
- Tag or label every resource consistently (environment, owner, project, managed-by)
- Never hardcode secrets in code or `.tfvars`; read them from a secret manager and mark variables and outputs `sensitive = true`. State still contains secret values, so restrict access to state

## Workflow
1. Format and validate: `terraform fmt -check`, `terraform validate`, `tflint`
2. Run security/policy scanning: `checkov`, `trivy config`, or `tfsec`
3. `terraform plan -out=tfplan` and review it in full
4. Stop and flag any destroy, replace (`-/+`), or change to stateful resources (databases, volumes, DNS, IAM) before applying
5. Apply only the reviewed plan file: `terraform apply tfplan`
6. Never run `terraform destroy`, `state rm`, or `import` against shared or production environments without explicit approval

## Safety
- Enable `prevent_destroy` on critical stateful resources
- Enable deletion protection, backups, and final snapshots on databases
- Encrypt storage and restrict security groups / firewall rules to the minimum required; no `0.0.0.0/0` on management ports
- Run plans in CI on every PR and post the plan output for review
- Detect drift on a schedule with `terraform plan -detailed-exitcode`
