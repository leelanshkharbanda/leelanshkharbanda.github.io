# Portfolio Review Council

## Roles

- **Creative director**: distinctiveness, coherent visual idea, typography, composition, motion meaning.
- **Principal engineer**: architecture, rendering strategy, performance, resilience, maintainability.
- **Technical content strategist**: evidence fidelity, project selection, narrative clarity, collaboration credit.
- **Product and accessibility reviewer**: visitor goals, navigation, keyboard use, reduced motion, responsive behavior.
- **Release reviewer**: automated checks, browser evidence, metadata, links, regression coverage.

## Relationship to Wayfinder

This is a separate, user-authorized decision workflow. It does not resolve Wayfinder `prototype` or `grilling` tickets, which remain HITL under the installed skill rules. Council records live in `.scratch/portfolio/council-decisions/`.

## Decision rule

The user is unavailable and delegated unresolved choices to the council. A decision needs a clear recommendation, evidence, tradeoffs, and acceptance criteria. Creative preference cannot override accessibility, factual accuracy, or working functionality.

## Severity

- **Blocker**: prevents use, misrepresents the user, breaks a core journey, or creates a serious accessibility issue.
- **Major**: materially weakens comprehension, distinctiveness, performance, or reliability.
- **Minor**: polish issue that does not block release.

## Review loop

1. Inspect the actual artifact and relevant source/research evidence.
2. Report findings by severity with file/URL evidence.
3. Recommend the smallest coherent fix.
4. Re-test the changed artifact and any affected journeys.
5. Repeat until no blocker or major issue remains.
