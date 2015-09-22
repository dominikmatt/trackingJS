'use strict';
/*global $ */

var trackingJS = function (options) {
    this.tracking = null;
    this.registeredEvents = [];

    /**
     * default settings
     *
     * @author Dominik Matt <dma@massiveart.com>
     */
    this.settings = $.extend({
        namespace: 'namespace',
        type: 'ua',
        analyticsCode: '',
        url: 'auto',
        pageview: true,
        dataName: 'trackingjs',
        debug: false,
        anonymizeIp: false,
        eventBundles: [],
        set: {}
    }, options);

    var debug = this.settings.debug;

    /**
     * init
     *
     * @author Dominik Matt <dma@massiveart.com>
     */
    var init = function () {
        this.namespace = this.getSetting('namespace');

        loadAdapter();
        loadEventBundles();

        if (this.tracking && typeof this.tracking === 'object') {
            this.tracking.appendAnalyticsJs();
            this.tracking.init(this.namespace, this.getSetting('analyticsCode'), this.getSetting('url'));
            this.setTrackingVars(this.getSetting('set'));

            if(this.getSetting('pageview') === true) {
                this.tracking.pageview(options.name);
            }
            
            this.registerEvents();
        } else {
            throw 'Tracking type not loaded';
        }
    }.bind(this);

    /**
     * loadAdapter
     *
     * @author Dominik Matt <dma@massiveart.com>
     */
    var loadAdapter = function () {
        if (this.getSetting('type') !== '') {
            var className = this.getSetting('type') + 'TrackingJS';

            if (typeof window[className] === 'function') {
                this.tracking = new window[className](this.settings, this.helper);
                return true;
            }
        }

        return false;
    }.bind(this);

    /**
     * @method loadEventBundles
     * @type {*|function(this:trackingJS)}
     */
    var loadEventBundles = function() {
        var eventBundles = this.getSetting('eventBundles');

        if(typeof eventBundles === 'object' && eventBundles.length > 0) {
            for(var key in eventBundles) {
                var bundleName = eventBundles[key];
                if(this.eventBundles[bundleName]) {
                    var bundle = new this.eventBundles[bundleName]();
                    bundle.init(this.tracking, this.settings);
                    this.bundles[bundleName] = bundle;
                }
            }
        }
    }.bind(this);

    /**
     * @method helper
     * @type {Object}
     */
    this.helper = {
        /**
         * @method error
         * @param  {string}  msg
         * @param  {Boolean} isObject 
         */
        error: function (msg, isObject) {
            if (isObject) {
                console.error(msg);
            } else {
                console.error('trackingJS: ' + msg);
            }
        },

        /**
         * @method info
         * @param  {string}  msg      [description]
         * @param  {Boolean} isObject [description]
         */
        info: function (msg, isObject) {
            if (debug) {
                if (isObject) {
                    console.info(msg);
                } else {
                    console.info('trackingJS: ' + msg);
                }
            }
        }
    };


    init();
};

/**
 * @method getSetting
 *
 * @author Dominik Matt <dma@massiveart.com>
 *
 * @param {string} key
 * @returns {mixed}
 */
trackingJS.prototype.getSetting = function (key) {
    if (this.settings[key]) {
        return this.settings[key];
    }

    return false;
};

/**
 * @method registerEvents
 */
trackingJS.prototype.registerEvents = function () {
    var $events = this.getEvents();

    // each all events
    $events.each(function (key, el) {
        var $el = $(el),
            data = $el.data(this.getSetting('dataName'));

        //check if data-trackingjs is a object and have a event (click, mouseover, touch)
        if (typeof data === 'object' && data.event) {
            //register event
            this.registeredEvents.push({
                $el: $el,
                event: data.event
            });

            $el.bind(data.event + '.' + this.namespace + '.trackingJS', function () {
                //get current data
                var sendData = $el.data(this.getSetting('dataName'));

                if (typeof sendData !== 'object') {
                    sendData = $.parseJSON(sendData);
                }
                this.event(sendData.category, sendData.action, sendData.label, sendData.value);
            }.bind(this));
        } else {
            this.helper.info('Wrong data to register Tracking event.');
        }
    }.bind(this));
};

/**
 * get all registerd events
 *
 * @return {object} jquery element
 */
trackingJS.prototype.getEvents = function () {
    var $events = $('*[data-' + this.getSetting('dataName') + ']');

    return $events;
};

/**
 * @method pageview
 *
 * @author Dominik Matt <dma@massiveart.com>
 */
trackingJS.prototype.pageview = function(page, title, callback) {
    this.tracking.pageview(page, title, callback);
};

/**
 * @method event
 *
 * @author Dominik Matt <dma@massiveart.com>
 */
trackingJS.prototype.event = function (category, action, label, value, callback) {
    this.helper.info('Send event: ' + 'category: ' + category + ' / action: ' + action + ' / label: ' + label + ' / value: ' + value);
    this.tracking.event(category, action, label, value, callback);
};

/**
 * @method setTrackingVars
 */
trackingJS.prototype.setTrackingVars = function(vars) {
    if(!!vars) {
        this.tracking.set(vars);
    }
};

/**
 * register eCommerce Plugin
 *
 * @method registerEcomerce
 *
 * @author Dominik Matt <dma@massiveart.com>
 *
 * @type {function(this:trackingJS)}
 */
trackingJS.prototype.registerEcommerce = function () {
    if (typeof this.eCommerce === 'function') {
        this.helper.info('Register eCommerce tracking');
        return new this.eCommerce(this);
    } else {
        this.helper.error('eCommerce plugin not found');
        return false;
    }
};

/**
 * returns all registered events on the browser console
 *
 * @method viewAllEvents
 *
 * @author Dominik Matt <dma@massiveart.com>
 *
 * @type {function(this:trackingJS)}
 */
trackingJS.prototype.viewAllEvents = function () {
    $.each(this.registeredEvents, function (key, el) {
        var $el = $(el),
            sendData = $el.data(this.getSetting('dataName'));

        if (typeof sendData !== 'object') {
            sendData = $.parseJSON(sendData);
        }

        console.log('########## trackingJS event');
        console.log($el.context);
        console.log('Send event on ' + sendData.event + ': ' + 'category: ' + sendData.category + ' / action: ' + sendData.action + ' / label: ' + sendData.label + ' / value: ' + sendData.value);
    }.bind(this));
};

/**
 * updates all events when you change the event type
 *
 * @method updateEvents
 *
 * @author Dominik Matt <dma@massiveart.com>
 *
 * @type {function(this:trackingJS)}
 */
trackingJS.prototype.updateEvents = function () {
    this.resetRegisteredEvents();
    this.registerEvents();
};

/**
 * remove all reegistered events
 * @method resetRegisteredEvents
 */
trackingJS.prototype.resetRegisteredEvents = function() {
    $.each(this.registeredEvents, function(key, item) {
        item.$el.unbind(item.event + '.' + this.namespace + '.trackingJS');
    }.bind(this));

    this.registeredEvents = [];
};

/**
 * @method getNamespace
 *
 * @return {string} namespace
 */
trackingJS.prototype.getNamespace = function () {
    return this.namespace;
};

/**
 * eCommerce plugin
 *
 * @param trackingJS
 * @author Dominik Matt <dma@massiveart.com>
 */
trackingJS.prototype.eCommerce = function (trackingJS) {
    /**
     * transaction
     * @type {Object}
     */
    this.transaction = {
        'id': null,             // Transaction ID. Required.
        'affiliation': '',      // Affiliation or store name.
        'revenue': null,        // Grand Total.
        'shipping': null,       // Shipping.
        'tax': null             // Tax.
    };

    /**
     * items
     * @type {Array}
     */
    this.items = [];

    /**
     * namespace
     * @type {String}
     */
    this.namepsace = '';

    /**
     * @method setNamespace
     * @param {string} namepsace
     */
    this.setNamespace = function (namepsace) {
        this.namepsace = namepsace;
    };

    /**
     * @method getNamespace
     * @return {string} namepsace
     */
    this.getNamespace = function () {
        return this.namepsace;
    };

    /**
     * @method setId
     * @param {string} id
     */
    this.setId = function (id) {
        this.transaction.id = id;
    };

    /**
     * @method setAffiliation
     * @param {int} affiliation
     */
    this.setAffiliation = function (affiliation) {
        this.transaction.affiliation = affiliation;
    };

    /**
     * @method setShipping
     * @param {int} shipping
     */
    this.setShipping = function (shipping) {
        this.transaction.shipping = shipping;
    };

    /**
     * @method setTax
     * @param {int} tax
     */
    this.setTax = function (tax) {
        this.transaction.tax = tax;
    };

    /**
     * @method getRevenue
     * @return {int} total
     */
    this.getRevenue = function () {
        var total = 0;

        $.each(this.getItems(), function(key, item) {
            if(item.price && item.quantity > 0) {
                total += item.price * item.quantity;
            }
        });

        return total;
    };

    /**
     * @method  addItem
     * @param {object} item
     */
    this.addItem = function (item) {
        trackingJS.helper.info('Add item to ecommerce:');
        trackingJS.helper.info(item, true);

        if(typeof item === 'object') {
            if(item.quantity > 0) {
                this.items.push(item);
            }
        } else {
            trackingJS.helper.error('Item must be an object');
        }
    };

    this.send = function () {
        trackingJS.tracking.eCommerce.generate(trackingJS, this);
    }.bind(this);
};

/**
 * getItems
 * returns a object with all items
 *
 * @returns {Array}
 */
trackingJS.prototype.eCommerce.prototype.getItems = function () {
    return this.items;
};

trackingJS.prototype.eventBundles = {};
trackingJS.prototype.bundles = {};



