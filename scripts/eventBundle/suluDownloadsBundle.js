/**
 * Downloads bundle for the Sulu CMF
 */
console.log('test');
trackingJS.eventBundles.suluDownloadsBundle = function() {
    this.dataName = 'downloads';

    this.init = function() {
        console.log('init bundle name :)');
    };

    this.select = function(select) {
        var $el = $('[data-trackingjs-download]');

        select($el);

        return true;
    };

    this.getData = function(el) {
        var $el = $(el.selector);
    }

};