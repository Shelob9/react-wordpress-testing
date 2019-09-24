---
title: "Types of Tests"
metaTitle: "Types of Tests"
metaDescription: "desc"
---

Before getting into the specifics of how to write JavaScript tests, it's helpful to know the categories of tests. No type of test is better than the other. Nor can any single type of test answer the main question we need to ask:

> Does my code work?

- Does function or method work in isolation?
- Do components connect toghether as expected?
- Does a feature work as expected when used the way a user uses it?

For each of these questions, you should have a test that proves the answer is yes. Each of these types of questions is answered with a different type of test. The distinction between test types is blurry. That's fine, I find that asking these questions helps me sort out what kinds of tests I need. Knowing how to use them toghether to fully cover your app is more important than learning the specifics of how to write the tests.

## Types Of Tests

> What **Questions** Do Tests **Answer** ?

There are three general types of tests. In general, for a new project, we start with unit tests, then integration tests and later acceptance tests. For legacy projects without tests, the code is often not unit testable. For these projects creating acceptance tests that cover large chunks of functionality might make more sense. Then code can be refactored for unit testability with decent confidence that the program still works for the end user as expected.
