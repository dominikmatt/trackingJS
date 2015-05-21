'use strict';
/*global ga, $ */

var uaTrackingJS = function(trackingJSOptions, trackingJSHelper) {
    /**
     * initialize
     */
    this.init = function (namespace, code, url) {
        this.namespace = namespace;
        var options = {
                name: namespace
            };

        ga('create', code, url, options);

        if(trackingJSOptions.anonymizeIp === true) {
            trackingJSHelper.info(options.name + ' ip is anonymous');
            ga(namespace + '.set', 'anonymizeIp', true);
        } else {
            trackingJSHelper.info(options.name + ' ip is not anonymous');
        }
    }.bind(this);

    /**
     * includes the ua analytics js
     */
    this.appendAnalyticsJs = function () {
        /* jshint ignore:start */
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga'); 
        /* jshint ignore:end */
    };
};

/**
 * uaTrackingJS
 *
 * @param page
 * @param title
 */
uaTrackingJS.prototype.pageview = function(page, title, callback) {
    var options = {};


    if(page) {
        options.page = page;
    }

    if(title) {
        options.title = title;
    }

    if(typeof callback === 'function') {
        options.hitCallback = function() {
            callback(null, 'sended');
        };
    }


    ga(this.namespace + '.send', 'pageview', options);
};

/**
 * uaTrackingJS
 *
 * @param category
 * @param action
 * @param label
 * @param value
 */
uaTrackingJS.prototype.event = function(category, action, label, value, callback) {
    var options = {
        'hitType': 'event',
        eventCategory: category,
        eventAction: action
    };

    if(label && label !== '') {
        options.eventLabel = label;
    }

    if(value && value !== '' && !isNaN(value)) {
        options.eventValue = value;
    }

    if(typeof callback === 'function') {
        options.hitCallback = function() {
            callback(null, 'sended');
        };
    }

    ga(this.namespace + '.send', options);
};

/**
 * eCommerce plugin
 *
 * @type {{generate: Function, addTransaction: Function, addItems: Function}}
 */
uaTrackingJS.prototype.eCommerce = {

    trackingJs: null,
    ec: null,

    generate: function(trackingJS, ec) {
        this.trackingJS = trackingJS;
        this.ec = ec;
        if(ec.transaction.id && ec.transaction.id !== '') {
            //enable ecommerce
            ga(this.trackingJS.getNamespace() + '.require', 'ecommerce');
            this.addTransaction();
            this.addItems();
            this.send();
        } else {
            this.trackingJS.helper.error('Transaction ID is required');
        }
    },

    addTransaction: function() {

        var options = {
            id: this.ec.transaction.id,
            revenue: this.ec.getRevenue()
        };

        if(this.ec.transaction.affiliation) {
            options.affiliation = this.ec.transaction.affiliation;
        }

        if(this.ec.transaction.shipping) {
            options.shipping = this.ec.transaction.shipping;
        }

        if(this.ec.transaction.tax) {
            options.tax = this.ec.transaction.tax;
        }


        ga(this.trackingJS.getNamespace() + '.ecommerce:addTransaction', options);
    },

    /**
     * @method  addItems
     */
    addItems: function() {
        $.each(this.ec.getItems(), function(key, item) {
            if (item.id && item.name && item.id !== '' && item.name !== '') {
                var options = {
                    'id': item.id,
                    'name': item.name
                };

                if(item.sku && item.sku !== '') {
                    options.sku = item.sku;
                }

                if(item.category && item.category !== '') {
                    options.category = item.category;
                }

                if(item.price && !isNaN(item.price)) {
                    options.price = item.price;
                }

                if(item.quantity && !isNaN(item.quantity)) {
                    options.quantity = item.quantity;
                }

                ga(this.trackingJS.getNamespace() + '.ecommerce:addItem', options);
            } else {
                this.trackingJS.helper.error('ID and NAME of a item are required');
            }
        }.bind(this));
    },

    send: function() {
        ga(this.trackingJS.getNamespace() + '.ecommerce:send');
    }
};

/**
 * setUserId
 *
 * @param userId
 */
uaTrackingJS.prototype.setUserId = function(userId) {
    ga(this.namespace + '.set', 'userId', userId);
};

/**
 * @method set
 *
 * @param {string} key
 * @param {string} value
 */
uaTrackingJS.prototype.set = function(set) {
    if(typeof set === 'object') {
        ga(this.namespace + '.set', set);
    }
};