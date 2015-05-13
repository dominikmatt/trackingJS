'use strict';
/*global $, trackingJS */

/**
 * link Bundle
 *
 * @author Dominik Matt <mail@matt-dominik.at>
 */
trackingJS.prototype.eventBundles.link = function() {
    this.bundleName = 'link';

    /**
     * @mehtod init
     *
     * @param tracking
     */
    this.init = function init(tracking) {
        this.tracking = tracking;
        bindDomEvents();
    };

    /**
     * @method bindDomEvents
     *
     * @type {function(this:trackingJS.prototype.eventBundles)}
     */
    var bindDomEvents = function() {
        $('body').on('click', 'a', linkHandler.bind(this));
    }.bind(this);

    /**
     * @method linkHandler
     *
     * @param event
     * @returns {boolean}
     */
    var linkHandler = function(event) {
        var $el = $(event.currentTarget),
            href = $el.attr('href'),
            target = $el.attr('target'),
            external = new RegExp('^((f|ht)tps?:)?//(?!' + location.host + ')');

        // phone
        if(/tel:/.test(href)) {
            this.tracking.event(
                'Contact',
                'Contact - Click Tel',
                'Tel:' + href.replace('tel:', '')
            );
            //mailto
        } else if(/mailto:/.test(href)) {
            this.tracking.event(
                'Contact',
                'Contact - Click Mail',
                'E-Mail: ' + href.replace('mailto:', '')
            );
            //external link
        } else if(external.test(href)){
            //if the link is open in the same tab we wait for the event
            if(target !== '_blank') {
                this.tracking.event(
                    'External Link',
                    'External Link - Click',
                    'External Link: ' + $el.text() + ' - Link: ' + href,
                    null,
                    function() {
                        location.href = href;
                    });

                event.preventDefault();
                return false;
            } else {
                this.tracking.event(
                    'External Link',
                    'External Link - Click',
                    'External Link: ' + $el.text() + ' - Link: ' + href
                );
            }
        }
    };
};