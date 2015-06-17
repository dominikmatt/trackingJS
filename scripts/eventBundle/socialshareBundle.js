/**
 * socialshare Bundle
 *
 * @author Phuc Le <info@phuc.at>
 */
(function(global, factory) {
    // check if browserify is in use
    if ( typeof module === "object" && typeof module.exports === "object" ) {
        //load jQuery from browserify
        var $ = require('jQuery');
        var trackingJS = require('./../tracking.js');

        // export socialshare-bundle
        trackingJS.prototype.eventBundles.socialshare = factory($, global);
    } else {
        //create socialshare-bundle
        global.trackingJS.prototype.eventBundles.socialshare = factory(global.$ || global.jQuery, global );
    }
})(typeof window !== typeof undefined ? window : this, function($, window) {
    var socialshareBundle = function() {
        this.bundleName = 'socialshare';

        /**
         * @mehtod init
         *
         * @param tracking
         */
        this.init = function init(tracking) {
            this.tracking = tracking;
            bindDomEvents();
        };

        /**
         * @method bindDomEvents
         *
         * @type {function(this:trackingJS.prototype.eventBundles)}
         */
        var bindDomEvents = function() {
            $('body').on('click', '[data-type="share"]', socialshareHandler.bind(this));
        }.bind(this);

        /**
         * @method socialshareHandler
         *
         * @param event
         */
        var socialshareHandler = function(event) {
            var $el = $(event.currentTarget),
                platform = $el.data('platform');

            this.tracking.event(
                'Social Media',
                'Social Media - ' + platform + ' Share',
                'Social Media: ' + platform + ' Share'
            );
        }
    };

    return socialshareBundle;
});