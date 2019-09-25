---
title: "Test-Driven Gutenberg Blocks"
metaTitle: "Test-Driven Gutenberg Blocks"
metaDescription: "desc"
---

In the last part, we created some test for components that do not actually do anything. We are following a "red/ green" pattern. The tests are failing, our CI should be showing a red dot for failure. Now we commit working components until we see green in our CI.

## Save Callback

The test for the save callback called for passing the `attributes` and `className` props. The `<DisplayValue/>` component accespts props of `value` and `className`. So, this component is really just translating props:

```jsx
//src/components/Save
import React from "react";
import { DisplayValue } from "./app/DisplayValue";
export const Save = ({ attributes, className }) => {
  return <DisplayValue value={attributes.value} className={className} />;
};
```

Re-run your tests. This should cause the snapshot tests for this component to fail. Take a look at the new JSON, if it looks right, [accept the change](https://jestjs.io/docs/en/snapshot-testing#updating-snapshots).

## Edit Callback

In the tests for the edit callback, we used four props: `attributes`, `setAttributes`, `className`, and `clientId`. The last two we can use for the class and id of the `<EditValue/>` component.

The other two props, `attributes` and `setAttributes`, we can not use as-is. We need to pass just `attributes.value` and we need a change handler function for just that attribute.

We can compose the change handler from `setAttributes()`. Keep in mind that `setAttributes()` works like `React.Component.setState()`, not `React.useState()`.

```jsx
const onChange = value => setAttribute({ value });
```

If you want to, you can write this outside of the function scope and unit test it. I think that's overkill. Here is the full component:

```jsx
import React, { Fragment } from "react";
import { EditValue } from "./app/EditValue";
import { DisplayValue } from "./app/DisplayValue";
import { InspectorControls } from "@wordpress/block-editor";
export const Editor = ({ attributes, setAttributes, className, clientId }) => {
  //Change handler
  const onChange = value => setAttributes({ value });
  //current value
  const { value } = attributes;
  return (
    <Fragment>
      <InspectorControls>
        <EditValue
          className={`${className}-editor`}
          id={clientId}
          value={value}
          onChange={onChange}
        />
      </InspectorControls>
      <DisplayValue value={value} className={className} />
    </Fragment>
  );
};
```

If these tests pass, we know that the componets should work together.

## e2e Testing Gutenberg Blocks

Now that we know that our components work correctly, we need to make sure our plugin can be activated and used to add our block to the post editor. We do this by creating a WordPress site, automating the process of clicking the buttons to do that and asserting that the end result is as expected.

End to end testing for WordPress blocks should get a full section of this site later. It's a huge topic, I'll rush through it here to get you started.

When we right these test, we assume that all of the components work. These tests are the most like how a user would use the plugin.

### Useing Puppetter To Automate Chrome

This test tool uses headless Chrome, and is controlled using [puppetter](https://github.com/GoogleChrome/puppeteer). The WordPress e2e test tools are a wrapper over Puppeteer. So, if you're not sure about how it works, check the [Puppetter docs](https://pptr.dev/).

Easiest if you have WordPress running locally in Docker [like core does](https://github.com/WordPress/wordpress-develop/tree/master/tools/local-env)

[Copy my copy of core's local development](https://github.com/Shelob9/testing-react-wordpress/tree/master#local-development)

### Helpful Links

- [Introductory Post](https://make.wordpress.org/core/2019/06/27/introducing-the-wordpress-e2e-tests/)
- [Documentation](https://developer.wordpress.org/block-editor/packages/packages-scripts/)

### How To Setup Up WordPress End To End Tests

To make things easier, add the WordPress e2e test utilities:

```bash
# Add e2e test utilities
yarn add @wordpress/e2e-test-utils
```

You will see these utility functions shortly. They wrap repeditive steps, such as activating the plugin or adding a block to a post.

### Configure Jest

A seperate Jest config is needed to make sure it does NOT run unit tests.

- [Jest Config For Unit Tests](https://github.com/Shelob9/testing-react-wordpress/blob/master/jest.config.js)
- [Jest Config For e2e Tests](https://github.com/Shelob9/testing-react-wordpress/tree/master/e2e)

```javascript
const defaultConfig = require("./node_modules/@wordpress/scripts/config/jest-unit.config.js");
module.exports = {
  //use the default from WordPress for everything...
  ...defaultConfig,
  //Except test ignore, where we need to ignore our e2e test directory
  testPathIgnorePatterns: ["/.git/", "/node_modules/", "<rootDir>/e2e"]
};
```

This is based on [WordPress core's e2e tests](https://github.com/WordPress/wordpress-develop/tree/master/tests/e2e)

Create a directory called `e2e`. That is where e2e tests will go.

### Test That The Block Works

In the directory `e2e` try adding one test file. We are still using Jest as the test runner, so everything you learned about writing tests still applies, we just have new tools.

Speaking of which, start by importing helper functions to make naviagating WordPress easier:

```jsx
import {
  insertBlock,
  getEditedPostContent,
  createNewPost,
  activatePlugin,
  deactivatePlugin
} from "@wordpress/e2e-test-utils";
```

Now we can test that we can add the block.

This test starts by activating the plugin and then afterwords we deacvitave it. This acomplishes two things. First, it resets everything between tests, which is good. Second, it makes sure that the plugin can be activated without errors.

```jsx
describe("Block", () => {
  //file path for plugin
  const plugin = "plugin-name/plugin-name.php";
  beforeEach(async () => {
    await activatePlugin(plugin);
  });
  afterEach(async () => {
    await deactivatePlugin(plugin);
  });
  it("Can add block", async () => {
    await createNewPost();
    await insertBlock("Josh Block");
    expect(await getEditedPostContent()).toMatchSnapshot();
  });
});
```

### Do NOT e2e Test Everything

e2e tests ensure that the system works toghether. They are a compliment to unit tests and integration tests that are faster to run and easier to setup.

I think of e2e tests as coverage for what the other tests can not cover.
