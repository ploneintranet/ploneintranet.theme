Ploneintranet Theme
===================

This is package provides:

- static high-fidelity mockup design workspace

- installable Plone theme

Requirements are documented in Google Drive (outside this repo) but will
be ticketized into issues once they're actionable.


Package layout
--------------

./Prototype/
  static high-fidelity mockup design workspace
  Contains _site/ with the compiled prototype
  Contains the jekyll templates, style files, media files et al.
  This is the main working place for designers

./src/
  Custom javascript code (patterns)
  Also stores the files downloaded by bower in bower_components/
  Contains the patterns.js which controls the bundling structure
  Can also contain all local or legacy js code that is specific to this
  project



Installation
------------

Prerequisites:

- node.js >0.10 install from nodejs.org

- jekyll > 1.5 install from http://jekyllrb.com

We use `node`, `npm` and `bower` to manage the Javascript
dependencies of Webwork and build the bundles. You have the option to
handle this manually or let the all-round-carefree make handle
things for you.

```
    % git clone git@github.com:ploneintranet/ploneintranet.theme.git
    % cd ploneintranet.theme
    % make
```

The bundles (minified and non-minified) are in `Prototype/bundles`.

In order to make a release tarball, use:

```
    % make release
```

The tarball will be found in `release/`.


Developer's Background Information
----------------------------------

The make process will attempt the following steps:

* Download backend js libs using npm install for running this
* Download frontend js libs for later bundling using bower
* Clone or update the Patternslib master to link it into the custom bundle
* Apply Prefixfree and uglify the css 
* Create a js bundle of all referenced js patterns and used libs
* Run jekyll to apply templates and create the prototype directory


If you run into problems
------------------------

Q: There is some obscure error in some js dependency downloaded by bower. What 
should I do?

A: There is a fair chance that there was a download error due to timeout or 
delay in bower.io. The quick shot is to run again. Do make clean to be sure 
that all local caches are also emptied and run make again. 


