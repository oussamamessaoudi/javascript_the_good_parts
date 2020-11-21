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