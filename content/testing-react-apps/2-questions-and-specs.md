---
title: "Questions and Scopes"
metaTitle: "What To Test In A React App?"
metaDescription: "desc"
---

When you use `create-react-app` to create a React app, it creates one test:

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
```

This test checks if the app can render without crashing. This is a very broad acceptance test. It's a good test to have, but it provides no detail. It either tells us that the inital render of the app can happen without errors or something in the intial render of the app is buggy.

We need to write our own tests for other states of the app. In addition we want to make sure that when events, such as form input change events happen, the application reacts accordingly.

## How Do You Know If Your React App Works

Automated tests let us know if our code works as expected. More importantly, they become a part of the program. Changes to the app should be verifed to be "working" if all tests pass after making the change. Each [type of test](/testing-background/1-types) tells us something about our app.

## Starting With Specifications

I like to start by transalating the specification for your app into tests. Writing tests first allows you to ensure that the specification is properly communicated to the engineer(s) buidling the app, feature or bug fix. In addition, GitHub, GitLab and other tools can tell you if your work is "done" or not.

### Spec For Example App

Let's build a very basic app, with tests:

Here is the spec:

- A one page app that:
  - Displays a string, whose default value is "Hi Roy".
  - Has a form input to change that value.

### Test Specs

Know that we know the specification for the app, we can start thinking about questions we want to answer.

First, I want to know that my React components work, in isolation as expected. I'll answer these questions with unit tests. In order to test in isolation. I'll need a `<DisplayValue />` component that has the responsibiity to display the current value. I'll also need an `<Edit />` component to manage the input for modifying the value.

My unit tests will answer these questions:

- Does the `<DisplayValue />` componet show the current value?
- Does the `<Edit />` component have the current value as its value attribue?
- Does the `<Edit />` component call the supplied onChange callback in response to a change event and supply the upadate value.

If those tests pass, it will NOT prove that the components work toghether. Those are questions integration tests will prove.

- Does the display value change with the input?

Now we have the test spec and the application spec. BTW the testing spec is almost in BDD language. Forcing these specs into the [cucumber.js](https://cucumber.io/docs)] or similar syntax might be useful for acceptance testing.

## Test-Driven React Development

Know that we know what questions we need to answer and what the basic components are, we'll create the tests.

### Step One: Incomplete Components

Writing out our spec tells us what components we need and what there expected behaviour is. Resist the urge to impliment that behaviour and create empty components. It is essential that they NOT work at this point. We want to be able to prove they work with tests, so tests first.

In the `src` directory, create a sub-directory called "components" and create two files there, one for each component:

For displaying the value:

```jsx
//src/components/DisplayValue.js
import React from "react";
export const DisplayValue = props => null;
```

For editing the value:

```jsx
//src/components/EditValue.js
import React from "react";
export const EditValue = props => null;
```

### Step Two: Incomplete Tests

Go ahead and commit those components. Then, let's create test files that explain **what** we will test. This will show us how the syntax of tests work.

#### The test() Syntax

All tests must be wrapped in a closure. We use a test function whose first argument is a string describing the test, and the second is a closure wrapping one or more tests. The simplest way to do this is to wrap each test with the `test()` function.

Create a file `DisplayValue.test.js` in the same directory. Jest is configured to look in `/src` for files that end with `.test.js` or `test.jsx`.

```jsx
// src/components/DisplayValue.js

//Import React
import React from "react";
//Import test renderer
import TestRenderer from "react-test-renderer";
//Import component to test
import { DisplayValue } from "./DisplayValue";

test("Component renders value", () => {});

test("Component has supplied class name", () => {});
```

In this snippet, first, all of the relevant dependencies are included. Then we write out **what** we want these tests to prove. The first test answers the question "does the compoennt show the value?" The second test answers as question about the className prop.

This syntax is pretty declarative, and it does not reflect how the program is used.

#### BDD Style

For the edit component, let's use BDD syntax to describe how the program is used. Create `src/components/EditValue.test.js`. I'm skipping the imports here, they are the same as before, with a diffent component being imported.

Notice that we use `describe()` to group our tests, and `it()` to describe what it -- our component -- does:

```jsx
describe("EditValue Component", () => {
  it("Has the supplied value in the input", () => {});

  it("Passes string to onChange when changed", () => {});
});
```

These tests answe the questions we asked about the intial state and the reaction to a change event we are concerned with.

### Step 3: Write Failing Tests

Now you will need to write tests that prove that your components do **not** work. These tests should pass when the components work.

Next section!
