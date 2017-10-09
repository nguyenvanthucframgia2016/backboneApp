var AppView = Backbone.View.extend({
    initialize: function (options) {
        this.appRactive = options.appRactive;
        customEvents.on('addUser', this.addUser, this);
        customEvents.on('updateUser', this.updateUser, this);
        customEvents.on('deleteUser', this.deleteUser, this);
        customEvents.on('updateCollectionUser', this.render, this);

        this.render();
    },
    render: function () {
        var self = this;

        this.collection.fetch().done(function (response, status, options) {
            self.appRactive.set('users', response);
        }).fail(function (response, xhr, options) {
            console.log('error');
        });
    },
    addUser: function (user) {
        user = new User(user);
        // remove ID before call save model
        user.unset('id');

        user.save().done(function (response, status, options) {
            customEvents.trigger('updateCollectionUser');
        }).fail(function (response, xhr, options) {
            console.log('error');
        });
    },
    updateUser: function (userId, user) {
        // find user
        var model = this.collection.findWhere({
            id: parseInt(userId)
        });

        model.set(user);

        // sync user information to server
        model.save().done(function (response, status, options) {
            customEvents.trigger('updateCollectionUser');
        }).fail(function (response, xhr, options) {
            console.log('error');
        });
    },
    deleteUser: function (userId) {
        var user = new User({
            id: parseInt(userId)
        });

        user.destroy().done(function (response, status, options) {
            customEvents.trigger('updateCollectionUser');
        }).fail(function (response, xhr, options) {
            console.log('error');
        });
    }
});
