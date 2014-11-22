var trackingJS = function(options) {

    this.tracking = null;

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
        debug: true
    }, options);

    /**
     * init
     *
     * @author Dominik Matt <dma@massiveart.com>
     */
    this.init = function() {
        this.loadAdapter();
        if(this.tracking && typeof this.tracking == 'object') {
            this.tracking.appendAnalyticsJs();
            this.tracking.init(settings.namespace, settings.analyticsCode, settings.url, settings.pageview);
        } else {
            throw 'Tracking type not loaded';
        }

    }.bind(this);

    this.getNamespace = function() {
        return settings.namespace;
    };

    /**
     * loadAdapter
     *
     * @author Dominik Matt <dma@massiveart.com>
     */
    this.loadAdapter = function() {
        if(settings.type != '') {
            var className = settings.type + 'TrackingJS'
            if(typeof window[className] == 'function') {
                this.tracking = new window[className]();
                return true;
            }
        }

        return false;
    }.bind(this);

    /**
     * pageview
     *
     * @author Dominik Matt <dma@massiveart.com>
     */
    this.pageview = function(page, title) {
        this.tracking.pageview(settings.namespace, page, title);
    }.bind(this);

    /**
     * event
     *
     * @author Dominik Matt <dma@massiveart.com>
     */
    this.event = function(category, action, label, value) {
        this.helper.info('Send event: ' + 'category: ' + category + ' / action: ' + action + ' / label: ' + label + ' / value: ' + value);
        this.tracking.event(settings.namespace, category, action, label, value);
    }.bind(this);

    this.helper = {
        error: function(msg){
            console.error('trackingJS: ' + msg);
        },

        info: function(msg){
            if(settings.debug) {
                console.info('trackingJS: ' + msg);
            }
        }
    };

    /**
     * register eCommerce Plugin
     *
     * @type {function(this:trackingJS)}
     */
    this.registerEcommerce = function() {
        if(typeof this.eCommerce == 'function') {
            this.helper.info('Register eCommerce tracking');
            return new this.eCommerce(this);
        } else {
            this.helper.error('eCommerce plugin not found');
            return false;
        }
    }.bind(this);

    this.init();

    return {
        pageview: this.pageview,
        event: this.event,
        registerEcommerce: this.registerEcommerce,
        getNamespace: this.getNamespace
    };

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
        trackingJS.helper.info('Add item to ecommerce:', item);
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




