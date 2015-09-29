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

#### Chrome Extension!
We've bundled Moosik as a chrome extension so you can experience it's joys on every website.

Download Moosik.crx from the home directory of this repository, and drag it into your window on
```
chrome://extensions
```
Our JS will now be appended to every site, playing a new piece for each page you visit.

A published chrome extension is coming VERY soon! We recommend you wait until we publish it on the chrome store so we can 
optimize it a bit.

#### I'm a Hacker
Run the following JS in the developers console, and you can include our script on any site with jquery.
```
$('html').append('<script src="//hackcu-win.github.io/Moosik/scripts/scripts.min.js"></script>')
```
you can include our script on **almost anyone's** site.  This will let you hear different variations and all sorts
of beautiful Moosikal creations without having to download anything.

### Sad News
Some sites, e.g. Facebook protect their content or do not allow injection of JS files.  Unfortunately Moosik is currently unable to make music on these few sites.

Enjoy!

