var TrackingJSDebugerTpl = jQuery('<div id="trackingjs-debuger-container" style="position: fixed; right: 0; bottom: 0; width: 200px; height: 200px; overflow: auto; border: 1px solid #000; background-color: rgba(255, 255, 255, 0.7);"></div>');

var TrackingJSDebuger = function() {

};

TrackingJSDebuger.prototype.initialize = function() {
    if (!!this.hasTrackingJS()) {
        this.render();
    }
};

TrackingJSDebuger.prototype.render = function() {
    $('body').append(TrackingJSDebugerTpl);
    this.$container = jQuery('#trackingjs-debuger-container');
    this.$container.append('<strong>Version:</strong> xxxx<br />');
};

TrackingJSDebuger.prototype.hasTrackingJS = function() {
    if (!!window.trackingJS) {
        return true;
    }

    return false;
};

(function(window, TrackingJSDebuger) {
    var trackingJSDebuger = new TrackingJSDebuger();
    trackingJSDebuger.initialize();
})(window, TrackingJSDebuger);
