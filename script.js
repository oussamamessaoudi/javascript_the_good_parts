/*
    Chapter 1: Good Parts
 */
document.write("Hello World<br/>")
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
    this.prototype[name] = func
    return this;
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
/*
    Chapter 5: Inheritance
 */
console.log("*** Pseudo classical ***")
// If the new operator was a method
Function.method('new', function (){
    //create an object with the this prototype in prototype
   var that = Object.create(this.prototype)

   var other = this.apply(that, arguments);

   return (typeof other === 'object' && other) || that;
});
function Using_for_creation(){
    this.name = 'Using for creation'
    return this;
}
const new_object = Using_for_creation.new()
console.log("new_object.name:", new_object.name)
var Mammal = function (name){
    this.name = name;
}
Mammal.prototype.get_name = function (){
    return this.name;
}
Mammal.prototype.says = function (){
    return this.saying || '';
}
var mammal = new Mammal('Herb the Mammal');
console.log("mammal.get_name():",mammal.get_name());
var Cat = function (name) {
    this.name = name;
    this.saying = "meow";
}
Cat.prototype = new Mammal()
Cat.prototype.purr = function (n){
    var i, s='';
    for(i = 0; i<n; i += 1){
        if(s){
            s += '-';
        }
        s+= 'r'
    }
    return s;
}
Cat.prototype.get_name = function () {
    return this.says() + " " + this.name + " " + this.says();
}
var myCat = new Cat('Henrietta');
console.log('myCat.get_name()', myCat.get_name());
// Like a *method* but with a constructor
Function.method('inherits', function (Parent){
    this.prototype = new Parent();
    return this;
})
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
console.log("new CatCascade('Henrietta').get_name()",  new CatCascade("Henrietta").get_name())
console.log("*** Prototypal ***")
// differential inheritance
var myMammal = {
    name: 'Herb the Mammal',
    get_name: function () {
        return this.name;
    },
    says: function () {
        return this.saying || '';
    }
}
var myCat = Object.create(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function (n) {
    var i, s='';
    for(i = 0; i<n; i += 1){
        if(s){
            s += '-';
        }
        s+= 'r'
    }
    return s;
};
myCat.get_name = function () {
    return this.says() + " " + this.name + " " + this.says();
}
//we did use object.create to have a new scope of inheritance
/*
var block = function () {
    var oldScope = scope;
    scope = Object.create(scope);
    advance('{');
    parse(scope);
    advance('}');
    scope = oldScope;
}
*/
console.log("*** Functional ***")
var mammal = function (spec) {
    var that = {};

    that.get_name = function () {
        return spec.name;
    };

    that.says = function () {
        return this.saying || '';
    }

    return that;
}

var myMammal = mammal({name: 'Herb'});
var cat = function (spec) {
    spec.saying = spec.saying || 'meow';
    var that = mammal(spec);
    that.purr = function (n) {
        var i, s = '';
        for(i = 0; i < n; i += 1) {
            if(s) {
                s += '-';
            }
            s += 'r';
        }
        return s;
    };
    that.get_name = function () {
        return that.says() + ' ' + spec.name + ' ' + that.says();
    }
    return that;
};
var myCat = cat({name: 'Henrietta'});
Object.method('superior', function (name) {
    var that = this, method = that[name];
    return function (){
        return method.apply(that, arguments);
    }
})
var coolcat = function (spec) {
    var that = cat(spec), super_get_name = that.superior('get_name');
    that.get_name = function (){
        return 'like' + super_get_name() + 'baby';
    }
    return that;
}
var myCoolcat = coolcat({name: 'Bix'});
console.log("myCoolcat.get_name():", myCoolcat.get_name())
console.log("*** Parts ***")
var eventuality = function (that) {
    var registry = {};
    that.fire = function (event) {
        var array, func, handler, i, type = typeof event === 'string' ? event : event.type;

        if(registry.hasOwnProperty(type)){
            array = registry[type];
            for(i = 0; i < array.length; i += 1){
                handler = array[i];
                func = handler.method;
                if(typeof func === 'string') {
                    func = this[func];
                }
                func.apply(this, handler.parameters || [event]);
            }
        }
        return this;
    };
    that.on = function (type, method, parameters) {
        var handler = {
            method: method,
            parameters: parameters
        };
        if(registry.hasOwnProperty(type)) {
            registry[type].push(handler);
        } else {
            registry[type] = [handler];
        }
        return this;
    };
    return that;
}
/*
    Chapter 6: Arrays
 */
console.log("*-*-* Chapter 6: Arrays *-*-*")
//Array literal
var empty = [];
var numbers = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
];
console.log("empty[1]:", empty[1])
console.log("numbers[1]:", numbers[1])
var numbers_object = {
    '0': 'zero','1': 'one','2': 'two',
    '3': 'three','4': 'four', '5': 'five',
    '6': 'six','7': 'seven','8': 'eight',
    '9': 'nine'
};
//Length
var myArray = [];
myArray[1000] = true;
myArray.length // 10001
console.log(myArray)
//Confusion
var is_array = function (value){
    return Object.prototype.toString.apply(value) === '[object Array]'
}
console.log('is_array(numbers):', is_array(numbers))
console.log('is_array(numbers_object):', is_array(numbers_object))
//Methods
Array.method('reduce', function (f, value){
    var i;
    for(i = 0; i< this.length; i += 1){
        value = f(this[i], value)
    }
    return value;
})
var sum_of_array = [1, 2, 3, 4].reduce(
    function (newValue ,previousValue) {
        return newValue+previousValue
    },
    0
);
console.log("sum of [1, 2, 3, 4]:", sum_of_array);
//Dimension
Array.dim = function (dim, initial) {
    var a = [], i;
    for(i = 0; i < dim; i += 1 ){
        a[i] = initial
    }
    return a;
}
console.log("Array.dim(5, 1)",Array.dim(5, 1));// return [1, 1, 1, 1, 1]
Array.matrix = function (m, n , initial){
    var matrix = [], line, i, j;
    for (i = 0; i < m; i += 1){
        line = [];
        for(j = 0; j < n; j += 1){
            line[j] = initial;
        }
        matrix[i] = line;
    }
    return matrix;
};
console.log("Array.matrix(4, 4, 0):", Array.matrix(4, 4, 0))
Array.identity = function (n){
    var i, matrix =  Array.matrix(n, n , 0);
    for (i = 0 ; i< n; i += 1){
        matrix [i][i] = 1;
    }
    return matrix;
}
console.log("Array.identity(3):", Array.identity(3))
/*
    Chapter 7: Regular Expressions
 */
console.log("*-*-* Chapter 7: Regular Expressions *-*-*")
var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^^#]*))?(?:#(.*))?$/;
var url = "http://www.google.com:80/goodparts?q#fragment";
var result = parse_url.exec(url);
var names = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
var blanks = '      ';
var i;
for(i = 0; i < names.length; i += 1){
    console.log(names[i] + ': ' + blanks.substring(names[i].length) , result[i]);
}
var parse_number = /^-?\d+(?:\.\d*)?(?:e[+/-]?\d+)?$/i
console.log("parse_number.test('1')", parse_number.test('1'));
console.log("parse_number.test('number')", parse_number.test('number'));
console.log("parse_number.test('89.6')", parse_number.test('89.6'));
console.log("parse_number.test('132.21.86.100')", parse_number.test('132.21.86.100'));
console.log("parse_number.test('123.45E-67')", parse_number.test('123.45E-67'));
console.log("parse_number.test('123.45D-67')", parse_number.test('123.45D-67'));

function make_a_matcher(){
    return /a/gi;
}
var x = make_a_matcher()
var y = make_a_matcher()
x.lastIndex = 10;
console.log("y.lastIndex", y.lastIndex)
/*
    Chapter 8: Methods
 */
console.log("*-*-* Chapter 8: Methods *-*-*")
console.log("*** Arrays ***")
var n = [ 4, 8, 15, 16, 23, 42];
n.sort();
console.log("[ 4, 8, 15, 16, 23, 42].sort()",n.sort());
var n_sorted = n.sort(function (a, b) {
    return a - b;
})
console.log("[ 4, 8, 15, 16, 23, 42].sort(byFunc)", n_sorted);
var m = ['aa', 'bb', 'a', 4, 8, 15, 16, 23, 42];
m_sorted = m.sort(function (a, b){
   if(a === b) return 0;
   if(typeof a === typeof b) return a < b? -1:1;
   return typeof a < typeof b ? -1:1;
});
console.log("['aa', 'bb', 'a', 4, 8, 15, 16, 23, 42].sort(byfunc)", m_sorted)
var by = function (major, minor) {
    return function (o, p){
        var a, b;
        if(typeof o === 'object' && typeof p === 'object' && o && p){
            a = o[major];
            b = p[major];
            if( a === b) return typeof minor === 'function' ? minor(o, p) : 0;
            if(typeof a === typeof b) return a > b ? 1 : -1;
            return typeof a > typeof b ? 1 : -1;
        }
        else {
         throw {
             name: 'Error',
             message: 'Expected an object when sorting by ' + major
         }
        }
    }
};
var s = [
    {first: "Imad", hero: "hulk"},
    {first: "Oussama", hero: 'man'},
    {first: "Oussama", hero: 'iron'},
    {first: "Najoua", hero: 'sam'}
];
console.log("s.sort(by(\"first\"))", s.sort(by("first")));
console.log("s.sort(by('first'), by('hero'))", s.sort(by("first", by('hero'))));
//splice
var a = ['a', 'b', 'c']
console.log("a:", a)
console.log("a.splice(1, 1, 'ache', 'bug'):", a.splice(1, 1, 'ache', 'bug'))
console.log("a:", a)
//Function
Function.method('bind', function (that) {
    var method = this;
    return function (){
        return method.apply(that, arguments);
    }
});
function showValue() {
    return this.value;
}
console.log(showValue.bind({value: 12})())
