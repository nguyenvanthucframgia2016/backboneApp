//Add a custom events
var customEvents = _.extend({}, Backbone.Events);

// initial collection
var users = new UserCollection();

// initial app ractive of application
var appRactive = new AppRactive({
    target: '.user-container',
    userFormRactive: userFormRactive
});

// run application
new AppView({
    collection: users,
    appRactive: appRactive
});

// Configuration global backbone validation
_.extend(Backbone.Validation.callbacks, {
    valid: function (view, attr, selector) {
        // TODO
    },
    invalid: function (view, attr, error, selector) {
        if (typeof (this.ractive) !== 'undefined'
            && this.ractive
        ) {
            var errors = this.ractive.get('errors');
            errors[attr] = error;
            this.ractive.update('errors');
        }
    }
});