# AngularAddAuthTokenNgrx

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.3.

## Overview

This project demonstrates how to add authentication tokens to all of HTTP requests when the token is stored in an NGRX store.

## Getting Started

Let’s clone the repo and fire up the app so we can see it in action. Open up a terminal and enter the following commands: 

```
wasi$ git clone https://github.com/webappsolution/angular-add-auth-token-ngrx.git
wasi$ git checkout feature/step-2-auth-routing-guard
wasi$ npm i
wasi$ npm run dev-auth
```

The last command will concurrently start both the server and client — the server uses json-server to quickly scaffold an in-memory JSON database, while the client is the Angular app running via Angular CLI. 

Developers can also choose to run the client and sever in 2 separate terminals in case you like reading the console a bit easier:

```
wasi$ npm run client
wasi$ npm run server-auth
```

Navigate to `http://localhost:4300/`. The app will automatically reload if you change any of the source files.

## Development server

You can also run the client and back-end servers individually.

* Run `npm run client` for a client dev server. 
    * `http://localhost:4300/`
* Run `npm run server` for a backend in-memory JSON database.
    * `http://localhost:4301/`
* Run `npm run dev` to start both the client and server concurrently.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
