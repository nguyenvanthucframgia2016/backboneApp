var User = Backbone.Model.extend({
    defaults: {
        id: '',
        first_name: '',
        last_name: ''
    },
    idAttribute: 'id',
    // Lets create function which will return the custom URL based on the method type
    getCustomUrl: function (method) {
        switch (method) {
            case 'read':
                return 'http://localhost:3000/customers/' + this.id;
                break;
            case 'create':
                return 'http://localhost:3000/customers';
                break;
            case 'update':
                return 'http://localhost:3000/customers/' + this.id;
                break;
            case 'delete':
                return 'http://localhost:3000/customers/' + this.id;
                break;
        }
    },
    // Now lets override the sync function to use our custom URLs
    sync: function (method, model, options) {
        options || (options = {});
        options.url = this.getCustomUrl(method.toLowerCase());

        // Lets notify backbone to use our URLs and do follow default course
        return Backbone.sync.apply(this, arguments);
    }
    // urlRoot: 'http://localhost:3000/customers'
});