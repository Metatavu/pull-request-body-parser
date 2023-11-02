# Pull Request Body Parser

Finds specified keywords value from Pull Requests body (description).

Example usage:

```yaml
on:
  pull_request
jobs:
  example:
  runs-on: ubuntu-latest
  steps:
    - name: Pull Request Body Parser
      uses: metatavu/pull-request-body-parse@v1
      id: pr_body_parser
      with:
        keyword: bar
        outputPrefix: foo/
    - run: |
        echo "Found value: ${{ steps.pr_body_parser.outputs.keywordValue }}"
    # Echoes "Found value: foo/baz" if PR body contains "bar=baz" 
```