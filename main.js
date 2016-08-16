// utility for logging
if(!log)
    var log = function(){ console.log([].slice.call(arguments)) }

var FILL_ME_IN

// predefined variables
var whatIsThis = function(a, b) {
    return [this, a, b].join(',')
}

var inAnObject = {
    name: 'inAnObject',
    test1: whatIsThis,
    anotherObject: {
        name: 'anotherObject',
        test2: whatIsThis
    }
}

var inAFunction = function(a, b) {
    this.name = 'Sally'
    whatIsThis(a, b)
}

inAFunction.prototype.test3 = whatIsThis

var trickyTricky = {
    name: 'trickyTricky',
    why: 'does this work?',
    what: 'is going on here?'
}

var confusing = {
    name: 'confusing',
    state: 'Alaska',
    city: 'Anchorage'
}

/**
 * THE PROBLEMS
 */

console.assert(whatIsThis('hello', 'world') === "[object Window],hello,world")
// We are calling the whatIsThis function with two arguments.
// The function whatIsThis returns this, a, and b as a string.
// "This" is the browser window, since the function is defined globally.

console.assert(window.whatIsThis('hello', 'world') === "[object Window],hello,world")
// We are calling the whatIsThis function with two arguments.
// The function whatIsThis returns this, a, and b as a string.
// Window is the context for the whatIsThis function.

console.assert(inAnObject.test1('face', 'book') === "[object Object],face,book")
// inAnObject.test1 represents the WhatIsThis function.
// The WhatIsThis function again gives us a string containing "This" and the arguments.
// "This" represents inAnObject.

console.assert(inAnObject.anotherObject.test1('twitter', 'book') === "Uncaught TypeError")
// This results in an error because test1 is not a property inside of anotherObject.

console.assert(inAnObject.anotherObject.test2('twitter', 'book') === "[object Object],twitter,book")
// inAnObject.anotherObject.test represents the WhatIsThis function.
// The WhatIsThis function again gives us a string containing "This" and the arguments.
// "This" represents inAnObject.

console.assert(whatIsThis.call() === "[object Window],,")
// The call method is calling the whatIsThis function with no arguments.
// This represents the Window.

console.assert(whatIsThis.call(trickyTricky) === "[object Object],,")
// The call method is calling the whatIsThis function with no arguments and within the context of trickyTricky.
// "This" represents the object trickyTricky.

console.assert(whatIsThis.call(trickyTricky, 'nice', 'job') === "[object, Object],nice,job")
// The call method is calling the whatIsThis function with two arguments and within the context of trickyTricky.
// "This" represents the object trickyTricky and therefore lists out the keys and values of that object.

console.assert(whatIsThis.call(confusing) === "[object Object],,")
// The call method is calling the whatIsThis function with no arguments and within the context of confusing.
// "This" represents the object confusing.

console.assert(whatIsThis.call(confusing, 'hello') === "[object Object],hello,")
// The call method is calling the whatIsThis function with one argument and within the context of confusing.
// "This" represents the object confusing and therefore lists out the keys and values of that object.

console.assert(whatIsThis.apply(trickyTricky) === "[object Object],,")
// The apply method is calling the whatIsThis function with no arguments and within the context of trickyTricky.
// "This" represents the object trickyTricky.

console.assert(whatIsThis.apply(confusing, ['nice', 'job']) === "[object, Object],nice,job")
// Once you've figured out what the output is, answer here in a comment: Why is this so?

console.assert(whatIsThis.apply(confusing, 'nice', 'job') === "Uncaught TypeError")
// This returns an error because you need an array when using the apply method.

console.assert(inAFunction('what will', 'happen?') === undefined)
// This returns undefined because it uses "what will" as the context for the inAFunction function.

try{
    console.assert(inAFunction.test3('A', 'B') === "Uncaught TypeError")
} catch(e){
    log(e)
}
// Since Test 3 represents a function, and inAFunction is also a function, this results in an error.
// You cannot use a function as a method/two functions one after the other.

var newObject = new inAFunction('what will', 'happen?')
console.assert(newObject.name === "Sally")
// Since newObject represents inAFunction, .name is Sally.

var newObject2 = new inAFunction('what will', 'happen?')
console.assert(newObject2.test3('C', 'D') === '[object, Object],C,D')
// Once you've figured out what the output is, answer here in a comment: Why is this so?

console.assert(inAnObject.test1.call(trickyTricky, 'face', 'book') === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?

console.assert(inAnObject.anotherObject.test2.apply(confusing, ['foo', 'bar']) === FILL_ME_IN)
// Once you've figured out what the output is, answer here in a comment: Why is this so?
