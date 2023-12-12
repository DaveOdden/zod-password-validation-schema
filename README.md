# Zod Password Validation Schema

An opinionated, reusable, and adaptable Zod schema that can be used to validate password form fields in the most popular form libraries. See usage notes below for implementation specifics for React Hook Form, Mantine Form, Formik, and React Final Form.

NPM Install:

```bash
npm install zod-password-validation-schema
```

Yarn Install:

```bash
yarn add zod-password-validation-schema
```

## Schema Details

- [x] Requires two form fields named `password` and `confirmPassword`
- [x] Password has a min length of 6 characters
- [x] Password has at least 1 uppercase character
- [x] Password has at least 1 lowercase character
- [x] Password has at least 1 number
- [x] Password has at least 1 special character (`!@#$%^&*()_-+={[}]|:;"'<,>.`)

## Usage

- [React Hook Form](#react-hook-form)
- [Mantine Form](#mantine)
- [Formik](#formik)
- [React Final Form](#react-final-form)

### Universal Requirement

Once installed via npm or yarn, import dependency into your component

```bash
import { customZodSchema } from "zod-password-validation-schema"
```

### React Hook Form

Install react-hook-form (if not already) along side the react-hook-form zod resolver

```bash
yarn add react-hook-form @hookform/resolvers/zod
```

Import these dependencies in the same component you imported the schema

```bash
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
```

Supply the schema to react-hook-form's useForm hook, including default values

```bash
const { control, handleSubmit } = useForm({
  defaultValues: {
    password: "",
    confirmPassword: "",
  },
  resolver: zodResolver(customZodSchema),
})
```

React-hook-form requires a `control={control}` prop to be added to your form fields

```bash
<PasswordInput
  name="confirmPassword"
  label="Confirm password"
  control={control}
/>
```

### Mantine

Install Mantine form (if not already) along side the Mantine form zod resolver

```bash
yarn add @mantine/form mantine-form-zod-resolver
```

Import these dependencies in the same component you imported the schema

```bash
import { useForm } from "@mantine/form"
import { zodResolver } from "mantine-form-zod-resolver"
```

Supply the schema to Mantine's useForm hook, including initial values

```bash
const form = useForm<z.infer<typeof customZodSchema>>({
  initialValues: {
    password: "",
    confirmPassword: "",
  },
  validate: zodResolver(customZodSchema),
})
```

Mantine form requires a the field's input props to be spread on the input

```bash
<PasswordInput
  label="Password"
  {...form.getInputProps("password")}
/>
```

### Formik

Install Formik (if not already) along side the Formik form zod adapter

```bash
yarn add formik zod-formik-adapter
```

Import these dependencies in the same component you imported the schema

```bash
import { Formik, Form } from "formik"
import { toFormikValidate } from "zod-formik-adapter"
```

Supply the schema to Formik's validate prop. including initial values prop as well.

```bash
<Formik
  initialValues={{
    password: "",
    confirmPassword: "",
  }}
  validateOnChange={true}
  validate={toFormikValidate(customZodSchema)}
  onSubmit={submitForm}
>
  {({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  }) => (
    [...form fields]
  )}
</Formik>
```

Formik passes down data to form elements

```bash
<PasswordInput
  label="Password"
  onChange={handleChange("password")}
  onBlur={handleBlur}
  value={values.password}
  name="password"
/>
```

### React Final Form

Install React Final Form (if not already)

```bash
yarn add react-final-form
```

Import these dependencies in the same component you imported the schema

```bash
import { Form, Field } from "react-final-form"
```

Create a generic handler

```bash
const formValidator = <T extends z.ZodType<any, any>>(schema: T) =>
  (values: any) => {
    try {
      schema.parse(values)
      return {}
    } catch (err) {
      return (err as z.ZodError).formErrors.fieldErrors
    }
  }
```

Supply the schema to our generic handler within the validate prop. including initial values prop as well.

```bash
<Form
  onSubmit={submitForm}
  validate={formValidator(customZodSchema)}
  render={() => (
  )}>
  [...form fields]
</Form>
```

Within the render prop of React Final Form's `<Form>` element, add your inputs inside their `<Field>` component.

```bash
<Field name="password">
  {({ input, meta }) => (
    <PasswordInput
      label="Password"
      error={meta.touched && meta.error ? meta.error[0] : null}
      {...input}
    />
  )}
</Field>
```
