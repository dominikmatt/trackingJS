'use strict';
/*global $, trackingJS */

/**
 * form Bundle
 *
 * @author Dominik Matt <mail@matt-dominik.at>
 */
(function(global, factory) {
    // check if browserify is in use
    if ( typeof module === "object" && typeof module.exports === "object" ) {
        //load jQuery from browserify
        var $ = require('jQuery');
        var trackingJS = require('./../tracking.js');

        // export form-bundle
        trackingJS.prototype.eventBundles.form = factory($, global);
    } else {
        //create form-bundle
        global.trackingJS.prototype.eventBundles.form = factory(global.$ || global.jQuery, global );
    }
})(typeof window !== typeof undefined ? window : this, function($, window) {
    var formBundle = function() {
        this.bundleName = 'form';

        var tracking,
            settings = {};

        /**
         * @method init
         *
         * @param tracking
         */
        this.init = function init(origTracking, origSettings) {
            tracking = origTracking;
            settings = origSettings;
            setDefaultSettings();
            bindEvents();
        };

        /**
         * @method bindDomEvents
         */
        var bindEvents = function() {
            $(document).delegate('form', 'submit', formSendHandler);
        };

        var setDefaultSettings = function() {
            if (!settings.formBundle) {
                settings.formBundle = {
                    formEnableDataName: 'form-auto-track'
                };
            }
        };

        /**
         * @method formSendHandler
         *
         * @param {jQuery} event
         * @returns {boolean}
         */
        var formSendHandler = function(event) {
            var $form = $(event.currentTarget),
                data = getFormData($form);

            if (typeof data.enabled !== 'undefined') {
                trackNewsletterHandler($form);
                tracking.event(data.name, data.name + ' - Send success', 'Form: ' + data.name + ' send success');
            }
        };

        /**
         * @method trackNewsletterHandler
         *
         * @type {function(this:trackingJS.prototype.eventBundles)}
         */
        var trackNewsletterHandler = function($form) {
            var $nlEl = $form.find('[data-form-newsletter]:checked'),
                data = getFormData($form);

            if ($nlEl.length > 0) {
                $nlEl.each(function(key, item) {
                    var $el = $(item),
                        name = $el.data('form-newsletter-name');

                    if (!name || name === '') {
                        name = data.name;
                    }

                    this.newsletter.signup(name);
                }.bind(this));
            }
        }.bind(this);

        /**
         * @method send
         *
         * @param $form
         */
        this.send = function($form, callback) {
            var data = getFormData($form),
                done = callback || $.noop;
            trackNewsletterHandler($form);
            tracking.event(data.name, data.name + ' - Send success', 'Form: ' + data.name + ' send success', null, done);
        };

        /**
         * @method sendFailed
         *
         * @param $form
         */
        this.sendFailed = function($form) {
            var data = getFormData($form);

            tracking.event(data.name, data.name + ' - Send failed', 'Form: ' + data.name + ' send failed');
        };

        /**
         * @constructor
         * @type {{signup: Function}}
         */
        this.newsletter = {
            /**
             * @method signup
             *
             * @param name
             * @param callback
             */
            signup: function(name, callback) {
                if (typeof callback !== 'function') {
                    callback = function() {
                    };
                }

                tracking.event('Newsletter', 'Newsletter - Sign-Up', 'Newsletter: ' + name + ' sign-up success', null, callback);
            },

            /**
             * @method signupFailed
             *
             * @param name
             * @param callback
             */
            signupFailed: function(name, callback) {
                if (typeof callback !== 'function') {
                    callback = function() {
                    };
                }

                tracking.event('Newsletter', 'Newsletter - Sign-Up', 'Newsletter: ' + name + ' sign-up failed', null, callback);
            },

            /**
             * @method signoff
             *
             * @param name
             * @param callback
             */
            signoff: function(name, callback) {
                if (typeof callback !== 'function') {
                    callback = function() {
                    };
                }

                tracking.event('Newsletter', 'Newsletter - Sign-Off', 'Newsletter: ' + name + ' sign-off', null, callback);
            }
        };

        /**
         * @method getFormData
         *
         * @param $form
         * @returns {{name: *}}
         */
        var getFormData = function($form) {
            var data = {
                enabled: $form.data(settings.formBundle.formEnableDataName),
                name: $form.data('form-name')
            };

            return data;
        };

    };

    return formBundle;
});