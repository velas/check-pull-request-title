# Idea
Allows to get pull request title and url (appropriate values are available as job outputs: `title`, `url`) on GitHub Actions.
Also performs a check if PR title contains the keywords (e.g. "feature", "bugfix" or "tests").

## Inputs and outputs
Required inputs:
`ticket_id_pattern`. String. E.g.: `'vtx-\d+'`
`ticket_types_pattern`. Separated by `|`. E.g.: `feature|bugfix`.

Outputs: `title`, `url`.

## Example Workflow

```yml
- name: check and return PR data
  id: pr-data
  uses: velas/check-pull-request-title@master
  with:
    ticket_pattern: 'vtx-\\d+'
    ticket_types_pattern: 'feature|bugfix|tests'

```

#### Workaround - skip checks
You can skip any ckecks in this PR by adding `@no-title-check` to its title
