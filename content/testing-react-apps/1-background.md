---
title: "Testing React Apps"
metaTitle: "Background"
metaDescription: "desc"
---
Words introducting this
>[Example Code For Part One](https://github.com/Shelob9/testing-react-apps)

## How React Works

To test React components, we need a test renderer. So, it's worth backing up and talking about how React and React renderers, such as [ReactDOM](https://reactjs.org/docs/react-dom.html) work.

### Step 1

React creates an object representation of nodes representing a user interface. React **does not** produce HTML. React creates these elements:

```javascript
  React.createElement(
    "div", { className: "alert" }, "Something Happened"
  );
```

That's what it does. The output of the program `React` is an object representing what the state of the application **should be**, not an HTML string.

### Step 2

Once React has generated its output, a "renderer" converts that object to a useable interface. ReactDOM renders React as DOM tree and modifies the DOM:

```jsx
//Create object representation of application.
const App = () => <div className={'alert'}>Someting Happened</div>;

//Render object to the screen using ReactDOM
ReactDOM.render(<App />, document.getElementById('root'));
```

One of the benefits of object-oriented desgin, is that interfaces can define a type of object, and as a result, which specific concrete implimentation of that type that's being used doesn't really matter. In this case the `Renderer` interface defines what is supplied to a renderer and the implimentation details are left to the concrete implimentation.

This is [SOLID design](https://blog.bitsrc.io/solid-principles-every-developer-should-know-b3bfa96bb688).

- ReactDOMServer renders to an HTML string for server to send to client.

```javascript
ReactDOMServer.renderToString(<App />);
```

- [Ink](https://github.com/vadimdemedes/ink) is a renderer for creating interactive console apps.

```javascript
import {render} from 'ink';
renderToString(<App />);
```

## Test Renderers
Generally we use `ReactDOM` beacuse we want to render a user interface to the DOM. When testing, we generally want to use a renderer that is designed for testing.

The React team develops [React Test Renderer](https://reactjs.org/docs/test-renderer.html). This library is for basic tests and snapshots.

One limitation of React Test Renderer is itdoes not use [JSDOM](https://github.com/jsdom/jsdom). That makes it faster, and more limited in what it can do. We can do basic unit tests, but we can not easily test events. We could, but we'd end up reverse engineering existing tools, such as [Enzyme](https://airbnb.io/enzyme/) or [React Testing Library](https://testing-library.com/docs/react-testing-library/intro).

[Enzyme](https://airbnb.io/enzyme/) is developed by AirBnB and is one of the defacto community standard tools for JavaScript testing. Enzyme does use JSDOM. It is very good for testing events. It's super useful for testing class components methods/ state. I like that the syntax for selecting from the rendered JSDOM is jQuery-like. This made it feel easy to learn.

[React Testing Library](https://testing-library.com/docs/react-testing-library/intro) is newer entry that is becoming more popular. The [guiding principle](https://testing-library.com/docs/guiding-principles) of testing library is:

> The more your tests resemble the way your software is used, the more confidence they can give you.

The idea behind testing React -- or Vue, or any interface -- is that you write tests like you would use the application. This mixes integration and acceptance testing in a way I like. You can use the renderer provided by this library for snapshot and other type of unit tests. Where it shines -- and in my experience has a steeper learning cureve than Enzyme -- is testing events and other interactions.

## The Test Suite

This is JavaScript, so our test suite will be assembled of smaller packages.

First, we need a test runner. This runs our tests, reports passes and fails and provides coverage report. Most React apps use [Jest](https://jestjs.io/). If you're a PHP developer, think of Jest as phpunit for React.

Our test suite also needs  test renderer. We'll be using [React Test Renderer](https://reactjs.org/docs/test-renderer.html) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro).

Lastly, we'll need an assertion library, which allows us to test the output of our program to ensure it matches the expected behaviour. We'll use whatever Jest uses, which I think is Chai. I don't know, and it doesn't really matter.



## Zero-Config Testing

If this is starting to sound complicated, and you're worried about having to configure it all, please stop worrying. The great thing about React is most of the complexity in tooling can be hidden from you by using a React framework such as create-react-app or Gatsby.

In this eductional website, I'll be teaching two of these tools:

### React Scripts

```bash
npx create-react-app app #create app
cd app #change to app directory
yarn test # run tests
```

`react-scripts` is used by `create-react-app` for building, testing and linting React apps. The command to test your app is `react-scripts test`.

### WordPress Scripts
[`@wordpress/scripts`](https://www.npmjs.com/package/@wordpress/scripts) is WordPress' `create-react-app`-inspired zero-config tools for building, testing and linting Gutenberg blocks. The command to test your block is `wordpress-scripts test`. This tool uses the same technolgoies as `create-react-app` and removes the complexity of making them work with the WordPress block editor and WordPress' asset managment API.

When using `@wordpress/scripts` dependencies such as `React`, `lodash` and `@wordpress/components` are NOT included in the bundle. WordPress loads one copy of those dependencies, preventing conflicts between plugins.

Developed for Gutenberg, great for your plugins.

Once you've learned React testing, you can apply that knowledge to WordPress testing. It's the same APIs and technologies.
