# localStorage-cache-api

Use LocalStorage as Cache when read an external service or API

## Installation

Install package with NPM

`npm install --save localstorage-cache-api`

## Basic Usage

```javascript
import LocalStorageCacheApi from 'localstorage-cache-api';

const LS = new LocalStorageCacheApi({
  api: 'http://www.example.com/service',
  key: 'mykey'
});

LS.getData().then((response) => {
  // your code goes here
});
```
## Options

| Option | Type | Description |
| - | - | - |
| `api` | String | (Required) Url |
| `key` | String | (Required) Key to store |
| `expiration` | Integer | Expiration time (in miliseconds) if is necesary |
| `callback` | Function | Callback to run before save the data in localStorage |

## Recipes

```javascript
import LocalStorageCacheApi from 'localstorage-cache-api';

const LS = new LocalStorageCacheApi({
  api: 'http://www.example.com/service',
  key: 'mykey',
  expiration: 60 * 60 * 1000,
  callback: function(value) {
      return `new value is ${value}`;
  }
});

LS.getData().then((response) => {
  // your code goes here
});
```

```javascript
import LocalStorageCacheApi from 'localstorage-cache-api';

const LS = new LocalStorageCacheApi({
  api: 'http://www.example.com/service',
  key: 'mykey',
  expiration: 60 * 60 * 1000
});

LS.getData().then((response) => {
  // your code goes here
});
```
