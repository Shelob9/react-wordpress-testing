---
title: "Unit Tests"
metaTitle: "Unit Tests"
metaDescription: "desc"
---

> Does A Component Work In **Isolation** ?

A good unit test only tests one specific component. Unit tests have no depenencies. Perfect adhearance to this ideal is impossible, but if you're reading and writing from a database, that's not a unit test. We often create artifical isolation, using mocks to replace other APIs. Unit tests should be simple and fast to run.

Unit tests prove that our components work as expected when used as expected.
