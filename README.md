## Javascript client for Keboola Management API

[![Build Status](https://travis-ci.org/keboola/manage-api-js-client.svg?branch=master)](https://travis-ci.com/keboola/manage-api-js-client)
[![Maintainability](https://api.codeclimate.com/v1/badges/9f01593c5e780c783618/maintainability)](https://codeclimate.com/github/keboola/manage-api-js-client/maintainability)

Javascript client for Keboola Connection Management API. 

### Installation

1. Install npm package: `yarn add @keboola/manage-api-js-client`


### Usage

You can use ES6 imports (`import Manage from '@keboola/manage-api-js-client';`) or require (`const Manage = require('@keboola/manage-api-js-client').default;`).

```javascript
const Manage = require('@keboola/manage-api-js-client').default;
const manage = new Manage('https://connection.keboola.com', 'TOKEN');


```


### Tests and development

You need to set some env variables for the tests:
- `KBC_URL`
- `KBC_TOKEN` - a *master* token
- `KBC_COMPONENT` - name of some component used for Components Configurations API tests
Tests can be run using `yarn test`.

The repository requires conforming to a set of coding standards based on [AirBnB code standard](https://github.com/airbnb/javascript). You can run the check using `yarn lint`.

### Deployment

Deployment to NPM compiles the code from `src` directory to `dist` directory.
