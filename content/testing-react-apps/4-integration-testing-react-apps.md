---
title: "Integration Testing React Apps"
metaTitle: "Integration Testing React"
metaDescription: "Integration testing React apps with Jest, React Test Renderer and React Testing Library"
---

> Do the two components work together as expected?

In the previous section, we wrote tests to covered using unit tests to prove our two components work as expected in isolation. That's totally contrived. Now we want to use integration tests to check if that behaviour is right or not.

## Integration Testing With React Testing Library

When we created the app with `create-react-app` we got an `<App />` component. That component should be able to do everything defined in our spec.

Beacuse that component will be composed of the other two components, we can run tests on `<App />` to ensure that the two componets are properly integrated. This is the most realistic way to test, and we do not need to make a mock or anything.

To show an alternative to using, the [`getBy*` approach](https://testing-library.com/docs/dom-testing-library/api-queries#getby) I showed in the unit testing section. Instead, I'll show how to query by CSS selector's using [container.querySelector()](https://testing-library.com/docs/angular-testing-library/api#container).

```jsx
it("Displays the updated value when value changes", () => {
  //Get the application container
  const { container } = render(<App />);
  //Query for display value by class
  expect(container.querySelector(".display-value").textContent).toBe("Hi Roy");
  //fire event on the input, querying by input ID
  fireEvent.change(container.querySelector("#the-input"), {
    target: { value: "New Value" }
  });
  //Ensure that the display input displays the updated value.
  expect(container.querySelector(".display-value").textContent).toBe(
    "New Value"
  );
});
```

That's the only integration test we need. None of these tests should work yet. In addition we have learned some things about the HTML structure of the components we need to create. Commit all of this in your app. Now you can start writing the components.
