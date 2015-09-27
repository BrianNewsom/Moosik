# Moosik
##Unique Music From Your DOM

*Authors: Brian Newsom, Leif Waldner*

Built for **HackGT 2015**

## What Is It?
Well designed websites have a natural beauty, and we wanted to make this beauty available to more than just eyes.
Moosik parses your DOM and generates a soundtrack for your website from it.  Our complex algorithms will generate 
a unique but deterministic, consistent composition for each website it parses.

## How does it work?

### I have a website
To include Moosik in *your* website, all you need to do is add the line to the end of your index.html file:
```
<script src="//hackcu-win.github.io/Moosik/scripts/scripts.min.js"></script>
```
This will include JQuery and a few audio libraries on your website, but will not mess with anything else on your site,
other than providing tunes for all of your viewers!

### I just want to play
The project can be injected into any site using JQuery that allows script injection.  By simply opening the developers
console and typing 
```
$('html').append('<script src="//hackcu-win.github.io/Moosik/scripts/scripts.min.js"></script>')
```
you can include **our** script on **anyone's** site.  This will let you hear different variations and all sorts
of beautiful Moosikal creations.

Enjoy!

