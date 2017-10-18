var AppView = Backbone.View.extend({
    initialize: function (options) {
        this.appRactive = options.appRactive;
        customEvents.on('saveUser', this.saveUser, this);
        customEvents.on('updateUser', this.updateUser, this);
        customEvents.on('deleteUser', this.deleteUser, this);
        customEvents.on('updateCollectionUser', this.render, this);
        customEvents.on('validationUser', this.validationUser, this);

        this.render();
    },
    validationUser: function (user, userRactive) {
        var userView = new UserView({
            el: $('#user-form-body'), // important
            model: new User(user)
        });

        userView.validate(userRactive);
    },
    render: function () {
        var self = this;

        this.collection.fetch().done(function (response, status, options) {
            self.appRactive.set('users', response);
        }).fail(function (response, xhr, options) {
            console.log('error');
        });
    },
    saveUser: function (user) {
        if (!user instanceof Backbone.Model) {
            user = new User(user);
        }

        // remove ID before call save model
        user.unset('id');

        // save user
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

        if (model) {
            if (user instanceof Backbone.Model) {
                user = user.toJSON();
            }

            // update data into model
            model.set(user);

            // sync user information to server
            model.save().done(function (response, status, options) {
                customEvents.trigger('updateCollectionUser');
            }).fail(function (response, xhr, options) {
                console.log('error');
            });
        } else {
            alert('Not exist user');
        }
    },
    deleteUser: function (userId) {
        var user = new User({
            id: parseInt(userId)
        });

        // delete user
        user.destroy().done(function (response, status, options) {
            customEvents.trigger('updateCollectionUser');
        }).fail(function (response, xhr, options) {
            console.log('error');
        });
    }
});
