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
<script src="//BrianNewsom.github.io/Moosik/scripts/moosik.min.js"></script>
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
$('html').append('<script src="//BrianNewsom.github.io/Moosik/scripts/moosik.min.js"></script>')
```
you can include our script on **almost anyone's** site.  This will let you hear different variations and all sorts
of beautiful Moosikal creations without having to download anything.

### Sad News
Some sites, e.g. Facebook, Github, and Twitter protect their content or do not allow injection of JS files.  Unfortunately Moosik is currently unable to make music on these few sites.  We are working on a fix to this issue.

Enjoy!

## I want to contribute!

You're great! Thanks for wanting to help out.

The logic behind Moosik lives in app/scripts/main.js and app/scripts/audio.  For readability, it is distributed among files, with the main control loop in main.js.  Dependencies live in bower_components (though they're not all bower, hooray hackathon code).  This is all packaged together into app/scripts/moosik.min.js by a grunt task **uglify:all_src**.

### Design Flow
1. Fork the repository.
2. Edit the js files
3. Minify the js into moosik.min.js using (from the home directory)
  
  ``` 
  $ grunt minify
  ```
  This will minify the script into app/scripts/moosik.min.js and into chrome_ext/moosik.min.js to update the extension.
4. Try out the chrome extension by loading it from *chrome://extensions*. Enable developer mode and load packed extension
5. If you're happy, pack the extension using pack extension, and place it in the root as Moosik.crx.
6. Pull request and we'll address it as soon as possible.

### Submit an issue
If you have an issue but don't know how to fix it, submit an issue at https://github.com/briannewsom/Moosik/issues.  We'll address it as soon as possible. Please include a screenshot of your developer console if you are able to.

Thank you!
