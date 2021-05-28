# Idea
Allows to get pull request title and url (appropriate values are available as job outputs: `title`, `url`) on GitHub Actions.
Also performs a check if PR title contains the keywords ("feature", "bugfix" or "tests").

## Inputs and outputs
Required input: `ticket_pattern`.
Outputs: `title`, `url`.

## Example Workflow

```yml
- name: check and return PR data
  id: pr-data
  uses: velas/check-pull-request-title@master
  with:
    ticket_pattern: 'vtx-\\d+'

```
