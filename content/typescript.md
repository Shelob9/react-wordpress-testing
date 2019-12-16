---
title: "Typescript With WordPress"
metaTitle: "Typescript With WordPress"
metaDescription: "An introduction to why Typescript is useful to us in WordPress development"
---

Typescript makes it harder to write JavaScript incorrectly. Typescript is a dlect of JavaScript that adds new syntax to define types and interfaces for variables, function arguments, function return types and objects. The typescript compiler uses static analysis to check these types for errors, **when the code is compiled**.

### Quick Start

To get started with Typescript without worrying about setup, you can create a new project using [tsdx](https://github.com/jaredpalmer/tsdx):

```bash
npx tsdx create learn-typescript
```

Also, [adding typescript to create-react-app](https://create-react-app.dev/docs/adding-typescript/) is documented and straight-forward.

I wrote [a longer introduction for Pantheon](https://pantheon.io/blog/typescript-wordpress-basicsj).

## Benfit For React Code

Imagine this component to show a WordPress post:

```jsx
const Post = ({ title, content, author }) => (
	<div>
		<PostTitle title={title} />
		<PostContent content={content} />
		<PostAuthor author={author} />
	</div>
);
```

This component **assumes** that the props passed to it, match the expected props of the child components. We can test that's the case with tests that have the correct props:

```jsx
describe("Post", () => {
	it("Puts the title in the right place", () => {
        //Shallow is enzyme's shallow renderer
        const post = {
            title : {
                rendered: 'Hello Saturn'
            };
            //...
        };
        //render with sample data
		const wrapper = shallow(
			<Post {...post} />
		);
        //Make sure prop is passed correctly
		expect(wrapper.find(PostTitle).prop("title")).toBe(post.title.rendered);
	});
});
```

A good thing about this test is that if there are run time erros causesd by running this component, the tests will show you those erorrs. This test is an example of [what I condsider an anti-pattern](https://react-wordpress-testing.joshpress.net/testing-react-apps/3-unit-testing-react) -- testing React's functionality, not the actual code being created.

This type of rigid testing makes refactoring safe, and gives us assurances our props are mapped correctly. But, it's also a a lot of boring test code. This kind of test likely will need to get rewritten as the componets are refactored, and that's a bad smell.

The problem this kind of testing solves is thatwe could have **run-time** errors if the componets and sub-components being tested are not used according to what we assume there public APIs, errors will happen. We can assume that if we run the components in a production-like environment, and errors happen, that corrian end user would probably describe as "broken" in a product environment.

OK, fine, but two questions:

1. Why are we assuming the public API of the components?
2. Why do we have to wait until the program is run to see its errors?

If we define the public API of the components, then the typescript compiler can find these errors before we run the program. In object-oriented programming, interfaces are what we use to "define the public API". Interfaces create the "contract" between objects, such as PHP classes, and the consumers of those objects.

If we are implimenting the component to show the title of a WordPress post, it might look like this, assuming title is a string, not an object, as its returned from the WordPress REST API:

```jsx
const PostTitle = ({ title }) => <h1>{title}</h1>;
```

Just looking at this code, I can see it has a bug and will generate an error when it runs:

```jsx
const post = {
    title : {
        rendered: 'Hello Saturn'
    };
    //...
};
const PostTitle = ({ title }) => <h1>{title}</h1>;
const Post = ({post})=> <div><PostTitle title={post.title} /></div>;
```

I can see this will generate an error, beacuse I can infer how the code is supposed to work by running it. Right now, to get my computer to show that error, I have to run the code, which seems silly, a computer should be able to know how it is supposed to be used.

This is why we have static analysis. Before we compile our JSX to JavaScript or compile any JavaScript from the dialect we are writing in to one that runs in the browser, or our server, we can opt into analyzing the code for likely erros caused by passing the wrong types to functions -- for example the props passed to a React component.

```tsx
const post = {
    title : {
        rendered: 'Hello Saturn'
    };
    //...
};
const PostTitle = (props: { title:string }) => <h1>{title}</h1>;
const Post = (props: {title: {rendered:string}})=> (
    <div>
        <PostTitle title={post.title} />
    </div>
);
```

Now, this is as obviously wrong to the Typescript compiler as it is to me and requires refactoring to:

```tsx
const PostTitle = (props: { title: string }) => <h1>{title}</h1>;
const Post = (props: { title: { rendered: string } }) => (
	<div>
		<PostTitle title={post.title.rendered} />
	</div>
);
```

Now, that I'm not assuming the public API of my components, the compiler and my IDE can tell me in advance if I am using the components correctly or now.

Or maybe this component will take the whole post object, not just the string, and handle getting to the right part of the title object:

```jsx
const PostTitle = ({ title }) => <h1>{title.rendered}</h1>;
```

Or maybe we want the whole post, so we can use it's ID and post type in the markup:

```jsx
const PostTitle = ({ post }) => (
	<h1 className={post.type} id={post.id}>
		{post.title.rendered}
	</h1>
);
```

Most likely I'm going to go through several implimentations before I find something that works. For each change, I need to know that my props are mapped correctly. Instead of rewriting my tests, or writing tests outside of my unique business logic, I'm going to assume that if my components are used correctly, that React will run them correctly.
