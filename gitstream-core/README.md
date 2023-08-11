# gitstream-core

An npm package containing gitstream rules-parser and rules-engine modules

## Work local

We often need to test our work against a local project before deploying to our `npm` registry in order to make sure our changes work as expected.

We recommend doing this using [yalc](https://github.com/wclr/yalc):

- First, make sure you have `yalc` installed:

```shell
npm install -g yalc
```

```shell
# in gitstream-core
npm run build && yalc publish
```

- Then, in your other project, add this package like so:

```shell
# in a project that depends on gitstream-core
yalc add @linearb/gitstream-core
```

- You will note that `package.json` has changed:

```json
"dependencies": {
    ...
    "@linearb/gitstream-core": "file:.yalc/@linearb/gitstream-core"
    ...
```

> Make sure you do not commit this and that `.yalc` and `yalc.lock` are ignored by `git`

- If you make any additional changes, you can easily update all linked project by running

```shell
# in gitstream-core
npm run build && yalc push
```

## Publish local package

1. Change version in package.json
2. Run `npm run build`
3. Run `npm publish`

## Internal cm playground

1. Paste the desired cm content to `src/rules-parser/tests/resources/gitstream.cm`
2. Change the context in `src/rules-parser/tests/consts/contextForCMTester.ts`
3. Run the following command: `npm run test src/rules-parser/tests/cm-tester.test.ts`
