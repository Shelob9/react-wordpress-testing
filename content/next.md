---
title: "Next Steps"
metaTitle: "Next Steps"
metaDescription: "desc"
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

```jsx
import React from "react";
import server from "react-dom/server";
import App from "./App";
import { render, fireEvent, cleanup } from "@testing-library/react";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

it("Raises no a11y errors", async () => {
  const html = server.renderToString(<App />);
  const results = await axe(html);
  expect(results).toHaveNoViolations();
});
```




