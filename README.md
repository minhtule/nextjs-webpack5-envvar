This repo reproduces [an issue](https://github.com/vercel/next.js/issues/23901) with Webpack 5 cache and Next.js environment variables
with [`NEXT_PUBLIC_` prefix](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser).


## Steps to reproduce

- Install dependency with `yarn`
- First, we need to create a problematic Webpack cache
  + Run `yarn build` to build Next.js production bundle
  + Inspect `.next/server/pages/index.js` output file (corresponding to the `pages/index.js` source
file).
    - The Next.js public envvar like `process.env.NEXT_PUBLIC_VAR_1` are not replaced. This is
    expected because they are not set in `.env` file (commented out).
    ```js
    function Home() {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          children: "Hi"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          children: process.env.NEXT_PUBLIC_VAR_1
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          children: process.env.NEXT_PUBLIC_VAR_2
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          children: process.env.NEXT_PUBLIC_VAR_3
        })]
      });
    }
    ```
- Now we can reproduce the issue with the problematic Webpack cache
  + Commented out the 3 envvar in `.env`
    ```shell
    NEXT_PUBLIC_VAR_1=abc
    NEXT_PUBLIC_VAR_2=def
    NEXT_PUBLIC_VAR_3=ghi
    ```
  + With the Webpack cache, run `yarn build` again
  + Inspect `.next/server/pages/index.js`, the 3 envvars are still not replaced as expected.

- If we delete `.next/cache` directory and rerun `yarn build`, the envvars are replaced correctly.
    ```js
    function Home() {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
          children: "Hi"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          children: "abc"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          children: "def"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
          children: "ghi"
        })]
      });
    }
    ```
