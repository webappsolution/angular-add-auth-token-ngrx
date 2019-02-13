# AngularAddAuthTokenNgrx

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.3.

## Overview

This project demonstrates the following:
 
* NGRX project structure.
* JWT based authentication with NodeJs back-end.
* Using NGRX store selectors in an HTTP request interceptor to automatically add the auth token to request headers.
* Using secure, protected NodeJs API endpoints that require a valid JWT.
* Protected Angular routes using Route Guards that determine if the user is authenticated via NGRX selectors.
* Running the application locally in a Docker stack. 

## Getting Started

Let’s clone the repo and fire up the app so we can see it in action:

```
wasi$ git clone https://github.com/webappsolution/angular-add-auth-token-ngrx.git
wasi$ git checkout feature/step-3-dockerize
```

### Without Docker

Open up 2 terminals (or 1 new one and use the one we used for Git checkout): 

**Terminal 1**

```
wasi$ cd client
wasi$ npm i
wasi$ npm run dev
```

**Terminal 2**

```
wasi$ cd server
wasi$ npm i
wasi$ npm run server-auth
```

Navigate to `http://localhost:4300/`. The app will automatically reload if you change any of the source files.

### WIP: With Docker

**NOTE**: This assumes you have Docker installed locally.

Open up a terminal and enter the following commands: 

```
wasi$ git clone https://github.com/webappsolution/angular-add-auth-token-ngrx.git
wasi$ git checkout feature/step-3-dockerize
wasi$ cd docker
wasi$ docker stack deploy -c ./local.yml blog
```

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
