# weirdJS
A small collection of JS Weirdness, structured in (hopefully) an easy-to-understand format, so you too can see how bat~~shit~~ crazy JS can be (and maybe prevent some obscure issues in your own code).

### Note:
All the files are structured, and commented, in a way that should hopefully breakdown the weirdness into understandable chunks. 
It is imperative that you understand what is going on **before** you attempt to use any of these snippets; I’d strongly recommend you run through each file and try the ‘demo’ code to get an understanding of what each section of the code does.

## Files:
#### Implicit Type Coercion
This shows how we can use a combination of unary expression, type properties, indexable strings and some mild recursion to generate a very obfuscated (and large) string of non-alphanumeric characters that can be evaluated to valid JavaScript code.
Ultimately, we’re going to use the above and the “compile()” function to convert **any** valid JS code into our non-alphanumeric string and (hopefully) help you understand why and *how* this works!
ps: this most probably will not benefit you in any tangible way. I just like being a silly goose

### Info:
All the files in this repro have been designed to run in vs code via NodeJS but, as they're all just pure JS, these can be used by any JS compiler 

### Disclaimer:
I **DO NOT** recommend that any of these *snippets* are used in any production code; these are purely here for my enjoyment.

Especially the use of the JS function 'eval'! Eval ***is*** **EVIL** and one of the most dangerous things in JS...
