var trackingJS = function(options) {

    this.tracking = null;
    this.registeredEvents = [];

    /**
     * default settings
     *
     * @author Dominik Matt <dma@massiveart.com>
     */
    var settings = $.extend({
        namespace: 'namespace',
        type: 'ua',
        analyticsCode: '',
        url: 'auto',
        pageview: true,
        dataName: 'trackingjs',
        debug: true,
        anonymizeIp: false,
        eventBundles: []
    }, options);

    /**
     * init
     *
     * @author Dominik Matt <dma@massiveart.com>
     */
    var init = function() {
        this.namespace = settings.namespace;

        checkDebug();

        loadAdapter();
        loadEventBundels();
        if(this.tracking && typeof this.tracking == 'object') {
            this.tracking.appendAnalyticsJs();
            this.tracking.init(settings.namespace, settings.analyticsCode, settings.url, settings.pageview);
            this.registerEvents();
        } else {
            throw 'Tracking type not loaded';
        }

    }.bind(this);

    /**
     * @method getSetting
     *
     * @author Dominik Matt <dma@massiveart.com>
     *
     * @param key
     * @returns {*}
     */
    this.getSetting = function(key) {
        if(settings[key]) {
            return settings[key];
        }
    };

    /**
     * set the debug param to true if has "#trackingJSDebug" is set in the url
     *
     * @method checkDebug
     *
     * @author Dominik Matt <dma@massiveart.com>
     */
    var checkDebug = function() {
        if(location.hash == '#trackingJSDebug') {
            settings.debug = true;
        }
    };

    /**
     * loadAdapter
     *
     * @author Dominik Matt <dma@massiveart.com>
     */
    var loadAdapter = function() {
        if(settings.type != '') {
            var className = settings.type + 'TrackingJS'
            if(typeof window[className] == 'function') {
                this.tracking = new window[className](settings, this.helper);
                return true;
            }
        }

        return false;
    }.bind(this);



    this.helper = {
        error: function(msg, isObject) {
            if(isObject) {
                console.error(msg);
            } else {
                console.error('trackingJS: ' + msg);
            }
        },

        info: function(msg, isObject){
            if(settings.debug) {
                if(isObject) {
                    console.info(msg);
                } else {
                    console.info('trackingJS: ' + msg);
                }
            }
        }
    };



    /**
     * get all registerd events
     *
     * @type {function(this:trackingJS)}
     */
    var getEvents = function() {
        $events = $('*[data-' + settings.dataName + ']');
        return $events;
    }.bind(this);

    /**
     *
     * @type {function(this:trackingJS)}
     */
    this.registerEvents = function() {
        var $events = getEvents(),
            data = null;

        // each all events
        $events.each(function(key, el) {
            var $el = $(el),
                data = $el.data(settings.dataName);

            //check if data-trackingjs is a object and have a event (click, mouseover, touch)
            if(typeof data == 'object' && data.event) {

                //register event
                this.registeredEvents.push($el);
                $el.bind(data.event + '.trackingJS', function() {
                    //get current data
                    var sendData = $el.data(settings.dataName);
                    if(!typeof sendData == 'object') {
                        sendData = $.parseJSON(sendData);
                    }
                    this.event(sendData.category, sendData.action, sendData.label, sendData.value);
                }.bind(this));


            } else {
                this.helper.info('Wrong data to register Tracking event.');
            }

        }.bind(this));
    }.bind(this);

    var loadEventBundels = function() {
        if(settings.eventBundles && typeof settings.eventBundles == 'object' && settings.eventBundles.length > 0) {
            for(var key in settings.eventBundles) {
                var bundleName = settings.eventBundles[key];
                if(this.eventBundles[bundleName]) {
                    var bundle = new this.eventBundles[bundleName]();
                    bundle.init();
                    bundle.select(function($el) {
                        if($el && $el.length > 0) {
                            console.log($el);
                        }
                    });
                }
            }
        }
    }.bind(this);


    init();
};

/**
 * @method pageview
 *
 * @author Dominik Matt <dma@massiveart.com>
 */
trackingJS.prototype.pageview = function(page, title) {
    this.tracking.pageview(this.getNamespace(), page, title);
};

/**
 * @method event
 *
 * @author Dominik Matt <dma@massiveart.com>
 */
trackingJS.prototype.event = function(category, action, label, value) {
    this.helper.info('Send event: ' + 'category: ' + category + ' / action: ' + action + ' / label: ' + label + ' / value: ' + value);
    this.tracking.event(this.getNamespace(), category, action, label, value);
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
trackingJS.prototype.registerEcommerce = function() {
    if(typeof this.eCommerce == 'function') {
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
trackingJS.prototype.viewAllEvents = function() {
    $.each(this.registeredEvents, function(key, el) {
        var $el = $(el),
            sendData = $el.data(this.getSetting('dataName'));

        if(!typeof sendData == 'object') {
            sendData = $.parseJSON(sendData);
        }

        console.log('########## trackingJS event');
        console.log($el.context);
        console.log('Send event on ' + sendData.event + ': ' + 'category: ' + sendData.category + ' / action: ' + sendData.action + ' / label: ' + sendData.label + ' / value: ' + sendData.value)
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
trackingJS.prototype.updateEvents = function() {
    //reset registered events
    this.registeredEvents = [];
    this.registerEvents();
};

trackingJS.prototype.getNamespace = function() {
    return this.namespace;
};




/**
 * eCommerce plugin
 *
 * @param trackingJS
 * @author Dominik Matt <dma@massiveart.com>
 */
trackingJS.prototype.eCommerce = function(trackingJS) {

    this.transaction = {
        'id': null,             // Transaction ID. Required.
        'affiliation': '',      // Affiliation or store name.
        'revenue': null,        // Grand Total.
        'shipping': null,       // Shipping.
        'tax': null             // Tax.
    };

    this.items = [];

    this.namepsace = '';

    this.setNamespace = function(namepsace) {
        this.namepsace = namepsace;
    };

    this.getNamespace = function() {
        return this.namepsace;
    };

    this.setId = function(id) {
        this.transaction.id = id;
    };

    this.setAffiliation = function(affiliation) {
        this.transaction.affiliation = affiliation;
    };

    this.setShipping = function(shipping) {
        this.transaction.shipping = shipping;
    };

    this.setTax = function(tax) {
        this.transaction.tax = tax;
    };

    this.getRevenue = function() {
        var total = 0;
        $.each(this.getItems(), function(key, item) {
            if(item.price) {
                total += item.price;
            }
        });

        return total;
    };

    this.addItem = function(item) {
        trackingJS.helper.info('Add item to ecommerce:');
        trackingJS.helper.info(item, true);
        if(typeof item == 'object') {
            this.items.push(item);
        } else {
            trackingJS.helper.error('Item must be an object');
        }
    };

    this.send = function() {
        trackingJS.tracking.eCommerce.generate(trackingJS, this);
    }.bind(this);

};

/**
 * getItems
 * returns a object with all items
 *
 * @returns {Array}
 */
trackingJS.prototype.eCommerce.prototype.getItems = function() {
    return this.items;
};

trackingJS.prototype.eventBundles = {};



