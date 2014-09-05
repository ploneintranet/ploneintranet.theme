BOWER 		?= node_modules/.bin/bower
JSHINT 		?= node_modules/.bin/jshint
PEGJS		?= node_modules/.bin/pegjs
PHANTOMJS	?= node_modules/.bin/phantomjs

PATTERNS	= src/bower_components/patternslib
SOURCES		= $(wildcard $(PATTERNS)/src/*.js) $(wildcard $(PATTERNS)/src/pat/*.js) $(wildcard $(PATTERNS)/src/lib/*.js)
BUNDLES		= bundles/patterns.js bundles/patterns.min.js

GENERATED	= $(PATTERNS)/src/lib/depends_parse.js

JSHINTEXCEPTIONS = $(GENERATED) \
		   $(PATTERNS)/src/lib/dependshandler.js \
		   $(PATTERNS)/src/lib/htmlparser.js \
		   $(PATTERNS)/src/pat/skeleton.js
CHECKSOURCES	= $(filter-out $(JSHINTEXCEPTIONS),$(SOURCES))

RELEASE         = $(shell git describe --tags)
RELEASE_DIR		= release/prototype
RELEASE_TARBALL = release/prototype-$(RELEASE).tar.gz

DIAZO_DIR   = src/ploneintranet/theme/theme

LATEST          = $(shell cat LATEST)
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

#patterns:
#	if test -d src/Patterns; then cd src/Patterns && git pull && cd ../..; else git clone https://github.com/Patternslib/Patterns.git src/Patterns; fi

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

bundle bundle.js: stamp-bower $(GENERATED) $(SOURCES) build.js jekyll
	node_modules/.bin/r.js -o build.js optimize=none
	node_modules/.bin/grunt uglify
	mkdir -p prototype/bundles
	mv bundle.js prototype/bundles/$(BUNDLENAME)-$(RELEASE).js
	ln -sf $(BUNDLENAME)-$(RELEASE).js prototype/bundles/$(BUNDLENAME).js
	mkdir -p prototype/_site/bundles
	cp prototype/bundles/$(BUNDLENAME)-$(RELEASE).js prototype/_site/bundles/$(BUNDLENAME).js
	mv bundle.min.js prototype/bundles/$(BUNDLENAME)-$(RELEASE).min.js
	ln -sf $(BUNDLENAME)-$(RELEASE).min.js prototype/bundles/$(BUNDLENAME).min.js
	cp prototype/bundles/$(BUNDLENAME)-$(RELEASE).min.js prototype/_site/bundles/$(BUNDLENAME).min.js

test-bundle test-bundle.js: $(GENERATED) $(SOURCES) test-build.js stamp-bower
	node_modules/.bin/r.js -o test-build.js


$(PATTERNS)/src/lib/depends_parse.js: $(PATTERNS)/src/lib/depends_parse.pegjs stamp-npm
	$(PEGJS) $<
	sed -i~ -e '1s/.*/define(function() {/' -e '$$s/()//' $@ || rm -f $@

check-clean:
	test -z "$(shell git status --porcelain)" || (git status && echo && echo "Workdir not clean." && false) && echo "Workdir clean."

jsrelease: bundle.js
	# This one is used by developers only and can be used separately to do a
	# version for Designers only
	mkdir -p release
	cp prototype/bundles/$(BUNDLENAME)-$(RELEASE).js release
	tar cfz release/$(BUNDLENAME)-$(RELEASE).js.tar.gz -C release $(BUNDLENAME)-$(RELEASE).js
	curl -X POST -F 'content=@release/$(BUNDLENAME)-$(RELEASE).js.tar.gz' 'http://products.syslab.com/?name=$(BUNDLENAME)&version=$(RELEASE)&:action=file_upload'
	rm release/$(BUNDLENAME)-$(RELEASE).js.tar.gz
	echo "Upload done."
	echo "$(RELEASE)" > LATEST
	git add LATEST
	git commit -m "distupload: updated latest file to recent js bundle"
	git push

designerhappy:
	mkdir -p prototype/bundles
	curl $(BUNDLEURL) -o prototype/bundles/$(BUNDLENAME)-$(LATEST).tar.gz
	cd prototype/bundles && tar xfz $(BUNDLENAME)-$(LATEST).tar.gz && rm $(BUNDLENAME)-$(LATEST).tar.gz
	cd prototype/bundles && if test -e $(BUNDLENAME).js; then rm $(BUNDLENAME).js; fi
	cd prototype/bundles && ln -sf $(BUNDLENAME)-$(LATEST).js $(BUNDLENAME).js
	echo "The latest js bundle has been downloaded to prototype/bundles. You might want to run jekyll. Designer, you can be happy now."


gems:
	cd prototype; bundle install

jekyll: gems
	cd prototype; bundle exec jekyll build

dev: jekyll
	# Set up development environment
	# install a require.js config
	cp src/bower_components/requirejs/require.js prototype/_site/bundles/$(BUNDLENAME)-modular.js
	ln -s ../../../src prototype/_site/bundles
	ln -s src/patterns.js prototype/_site/main.js

diazo release: jekyll bundle.js
	# Bundle all html, css and js into a deployable package.
	# I assume that all html in _site and js in _site/bundles is built and
	# ready for upload.
	# CAVE: This is currently work in progress and was used to deploy to deliverance
	# We will most probably rewrite this to deploy all necessary resources
	# for diazo into egg format (Yet to be decided how)
	#
	mkdir -p release/prototype
	# make sure it is empty
	rm -rf release/prototype/*
	# test "$$(git status --porcelain)x" = "x" || (git status && false)
	cp -R prototype/_site $(RELEASE_DIR)/
	sed -i -e "s,<script src=\"bundles/$(BUNDLENAME).js\",<script src=\"bundles/$(shell readlink prototype/bundles/$(BUNDLENAME).js)\"," $(RELEASE_DIR)/_site/*.html
	# Cleaning up non mission critical elements
	rm -f $(RELEASE_DIR)/_site/*-e
	rm -rf $(RELEASE_DIR)/_site/bundles/*
	cp prototype/bundles/$(BUNDLENAME)-$(RELEASE).js $(RELEASE_DIR)/_site/bundles/
	cp prototype/bundles/$(BUNDLENAME)-$(RELEASE).min.js $(RELEASE_DIR)/_site/bundles/
	ln -sf $(BUNDLENAME)-$(RELEASE).js $(RELEASE_DIR)/_site/bundles/$(BUNDLENAME).js
	ln -sf $(BUNDLENAME)-$(RELEASE).min.js $(RELEASE_DIR)/_site/bundles/$(BUNDLENAME).min.js
	# copy to the diazo theme dir
	cp -R prototype/_site/* $(DIAZO_DIR)/

clean::
	rm -f bundle.js
	rm -rf prototype/bundles/*


.PHONY: all bundle clean check jshint tests check-clean release
