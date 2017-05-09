# lcFormValidation
![build status](https://travis-ci.org/Lemoncode/lcFormValidation.svg?branch=master "Build Status")

LcFormValidation is a light **framework-agnostic** JavaScript library that provides easy and flexible form validation and can be used either on client or server side with Node.js.


- Heavily based on JavaScript (no html attributes annotations).
- Full async, all validations are asynchronously processed using native [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise): LcFormValidation already provides a **polyfill** for browsers that do not support promises.

## Why another form library?

Form validation is very common issue, usually we find solutions that cover the basic scenarios and are focused on building RAD development just by adding some attributes / annotations to given fields or HTML fields (e.g. input), the disadvantage that we have found to this approach:

- Validations are tightly coupled to e.g. directives or markup is not easy to reuse this validation code in e.g. server side (universal javascript).

- There are different approaches for each scenario: sometimes you have to add some tweaking for async validations, some other take care of special scenarios (like validations that depends on more than one field).

- Usually you can easily unit test one validation (directive / annotation), but testing the whole form is a complex task (directives are coupled to e.g. HTML).


## Download

### Direct download

| Source type       | Version          | Size  | Link |
| :-------------: |:-------------: | :-----:|  :-----:|
| Production version    | v1.0.0 | **21,3KB** _minified and packed_ | [Download](http://unpkg.com/lc-form-validation@latest/dist/lc-form-validation.min.js)
| Development version   | v1.0.0 | **71KB** _full source_ | [Download](http://unpkg.com/lc-form-validation@latest/dist/lc-form-validation.js)

### Using npm

```
npm install --save lc-form-validation
```

## Documentation

You can see the full documentation in the [github.io page](http://lemoncode.github.io/lcFormValidation/).

## License
[MIT](./LICENSE)

# About Lemoncode
We are a team of long-term experienced freelance developers, established as a group in 2010. We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.
