#USAGE

### Installation
Include [jQuery](http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js) `tracking.js` and `adapter/ua.js` scripts:
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="/adapter/ua.js"></script>
    <script src="/tracking.js"></script>

### Default tracking
First register a new trackingJS instance:
    var trackingJS = new trackingJS({
        type: 'ua',
        analyticsCode: 'UA-57009541-1',
        url: 'auto',
        pageview: false
    });

###### sending pageview
    trackingJS.pageview('test/1', 'test title1');
    
###### sending event
    trackingJS.event('category', 'action', 'label', 'value');
    
### eCommerce
register a new eCommerce Tracking instance
    var ecTracking = trackingJS.registerEcommerce();
    
add transaction datas
    ecTracking.setId(1);
    ecTracking.setAffiliation('test store);
    ecTracking.setShipping(5);
    ecTracking.setTax(20);

add a item
    ecTracking.addItem({
        id: '1',
        name: 'Product 1',
        sku: 'abc-1',
        category: 'Products category',
        price: 11.00,
        quantity: 1
    });

at last you must send the eCommerce event
    ecTracking.send();