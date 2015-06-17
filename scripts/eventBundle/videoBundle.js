'use strict';
/*global trackingJS */

/**
 * video Bundle
 *
 * @author Dominik Matt <mail@matt-dominik.at>
 */
(function(global, factory) {
    // check if browserify is in use
    if ( typeof module === "object" && typeof module.exports === "object" ) {
        //load jQuery from browserify
        var $ = require('jQuery');
        var trackingJS = require('./../tracking.js');

        // export video-bundle
        trackingJS.prototype.eventBundles.video = factory($, global);
    } else {
        //create video-bundle
        global.trackingJS.prototype.eventBundles.video = factory(global.$ || global.jQuery, global );
    }
})(typeof window !== typeof undefined ? window : this, function($, window) {
    var videoBundle = function() {
        this.bundleName = 'video';
        this.videoEl = document.getElementsByTagName('video');

        //on stop video the video api trigger onpause and onstop
        var pauseTimeout,
            tracking;

        /**
         * @method init
         *
         * @param tracking
         */
        this.init = function init(t) {
            tracking = t;
            bindEvents();
        };

        /**
         * @method bindEvents
         */
        var bindEvents = function() {
            for (var key = 0; key < this.videoEl.length; key++) {
                videoHandler.call(this.videoEl[key]);
            }
        }.bind(this);

        var videoHandler = function() {
            this.onplay = playHandler;
            this.onended = endHandler;
            this.onpause = pauseHandler;
        };

        /**
         * @method playHandler
         */
        var playHandler = function() {
            console.log(tracking);
            tracking.event(
                'Video',
                'Video - Play',
                'Video: ' + getSource.call(this), this.currentTime
            );
        };

        /**
         * @method pauseHandler
         */
        var pauseHandler = function() {
            pauseTimeout = setTimeout(function() {
                tracking.event(
                    'Video',
                    'Video - Pause',
                    'Video: ' + getSource.call(this), this.currentTime
                );
            }.bind(this), 50);
        };

        /**
         * @method endHandler
         */
        var endHandler = function() {
            clearTimeout(pauseTimeout);
            tracking.event(
                'Video',
                'Video - Stop',
                'Video: ' + getSource.call(this), this.currentTime
            );
        };

        /**
         * @method getSource
         *
         * @returns {string}
         */
        var getSource = function() {
            var source = this.currentSrc.split('/');

            return source[source.length - 1];
        };

        /**
         * @method registerVideo
         *
         * @param id
         */
        this.registerVideo = function(id) {
            var video = document.getElementById(id);
            videoHandler.call(video);
        };
    };

    return videoBundle;
});