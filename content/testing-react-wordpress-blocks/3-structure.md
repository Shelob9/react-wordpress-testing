---
metaTitle: "Structuring  WordRress Plugin For Testablity"
title: "Structuring  WordRress Plugin For Testablity"
metaDescription: "desc"
---

## Starting With Specifications

Just like last time, we'll start by defining the project's scope and what questions different types of tests can answer for us. Then we'll write failing tests, commit those and then make them pass.

### Spec For Block

What we will be building is a a block for showing some text. This could be an alert block, or special call to action block, depending on what you want to do. First, let's create a blcok with these specs:

- The components for the app should be reused.
- The block preview and rendered content should be identical.
- The control for the value should appear in the block’s inspector controls.

Once that foundation exists and has good test coverage, you can safely itterate on the code to make the block unique to your needs.

### Tests For Gutenberg Blocks

Beacuse this block will re-use the same components, we do not need to unti test those components. All of the tests we are doing are to ensure that those components work with Gutenberg properly. While small unit tests for functions created to help this process may be useful, for the most part, we want to use integration tests.

In additition, we can use the WordPress e2e test suite, which is included to activate the plugin, add the block and make sure the block is added. That would be our acceptance test, showing that not only do the componentes work toghether, that the final product -- the block functions as expected.

### Jest Is The Test Runner

Testing works the same for Gutenberg blocks as other React apps. We are using Jest as the runner, and we can use same test renderers. Let's go ahead and install the renderers we used last time in our plugin:

`yarn add @testing-libray/react`

`yarn add react-test-renderer`

## Structuring Blocks For Easy Testing

A block can get pretty complex, and it's tempting to do all of that in the file that registers the block. I think that any business logic besides block registration should be seperated into different files. The file that builds the block to do nothing but build the block.

The file that builds the block should have the single responsiblity of mapping WordPress editor APIs, such as state management, to the existing components. This needs to happen in the edit _and_ save callback. That's two more responsibiliteis, so two more files --one for edit and save callback.

### The Block

```jsx
//Import Blocks API
import { registerBlockType } from "@wordpress/blocks";

//Import our components for edit and save callback
import { Editor } from "./components/Editor";
import { Save } from "./components/Save";

//Get the block's meta info from block.json so we can also use that on the server.
const blockConfig = require("../block.json");
const { name, title, attributes, category, keywords } = blockConfig;

//Register block
registerBlockType(name, {
  title,
  attributes,
  category,
  keywords,
  //pass edit callback props to Editor component
  edit: props => <Editor {...props} />,
  //pass save callback props to Save component
  save: props => <Save {...props} />
});
```

### Edit And Save Callbacks

The edit and save callback are composed in separate files, importing components built for the app. They map WordPress' state to the existing components. In addition, they layout the component using the block editor's components.

