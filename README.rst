Ploneintranet Theme
===================

This is package provides:

- static high-fidelity mockup design workspace

- installable Plone theme

Requirements are documented in Google Drive (outside this repo) but will
be ticketized into issues once they're actionable.


Package layout
--------------

./prototype/
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

You can check node is present via::

  nodejs -v

- jekyll > 1.5 install following the instructions on
  https://help.github.com/articles/using-jekyll-with-pages

On ubuntu::

  sudo apt-get install ruby1.9.3
  sudo gem install bundler

Now install jekyll itself.
The Gemfile is in ploneintranet.theme/prototype and is already up to date::

  git clone git@github.com:ploneintranet/ploneintranet.theme.git
  cd ploneintranet.theme/prototype
  sudo bundle install
  
We use `node`, `npm` and `bower` to manage the Javascript
dependencies of Webwork and build the bundles. You have the option to
handle this manually or let the all-round-carefree make handle
things for you::

  cd ..  # toplevel ploneintranet.theme
  make


Running the development web server
----------------------------------

Start the jekyll server::


  bundle exec jekyll serve --watch --baseurl ""

You can now edit.

The bundles (minified and non-minified) are in `prototype/bundles`.


Releasing a new version
-----------------------

In order to make a release tarball, use::

  make release

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


Q: What are the stamp* files for?

A: Downloading all dependencies takes quite some time. We use these as flags 
to indicate to make that these steps don't have to run again. That also means 
if you explicitly want to re-run the bower or npm step, you can just remove Theme
stamp-bower or stamp-npm file and run make again.

Q: On Ubuntu, I get weird "sh: 1: node: not found" errors.

A: sudo ln -s /usr/bin/nodejs /usr/bin/node
