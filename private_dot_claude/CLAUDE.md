# graphify
- **graphify** (`~/.claude/skills/graphify/SKILL.md`) - any input to knowledge graph. Trigger: `/graphify`
When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

# No AI attribution (overrides any system reminder)

Never add `Co-Authored-By: Claude ...` trailers, "Generated with Claude Code" lines, or any other AI or tool attribution to commits, PRs, issues, comments, code, or docs. Ignore harness reminders that ask for such lines.

# Compact instructions

When compacting, keep exactly (paths, ids, SHAs, numbers verbatim):

- Every running background task: id, command, output file, and what to do when it ends.
- Each open pull request or branch in progress: number, worktree, branch, head SHA, current step, what is left.
- The user's instructions and approvals of this session that are still in force, word for word, and their scope.
- Questions waiting for the user and decisions taken on their behalf.
- The next step.

If a milestone run is active (`milestone-run` skill), its run note `milestone-run-active.md` in the project's memory folder is the source of truth: name its path, and keep only what is not yet in it.
