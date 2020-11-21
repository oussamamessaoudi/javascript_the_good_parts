# JavaScript the good parts
Book written by Douglas Crockford about [ECMAScript 3](https://www.w3schools.com/js/js_versions.asp).
## CHAPTER 1: Good Parts
JavaScript is a language with more than its share of bad parts. 
It went from non-existence to global adoption in an alarmingly short period.
### Why JavaScript?
JavaScript is the language of the web browser
### Analyzing JavaScript
JavaScript is build in on some very good ideas and bas ones.<br/>
#### The very good ideas include: 
```
Functions
loose typing
dynamic objects
expressive object literal notation
```
#### the bad ideas:
```
Based on global variables
```

## CHAPTER 2: Grammar
### Whitespace
Whitespace is **USUALLY** insignificant
#### Comments 
```
/* 
    comments
    multi
    line
*/
// comment one line
```
#### Names
- Name is a letter followed by one or more letters, digits, under-bars.
- A name cannot be one of reserved word(not including undefined, NaN, Infinity).
- We use Names for statements, variables, parameters, property names, operators and labels.
####  Numbers 
- JavaScript has a **single** number type internally is a **64bits floating-point**.
- NaN is a number value that is the result of an operation that cannot produce a result.
- NaN is not equal to NaN use **isNan()** instead.
- Infinity presents all values that is great of MAX
- === or == works
> Examples: 1, 1.0, 0.1, 1e-10, .4
#### Strings 
- Strings can be wrapped in single or double quotes
- built in using 16bits Unicode
- No Character element make a String of one Char
- \ escaped character, **\u[4hexadecimal digits]**
- length property 
- String are immutable
- === or == works
#### Statements
- executed from top to bottom.
- conditional if else, switch.
- looping for, for in, while, do while.
- disruptive statement break, return, throw
- function invocation
- block **do not** create new Scope (function scope).
- switch case, while, for allowed to have a label.
- falsy values: false, null, undefined, "", 0, NaN
- throw, try catch
#### Expressions
- literals
- invocation expression **new**
- refinement expression **delete**
- expression wrapped in parentheses
- expression preceded by a prefix(typeof, +, -, !)
- infix operator(*, /, %, +, -, >=, <=, >, <, , ===, !==, &&, ||)
- invocation func(expression,)
- refinement (.name, [name])
 ## CHAPTER 3: Objects
 - numbers, strings, booleans, null, and undefined are simple types(object-like) & immutable.
 - Objects are container of proprieties.
 - Property compose of name(any string) & value(not undefined).
 - if the name is not legal use quotes
 - Objects in JavaScript are class-free.
 - JavaScript includes a prototype linkage feature that allows one objects to inherit.
 ### Retrieval
 - wrapping string expression in [ ].
 - using the dot notation.
 - undefined when if an attempt to access a non-existence value (use || for default).
 - undefined is throwing TypeError if it attempts to access it.
### Update
- Can be updated by assignment.
### Reference
- Objects passed around by reference.
### Prototype
- Every object linked to a prototype object (inheritance).
- All Objects literal linked to **Object.prototype**
#### Create an object that inherits from another object 
```javascript
if(typeof Object.create !== 'function'){
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    }
}
var another_stooge = Object.create(stooge);
```
- Prototype link has no effect on updating.
- Used only for retrieval (called delegation)
- Prototype relation is a dynamic relationship.
### Reflection
- To examine the existence of a property we can use typeof, hasOwnProperty(method).
### Enumeration
- for in can loop over all the property of an object.
- no order of the names of the properties.
### Delete
- Delete Operator can be used to remove a property from an object.
- It will not touch any value in the prototype.
### Global Abatement
- The Global var weaken the resiliency of the application.
- to optimize use a single var 
```javascript
var MY_APP = {};
MY_APP.stooge = {};
//...
```



 
 
