---
title: "Testing WordPress Blocks"
metaTitle: "Testing WordPress Blocks"
metaDescription: "desc"
---

The previous section of this site introduced testing for React apps. WordPress' block editor is a React app. In general, we use the same tools to test, compile and lint blocks as any other React code -- Jest, Babel, webpack, etc.

Setting up all of that in a WordPress project, historically was a pain. The new [`@wordpress/scripts`](https://developer.wordpress.org/block-editor/packages/packages-scripts/) abstracts away the complexity of using these tools with WordPress.

Remember, everything you know about React testing applies to testing blocks.

> [Example Code Part Two](https://github.com/Shelob9/testing-react-wordpress)
