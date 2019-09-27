# React Typescript Boilerplate

![React](https://cdn-images-1.medium.com/max/2000/1*wHF1g-nla64YMTAkCGc0Mg.jpeg "React")

[![dependencies Status](https://david-dm.org/devianllert/ts-react-boilerplate/status.svg)](https://david-dm.org/devianllert/ts-react-boilerplate) [![devDependencies Status](https://david-dm.org/devianllert/ts-react-boilerplate/dev-status.svg)](https://david-dm.org/devianllert/ts-react-boilerplate?type=dev) [![issue Status](https://img.shields.io/github/issues/devianllert/ts-react-boilerplate.svg)](https://github.com/devianllert/ts-react-boilerplate/issues) [![stars Status](https://img.shields.io/github/stars/devianllert/ts-react-boilerplate.svg)](https://github.com/devianllert/ts-react-boilerplate/stargazers)

## Quick start

1. Clone this repo using ```git clone https://github.com/devianllert/ts-react-boilerplate.git```
2. Move to the appropriate directory: ```cd ts-react-boilerplate```.
3. Run ```npm install``` to install dependencies.
4. Run npm start to see the example app at ```http://localhost:3000```.

## Documentation

### Folder Structure

```
├── internals
│   ├── config                // webpack config
│   └── scripts               // npm scripts
├── public                    // static files
│   ├── locales               // translations
│   └── index.html            // template, needed for webpack
└── src                       // main app code
    ├── @types                // folder for global types
    ├── components            // shared components
    │   ├── Button
    │   │   ├── __tests__     // tests for button component
    ├── containers            // An encapsulated pieces of domain logic in your application
    │   ├── ...               // new modules will be added on this directory level
    ├── design                // design system
    ├── hooks                 // react hooks
    ├── layout                // layout components
    ├── services              // services 
    ├── utils                 // shared code, utility functions
    ├── app.tsx               // entry point for application
    ├── configureStore.ts     // configuration for store
    ├── reducers.ts           // global reducers
    └── serviceWorker.ts      // service worker
```

#### What is a module?

A module/container is an encapsulated piece of domain logic in your application, this could be for example:

##### Use-cases for a module

**Dynamic page**: consists of a lot of view logic, at least one route and state-management

**Static page**: has no state-management but a route.

**Domain logic with shared view components**: e.g. authentication state, actions, reducers plus login/signup forms but no routes

**Domain logic**: just plain logic with state-management but no routes and no components

A module usually has routing information, state management or both.

#### What is a services?

A service is typically a class with a narrow, well-defined purpose. It should do something specific and do it well.

A component can delegate certain tasks to services, such as fetching data from the server, validating user input, or logging directly to the console.

Services can depend on other services.

### CLI Commands

#### Development

```bash
npm run start
```

Starts the development server running on ```http://localhost:3000```

#### Building

```bash
npm run build
```

Preps your app for deployment (does not run tests). Optimizes and minifies all files, piping them to the dist folder.

You can upload the contents of dist to your web server to see your work live.

#### Testing

```bash
npm run test
```

Tests your application in watch mode with the unit tests specified in the ```**/__tests__/**/*.{js,jsx,ts,tsx}``` or ```**/*.{spec,test}.{js,jsx,ts,tsx}``` files throughout the application.

#### Linting

```bash
npm run lint
```

Lints your JavaScript and your CSS.

```bash
npm run lint:fix
```

Lints your code and tries to fix any errors it finds.

# Reference resources

- [Angular](https://github.com/angular/angular)
- [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate)
- [Vuesion](https://github.com/vuesion/vuesion)

## License

This project is licensed under the MIT license, Copyright (c) 2019 Ruslan Povolockii.
For more information see `LICENSE.md`.