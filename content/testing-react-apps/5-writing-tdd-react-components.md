---
title: "Writing Test Driven React Components"
metaTitle: "Writing Components"
metaDescription: "Writing React components that already have tests when using the TDD methodology"
---

In the first section, [we created empty components](http://localhost:8000/testing-react-apps/2-questions-and-specs#test-drivenreactdevelopment) for `<EditValue />` and `<DisplayValue />`. Then we wrote tests for them that showed how they should work. Currently these tests prove that the components _do not work_. Let's update the components so they do work.

## Continuous Integration For React Apps

A huge benefit of TDD is that we can practice continuous integration and deployment. If each change is fully tested, linted, and code reviewed, we should trust it to automatically deploy once the automated testing has passed. Code review introduces a human step to this process.

CI/ CD lets us follow a red/ green cycle. We commit the failing tests, the CI system runs the tests, they fail. Instead of moving the CI/CD pipeline to the deployment phase it stops. We show these builds as "red." Then we commit code to make the tests pass, everything shows up "green." This indicates that a change is safe to make and we can manually or automatically -- depneding on our pipelie -- trigger our automated deployment.

Setting that up is a different subject. Right now our components are red, let's make them green.

### Display Component

Now, if I look back at the tests for `<DisplayValue />`, I see that it has two props value and className. That's pretty simple to impliment:

```jsx
import React from "react";
export const DisplayValue = ({ value, className }) => (
  <div className={className}>{value}</div>
);
```

Adding that should cause the unit tests for the `<DisplayValue />` component to pass. You will need to record a snapshot for the component. Make sure to look at the HTML in the snapshot to ensure it looks like you would expect it to look.

### Edit Component

If you look back over the tests for the EditValue component, we can learn which props we expected it to have. In the final integration test, we selected by the input ID. Therefore we need to make sure that id is passed to both the input and the label's `for` attribute. We will also need to supply the outer class attribute as well as the input's onChange callback and value:

```jsx
import React from "react";
export const EditValue = ({ onChange, value, id, className }) => {
  return (
    <div className={className}>
      <label htmlFor={id}>Set Value</label>
      <input
        id={id}
        value={value}
        onChange={event => onChange(event.target.value)}
      />
    </div>
  );
};
```

With this in place, the tests for the `<EditValue />` component should now work.

### The App Component

Now take a look at [the test of the app](http://localhost:8000/testing-react-apps/4-integration-testing-react-apps#integrationtestingwithreacttestinglibrary). It should show us how to wire the componets and what ID to use for the input.

```jsx
import React, { useState } from "react";
import "./App.css";
import { EditValue } from "./components/EditValue";
import { DisplayValue } from "./components/DisplayValue";

function App() {
  //Manage state of the value.
  const [theValue, setTheValue] = useState("Hi Roy");
  return (
    <div className="App">
      <DisplayValue value={theValue} className={"display-value"} />
      <EditValue
        value={theValue}
        onChange={setTheValue}
        className={"edit-value"}
        id={"the-input"}
      />
    </div>
  );
}
```

## TDD vs Worry

Now, all of the tests should pass, if all of the components work as expected and are wired toghether as expected. They may not yet, that's OK. One of the joys of TDD is you do not worry about how to know if your app works or not, it's either red or green. Way less manual testing.

More importantly, you can worry less about regression errros. When you fix a bug, you should not worry about causing existing funcitonality to become bugy. TDD and test automation prevent that.

Now that we have basic components, let's show how to reuse them in a WordPress block, including what to test.
