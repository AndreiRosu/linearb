# Common NodeJS Frameworks

A library of common NodeJS frameworks.

## Build and install

```
npm i
```

## Run tests

```
npm test
```

## Publish new version

```
npm version <patch, minor, major> -m "Upgrade to %s with these changes..."
npm run build
npm publish
```

## Publish new RC version

```
npm version prerelease --preid=rc
npm run build
npm publish
```