/**
 * form Bundle
 *
 * @author Dominik Matt <mail@matt-dominik.at>
 */
trackingJS.prototype.eventBundles.form = function() {
    this.bundleName = 'form';

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
     * @method bindDomEvents
     */
    var bindEvents = function() {
        $( document ).delegate( 'form', 'submit', formSendHandler);
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

        trackNewsletterHandler($form);
        tracking.event(data.name, data.name + ' - Send success', 'Form: ' + data.name + ' send success');
    };

    /**
     * @method trackNewsletterHandler
     *
     * @type {function(this:trackingJS.prototype.eventBundles)}
     */
    var trackNewsletterHandler = function($form) {
        var $nlEl = $form.find('[data-form-newsletter]:checked'),
            data = getFormData($form);

        if($nlEl.length > 0) {
            $nlEl.each(function(key, item){
                var $el = $(item),
                    name = $el.data('form-newsletter-name');

                if(!name || name == '') name = data.name;

                this.newsletter.signup(name);
            }.bind(this));
        }
    }.bind(this);

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
            if(typeof callback != 'function') callback = function() {}
            tracking.event('Newsletter', 'Newsletter - Sign-Up', 'Newsletter: '+ name + ' sign-up success', null, callback);
        },

        /**
         * @method signupFailed
         *
         * @param name
         * @param callback
         */
        signupFailed: function(name, callback) {
            if(typeof callback != 'function') callback = function() {}
            tracking.event('Newsletter', 'Newsletter - Sign-Up', 'Newsletter: '+ name + ' sign-up failed', null, callback);
        },

        /**
         * @method signoff
         *
         * @param name
         * @param callback
         */
        signoff: function(name, callback) {
            if(typeof callback != 'function') callback = function() {}
            tracking.event('Newsletter', 'Newsletter - Sign-Off', 'Newsletter: '+ name + ' sign-off', null, callback);
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
                name: $form.data('form-name')
            };

        return data;
    }

};