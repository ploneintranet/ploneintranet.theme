BOWER 		?= node_modules/.bin/bower
JSHINT 		?= node_modules/.bin/jshint
PEGJS		?= node_modules/.bin/pegjs
PHANTOMJS	?= node_modules/.bin/phantomjs

PATTERNS	= src/Patterns
SOURCES		= $(wildcard $(PATTERNS)/src/*.js) $(wildcard $(PATTERNS)/src/pat/*.js) $(wildcard $(PATTERNS)/src/lib/*.js)
BUNDLES		= bundles/patterns.js bundles/patterns.min.js

GENERATED	= $(PATTERNS)/src/lib/depends_parse.js

JSHINTEXCEPTIONS = $(GENERATED) \
		   $(PATTERNS)/src/lib/dependshandler.js \
		   $(PATTERNS)/src/lib/htmlparser.js \
		   $(PATTERNS)/src/pat/skeleton.js
CHECKSOURCES	= $(filter-out $(JSHINTEXCEPTIONS),$(SOURCES))

RELEASE         = $(shell git describe --tags)
RELEASE_DIR		= release/Prototype
RELEASE_TARBALL = release/Prototype-$(RELEASE).tar.gz

LATEST          = `cat LATEST`
BUNDLENAME      = ploneintranet
BUNDLEURL		= http://products.syslab.com/packages/$(BUNDLENAME)/$(LATEST)/$(BUNDLENAME)-$(LATEST).tar.gz


all:: bundle.js

########################################################################
## Install dependencies

stamp-npm: package.json
	npm install
	touch stamp-npm

stamp-bower: stamp-npm
	$(BOWER) install
	touch stamp-bower

patterns: 
	if test -d src/Patterns; then cd src/Patterns && git pull && cd ../..; else git clone https://github.com/Patternslib/Patterns.git src/Patterns; fi

clean::
	rm -f stamp-npm stamp-bower
	rm -rf node_modules src/bower_components ~/.cache/bower


########################################################################
## Tests

check:: jshint test-bundle
jshint: stamp-npm
	$(JSHINT) --config jshintrc $(CHECKSOURCES)


check:: stamp-npm
	$(PHANTOMJS) node_modules/phantom-jasmine/lib/run_jasmine_test.coffee tests/TestRunner.html


########################################################################
## Bundle generation

css: 
	node_modules/.bin/grunt css


bundle bundle.js: patterns $(GENERATED) $(SOURCES) jekyll css build.js stamp-bower
	node_modules/.bin/r.js -o build.js optimize=none
	node_modules/.bin/grunt uglify
	mv bundle.js Prototype/bundles/$(BUNDLENAME)-$(RELEASE).js
	ln -sf $(BUNDLENAME)-$(RELEASE).js Prototype/bundles/$(BUNDLENAME).js
	mkdir -p Prototype/_site/bundles
	cp Prototype/bundles/$(BUNDLENAME)-$(RELEASE).js Prototype/_site/bundles/$(BUNDLENAME).js
	mv bundle.min.js Prototype/bundles/$(BUNDLENAME)-$(RELEASE).min.js
	ln -sf $(BUNDLENAME)-$(RELEASE).min.js Prototype/bundles/$(BUNDLENAME).min.js
	cp Prototype/bundles/$(BUNDLENAME)-$(RELEASE).min.js Prototype/_site/bundles/$(BUNDLENAME).min.js

test-bundle test-bundle.js: $(GENERATED) $(SOURCES) test-build.js stamp-bower
	node_modules/.bin/r.js -o test-build.js


$(PATTERNS)/src/lib/depends_parse.js: $(PATTERNS)/src/lib/depends_parse.pegjs stamp-npm
	$(PEGJS) $<
	sed -i~ -e '1s/.*/define(function() {/' -e '$$s/()//' $@ || rm -f $@

check-clean:
	test -z "$(shell git status --porcelain)" || (git status && echo && echo "Workdir not clean." && false) && echo "Workdir clean."

jsrelease: bundle.js
	# This one is used by make release and can be used separately to do a
	# version for Designers only
	mkdir -p release
	cp Prototype/bundles/$(BUNDLENAME)-$(RELEASE).js release
	tar cfz release/$(BUNDLENAME)-$(RELEASE).js.tar.gz -C release $(BUNDLENAME)-$(RELEASE).js
	curl -X POST -F 'content=@release/$(BUNDLENAME)-$(RELEASE).js.tar.gz' 'http://products.syslab.com/?name=$(BUNDLENAME)&version=$(RELEASE)&:action=file_upload'
	rm release/$(BUNDLENAME)-$(RELEASE).js.tar.gz
	echo "Upload done."
	echo "$(RELEASE)" > LATEST
	git add LATEST
	git commit -m "distupload: updated latest file to recent js bundle"
	git push

autoprefixer:
	node_modules/.bin/grunt css

jekyll:
	cd Prototype; bundle exec jekyll build

dev: jekyll autoprefixer
	# Set up development environment
	# install a require.js config
	cp src/bower_components/requirejs/require.js Prototype/_site/bundles/$(BUNDLENAME)-modular.js
	ln -s ../../../src Prototype/_site/bundles
	ln -s src/patterns.js Prototype/_site/main.js

release: jekyll autoprefixer bundle.js
	# I assume that all html in _site and js in _site/bundles is built and ready for upload
	mkdir -p release/Prototype
	# make sure it is empty
	rm -rf release/Prototype/*
	test "$$(git status --porcelain)x" = "x" || (git status && false)
	cp -R Prototype/_site $(RELEASE_DIR)/
	sed -i -e "s,<script src=\"bundles/$(BUNDLENAME).js\",<script src=\"bundles/$(shell readlink Prototype/bundles/$(BUNDLENAME).js)\"," $(RELEASE_DIR)/_site/*.html
	# Cleaning up non mission critical elements
	rm -f $(RELEASE_DIR)/_site/*-e
	rm -rf $(RELEASE_DIR)/_site/bundles/*
	cp Prototype/bundles/$(BUNDLENAME)-$(RELEASE).js $(RELEASE_DIR)/_site/bundles/
	cp Prototype/bundles/$(BUNDLENAME)-$(RELEASE).min.js $(RELEASE_DIR)/_site/bundles/
	ln -sf $(BUNDLENAME)-$(RELEASE).js $(RELEASE_DIR)/_site/bundles/$(BUNDLENAME).js
	ln -sf $(BUNDLENAME)-$(RELEASE).min.js $(RELEASE_DIR)/_site/bundles/$(BUNDLENAME).min.js
	tar cfz $(RELEASE_TARBALL) -C release Prototype
#   Here we usually copy the complete bundle containing all style, html and js files to the deployment server.
#   This has to be adapted later to create a diazo usable package and put it in place
#	@echo "Copy Prototype archive to gocept servers"
#	ln -sf Prototype-$(RELEASE).tar.gz release/LATEST
#	scp $(RELEASE_TARBALL) release/LATEST webworkstag00.gocept.net:/srv/www/localhost/htdocs/install-archives/deliverance/
#	rm -rf release/Prototype $(RELEASE_TARBALL) release/LATEST
	echo "Please pin the following release id: $(RELEASE)"

clean::
	rm -f bundle.js
	rm -rf Prototype/bundles/*


.PHONY: all bundle clean check jshint tests check-clean release
