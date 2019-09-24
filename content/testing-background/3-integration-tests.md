---
title: "Integration Tests"
metaTitle: "Integration Tests"
metaDescription: "desc"
---

> Do The Components Work **Together** ?

Once we have unit tests proving our components work in isolation, we need to make sure they work toghether. That's what integration tests are for. In a unit test we would mock an

Laravel breaks tests up into Unit, Feature and Browser. I like thinking about integration tests as feature tests. You use the feature a lot like a user would and see if it works.

Integration tests are generally written with the same tools as a unit test. We just relax our mocks. It's still not testing in a real environmnt.

