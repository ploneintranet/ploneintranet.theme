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


Standalone Installation: using docker
-------------------------------------

The docker-based installation manages all dependencies for you.

Prerequisites: docker https://docs.docker.com/installation/#installation

For example on Ubuntu, install docker::

  sudo apt-get install -y docker.io
  adduser myuserid docker

You need to prepare the container once::

  make docker-build

Enter the virtual::

  make docker-run

Compile the prototype::

  make all

Run the standalone prototype::

  make demo-run

You can now access the clickable prototype on localhost:4000.

To re-access an already compiled prototype you only need to start docker 
and run the demo server::

  make docker-run
  make demo-run

See below under 'Installation into Plone' for integration of
the theme resource bundles into a Plone installation.


Standalone Installation: without docker
---------------------------------------

Prerequisites:

- node.js >0.10 install from nodejs.org

You can check node is present via::

  node -v

If any node.js related problems are encountered during the standalone installation,
it is recommended to install nodeenv. Nodeenv is a isolated environment to install
node.js packages, nodeenv uses virtualenv::

    # in your virtualenv
    pip install nodeenv
    nodeenv -p --node=0.10.33 --prebuilt env-0.10.33-prebuilt
    deactivate
    . bin/activate

- jekyll > 1.5 install following the instructions on
  https://help.github.com/articles/using-jekyll-with-pages
  *(skip the Gemfile part, it is already provided and covered some steps later)*

On ubuntu::

  sudo apt-get install ruby ruby-dev
  sudo gem install bundler

Make sure ruby>=1.9.3 (on precise: apt-get install ruby1.9.3).

Now install jekyll itself.
The Gemfile is in ploneintranet.theme/prototype and is already up to date::

  git clone git@github.com:ploneintranet/ploneintranet.theme.git
  cd ploneintranet.theme/prototype
  sudo bundle install

Bourbon http://bourbon.io/ will be installed as part of `bundle install` .

We use `node`, `npm` and `bower` to manage the Javascript
dependencies of Webwork and build the bundles. You have the option to
handle this manually or let the all-round-carefree make handle
things for you::

  cd ..  # toplevel ploneintranet.theme
  make

The bundles (minified and non-minified) are in `prototype/bundles` .


Installation into Plone
-----------------------

`ploneintranet.theme` comes pre-bundled if you use the `ploneintranet.suite` buildout, but you still have to run the initialization code::

  cd src/ploneintranet.theme # toplevel ploneintranet.theme
  make release

* Checkout the egg into your Plone installation (with Diazo support).
* Include ploneintranet.theme in your eggs section and run buildout
* Now initialise the theme by building all javascript dependencies and creating the initial diazo theme structure (see code above)
* (Re)Start Plone
* Install the ploneintranet.theme Add On

The theme should now be activated. Be careful, this is currently heavy work in progress.


Component Development
---------------------

Start the jekyll server::

  make demo

You can now see the current prototype (on `localhost:4000`) and edit.

Typical development workflow:

* Wireframe the interactions you want to realize
* Plan a new component as a pseudocode dom tree using pattern classes, e.g.::

    form.update-social.pat-inject
        textarea.pat-comment-box
            a.icon-attachment.iconified
        div.button-bar
            a.icon-add-user.iconified.pat-tooltip
                sup.counter
            a.icon-hashtag.iconified
            a.icon-users.iconified
            button[type="submit"]

* Create a new include file eg `_inludes/update-social.html`
* Create a new standalone html eg in `demo/update-social.html` that includes that include. This page should show up in the "Prototype map" on the prototype homepage
* In the include file, expand the pseudocode dom into actual html markup.
* Load the standalone demo via the Jekyll server, edit, reload, rinse, repeat.
* Finally, include the new component in more complex pages like e.g. `prototype/workspace_landing.html`

Jekyll requires a front-matter in the top of standalone html files, minimally::

  ---
  ---


Pattern Development and Integration
-----------------------------------

Patternslib home:
http://patternslib.com/index.html

To develop a new pattern, see the documentation at:
https://github.com/Patternslib/Patterns/tree/master/docs

Example of a standalone pattern:
https://github.com/syslabcom/patterns.polyfill-date/blob/master/polyfill-date.js

More complex pattern initialization:
https://github.com/Patternslib/pat-redactor/blob/master/src/pat-redactor.js
specifically the `parser.add_argument(...)` calls that define pattern options.

You would e.g. add browserviews for the imageupload and imagegetjson calls::

  <textarea class="pat-redactor"
  id="rich-document-edit-text" name="text"
  data-allow="p-ul-ol-h1-h2-h3"
  data-pat-redactor="toolbar-external: #editor-toolbar; imageupload: https://your.site/foo/@@quickupload; imagegetjson: https://your.site/foo/@@list_images"
  dir="ltr" style="display:none">...</textarea>

To integrate a new pattern into the prototype:

* Add the package into `bower.json` - this will enable the source download.
* Add the download location to `build.js` e.g. under 'Pat Packery'. The download location is specified in `.bowerrc`.
* Add all pattern dependencies into `build.js` as well. The dependencies are already specified
in the pattern itself, e.g. see https://github.com/syslabcom/patterns.polyfill-date/blob/master/polyfill-date.js .
* Add the pattern name to `patterns.js` to satisfy requirejs.
* Running: `make clean all` will run the download and compile the pattern into the bundle.

You can check the pattern is now added to the bundle: `grep polyfill-data prototype/bundles/*`

Please make sure your pattern has test coverage, see:
https://github.com/Patternslib/Patterns/blob/master/docs/styleguide.md


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

Q: I get Errors in the log of type  IOError: Error reading file '/++theme++ploneintranet.theme/prototype/home.html': failed to load external entity "/++theme++ploneintranet.theme/prototype/home.html". What's wrong?

A: Did you run 'make release' in the theme checkout as descibed above?
