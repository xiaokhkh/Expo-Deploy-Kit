# Branching Strategy

- main: production stable, only merge commits that have been released.
- dev: daily integration branch.
- feature/*: feature development.
- hotfix/*: urgent production fixes (HOTPATCH or emergency PACKAGE).

## Notes
- Always release from a branch that maps to the target environment.
- Keep hotfix branches short-lived and merge back to main and dev after release.
