---
metaTitle: "Setting Up Your Plugin"
title: "Creating A WordPress Plugin Using WordPress Scripts"
metaDescription: "desc"
---

In the first section of this course, we built a small React app. In this section, we will set up a plugin to use those components in a Gutenberg block. You will learn how to apply the technical skills of React testing and the TDD methodology to WordPress block development.


## Creating A Plugin With WordPress Scripts

In your local WordPress' plugins directory, create a new directory for this plugin and set up package.json following these steps:

- Inititalize package.json
  - `npm init`
  - Answer all the questions
- Add WordPress Scripts
  - `yarn add @wordpress/scripts`
- Add a JavaScript file at `/src/index.js`
  - This is the main JavaScript file for the block.
- Create a block.json
  - [Copy and edit this file](https://gist.github.com/Shelob9/f2c97a5803d02a8b82217af670b5b008#file-block-json)
- Create a main plugin file to enqueue JavaScript and CSS.
  - [Copy and edit this file](https://gist.github.com/Shelob9/f2c97a5803d02a8b82217af670b5b008#file-plugin-php)

### Add Scripts To package.json

Yarn and npm can be used as a test runner. Instead of memorizing the commands that `@wordpress/scripts` provides, we should add shortcuts in package.json scripts. See [the README](https://www.npmjs.com/package/@wordpress/scripts) for more information.

```json
{
  "scripts": {
    "build": "wp-scripts build",
    "start": "wp-scripts start",
    "test:e2e": "wp-scripts test-e2e --config e2e/jest.config.js",
    "test:unit": "wp-scripts test-unit-js --config jest.config.js"
  }
}
```

At this point, running `yarn build` should compile the JavaScript in `src/index.js` to `/build/index.min.js`. If so, you are probably ready to write the plugin code.

## Structuring Blocks For Testablitiy


The file that builds the block to do nothing but build the block.
