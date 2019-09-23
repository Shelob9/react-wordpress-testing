---
title: "Types of Tests"
metaTitle: "Types of Tests"
metaDescription: "desc"
---

## Does My Code Work?

How would I know? Tests, that's how.

Before we begin, I'll look at the different types of tests. Before getting into the specifics of how to write JavaScript tests, it's helpful to know the categories of tests. Seperating them by questions they answer helps you know why you should write that type of test, or not.

None of these types of tests are better or worse than the other. Each one has strengths and weakness and alone can not prove your application works. Knowing how to use them toghether to fully cover your app is more important than learning the specifics of how to write the tests.

## Types Of Tests

> What **Questions** Do Tests **Answer** ?

There are three general types of tests. In general, for a new project, we start with unit tests, then integration tests and later acceptance tests. For legacy projects without tests, the code is often not unit testable. For these projects creating acceptance tests that cover large chunks of functionality might make more sense. Then code can be refactored for unit testability with decent confidence that the program still works for the end user as expected.
