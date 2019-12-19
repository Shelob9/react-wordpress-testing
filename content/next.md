---
title: "Next Steps"
metaTitle: "Next Steps"
metaDescription: "Additional recommended steps for learning test-driven React development"
---

That's it, for now. You should know understand the basics of testing React apps in and around WordPress. Since you are using Jest and other standard tools for React, the internet is full of helpful insights on how to use these tools, which apply to WordPress as well.

This page also includes an example of accessibility testing. I need to expand on that in future versions.

## Recomendations

- Assume your components will be reused.
  - Test in isolation.
- Start with unit tests on new projects.
  - Makes refactoring faster and safer.
- For legacy projects, start with acceptance tests.
  - Covers more, makes refactoring for unit-testablity safer.
- Do not forget to test for accesibility errors

## Links

- [Good Post On Reporting a11y Errors In Console](https://web.dev/accessibility-auditing-react)
- Follow and learn from [Kent C. Dodds](https://kentcdodds.com/)
  - Author of React Testing Library and many great posts and videos about React, React testing.

## Ideas For Additional Sections

- In depth on e2e testing.
- Accesibility testing for React apps.
- Block development basics. Probably its own site.

## Testing React Apps For Accesibility Errors

> Workshop by Marry Sutton: [Accessibility in JavaScript Applications](https://marcysutton.github.io/js-a11y-workshop/)

The [aXe Accesibility testing tool](https://www.deque.com/axe/) comes in [browser extensions](https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd?hl=en-US) and can also be used in testing.

We can use axe to tell us if the accessibility scanner raise errors. This is a good question to answer, but it does NOT mean your app is accessible! Passing these tests is a good first step.

The jest-axe package allows us to extend Jest so that it can run an assertion that fails if the aXe scan returns a violation. We can render our whole app or one component to a string, and then pass that string to aXe for analysis.

### Testing React Components For Accesibility Violations With React DOM

One option to render the componet is to use React DOM. This makes sense, since that is what will render the app in production:

```jsx
import React from "react";
import server from "react-dom/server";
import App from "./App";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

//Example with React DOM
it("Raises no a11y errors", async () => {
	const html = server.renderToString(<App />);
	const results = await axe(html);
	expect(results).toHaveNoViolations();
});
```

### Testing React Components For Accesibility Violations With React Testing Library

But, if you're already using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro), you can use the JSDOM object rendered by testing-library instead:

```js
import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);
it("Raises no a11y violations", async () => {
	const { container } = render(
		<div>
			<label htmlFor="food-type">Name Of Item</label>
			<input id="food-type" type="text" />
		</div>
	);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});
```
