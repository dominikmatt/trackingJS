#USAGE

### Installation

```bash
$ bower install tracking-js
```

Include [jQuery](http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js) `tracking.js` and `adapter/ua.js` scripts:
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="/adapter/ua.js"></script>
    <script src="/tracking.js"></script>



##Properties
###namespace:
*Default: (string) namespace
namespace for the tracking code. Need it for multiTrack


###type
*Default: (string) ua
adapter type (ua = Universal Analytics


###analyticsCode
*Default: (string)
for the ua adapter we need the google analytics code

###url
*Default: (string) auto
url of your page or auto


###pageview
*Default: (boolean) true
send pageview on page loaded

###dataName
*Default: (string) trackingjs
is for the event register we can set on the default on data-trackingjs=""


###debug
*Default: (boolean) true
view debug messages

###anonymizeIp
*Default: (boolean) false
(boolean) false | on true the ip will be anonymous

##Using

### Default tracking
###### First register a new trackingJS instance:
```js
var options = {
    type: 'ua',
    analyticsCode: 'UA-xxxxxxxx-1',
    url: 'auto',
    pageview: false
}; //view properties
var trackingJS = new trackingJS(options);
```

###### sending pageview
```js
trackingJS.pageview('/page-url', 'Page title');
```

###### sending event
```js
trackingJS.event('category', 'action', 'label', 1);
```

###### register event`
use 'data-trackingjs' attribut to register an event.
'event' (required)
'category' (required)
'action'
'label'
'value'

```html
<a href="#" data-trackingjs='{"event":"click", "category":"category", "action":"action", "label":"label", "value":"1"}'>click to send event</a>
```
####### use in twig
```html
{% set trackOption = {
            'event': 'click',
            'category': 'category name',
            'action': 'action name',
            'label': 'label name',
            'value': 1
        }
%}
<a href="#" data-trackingjs='{{ trackOption|json_encode()|e }}'>click to send event</a>
```

to update event data use the jQuery [.data](http://api.jquery.com/jquery.data/) method and sen them an javascript object like:
```js
var newEventData = {
    event: 'click',
    category: 'category',
    action: 'action',
    label: 'label',
    value: 1
};

$('a').data('trackingjs', newEventData);
```

to update the event type (e.g. from click to mouseover) use the updateEvents command
```js
var newEventData = {
    event: 'mouseover',
    category: 'category',
    action: 'action',
    label: 'label',
    value: 1
};

$('a').data('trackingjs', newEventData);

trackingJS.updateEvents();
```

### eCommerce
###### register a new eCommerce Tracking instance
```js
    var ecTracking = trackingJS.registerEcommerce();
```

###### add transaction datas
```js
    ecTracking.setId(1);
    ecTracking.setAffiliation('test store);
    ecTracking.setShipping(5);
    ecTracking.setTax(20);
```

###### add a item
```js
    ecTracking.addItem({
        id: '1',
        name: 'Product 1',
        sku: 'abc-1',
        category: 'Products category',
        price: 11.00,
        quantity: 1
    });
```

###### at least you must send the eCommerce event
```js
    ecTracking.send();
```

### multiTracking
Include `multiTrack.js` script:
```html
    <script src="/scripts/multiTrack.js"></script>
```

###### Register your Tracking instances
```js
    var trackingJSone = new trackingJS({
        namespace: 'one',
        type: 'ua',
        analyticsCode: 'UA-xxxxxxxx-1',
        url: 'auto',
        pageview: false
    });

    var trackingJStwo = new trackingJS({
        namespace: 'two',
        type: 'ua',
        analyticsCode: 'UA-xxxxxxxx-2',
        url: 'auto',
        pageview: false
    });

    multiTrackJS.register(trackingJSone);
    multiTrackJS.register(trackingJStwo);
```

###### send pageview
```js
    multiTrackJS.pageview('test/multi', 'only UA-xxxxxxxxx-1 and UA-xxxxxxxxx-2');
```

###### send event
```js
    multiTrackJS.event('category1', 'action', 'label', 1);
```

###### its simple to use eCommerce Tracking on multiTrack
```js
    var multiEcTrack = new multiTrackJS.registerEcommerce();
        multiEcTrack.setId(1);
        multiEcTrack.addItem({
            id: '1',
            name: 'Product 1',
            sku: 'xyz-1',
            category: 'Products Cat',
            price: 11,
            quantity: 1
        });

        multiEcTrack.addItem({
            id: '2',
            name: 'Product 2',
            sku: 'xyz-2',
            category: 'Products Cat',
            price: 22,
            quantity: 2
        });

        multiEcTrack.send();
```