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
## Chapter 4: Functions
- The best thing about JavaScript is the implementation of functions.
- used for code reuse, information hiding, composition Functions.
### Function Objects
- JavaScript are objects
- Function object are linked by a prototype to Function.prototype which is linked to Object.prototype.
- Every function created with the context and the code.
- Every function contains a constructor function in the prototype.
### Function Literal
- Function has a name is not is called anonymous.
- a function has access to parameters and variables
- inner function has access to the outer context called **closure**
### Invocation
- Invoking a function suspends the execution of the current function.
- every function has two additional params: **this**, **arguments**
- **this** is determined by the *invocation pattern*.
#### The method Invocation Pattern 
A function is stored as a property of an object it's called a *method*.
- **this** is bound to that object.
- this binding of this to the object happens at invocation time (late or lazy).
#### The function Invocation Pattern
function is invoked without being the property of an object.
- **this** is bound to the global var.
- even for inner function the **this** is bounded to the global var, use **that**.
```javascript
myObject.double = function(){
    var that = this;
    var helper = function() {
        that.value = add(that.value, that.value);
    }
    helper();
}
myObject.double();
```
#### The Constructor Invocation Pattern
- Javascript is *prototypal* inheritance language. 
- Objects can inherit properties directly from other objects.
- The language is class-free.
- the function is invoked the *new* prefix.
- *this* is bounded to the created object.
- Functions that are intended to be called with *new* are called **constructor**.
- Convention is PascalNotation (Uppercase)
#### The Apply Invocation Pattern
- Functions can have methods
- apply(newThis, args)
### Arguments
- Access to all the args that were supplied with the invocation, including excess args.
- So we can create a function that take an unspecified number of parameters.
- arguments is not really an array, it's an array-like object.
- arguments has a length property but lacks all the array methods.
### Return
- We use return to return a value or return early.
- A function returns always a value (if not undefined is returned).
- func invoked by *new* operator, and the return type is an object, then the object else it returns this. 
### Exception
- using *throw* an object that contains a *name* and a *message*.
- using try catch(e).
- has a single catch close.
### Augmenting Types
```javascript
/*
    Augmenting Function.prototype with a *method* method. 
    We no longer have to type the name of the *prototype* proprety
*/
Function.prototype.method = function (name, func) {
    if(!this.prototype[name]){
        this.prototype[name] = func;
        return this;
    }
}
```
### Recursion
A *recursive* is a function that calls itself, either or indirectly.
- JavaScript does not currently provide *tail recursion optimization* (the replacement of the recursion by a loop).
### Scope
- Scope control the visibility and lifetimes of variables and parameters.
- JavaScript has not block scope.
- JavaScript does have function scope.
- It is recommended to declare all vars used on the top of a func.
### Closure
- Inner function has access to the **real** params and vars (*not a copy*) of the outer functions.
```javascript
//The inner function has a longer lifetime than its outer func
var myObject = (function () {
    var value = 0;
    
    return {
        increment: function (inc) {
            value += typeof inc === 'number' ? inc : 1;
        },
        getvalue : function () {
            return value;
        }
    }
})()
```
### Callbacks
- is a function as param for another function to call it within the method (asynchronous).
### Module
- module is a function or object that hide its implementation.
````javascript
var serial_maker = function (startSeq) {
    //Cannot be modified from the outside of the function (private)
    var seq = startSeq;
    return {
        gensym: function (){
            var result = 'G' +seq;
            seq += 1;
            return result;
        }
    }
}
````
### Cascade
Cascading is calling multiple on the same instance.
````javascript
getElement('myBoxDiv').move(350, 150).width(100).color('red').appendText("Cascading ...")
````
### Curry
*Currying* allows to produce a new function by combining params;
````javascript
//Curry method
Function.method('curry', function (){
    var slice = Array.prototype.slice, args = slice.apply(arguments), that = this;
    return function (){
        //Argument is not a real array concat doesn't work == args.concat(arguments) Error
        return that.apply(that, args.concat(slice.apply(arguments)));
    }
})
var increment_by_one = add.curry(1);
increment_by_one(5) // return 6
````
### Memoization
The use of an object to remember the result of the same input to avoid unnecessary work.
````javascript
//Making a global Memoize function
var memoizer = function (memo, formula) {
    var recur = function (n){
        var result = memo[n];
        if(typeof result !== "number"){
            result = formula(recur, n);
            memo[n] = result;
        }
        return result;
    };
    return recur;
};
var making_fib = memoizer([0, 1], function (recur, n) {
    return recur(n-1) + recur(n-2);
})
````
## Chapter 5: Inheritance
- form of code reuse
- JavaScript objects inherit directly from other objects.
### Pseudo-classical
- Objects are constructed by constructor functions; 
```javascript
//Function object runs some code like this
this.prototype = {contructor: this}
```
- Every function has a prototype object that contains *constructor*,
 because the language does not provide a way to determinate which functions are intended to be used as contractors. 
```javascript
// Like a *method* but with a constructor
Function.method('inherits', function (Parent){
    this.prototype = new Parent();
    return this;
})
```
#### Example of Cascading for creating objects using inheritance.
```javascript
var CatCascade = function (name) {
    this.name = name;
    this.saying = 'meow';
}.inherits(Mammal)
    .method('purr',function (n){
        var i, s='';
        for(i = 0; i<n; i += 1){
            if(s){
                s += '-';
            }
            s+= 'r'
        }
        return s;
    })
    .method('get_name', function () {
        return this.says() + " " + this.name + " " + this.says();
    });
new CatCascade("Henrietta").get_name(); // return 'meow Henrietta meow'
```
### Object Specifiers
- Is the use of one object in param (called naming params).
```javascript
var myObject = maker({
    first : f,
    last: l, 
    second, s,
})
```
### Prototypal
- A new object can inherit the properties of an old object.
### Functional
- so far we get no privacy.
#### Making a func that create an object (not a constructor)
1. It creates the *object*
2. Optionally define private members(vars, methods).
3.  it augments that new object with methods.
4. return that object
```javascript
// Pseudo code
var constructor = function (spec, my){
    var that;// other private instance vars
    my = my || {};
    // Add shared variables and functions to my
    that = A_NEW_OBJECT
    // Add privileged methods to that
    return that
}
```
#### Returning the super method  
```javascript
Object.method('superior', function (name) {
    var that = this, method = that[name];
    return function (){
        return method.apply(that, arguments);
    }
})
```
> If all methods of object make no use of *this* or *that* 
> then the object is **durable**(methods are called *capabilities*).
### Parts
- we can compose objects out of sets of parts.
```javascript
var adding_some_features = function (that){
    //declare private params
    that.add_new_feature = function (){
        // optionaly use private params 
    }
    return that;
}
```