# Content Hub External Components Starter

This is a starter project intended to help in the development of external components for Content Hub. It supports creating react components and testing them within storybook (including mocking HTTP calls - see `/src/modules/ClientExample`).

The project is also configured to allow use of tailwind in css modules.

## Develop

The `src` directory contains the following directories:
| Directory | Usage |
|------------|----------------------------------------|
| components | Pure react components |
| lib | Non-react component files |
| modules | Content Hub external component modules |

Components can be hosted during development by running:

```
npm run serve
```

This will host the modules, by default at `http://localhost:8080`.

You can also develop using storybook (see below).

### Modules

Creating an External Component (module) can be as simple as creating a sub-directory of `modules` with an `index.tsx` file with the following contents:

```typescript
import createModule from "../../lib/createModule";
export default createModule(() => <p>Hello World!</p>);
```

The `createModule` function takes a callback that takes an `IModuleProps` object, and returns a `ReactNode`. For example:

```typescript
import { IModuleProps } from "../../lib/types";
import createModule from "../../lib/createModule";

export default createModule(SimpleModule);
const  SimpleModule = ({ user, createClient }: IModuleProps) => {
  return <div>Username: {user.userName}</div>;
}
```

This pattern is implemented in `/src/modules/ContextExample`.

### Components

The `components` folder is used to hold react components for use in modules.

## Test

Storybook can be used to develop and test components and modules without needing a Content Hub instance. See the examples for this usage.

Run storybook by calling

```
npm run storybook
```

## Deploy

To build the modules, run

```
npm run build
```

This will populate the `dist` directory, which can now be deployed.

Alternatively run:

```
npm run build:portal
```

Which will build the modules with all their dependencies in one files, so that they can be uploaded as portal assets.
