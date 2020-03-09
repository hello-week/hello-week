# Installation

There are a few different ways to install the Hello Week library.

## Package Manager

Hello Week is available on [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/).
You'll first need to install Hello Week `core` package as well as any plugins.

```bash
# Using npm
npm install hello-week --D

# Using Yarn
yarn add hello-week --D
```

## Download

You can also download the library manually:

**Repository:** [download](https://codeload.github.com/mauroreisvieira/hello-week/zip/master) latest version.

## CDN

A number of free CDNs host Hello Week's dist files. A clever way to choose a CDN and figure out the URLs of the files you need is to visit the package on [Yarn](https://yarnpkg.com/).

> For example, visit the [Hello-Week](https://cdn.jsdelivr.net/npm/hello-week@3.0.0/) package.

## Explanation of Different Builds

In the **dist/** [directory of the NPM package](https://cdn.jsdelivr.net/npm/hello-week/dist/) you will find many different builds of Hello Week.

-   **[UMD](https://github.com/umdjs/umd)**: UMD builds can be used directly in the browser via a `<script>` tag.
    The default file from [jsDelivr CDN](https://cdn.jsdelivr.net/npm/hello-week/) is the Runtime + Compiler UMD build (`hello-week.js`).

-   **[ES Module](http://exploringjs.com/es6/ch_modules.html)**: Starting in Hello Week 3.0.0 provides two ES Modules (ESM) builds:

    -   ESM for bundlers: intended for use with modern bundlers like [Webpack](https://webpack.js.org) or [Rollup](https://rollupjs.org/).
        Format designed to be statically analyzable so the bundlers can take advantage of that to perform "tree-shaking" and eliminate unused code from your final bundle.

    -   ESM for browsers: intended for direct imports in modern browsers via `<script type="module">`.

For production, we recommend linking to a specific version number and build to avoid unexpected breakage from newer versions:

```html
<script src="https://cdn.jsdelivr.net/npm/hello-week@3.0.0/dist/hello.week.min.js"></script>
```

If you are using native **ES Modules**, there is also an ES Modules compatible build:

```html
<script type="module">
    import HelloWeek from 'https://cdn.jsdelivr.net/npm/hello-week@3.0.0/dist/hello.week.min.es.js';
</script>
```
