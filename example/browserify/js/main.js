var $ = require('jQuery');

// load TrackingJS
var TrackingJS = require('../../../scripts/tracking.js');

// load UA Adapter
window.uaTrackingJS = require('../../../scripts/adapter/ua.js');

//load event Bundle
require('../../../scripts/eventBundle/linkBundle.js');
require('../../../scripts/eventBundle/formBundle.js');
require('../../../scripts/eventBundle/authBundle.js');
require('../../../scripts/eventBundle/socialshareBundle.js');
require('../../../scripts/eventBundle/videoBundle.js');

var tracking = new TrackingJS({
    namespace: 'example',
    type: 'ua',
    analyticsCode: 'UA-57009541-1',
    url: 'auto',
    pageview: true,
    anonymizeIp: true,
    debug: true,
    eventBundles: ['link', 'form', 'auth', 'socialshare', 'video']
});


tracking.pageview('test/browserify', 'test title1', function() {
    console.log('pageview sended');
});

tracking.event('browserify', 'test - action', 'test - label', 1, function() {
    console.log('event sended');
});


/**
 * form bundle
 */
var $form = $('#form');

$('form').on('submit', function(event) {

    if($form.find('#lastname').val() == '') {
        tracking.bundles.form.sendFailed($form);
        event.preventDefault();
        return false;
    }


});