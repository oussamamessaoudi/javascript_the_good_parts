/*
    Chapter 1: Good Parts
 */
document.write("Hello World<br/>")
//Will be explained in Chapter 4
Function.prototype.method = function (name, func){
    this.prototype[name] = func
    return this;
}
/*
    Chapter 3: Objects
 */
console.log("*-*-* Chapter 3: Objects *-*-*")
var empty_object = {};
var stooge = {
    "first-name": "Jerome",
    "last-name": "Howard"
}
var flight = {
    airline: 'Oceanic',
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    }
};
// Retrieval with default value
var middle_name = stooge["middle-name"] || "(none)"
// Update if not already there it will be added
stooge["first-name"] = 'Jerome';
stooge["middle-name"] = 'Lester';
stooge.nickname = 'Curly';
flight.equipement = {
    model: 'Boeing 777'
};
flight.status = 'overdue';
// Prototype
if(typeof Object.create !== 'function'){
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    }
}
var another_stooge = Object.create(stooge);
another_stooge['first-name'] = 'Harry'
another_stooge['middle-name'] = 'Moses'
another_stooge.nickname = 'Moe'
stooge.profession = 'actor';
// another_stooge.profession is 'actor'

// Enumeration
console.log("*** Enumeration ***")
var name;
console.log('another_stooge', another_stooge)
for (name in another_stooge){
    if(typeof another_stooge[name] !== 'function'){
        console.log(name, ":", another_stooge[name])
    }
}
console.log("-- Ordered properties --")
var i;
var properties = [
    'first-name',
    'middle-name',
    'last-name',
    'profession'
];
for(i = 0; i < properties.length; i++){
    console.log(properties[i], ":", another_stooge[properties[i]])
}
// Delete
console.log("*** Delete ***")
console.log("another_stooge.nickname:", another_stooge.nickname, "is equal to Moe");
delete another_stooge.nickname;
console.log("another_stooge.nickname:", another_stooge.nickname, "is equal to Curly");

/*
    Chapter 4: Functions
 */
//Literal Function
var add = function (a, b) {
    return a + b;
}
// Method Invocation Pattern
console.log("*** Method Invocation Pattern ***")
var myObject = {
    value : 0,
    increment: function (inc){
        this.value += typeof inc === 'number' ? inc : 1;
    }
}
myObject.increment();
console.log("Value: ", myObject.value , "is equal to 1")
myObject.increment(3)
console.log("Value: ", myObject.value , "is equal to 4")
// Function Invocation Pattern
console.log("*** The Function Invocation Pattern ***")
var sum = add(3, 4);
myObject.double = function(){
    var that = this;
    var helper = function() {
        that.value = add(that.value, that.value);
    }
    helper();
}
myObject.double();
console.log("Value: ", myObject.value , "is equal to 8")
console.log("*** The Constructor Invocation Pattern ***")
var Quo = function (status){
    this.status = status
}
Quo.prototype.get_status = function () {
    return this.status;
}
var myQuo = new Quo("confused");
console.log("Status:", myQuo.get_status())
console.log("*** The Apply Invocation Pattern ***")
var array = [3, 4]
var sumOfArray = add.apply(null, array);
console.log("Sum of array:", sumOfArray, "is equal to 7");
var statusObject = {
    status: 'A-OK'
};
var status = Quo.prototype.get_status.apply(statusObject);
//use statusObject doesn't inherit  the Quo.prototype
console.log("Status:", status, "isEqual to " + statusObject.status)
console.log("*** Arguments ***")
var sumOfArgs = function (){
    var i, sum = 0;
    for(i=0; i<arguments.length; i += 1){
        sum += arguments[i];
    }
    return sum;
}
console.log("Sum:",sumOfArgs(4, 8, 15, 16, 23), "is Equal to 66")
console.log("*** Augmenting Types ***")
Function.prototype.method = function (name, func){
    if(!this.prototype[name]){
        this.prototype[name] = func
        return this;
    }
}
Number.method('integer', function () {
    return Math[this < 0 ? 'ceil' : 'floor'](this)
})
console.log('To integer method:', (-10/3).integer());
//Remove space from the start and end of a string
String.method('trim', function (){
    return this.replace(/^\s+|\s+$/g, '')
})
var toTrim = "   trim    "
console.log('Trim string:"', toTrim, '"=>"'+toTrim.trim(), '"');
console.log("*** Recursion ***")
var hanoi = function hanoi(disc, src, aux, dst){
    if(disc > 0){
        hanoi(disc-1, src, dst, aux);
        console.log('Move disc '+ disc + ' from ' + src + ' to ' + dst);
        hanoi(disc-1, aux, src, dst);
    }
}
hanoi(3, 'Src', 'Aux', 'Dst');
var walk_the_DOM = function walk(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk(node, func);
        node = node.nextSibling
    }
}
var getElementsByAttribute = function (att, value) {
    var results = [];

    walk_the_DOM(document.body, function (node){
        var actual = node.nodeType === 1 && node.getAttribute(att);
        if(typeof actual === 'string' &&
            (actual === value || typeof value !== 'string')){
            results.push(node);
        }
    });

    return results;
}
var factorial = function factorial(i, a){
    a = a || 1;
    if (i < 2) return a;
    return factorial(i-1, a * i)
}
console.log("factorial("+factorial(4)+")");
console.log("*** Closure ***")
var myObject = (function () {
    var value = 0;

    return {
        increment: function (inc) {
            value += typeof inc === 'number' ? inc : 1;
        },
        getValue : function () {
            return value;
        }
    }
})()
var Quo = function (status){
    return {
        get_status: function (){
            return status;
        }
    }
}
console.log("Quo('amazed'):", Quo('amazed').get_status());
var fade = function (node) {
    var level = 1;
    var step = function (){
        var hex = level.toString(16);
        node.style.backgroundColor = '#FFFF'+hex+hex;
        if(level < 15){
            level += 1;
            setTimeout(step, 100);
        }
    };
    setTimeout(step, 100);
}
fade(document.body);
//BAD EXAMPLE
var add_the_handlers = function (nodes){
    var i;
    for (i = 0; i< nodes.length; i += 1){
        nodes[i].onclick = function (){
            // the i is not a copy (so it's value will always be nodes.length)
            alert(i);
        }
    }
}
// BETTER EXAMPLE
var add_the_handlers = function (nodes){
    var helper = function (i){
        return function (e){
            alert(i);
        };
    };
    var i;
    for(i = 0; i < nodes.length; i += 1){
        nodes[i].onclick = helper(i);
    }
}
console.log("*** Module ***")
String.method('deentityify', function (){
    //Entity cannot be modified from outside
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };
    var that = this;
    return (function () {
        return that.replace(/&([^&;]+);/g,
            function (a, b) {
                var r  = entity[b];
                return (typeof r === 'string') ? r : a;
        })
    })()
})
console.log("'&lt;&quot;&gt'.deentityify() =>", '&lt;&quot;&gt;'.deentityify());
var serial_maker = function () {
    //Cannot be modified from the outside of the function
    var prefix = '';
    var seq = 0;
    return {
        set_prefix: function (p){
            prefix = String(p);
        },
        set_seq: function (s){
            seq = s;
        },
        gensym: function (){
            var result = prefix +seq;
            seq += 1;
            return result;
        }
    }
}
var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
console.log('generale a new serial number:', seqer.gensym(), seqer.gensym());
console.log("*** Curry ***")
Function.method('curry', function (){
    var slice = Array.prototype.slice, args = slice.apply(arguments), that = this;
    return function (){
        //Argument is not a real array concat doesn't work == args.concat(arguments) Error
        return that.apply(that, args.concat(slice.apply(arguments)));
    }
})
var increment_by_one = add.curry(1);
console.log("increment_by_one(5):", increment_by_one(5))
console.log("*** Memoization ***")
var fibonacci = function (n){
    return n < 2 ? n : fibonacci(n-1) + fibonacci(n-2);
}
// Memoize
var fibonacci_memoize = (function (){
    var memo = [0, 1];
    var fib = function (n) {
        var result = memo[n];
        if (typeof result != "number"){
            result = fib(n-1) + fib(n-2);
            memo[n] = result;
        }
        return result;
    }
    return fib;
})();
console.log("fibonacci_memoize(10):", fibonacci_memoize(10))
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
console.log("making_fib(10):", making_fib(10))
var making_fact = memoizer([1, 1], function (recur, n){
    return n* recur(n-1);
})
console.log("making_fact(10):", making_fact(10))
