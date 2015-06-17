'use strict';
/*global trackingJS */

/**
 * Auth Bundle
 */
(function(global, factory) {
    // check if browserify is in use
    if ( typeof module === "object" && typeof module.exports === "object" ) {
        //load jQuery from browserify
        var $ = require('jQuery');
        var trackingJS = require('./../tracking.js');

        //create auth-bundle
        trackingJS.prototype.eventBundles.auth = factory($, global);
    } else {
        //create auth-bundle
        global.trackingJS.prototype.eventBundles.auth = factory(global.$ || global.jQuery, global );
    }
})(typeof window !== typeof undefined ? window : this, function($, window) {
    var authBundle = function() {
        this.dataName = 'auth';
        this.username = '';
        this.userId = '';

        this.init = function init(tracking) {
            this.tracking = tracking;
        };

        this.setData = function setData(username, userId) {
            this.username = username;
            this.userId = userId;
        };

        this.signin = function signin() {
            this.tracking.event('User', 'User - Signin', 'Success: ' + this.username);
            this.tracking.setUserId(this.userId);
        };

        this.signout = function signout() {
            this.tracking.event('User', 'User - Signout', 'Success: ' + this.username);
            this.tracking.setUserId('');
        };

        this.signup = function signup() {
            this.tracking.event('User', 'User - Signup', 'Success: ' + this.username);
        };
    };

    return authBundle;
});