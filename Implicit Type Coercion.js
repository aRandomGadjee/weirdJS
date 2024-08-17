/* #########################
## Implicit type coercion ##
######################### */

// first, a brief breakdown

// What is type coercion in JS?

/*
    In JS we have this horrific ability to "add" two types together which results in a conversion.
    
    for example, if we add a value of "true" to an integer value, 2, we get the result 3 (number)
    as "true" in this case, is coerced into the number 1 (false = 0)
*/
const intVal = 2+true; // odd, eh?
console.log(intVal);

// what about the below? "not" "not" empty array?
const notNotEmptyArr = !![]; // true 
console.log(notNotEmptyArr);

// and this unary expression? 
const plusEmptyArr = +[]; // 0
console.log(plusEmptyArr);

// and this unary expression? 
const plusTrue = +true; // 1
console.log(plusTrue);

// we can use coercion and some js return types to build a silly string, like the below
// we build the string as 'b'+'a'+ (+'a' /* a unary expression, trying to cast 'a' as a number */) + 'a'
// the unary expression, +'a', results in the return type NaN (not a number)
// so, ba+NaN+a to lower = banana
const banana = ('b' + 'a' + + 'a' + 'a').toLowerCase();
console.log(banana);

/* 
    So, using what we now know from the above, we need to get some basic values, one and zero. (we already have these values!)
    
    We need to store these, so we'll use a string cosnt
*/

const zero = '+[]';
const one = '+!![]';

// we need a way to build *any* number from the above values.... easiest way to do this is to add/subtract 'one'... so we'll build a function
const buildNum = num => {if(num===0) return zero; return Array.from({length: num}, () => one).join(' + ')};

const destring = s =>s.split('').map(x => {
    if (!(x in charMap)) {
      const charCode = x.charCodeAt(0);
      return `([]+[])[${destring(constructor)}][${destring(fromCharCode)}](${buildNum(charCode)})`;
    }
    return charMap[x];
  }).join('+');

const mapToString = arr => {
    let wakawaka = [];
    arr.forEach((item) => {wakawaka.push(eval(item))});
    return wakawaka.join('');
}

// we need a map to store our chars.... hows about charMap? initialised empty
const charMap = {};

// now we need to get some values, [a-z]. [space], [backspace], [forward slash], [period], [square brackets]

// first we need to know how to coerce to a string; this is done easily by adding an empty array, +[]
// in JS, strings are indexable like an array. It helps to think of a string as an array of chars
const string = 'string';
console.log(string[3]);
console.log(string[1]);
console.log(string[0]);
console.log(string[1]+string[3]+string[1]+string[0]);

// now we know how to make a string and return a char at position, we start with a

// '(+{}+[])' = NaN
// buildNum(1) = 1
// '(+{}+[])[${1}]' = a
charMap.a = `(+{}+[])[${buildNum(1)}]`
charMap.N = `(+{}+[])[${buildNum(0)}]` // the same as 'a', just one position lower

/* 
    but what about other letters? 
    simple! we just force the *name* of an object to be returned as a string...

    JS is kind enough to interpret and return the name of objects if we add an empty array to it, the same as we have with the letter a.
    so {}+[] = "[object Object]"... and you can see many chars we want already
*/
charMap['['] = `({}+[])[${buildNum(0)}]`;
charMap.o = `({}+[])[${buildNum(1)}]`;
charMap.b = `({}+[])[${buildNum(2)}]`;
charMap.j = `({}+[])[${buildNum(3)}]`;
charMap.e = `({}+[])[${buildNum(4)}]`;
charMap.c = `({}+[])[${buildNum(5)}]`;
charMap.t = `({}+[])[${buildNum(6)}]`;
charMap[' '] = `({}+[])[${buildNum(7)}]`;
charMap.O = `({}+[])[${buildNum(8)}]`;
charMap[']'] = `({}+[])[${buildNum(14)}]`;

// true and false also contain some cool chars - we know "true" is "!![]+[]"
charMap.r = `(!![]+[])[${buildNum(1)}]`;
charMap.u = `(!![]+[])[${buildNum(2)}]`;
charMap.f = `(![]+[])[${buildNum(0)}]`;
charMap.l = `(![]+[])[${buildNum(2)}]`;
charMap.s = `(![]+[])[${buildNum(3)}]`;

// infinity, another value with a few chars we can steal - infinity is easily accessible by dividing 1 by 0 (1/0)... 
charMap.i = `((+!![]/+[])+[])[${buildNum(3)}]`;
charMap.n = `((+!![]/+[])+[])[${buildNum(4)}]`;

// we now have access to some words: lubricants, ulcerations, constructor, subjection, journalise..
// hang on, 'constructor' is a thing in JS and JS is WEIRD... you can access properties using bracket notation 

/* 
  * for a String constructor we can use ("")["constructor"];
  * for a Number constructor we can use (1)["constructor"];
  * for a Boolean constructor, (true)["constructor"];
  * an Array constructor? ([])["constructor"];
  * RegExp constructor! (/-/)["constructor"];
*/

// we're lazy, we'll write a wee function to get the "constructor" string as this weird (+[]+[]) string
// just to prove we can build the word constructor....
const constructor = mapToString([
    charMap.c, 
    charMap.o,
    charMap.n,
    charMap.s,
    charMap.t,
    charMap.r,
    charMap.u,
    charMap.c,
    charMap.t,
    charMap.o,
    charMap.r
]);

charMap.S = `([]+([]+[])[${destring(constructor)}])[${buildNum(9)}]`;
charMap.g = `([]+([]+[])[${destring(constructor)}])[${buildNum(14)}]`;
charMap.p = `([]+(/-/)[${destring(constructor)}])[${buildNum(14)}]`; // RegExp
charMap['\\'] = `(/\\\\/+[])[${buildNum(1)}]`; // again, regexp

/*
    what else can we do? Hexadecimal conversions from numbers to strings!
    the .toString() function takes in a param, base Encoding.... so (1750).toString(16) results in a hexadecimal representation of 1750, "6d6"
    we can use the buildNumber function to create a number!
    
    * (10).toString(30) = a
    * (11).toString(30) = b
    * (12).toString(30) = c
    * and so on...
*/
const toString = mapToString([
    charMap.t,
    charMap.o,
    charMap.S,
    charMap.t,
    charMap.r,
    charMap.i,
    charMap.n,
    charMap.g
]);

charMap.d = `(${buildNum(13)})[${destring(toString)}](${buildNum(30)})`;
charMap.h = `(${buildNum(17)})[${destring(toString)}](${buildNum(30)})`;
charMap.m = `(${buildNum(22)})[${destring(toString)}](${buildNum(30)})`;

const returnEscape = mapToString([
    charMap.r,
    charMap.e,
    charMap.t,
    charMap.u,
    charMap.r,
    charMap.n,
    charMap[' '],
    charMap.e,
    charMap.s,
    charMap.c,
    charMap.a,
    charMap.p,
    charMap.e
]);

// finally.... capital C......
// build the function constructor = (`(()=>{})[${destring(constructor)}])
// call the function constructor to return the "escape" function = (`(()=>{})[${destring(constructor)}])(${destring(returnEscape)})
// provide the escape function some params = (`(()=>{})[${destring(constructor)}])(${destring(returnEscape)})()(${charMap['\\']}))
// now get the 2nd position (`(()=>{})[${destring(constructor)}])(${destring(returnEscape)})()(${charMap['\\']}))[${buildNum(2)}]`

// this works because the escaped backslash char in hexadecimal is "%5C"... all the above essentially just writes 'escape("\\")[2]'
// console.log(escape("\\")[2])
charMap.C = `((()=>{})[${destring(constructor)}](${destring(returnEscape)})()(${charMap['\\']}))[${buildNum(2)}]`;

// now we can build this.... that is used in our destring function recursively
// another weird facet of JS is it's variable scope... you'll notice that we're, seemingly, using fromCharCode before we define it!
// nope, js scopes consts in the same levels at runtime... let and var can get weird with variable scoping... this is for another weird js file 
const fromCharCode = mapToString([
    charMap.f,
    charMap.r,
    charMap.o,
    charMap.m,
    charMap.C,
    charMap.h,
    charMap.a,
    charMap.r,
    charMap.C,
    charMap.o,
    charMap.d,
    charMap.e
])

// at this point, we can now use all of the above to write anything using the destring function.... because we're lazy, here’s a function to do it!
const compile = code => `(()=>{})[${destring(constructor)}](${destring(code)})()`;

// now, using the compile function, we can provide ANY valid JS and have it spit out this weird (+[]+[]) string, which will evaluate to the code passed in!
// here's a hello world example
const output = compile("console.log('Hello world!');")
// if we eval the "output" we get "hello world!"

// eval is evil... it'll just blindly run anything you pass it.. be careful; never use this unless you understand EXACTLY what you're evaluating
const dangerousOutput = compile(
    `
        const os = require('os');
        console.log(os.hostname());
    `
)

debugger;

