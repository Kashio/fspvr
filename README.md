# fspvr - Cross-Platform filesystem path validator and reformer

[![Build status](https://travis-ci.org/Kashio/fspvr.svg?branch=master)](https://travis-ci.org/Kashio/fspvr)
[![Dependency Status](https://david-dm.org/Kashio/fspvr.svg)](https://david-dm.org/Kashio/fspvr)

fspvr is a cross-platform filesystem validator and reformer which gets rid of illegal
trailing or in-between characters and preserved words.

## Table of contents

- [Reformat](#reformat)
- [Validate](#validate)

---

## Reformat

```js
var fspvr = require('fspvr');
var reformatedPath = fspvr.reformatPath('C:\\Windows?\\<System32>\\ntdll.dll', true);
console.log(reformatedPath); // C:\Windows\System32\ntdll.dll
```

The second parameter is optional and defaults to true.<br/>
Its responisible for `strict` reformation, meaning it will remove illegal trailing characters or preserved words.

Optinally, you can reformat only a segment in a path
```js
var fspvr = require('fspvr');
var reformatedSegment = fspvr.reformatSegment('Windows?', true);
console.log(reformatedPath); // Windows
```

The second parameter is for `strict` reformation as described above.

## Validate

```js
var fspvr = require('fspvr');
var isValidPath = fspvr.validatePath('C:\\Windows?\\<System32>\\ntdll.dll', true);
console.log(isValidPath); // false
```

The second parameter is optional and defaults to true.<br/>
Its responisible for `strict` validation, meaning it will validates againts illegal characters as-well as to illegal trailing characters or preserved words.

Optinally, you can validate only a segment in a path
```js
var fspvr = require('fspvr');
var isValidPath = fspvr.validateSegment('Windows', true);
console.log(isValidPath); // true
```

The second parameter is for `strict` validation as described above.

## Tests
To run tests type the following in your shell<br/>
`npm run test`

## License

fspvr is licensed under the [GPL V3 License](https://raw.githubusercontent.com/Kashio/fspvr/master/LICENSE).