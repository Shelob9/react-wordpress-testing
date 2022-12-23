---
title: "Wrting Tests For WordPress Blocks"
metaTitle: "Wrting Tests For WordPress Blocks"
metaDescription: "desc"
---

Now that we have a block plugin, with the begining of components, let's write some tests that prove that the components will work as expected.

## Testing The Save Callback In A Block

Let's start with the save callback, this one is pretty simple, there are no interactions to test. A snapshot test will do. Be careful though, this snapshot test will pass without building out the component. Other tests will cover that it has the right structure.

```jsx
//src/components/Save.test.js
import {Save} from './save';
import {
   render, //test renderer
   cleanup, //resets the JSDOM
   fireEvent //fires events on nodes
} from "@testing-library/react";

describe("Save componet", () => {
  afterEach(cleanup);
  //It handles having no saved attribute
  it("matches snapshot with value attribute empty", () => {
    const attributes = { value: '' };
    expect(
      render(
        <Save
          {...{
            attributes,
            clientId: "random-id",
            className: "wp-blocks-whatever",
          }}
        />
      )
    ).toMatchSnapshot();
  });

  //Does it render correctly when attribute has value?
  it("matches snapshot with provided attribute", () => {
    const attributes = { value: "Tomorrow" };
    expect(
      render(
        <Save
          {...{
            attributes,
            clientId: "random-id",
            className: "wp-blocks-whatever",
          }}
        />
      )
    ).toMatchSnapshot();
  });
});
```

## Testing The Edit Callback

For this component, we need to make sure that
the provided value of `attributes.value` is passed to the input. More importanly, when the input changes, we need to make sure that that `setAttributes()` gets that value.

Remember that `setAttributes()` has the same API as
`React.setState()`. Also, we can mock it like any other function. How it works does not matter to us. What matters is how we work with it.

This test is going to be very similar to the one for the `<EditValue>` component. We render the interface, we check the value, we fire a change event on the input and then we check that `setAttributes()` was called once, with the right value.

First, we can test the intial render with a snapshot:

```jsx
describe("Editor componet", () => {
  afterEach(cleanup);
  it("matches snapshot", () => {
    const attributes = { value: "Hi Roy" };
    const setAttributes = jest.fn();
    expect(
      render(
        <Editor
          {...{
            attributes,
            setAttributes,
            clientId: "random-id",
            className: "wp-blocks-whatever"
          }}
        />
      )
    ).toMatchSnapshot();
  });
});
```

That is a good first step, but does not test the interactivity of the block. Let's add another test for that:

```jsx
describe("Editor componet", () => {
  afterEach(cleanup);
  it("matches snapshot", () => {
    //...
  });
  it("Changes value", () => {
    //Mock intial attributes
    const attributes = { value: "Hi Roy" };
    //Mock set attributes
    const setAttributes = jest.fn();

    //render component
    const {getByLabelText} = render(
      <Editor
        {...{
          attributes,
          setAttributes,
          clientId: "random-id",
          className: "wp-blocks-whatever"
        }}
      />
    );

    //Get the input by label text
    const input = getByLabelText('Edit Value');
    //Fire a change event on the input
    fireEvent.change(input, {
      target: { value: "New Value" }
    });

    //Was callback function called once?
    expect(onChange).toHaveBeenCalledTimes(1);

    //Was the new value -- not event object -- sent?
    expect(onChange).toHaveBeenCalledWith("New Value");
  });
});
```

This test ensures that we're passing down the props to the `<EditValue>` component properly. It's mainly copied from that component's tests.

Commit those tests. They will fail of course. Time to make the components actually work.

