This repo reproduces an issue with Webpack 5 cache and Next.js environment variables
with [`NEXT_PUBLIC_` prefix](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser).


The `.next` output with its `cache` directory is committed to ensure reproducibility.

## Steps to reproduce

- Run `yarn build`
- Inspect `.next/server/pages/index.js` output file (corresponding to the `pages/index.js` source
file). The Next.js public envvar like `process.env.NEXT_PUBLIC_VAR_1` are not replaced.
  + If we delete `.next/cache` directory and rerun `yarn build`, the envvars are replaced correctly.

Note: to reproduce this cache state,
- Delete `.next` directory
- Comment out all 3 envvar in the `.env` file
- Run `yarn build`
