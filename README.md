# Development
#### Step 1 - start  
start server
```bash
grunt serve
```

#### Step 2 - development
do it exactly

#### Step 3 - create example
create a example
#### Step 4 - testing
jshint
```bash
grunt jshint
```
http://localhost:3000/tests/ua.html  
http://localhost:3000/tests/ecommerce.html  
http://localhost:3000/tests/core.html  

#### Step 5 - Doc
create Documentation

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
*Default*: (string) namespace              
namespace for the tracking code. Need it for multiTrack


###type
*Default*: (string) ua   
adapter type (ua = Universal Analytics


###analyticsCode
*Default*: (string)  
for the ua adapter we need the google analytics code

###url
*Default*: (string) auto  
url of your page or auto


###pageview
*Default*: (boolean) true  
send pageview on page loaded

###dataName
*Default*: (string) trackingjs  
is for the event register we can set on the default on data-trackingjs=""


###debug
*Default*: (boolean) false  
view debug messages

###anonymizeIp
*Default*: (boolean) false  
(boolean) false | on true the ip will be anonymous

###set
*Default*: (object) {}  
(object) {} | visit: https://developers.google.com/analytics/devguides/collection/analyticsjs/method-reference#set

##Using

### Default tracking
###### First register a new trackingJS instance:
```js
var options = {
    type: 'ua',
    namespace: 'myNamespace',
    analyticsCode: 'UA-xxxxxxxx-1',
    url: 'auto',
    pageview: false,
    anonymizeIp: true,
    debug: false
}; //view properties
var trackingJS = new trackingJS(options);
```

###### sending pageview
```js
trackingJS.pageview('/page-url', 'Page title', function() {
    console.log('pageview sended');
});
```

###### sending event
```js
trackingJS.event('category', 'action', 'label', 1, function() {
    console.log('event sended');
});
```

###### register event
use 'data-trackingjs' attribut to register an event.
'event' (required)
'category' (required)
'action' (required)
'label' (optional)
'value' (optional)

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
            'value': 1 //optional
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
    value: 1 //optional
};

$('a').attr('data-trackingjs', JSON.stringify(newEventData));
```

to update the event type (e.g. from click to mouseover) or initialize ajax loaded content use the updateEvents command
```js
var newEventData = {
    event: 'mouseover',
    category: 'category',
    action: 'action',
    label: 'label',
    value: 1 //optional
};


$('a').attr('data-trackingjs', JSON.stringify(newEventData));

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
    ecTracking.setAffiliation('test store');
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

### Bundles
Include `eventBundle/bundleName.js` script:
```html
    <script src="/scripts/eventBundle/authBundle.js"></script>
```

Add the option with all bundles on the Construct
```
    eventBundles: ['auth', 'link', 'video']
´´´

-> use the bundle

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
    multiTrackJS.pageview('test/multi', 'UA-xxxxxxxxx-1 and UA-xxxxxxxxx-2');
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
