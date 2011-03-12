Searchable.AJAX = new Class({

    Extends: Searchable,

    options: {
        xhr: {
            method: 'get',
            link: 'cancel'
        },
        queryParam: 'q',
        delay: 200
    },

    initialize: function(select, url, options) {
        this.parent(select, options);
        this.xhr = new Request.JSON($merge(this.options.xhr, {
            onRequest: this.onRequest.bind(this),
            onComplete: this.onComplete.bind(this),
            onSuccess: this.onSuccess.bind(this)
        }));
        this.setUrl(url);
    },

    setUrl: function(url) {
        this.xhr.options.url = url;
        return this;
    },

    send: function() {
        var data = {};
        data[this.options.queryParam] = this.query.get('value');
        this.xhr.send(Hash.toQueryString(data));
        return this;
    },

    onKeyUp: function() {
        $clear(this._timer);
        this._timer = this.send.delay(this.options.delay, this);
        this.fireEvent('keyUp');
    },

    onRequest: function() {
        this.results.set('disabled', true);
        this.fireEvent('request');
    },

    onComplete: function() {
        this.results.set('disabled', false);
        this.fireEvent('complete');
    },

    onSuccess: function(response) {
        this.clear(!this.options.keepSelected);
        if (response) {
            response.each(function(option) {
                this.add(option.id, option.name);
            }, this);
        }
        this.fireEvent('success');
    }

});