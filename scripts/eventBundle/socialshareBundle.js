/**
 * socialshare Bundle
 *
 * @author Phuc Le <info@phuc.at>
 */
trackingJS.prototype.eventBundles.socialshare = function() {
    this.bundleName = 'socialshare';

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
        $('body').on('click', '[data-type="share"]', socialshareHandler.bind(this));
    }.bind(this);

    /**
     * @method socialshareHandler
     *
     * @param event
     * @returns {boolean}
     */
    var socialshareHandler = function(event) {
        var $el = $(event.currentTarget),
            platform = $el.data('platform');

            this.tracking.event(
                'Social Media',
                'Social Media - ' + platform + ' Share',
                'Social Media: ' + platform + ' Share'
            );
        
    }
};
