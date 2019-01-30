# localStorage-cache-api

Use LocalStorage as Cache when read an external service or API

## Installation

Install package with NPM

`npm install --save localstorage-cache-api`

## Basic Usage

```javascript
import LocalStorageCacheApi from 'localstorage-cache-api';

const LS = new LocalStorageCacheApi({
  url: 'http://www.example.com/service',
  key: 'myLocalStoragekey'
});

LS.getData().then((response) => {
  // your code goes here
});
```
## Configuration

### Options

| Option | Type | Description |
| - | - | - |
| `url` | String | (Required) Url |
| `key` | String | (Required) Key to use in the LocalStore |
| `expiration` | Integer | Expiration time (in miliseconds) if is necesary |
| `callback` | Function | Callback to run before save the data in localStorage |

### Headers

LocalStorageApi use the [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), so you can modify the headers through a second parameter in the constructor.

## Recipes

### Adding a callback to modify the response before save it to LocalStorage

```javascript
import LocalStorageCacheApi from 'localstorage-cache-api';

const LS = new LocalStorageCacheApi({
  url: 'http://www.example.com/service',
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

### Adding an expiration time

```javascript
import LocalStorageCacheApi from 'localstorage-cache-api';

const LS = new LocalStorageCacheApi({
  url: 'http://www.example.com/service',
  key: 'mykey',
  expiration: 60 * 60 * 1000
});

LS.getData().then((response) => {
  // your code goes here
});
```

### Adding a header to the Fetch API


```javascript
import LocalStorageCacheApi from 'localstorage-cache-api';

const LS = new LocalStorageCacheApi({
  url: 'http://www.example.com/service',
  key: 'mykey'
}, {
  mode: 'cors'
});

LS.getData().then((response) => {
  // your code goes here
});
```


## Disclaimers