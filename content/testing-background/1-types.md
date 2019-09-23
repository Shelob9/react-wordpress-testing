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

### Unit Tests

> Does A Component Work In **Isolation** ?

A good unit test only tests one specific component. Unit tests have no depenencies.  Perfect adhearance to this ideal is impossible, but if you're reading and writing from a database, that's not a unit test. We often create artifical isolation, using mocks to replace other APIs. Unit tests should be simple and fast to run.

Unit tests prove that our components work as expected when used as expected.

### Integration  Tests

> Do The Components Work **Together** ?

Integration tests break down the isolation. Laravel breaks tests up into Unit, Feature and Browser. I like thinking about integration tests as feature tests. You use the feature a lot like a user would and see if it works.

Integration tests are generally written with the same tools as a unit test. We just relax our mocks. It's still not testing in a real environmnt.

## Acceptance  Tests

> Does the whole system work together?

For web apps, we can think of acceptance tests as browser tests. For example, [Cypress.io](https://cypress.io) or [the WordPres end to end](https://make.wordpress.org/core/2019/06/27/introducing-the-wordpress-e2e-tests/) use headless Chrome to navigate a web site, click things and make sure they work as expected.


