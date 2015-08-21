var TrackingJSDebugerTpl = jQuery('<div id="trackingjs-debuger-container" style="position: fixed; padding: 10px; z-index: 99999; right: 0; bottom: 0; width: 400px; height: 200px; overflow: auto; border: 1px solid #000; background-color: rgba(255, 255, 255, 0.7);"></div>');

var TrackingJSDebuger = function() {

};

/**
 * @method initialize
 */
TrackingJSDebuger.prototype.initialize = function() {
    if (!!this.hasTrackingJS()) {
        this.instances = this.getInstances();
        this.render();
        this.renderSettings();
    }
};

/**
 * @method getInstances
 * @returns {Array}
 */
TrackingJSDebuger.prototype.getInstances = function() {
    var instance = window.trackingJSInstances;

    if (!instance) {
        if (!!window.tracking && !!window.tracking.instances) {
            instance = window.tracking.instances;
        } else {
            instance = [];
            instance.push(window.trackingJs);
        }
    }

    return instance;
};

/**
 * @method render
 */
TrackingJSDebuger.prototype.render = function() {
    $('body').append(TrackingJSDebugerTpl);
    this.$container = jQuery('#trackingjs-debuger-container');
    this.$container.append('<strong>Version:</strong> ' + this.trackingJS.version + ' (undefined <= 0.6.1 without multitrack)<br />');
};

/**
 * @method renderSettings
 */
TrackingJSDebuger.prototype.renderSettings = function() {
    $.each(this.instances, function(key, instance) {
        console.log(instance);
        this.$container.append('<br >/<br /><table>');
        this.$container.append('<tr><td><strong>Instance:</strong></td><td> ' + instance.namespace + ' (' + instance.settings.analyticsCode + ')</td></tr>');
        this.$container.append('<tr><td><strong>Pageview:</strong></td><td> ' + this.renderHelper.onOff(instance.settings.pageview) + '</td></tr>');
        this.$container.append('<tr><td><strong>Used event-bundles:</strong></td>')
        this.$container.append(this.renderHelper.list(instance.settings.eventBundles));
        this.$container.append('</table>');
    }.bind(this));
};

/**
 * @type {{onOff: Function, list: Function}}
 */
TrackingJSDebuger.prototype.renderHelper = {
    'onOff': function(value) {
        var output = ((!!value) ? '<span style="color: green;">on</span>' : '<span style="color: red">off</span>');

        return output;
    },
    'list': function(list) {
        var output = '';

        $.each(list, function(key, name) {
            output += '<tr><td></td><td>' + name + '</td></tr>';
        });

        return output;
    }
};

/**
 * @method hasTrackingJS
 * @returns {boolean}
 */
TrackingJSDebuger.prototype.hasTrackingJS = function() {
    if (!!window.trackingJS) {
        this.trackingJS = window.trackingJS;
        return true;
    }

    return false;
};

(function(window, TrackingJSDebuger) {
    var trackingJSDebuger = new TrackingJSDebuger();
    trackingJSDebuger.initialize();
})(window, TrackingJSDebuger);
