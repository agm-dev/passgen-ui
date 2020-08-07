# passgen-ui

> User interface that uses [passgen](https://deno.land/x/passgen) package to generate random passwords.

[![Netlify Status](https://api.netlify.com/api/v1/badges/d35d57a0-279a-47e0-a503-e8c8b410e9d4/deploy-status)](https://app.netlify.com/sites/youthful-mirzakhani-616739/deploys)

## Installation

```bash
git clone https://github.com/agm-dev/passgen-ui.git
cd passgen-ui
npm install
npm start
```

## Update passgen dependency

This uses a Deno package which needs to be bundled and included manually on the project.

```bash
deno bundle https://deno.land/x/passgen@1.1.0/mod.ts src/passgen.bundle.js
```

## Example

There should be a live version of this site [here](https://www.passgen.es).
