
var uaTrackingJS = function() {
    /**
     * initialize
     */
    this.init = function (namespace, code, url, pageview) {
        var options = {
                name: namespace
            };

        ga('create', code, url, options);
        ga('set', 'anonymizeIp', true);
        if(pageview === true) {
            this.pageview();
        }
    }.bind(this),

    /**
     * includes the ua analytics js
     */
    this.appendAnalyticsJs = function () {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    }

    return {
        init: this.init,
        appendAnalyticsJs: this.appendAnalyticsJs,
        pageview: this.pageview,
        event: this.event,
        eCommerce: this.eCommerce
    }
};

/**
 * uaTrackingJS
 *
 * @param page
 * @param title
 */
uaTrackingJS.prototype.pageview = function(namespace, page, title) {
    var options = {};


    if(page) {
        options.page = page;
    }

    if(title) {
        options.title = title;
    }


    ga(namespace + '.send', 'pageview', options);
};

/**
 * uaTrackingJS
 *
 * @param category
 * @param action
 * @param label
 * @param value
 */
uaTrackingJS.prototype.event = function(namespace, category, action, label, value) {
    var options = {
        'hitType': 'event',
        eventCategory: category,
        eventAction: action
    };

    if(label && label != '') {
        options.eventLabel = label;
    }

    if(value && value != '' && !isNaN(value)) {
        options.eventValue = value;
    }

    ga(namespace + '.send', options);
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
        if(ec.transaction.id && ec.transaction.id != '') {
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

    addItems: function() {
        $.each(this.ec.getItems(), function(key, item) {
            if (item.id && item.name && item.id != '' && item.name != '') {
                var options = {
                    'id': item.id,
                    'name': item.name
                };

                if(item.sku && item.sku != '') {
                    options.sku = item.sku
                }

                if(item.category && item.category != '') {
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