/**
 * Auth Bundle
 */
trackingJS.prototype.eventBundles.auth = function() {
    this.dataName = 'auth';
    this.username = '';
    this.userId = '';

    this.init = function init(tracking) {
        this.tracking = tracking;
        console.log('init bundle auth :)');
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