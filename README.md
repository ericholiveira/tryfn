Tryfn
=====

Micro framework which wraps try-catch blocks for performance and readability.
It also enables switch/case like syntax when catching errors

Table of contents
========

- [Install](#install)
- [Usage](#usage)
- [Why](#why)
- [Test](#test)
- [License](#license)

Install
========

To install execute:

    npm install tryfn --save

Imagine that you have some code which can fail,usually you do:

```js
var result;
try{
    result = myFunctionWhichCanFail();
}catch(err){}
```

With tryfn all you have to do is:

```js
var Try = require('tryfn');
var result = Try(myFunctionWhichCanFail).value;
```

If you want a default value in case of failure you can do:

```js
var Try = require('tryfn');
var myDefaultValue = 42;
var result = Try(myFunctionWhichCanFail).catch(42);//no need to call .value
```

If you want to run a function in case of failure and use the return as default:

```js
var Try = require('tryfn');
var catcher = function(e){
    console.log(e);
    return 42;
};
var result = Try(myFunctionWhichCanFail).catchFn(catcher);//no need to call .value
```

And for last and not least you can use it to handle multiple errors types as:

```js
var Try = require('tryfn');

var result = Try(myFunctionWhichCanFail)
    .catchCase(SomeErrorType,42)
    .catchCaseFn(OtherErrorType,function(e){
        console.log(e);
        return 43;
    }).catch(44);//default catch (not required you can use .value if you dont want a default catcher
```

Why
===

Because some times you just want to protect your code from some error to occur and the you end with a lot of
`catch(err){}` in your code, or because js dont give programmers any kind of pattern matching when dealing with error
and also because try/catch blocks prevents your function of being optimized so using tryfn MAY give you performance improvement

Test
========

Run test with:

    npm run test

License
========

The MIT License (MIT)

Copyright (c) 2016 Erich Oliveira [ericholiveira.com](http://ericholiveira.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
