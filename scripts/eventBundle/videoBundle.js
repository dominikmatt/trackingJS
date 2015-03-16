/**
 * video Bundle
 *
 * @author Dominik Matt <mail@matt-dominik.at>
 */
trackingJS.prototype.eventBundles.video = function() {
    this.bundleName = 'video';
    this.videoEl = document.getElementsByTagName('video');

    //on stop video the video api trigger onpause and onstop
    var pauseTimeout,
        tracking;

    /**
     * @method init
     *
     * @param tracking
     */
    this.init = function init(t) {
        tracking = t;
        bindEvents();
    };

    /**
     * @method bindEvents
     */
    var bindEvents = function() {
        for(var key = 0; key < this.videoEl.length; key++) {
            videoHandler.call(this.videoEl[key]);
        }
    }.bind(this);

    var videoHandler = function() {
        this.onplay = playHandler;
        this.onended = endHandler;
        this.onpause = pauseHandler;
    };

    /**
     * @method playHandler
     */
    var playHandler = function() {
        console.log(tracking);
        tracking.event(
            'Video',
            'Video - Play',
            'Video: ' + getSource.call(this), this.currentTime
        );
    };

    /**
     * @method pauseHandler
     */
    var pauseHandler = function() {
        pauseTimeout = setTimeout(function() {
            tracking.event(
                'Video',
                'Video - Pause',
                'Video: ' + getSource.call(this), this.currentTime
            );
        }.bind(this), 50);
    };

    /**
     * @method endHandler
     */
    var endHandler = function() {
        clearTimeout(pauseTimeout);
        tracking.event(
            'Video',
            'Video - Stop',
            'Video: ' + getSource.call(this), this.currentTime
        );
    };

    /**
     * @method getSource
     *
     * @returns {string}
     */
    var getSource = function() {
        var source = this.currentSrc.split('/');

        return source[source.length - 1];
    };

    /**
     * @method registerVideo
     *
     * @param id
     */
    this.registerVideo = function(id) {
        var video = document.getElementById(id);
        videoHandler.call(video);
    }

};