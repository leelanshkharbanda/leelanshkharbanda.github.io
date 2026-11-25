# Issue tracker: GitHub

Issues and specs for this repo live as GitHub issues in
`leelanshkharbanda/leelanshkharbanda.github.io`. Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --json number,title,body,labels,comments`.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` filters.
- **Make an issue a sub-issue of a parent**: `gh issue create --parent <parent> ...`, or `gh issue edit <parent> --add-sub-issue <child>` afterwards. Without sub-issues, put `Part of #<parent>` at the top of the child body.
- **Blocking**: GitHub's native issue dependencies, the UI-visible representation. Add an edge with `gh issue create --blocked-by <n>,<n> ...` or `gh issue edit <child> --add-blocked-by <blocker>`. Older `gh`: POST to `repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by` with the blocker's numeric **database id**. Where dependencies aren't available, fall back to `Blocked by: #<n>` at the top of the child body.
- **Count open blockers**: `gh api repos/<owner>/<repo>/issues/<n> --jq .issue_dependencies_summary.blocked_by` (0 means startable).
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: post the explanation with `gh issue comment <number> --body "..."`, then `gh issue close <number>`.

Infer the repo from `git remote -v`; `gh` does this automatically inside a clone. File issues only into this repo.

## Pull requests as a triage surface

**PRs as a request surface: no.** External PRs are not fed into the triage queue. A user who wants that can flip this flag later.

## When a skill says "publish to the issue tracker"

Create a GitHub issue in this repo.

## When a skill says "fetch the relevant ticket"

Read it as in **Read an issue** above.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single issue labelled `wayfinder:map`, holding the Notes / Decisions-so-far / Fog body. Its tickets are child issues with `wayfinder:<type>` labels (`research`, `prototype`, `grilling`, `task`). A session claims a ticket with `gh issue edit <n> --add-assignee @me` before working on it. Resolve by commenting the answer, closing the ticket, and appending a gist + link to the map's Decisions-so-far. GitHub sub-issues and native blocked-by are enabled for this repo; fall back to body conventions if an operation is unavailable.
