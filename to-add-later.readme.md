## Quick start

### Defining validation constraints
```js
import { createFormValidation, Validators } from 'lc-form-validation';

const customerFormValidationConstraints = {
  fields: {
    firstName: [
      // Mandatory field
      { validator: Validators.required },
    ],
    lastName: [
      // Mandatory field
      { validator: Validators.required }
    ]
  }
};
```

Create a form validation instance

```js
const customerFormValidation = createFormValidation(customerFormValidationConstraints);
```

### Validating the entire form

```js
const viewModel = { login: 'jdoe@example.com', password: 'jdoe3981' };
customerFormValidation
  .validateForm(viewModel)
  .then((validationResult) => {
    console.log(validationResult.success); // true
    console.log(validationResult.formGlobalErrors); // []
    console.log(validationResult.fieldErrors);
    /*[
        { succeeded: true, type: "REQUIRED", key: "firstName", errorMessage: "" },
        { succeeded: true, type: "REQUIRED", key: "lastName", errorMessage: "" }
      ]*/
  })
  .catch((error) => {
    // handle unexpected errors
  });
```

### Validate a single field

```js

// Successful validation
customerFormValidation
  .validateField(null, 'firstName', 'John')
  .then((validationResult) => {
    console.log(validationResult.succeeded); // true
    console.log(validationResult.type); // "REQUIRED"
    console.log(validationResult.key); // "firstName"
    console.log(validationResult.errorMessage); // ""
  })
  .catch((error) => {
    // handle unexpected errors
  });

// Unsuccessful validation
customerFormValidation
  .validateField(null, 'lastName', '')
  .then((validationResult) => {
    console.log(validationResult.succeeded); // false
    console.log(validationResult.type); // "REQUIRED"
    console.log(validationResult.key); // "lastName"
    console.log(validationResult.errorMessage);
    // "Please, fill in this mandatory field."
  })
  .catch((error) => {
    // handle unexpected errors
  });
```

### Trigger certain validations in each constraint:

Add `eventsFilter` with on or more events:
```js
import {
  createFormValidation,
  Validators,
  FieldValidationResult
} from 'lc-form-validation';

const loginFormValidationConstraints = {
  fields: {
    login: [
      // Mandatory field
      { validator: Validators.required },
      // It has to be a valid email address
      {
        validator: Validators.email
        eventsFilter: { onBlur: true }, // <-- apply a filter
      }
    ]
  }
};
const loginFormValidation = createFormValidation(loginValidationConstraints);
```

Trigger field validation:
```js
loginFormValidation
  .validateField(null, 'login', 'jdoe', { onBlur: true })
  .then((validationResult) => {
    console.log(validationResult.succeeded); // false
    console.log(validationResult.type); // "EMAIL"
    console.log(validationResult.key); // "login"
    console.log(validationResult.errorMessage);
    // 'Please enter a valid email address.'
  })
  .catch((error) => {
    // handle unexpected errors
  });
```
> Not passing `eventsFilter` as third parameter results in `{ onChange: true }` by default.

### Passing extra arguments

You can pass custom parameters that will be injected into the validator using the `customParams` property:

```js
const loginFormValidationConstraints = {
  fields: {
    login: [
      // Mandatory field
      { validator: Validators.required },
      // It has to be a valid email address
      { validator: Validators.email },
      {
        validator: Validators.pattern,
        customParams: {
          // login must belong to "lemoncode.net" domain
          pattern: /\@lemoncode.net$/
        }
      }
    ]
  }
};
```

### Custom validators

#### Field validator

A field validator must return a `FieldValidationResult`. You can pass the entire `viewModel` if you need to validate a field based on other fields:

```js
function allowLowerCaseOnly(value, viewModel, customParams) {
  const isValid = value.toLowerCase() === value;
  const errorMessage = 'Field must be lowercase.';
  const validationResult = new FieldValidationResult();
  validationResult.succeeded = isValid;
  validationResult.errorMessage = isValid ? '' : errorMessage;
  validationResult.type = 'LOWER_CASE';

  return validationResult;
}
```

Apply inside your constraints:

```js
const signupValidationConstraints = {
  fields: {
    username: [
      { validator: allowLowerCaseOnly }
    ]
  }
};
```

#### Global form validator

A global validator will accept the entire viewModel and return a `FieldValidationResult`. Put your global validators inside `global` property of your validation constraints. It is useful, e.g., for validating dynamic properties:

```js
function validateQuestions(questions) {
  // All questions must be answered.
  return questions.every((question) => question.answer.trim().length > 0);
}

function questionsValidator(viewModel) {
  const isValid = validateQuestions(viewModel.questions);
  const errorMessage = 'You must answer all questions.';
  const validationResult = new FieldValidationResult();

  validationResult.succeeded = isValid;
  validationResult.errorMessage = isValid ? '' : errorMessage;
  validationResult.type = '';

  return validationResult;
}

const testFormValidationConstraints = {
  global: [questionsValidator]
};

const testFormValidation = createFormValidation(testFormValidationConstraints);

const viewModel = {
  questions: [
    {
      id: 29,
      title: 'What method does merge two or more objects?',
      anwser: 'Object.assign'
    },
    {
      id: 14, title: 'What character do you need to do string interpolation?',
      anwser: 'Backticks'
    },
    {
      id: 42,
      title: 'How to solve 0.1 + 0.2 === 0.3?',
      anwser: '+(0.1 + 0.2).toFixed(1)'
    },
    {
      id: 85,
      title: 'What month will new Date("2017", "04", "19").getMonth() produce?',
      anwser: 'May'
    },
  ]
};

testFormValidation
  .validateForm(viewModel)
  .then((validationResult) => {
    console.log(validationResult.succeeded); // true
    console.log(validationResult.formGlobalErrors) // []
    console.log(validationResult.fieldErrors); //  []
  })
  .catch((error) => {
    // handle unexpected errors
  });
```



## Examples

### React examples

#### Simple form ([ES6](./samples/react/es6/00%20SimpleForm), [TypeScript](./samples/react/typescript/00%20SimpleForm))

A simple form with fullname and password fields. Applied validations:

- Both fullname and password fields are mandatory (required validator + custom validator).

#### Signup form ([ES6](./samples/react/es6/01%20SignupForm), [TypeScript](./samples/react/typescript/01%20SignupForm))

A sign up form with username, password and confirm password fields with the next validation constraints:

- username is mandatory and has to not exist on GitHub (required validator + custom validator).
- password is mandatory and has to be minimum 4 characters length (minLength validator).
- confirm password is mandatory and has to be the same value as password field (custom validator).

#### Quiz form ([ES6](./samples/react/es6/02%20QuizForm), [TypeScript](./samples/react/typescript/02%20QuizForm))

A simple quiz with three options where there has to be at least one checked option to pass the validation (custom global validation).

### jQuery examples

#### Shopping form ([ES6](./samples/jquery/00%20ShoppingForm))

A little shopping form where the user has to select a product with a version and optionally apply a discount code and enter its NIF. Validations applied:

- The brand and product fields are mandatory (required validator).
- The discount code is optional but needs to have a valid format if fulfilled (pattern validator).
- NIF field is mandatory with a valid format (required validator + custom validator
