{
    "baseUrl": "src",
    "out": "test-bundle.js",
    "name": "patterns",
    "include": ["patterns"],
    "insertRequire": ["patterns"],

    "wrap": {
        "endfile": "src/wrap-end.js"
    },

    "paths": {
        // Externals
        "jquery": "bower_components/jquery/jquery",
        "logging": "bower_components/logging/src/logging",
        "jquery.form": "bower_components/jquery-form/jquery.form",
        "jquery.anythingslider": "bower_components/AnythingSlider/js/jquery.anythingslider",
        "jquery.validation": "bower_components/jquery.validation/jquery.validate",
        "jquery.validation-additional-methods": "bower_components/jquery.validation/additional-methods",
        "jcrop": "bower_components/jcrop/js/jquery.Jcrop",
        "klass": "bower_components/klass/src/klass",
        "photoswipe": "bower_components/patternslib/src/legacy/photoswipe",
        "parsley": "bower_components/parsleyjs/parsley",
        "parsley.extend": "bower_components/parsleyjs/parsley.extend",
        "modernizr": "bower_components/modernizr/modernizr",
        "dropzone": "bower_components/dropzone/downloads/dropzone",
        "lodash": "bower_components/lodash/lodash",
        "underscore": "bower_components/underscore/underscore",
        "text":  "bower_components/requirejs-text/text",
        "less": "bower_components/less.js/dist/less-1.6.2",
        "prefixfree": "bower_components/prefixfree/prefixfree.min",
        "Markdown.Converter": "bower_components/patternslib/src/legacy/Markdown.Converter",
        "Markdown.Extra": "bower_components/patternslib/src/legacy/Markdown.Extra",
        "Markdown.Sanitizer": "bower_components/patternslib/src/legacy/Markdown.Sanitizer",
        "select2": "bower_components/select2/select2.min",
        "jquery.chosen": "bower_components/chosen/chosen/chosen.jquery",
        "jquery.fullcalendar": "bower_components/fullcalendar/fullcalendar",
        "jquery.fullcalendar.dnd": "bower_components/fullcalendar/lib/jquery-ui.custom.min",
        "jquery.placeholder": "bower_components/jquery-placeholder/jquery.placeholder.min",
        "jquery.textchange": "bower_components/jquery-textchange/jquery.textchange",
        "spectrum": "bower_components/spectrum/spectrum",
        "fine-uploader": "bower_components/fine-uploader/build/jquery.fineuploader",

        // Core
        "pat-utils": "bower_components/patternslib/src/core/utils",
        "pat-compat": "bower_components/patternslib/src/core/compat",
        "pat-jquery-ext": "bower_components/patternslib/src/core/jquery-ext",
        "pat-logger": "bower_components/patternslib/src/core/logger",
        "pat-parser": "bower_components/patternslib/src/core/parser",
        "pat-remove": "bower_components/patternslib/src/core/remove",
        "pat-url": "bower_components/patternslib/src/core/url",
        "pat-store": "bower_components/patternslib/src/core/store",
        "pat-registry": "bower_components/patternslib/src/core/registry",
        "pat-htmlparser": "bower_components/patternslib/src/lib/htmlparser",
        "pat-depends_parse": "bower_components/patternslib/src/lib/depends_parse",
        "pat-dependshandler": "bower_components/patternslib/src/lib/dependshandler",
        "pat-input-change-events": "bower_components/patternslib/src/lib/input-change-events",

        // Patterns
        "pat-ajax": "bower_components/patternslib/src/pat/ajax",
        "pat-autofocus": "bower_components/patternslib/src/pat/autofocus",
        "pat-autoscale": "bower_components/patternslib/src/pat/autoscale",
        "pat-autosubmit": "bower_components/patternslib/src/pat/autosubmit",
        "pat-autosuggest": "bower_components/patternslib/src/pat/autosuggest",
        "pat-breadcrumbs": "bower_components/patternslib/src/pat/breadcrumbs",
        "pat-bumper": "bower_components/patternslib/src/pat/bumper",
        "pat-carousel": "bower_components/patternslib/src/pat/carousel",
        "pat-checkedflag": "bower_components/patternslib/src/pat/checkedflag",
        "pat-checklist": "bower_components/patternslib/src/pat/checklist",
        "pat-chosen": "bower_components/patternslib/src/pat/chosen",
        "pat-collapsible": "bower_components/patternslib/src/pat/collapsible",
        "pat-depends": "bower_components/patternslib/src/pat/depends",
        "pat-equaliser": "bower_components/patternslib/src/pat/equaliser",
        "pat-expandable": "bower_components/patternslib/src/pat/expandable",
        "pat-focus": "bower_components/patternslib/src/pat/focus",
        "pat-formstate": "bower_components/patternslib/src/pat/form-state",
        "pat-forward": "bower_components/patternslib/src/pat/forward",
        "pat-gallery": "bower_components/patternslib/src/pat/gallery",
        "pat-image-crop": "bower_components/patternslib/src/pat/image-crop",
        "pat-inject": "bower_components/patternslib/src/pat/inject",
        "pat-legend": "bower_components/patternslib/src/pat/legend",
        "pat-markdown": "bower_components/patternslib/src/pat/markdown",
        "pat-masonry": "bower_components/patternslib/src/pat/masonry",
        "pat-menu": "bower_components/patternslib/src/pat/menu",
        "pat-modal": "bower_components/patternslib/src/pat/modal",
        "pat-navigation": "bower_components/patternslib/src/pat/navigation",
        "pat-notification": "bower_components/patternslib/src/pat/notification",
        "pat-placeholder": "bower_components/patternslib/src/pat/placeholder",
        "pat-selectbox": "pat/selectbox",
        "pat-skeleton": "bower_components/patternslib/src/pat/skeleton",
        "pat-slides": "bower_components/patternslib/src/pat/slides",
        "pat-slideshow-builder": "bower_components/patternslib/src/pat/slideshow-builder",
        "pat-sortable": "bower_components/patternslib/src/pat/sortable",
        "pat-stacks": "bower_components/patternslib/src/pat/stacks",
        "pat-resourcepolling": "bower_components/pat-resourcepolling/src/pat-resourcepolling",
        "pat-subform": "bower_components/patternslib/src/pat/subform",
        "pat-switch": "bower_components/patternslib/src/pat/switch",
        "pat-toggle": "bower_components/patternslib/src/pat/toggle",
        "pat-tooltip": "bower_components/patternslib/src/pat/tooltip",
        "pat-upload": "bower_components/pat-upload/src/pat-upload",
        "pat-content-mirror": "bower_components/pat-content-mirror/src/pat-content-mirror",
        "pat-validate": "bower_components/patternslib/src/pat/validate",
        "pat-zoom": "bower_components/patternslib/src/pat/zoom",

        // Templates for pat-upload
        "upload": "bower_components/pat-upload/src/templates/upload.xml",
        "preview":  "bower_components/pat-upload/src/templates/preview.xml",

        // Project Patterns
        "patterns": "patterns",

        //Calendar Pattern
        "moment": "bower_components/moment/moment",
        "moment-timezone": "bower_components/moment-timezone/moment-timezone",
        "pat-calendar": "bower_components/pat-calendar/src/calendar",
        "pat-calendar-moment-timezone-data": "bower_components/pat-calendar/src/moment-timezone-data",

        // Pat Masonry
        "doc-ready":            "bower_components/doc-ready",
        "eventEmitter":         "bower_components/eventEmitter",
        "eventie":              "bower_components/eventie",
        "get-size":             "bower_components/get-size",
        "get-style-property":   "bower_components/get-style-property",
        "imagesloaded":         "bower_components/imagesloaded/imagesloaded",
        "masonry":              "bower_components/masonry/masonry",
        "matches-selector":     "bower_components/matches-selector",
        "outlayer":             "bower_components/outlayer",

        "pikaday": "bower_components/pikaday/pikaday",
        "pikaday.jquery": "bower_components/pikaday/plugins/pikaday.jquery"
    },

    "shim": {
        "fine-uploader": { "depends": "jQuery" },
        "jquery": { "exports": "jQuery" },
        "jquery.fullcalendar.dnd": { "depends": "jQuery" },
        "photoswipe": { "depends": "klass" },
        "lodash": { "exports": "_" },
        "underscore": { "exports": "_" }
    },
    "optimize": "none"
}
