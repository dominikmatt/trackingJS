'use strict';
/*global $ */

var multiTrackJS = {

    instances: [],
    eCommerce: [],

    register: function(trackingJS) {
        this.instances.push(trackingJS);
    },

    pageview: function(page, title) {
        $.each(this.instances, function(key, item) {
            item.pageview(page, title);
        });
    },

    event: function(category, action, label, value) {
        $.each(this.instances, function(key, item) {
            item.event(category, action, label, value);
        });
    },

    updateEvents: function() {
        $.each(this.instances, function(key, item) {
            item.updateEvents();
        });
    },

    registerEcommerce: function() {

        this.eCommerceInstances =  [];
        this.id = null;

        this.init = function() {
            $.each(multiTrackJS.instances, function(key, item) {
                var instance = item.registerEcommerce();
                this.eCommerceInstances.push(instance);
                this.eCommerceInstances[key].setNamespace(item.getNamespace());
            }.bind(this));

        }.bind(this);

        this.setId = function(id) {
            $.each(this.eCommerceInstances, function(key, item) {
                item.setId(id);
            }.bind(this));
        }.bind(this);

        this.setAffiliation = function(affiliation) {
            $.each(this.eCommerceInstances, function(key, item) {
                item.setAffiliation(affiliation);
            });
        }.bind(this);

        this.setShipping = function(shipping) {
            $.each(this.eCommerceInstances, function(key, item) {
                item.setShipping(shipping);
            });
        }.bind(this);

        this.setTax = function(tax) {
            $.each(this.eCommerceInstances, function(key, item) {
                item.setTax(tax);
            });
        }.bind(this);

        this.addItem = function(prodItem) {
            $.each(this.eCommerceInstances, function(key, item) {
                item.addItem(prodItem);
            });
        }.bind(this);

        this.send = function() {
            $.each(this.eCommerceInstances, function(key, item) {
                item.send();
            });
        }.bind(this);

        this.init();

        return this;

    }
};