{
    baseUrl: "src",
    out: "bundle.js",
    name: "almond",
    include: ["patterns"],
    insertRequire: ["patterns"],

    wrap: {
        endfile: "src/wrap-end.js"
    },

    paths: {
        // Externals
        "almond": "bower_components/almond/almond",
        "jquery": "bower_components/jquery/jquery",
        "logging": "bower_components/logging/src/logging",
        "jquery.form": "bower_components/jquery-form/jquery.form",
        "jquery.anythingslider": "bower_components/AnythingSlider/js/jquery.anythingslider",
        "jquery.validation": "bower_components/jquery.validation/jquery.validate",
        "jquery.validation-additional-methods": "bower_components/jquery.validation/additional-methods",
        "jcrop": "bower_components/jcrop/js/jquery.Jcrop",
        "klass": "bower_components/klass/src/klass",
        "photoswipe": "Patterns/src/legacy/photoswipe",
        "parsley": "bower_components/parsleyjs/parsley",
        "parsley.extend": "bower_components/parsleyjs/parsley.extend",
        "modernizr": "bower_components/modernizr/modernizr",
        "less": "bower_components/less.js/dist/less-1.6.2",
        "prefixfree": "bower_components/prefixfree/prefixfree.min",
        "Markdown.Converter": "Patterns/src/legacy/Markdown.Converter",
        "Markdown.Extra": "Patterns/src/legacy/Markdown.Extra",
        "Markdown.Sanitizer": "Patterns/src/legacy/Markdown.Sanitizer",
        "select2": "bower_components/select2/select2.min",
        "jquery.chosen": "bower_components/chosen/chosen/chosen.jquery",
        "jquery.fullcalendar": "bower_components/fullcalendar/fullcalendar",
        "jquery.fullcalendar.dnd": "bower_components/fullcalendar/lib/jquery-ui.custom.min",
        "jquery.placeholder": "bower_components/jquery-placeholder/jquery.placeholder.min",
        "jquery.textchange": "bower_components/jquery-textchange/jquery.textchange",
        "spectrum": "bower_components/spectrum/spectrum",

        // Core
        "pat-utils": "Patterns/src/core/utils",
        "pat-compat": "Patterns/src/core/compat",
        "pat-jquery-ext": "Patterns/src/core/jquery-ext",
        "pat-logger": "Patterns/src/core/logger",
        "pat-parser": "Patterns/src/core/parser",
        "pat-remove": "Patterns/src/core/remove",
        "pat-url": "Patterns/src/core/url",
        "pat-store": "Patterns/src/core/store",
        "pat-registry": "Patterns/src/core/registry",
        "pat-htmlparser": "Patterns/src/lib/htmlparser",
        "pat-depends_parse": "Patterns/src/lib/depends_parse",
        "pat-dependshandler": "Patterns/src/lib/dependshandler",
        "pat-input-change-events": "Patterns/src/lib/input-change-events",

        // Patterns
        "pat-ajax": "Patterns/src/pat/ajax",
        "pat-autofocus": "Patterns/src/pat/autofocus",
        "pat-autoscale": "Patterns/src/pat/autoscale",
        "pat-autosubmit": "Patterns/src/pat/autosubmit",
        "pat-autosuggest": "pat/autosuggest",
        "pat-breadcrumbs": "Patterns/src/pat/breadcrumbs",
        "pat-bumper": "Patterns/src/pat/bumper",
        "pat-carousel": "Patterns/src/pat/carousel",
        "pat-checkedflag": "Patterns/src/pat/checkedflag",
        "pat-checklist": "Patterns/src/pat/checklist",
        "pat-chosen": "Patterns/src/pat/chosen",
        "pat-collapsible": "Patterns/src/pat/collapsible",
        "pat-depends": "Patterns/src/pat/depends",
        "pat-equaliser": "Patterns/src/pat/equaliser",
        "pat-expandable": "Patterns/src/pat/expandable",
        "pat-focus": "Patterns/src/pat/focus",
        "pat-formstate": "Patterns/src/pat/form-state",
        "pat-forward": "Patterns/src/pat/forward",
        "pat-gallery": "Patterns/src/pat/gallery",
        "pat-image-crop": "Patterns/src/pat/image-crop",
        "pat-inject": "Patterns/src/pat/inject",
        "pat-legend": "Patterns/src/pat/legend",
        "pat-markdown": "Patterns/src/pat/markdown",
        "pat-menu": "Patterns/src/pat/menu",
        "pat-modal": "Patterns/src/pat/modal",
        "pat-navigation": "Patterns/src/pat/navigation",
        "pat-notification": "Patterns/src/pat/notification",
        "pat-placeholder": "Patterns/src/pat/placeholder",
        "pat-selectbox": "pat/selectbox",
        "pat-skeleton": "Patterns/src/pat/skeleton",
        "pat-slides": "Patterns/src/pat/slides",
        "pat-slideshow-builder": "Patterns/src/pat/slideshow-builder",
        "pat-sortable": "Patterns/src/pat/sortable",
        "pat-stacks": "Patterns/src/pat/stacks",
        "pat-subform": "Patterns/src/pat/subform",
        "pat-switch": "Patterns/src/pat/switch",
        "pat-toggle": "Patterns/src/pat/toggle",
        "pat-tooltip": "Patterns/src/pat/tooltip",
        "pat-validate": "Patterns/src/pat/validate",
        "pat-zoom": "Patterns/src/pat/zoom",

        // Project Patterns
        "patterns": "patterns",

        //Calendar Pattern
        "moment": "bower_components/moment/moment",
        "moment-timezone": "bower_components/moment-timezone/moment-timezone",
        "pat-calendar": "bower_components/pat-calendar/src/calendar",
        "pat-calendar-moment-timezone-data": "bower_components/pat-calendar/src/moment-timezone-data",

        // Pat Packery
        "classie/classie": "bower_components/classie/classie",
        "get-style-property/get-style-property": "bower_components/get-style-property/get-style-property",
        "get-size/get-size": "bower_components/get-size/get-size",
        "eventie/eventie": "bower_components/eventie/eventie",
        "doc-ready/doc-ready": "bower_components/doc-ready/doc-ready",
        "eventEmitter/EventEmitter": "bower_components/eventEmitter/EventEmitter",
        "imagesloaded": "bower_components/imagesloaded/imagesloaded",
        "outlayer/outlayer": "bower_components/outlayer/outlayer",
        "outlayer/item": "bower_components/outlayer/item",
        "jQuery.bridget": "bower_components/jquery-bridget/jquery-bridget",
        "matches-selector/matches-selector": "bower_components/matches-selector/matches-selector",
        "rect": "bower_components/packery/js/rect",
        "packer": "bower_components/packery/js/packer",
        "item": "bower_components/packery/js/item",
        "packery": "bower_components/packery/js/packery",
        "pat-packery": "bower_components/pat-packery/src/pat-packery",

    },

    "shim": {
        "jquery": {
            "exports": "jQuery"
        },
        "jquery.fullcalendar.dnd": {
            "depends": "jQuery"
        },
        "photoswipe": {
            "depends": "klass"
        },
    },

    optimize: "none"
}
