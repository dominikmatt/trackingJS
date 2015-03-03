/**
 * Example bundle
 */
trackingJS.eventBundles.exampleBundle = function() {
    this.dataName = 'example';
    this.$el = null;

    /**
     *
     */
    this.init = function(core, callback) {
        console.log('init bundle example :)');
        select();
        callback(this.$el)
    };

    /**
     *
     * @returns {boolean}
     */
    var select = function() {
        this.$el = $('[data-trackingjs-example]');

        return true;
    };

    /**
     *
     * @param el
     */
    this.getData = function() {

    }


};