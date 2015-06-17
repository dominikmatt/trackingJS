'use strict';
/*global $, trackingJS */

/**
 * Example bundle
 */
(function(global, factory) {
    // check if browserify is in use
    if ( typeof module === "object" && typeof module.exports === "object" ) {
        //load jQuery from browserify
        var $ = require('jQuery');
        var trackingJS = require('./../tracking.js');

        // export example-bundle
        trackingJS.prototype.eventBundles.example = factory($, global);
    } else {
        //create example-bundle
        global.trackingJS.prototype.eventBundles.example = factory(global.$ || global.jQuery, global );
    }
})(typeof window !== typeof undefined ? window : this, function($, window) {
    var exampleBundle = function() {
        this.dataName = 'example';
        this.$el = null;

        /**
         * @method init
         */
        this.init = function init(tracking) {
            this.tracking = tracking;
        };
    };

    return exampleBundle;
});