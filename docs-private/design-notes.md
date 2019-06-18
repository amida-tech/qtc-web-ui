## Why is .env.example.env named this way? (ARH 2018-07-25) 

It starts with .env so it alphabetically sorts next to the others, and it ends in .env to make syntax highlighting work.

## The reason we're using `babel-eslint`: (ARH 2018-07-25) 

We want to use class properties, particularly because, per https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56 , the following pattern is the best for auto-binding your class member functions to this:

```
class SomeComponent extends React.Component {
  handleSubmitOrSomething = () => { /* stuff */ }
}
```

However, when you do this, eslint throws: `{LINE_NUMBER}  error  Parsing error: Unexpected token =`.

To fix this, babel and eslint documentation says to use `babel-eslint` AND `eslint-plugin-babel` with the `babel/semi` rule set appropriately. However, all I needed to do to get this problem to go away was
- In `.babelrc`, add `["transform-class-properties", { "spec": true }]` to the plugins list.
- In `.eslintrc.json` set `"parser": "babel-eslint"`.

## Jest / Tests

Name test files like this: `ORIGINAL_FILE_NAME.test.js`

The npm script `test` is not currently setup to enable watch mode because of this bug: https://github.com/facebook/jest/issues/2441

## Why is the `docs-private` directory named such, instead of just `docs`?

GitHub pages (which, obviously, is public) is designed to work with the `docs` directory. So this documentation is not under `docs` so that we still have the option of enabling GitHub pages on this repo in the future if we want.
