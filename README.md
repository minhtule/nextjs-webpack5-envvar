This repo reproduces an issue with Webpack 5 cache and Next.js environment variables
with [`NEXT_PUBLIC_` prefix](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser).


## Steps to reproduce

- Install dependency with `yarn`
- First, we need to create a problematic Webpack cache
  + Run `yarn build` to build Next.js production bundle
  + Inspect `.next/server/pages/index.js` output file (corresponding to the `pages/index.js` source
file).
    - The Next.js public envvar like `process.env.NEXT_PUBLIC_VAR_1` are not replaced. This is
    expected because they are not set in `.env` file (commented out).
- Now we can reproduce the issue with the problematic Webpack cache
- Commented out the 3 envvar in `.env`
- With the Webpack cache, run `yarn build` again
- Inspect `.next/server/pages/index.js`, the 3 envvars are still not replaced as expected.

If we delete `.next/cache` directory and rerun `yarn build`, the envvars are replaced correctly.
