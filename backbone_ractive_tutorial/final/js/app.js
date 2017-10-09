//Add a custom events
var customEvents = _.extend({}, Backbone.Events);
var users = new UserCollection();
var userFormRactive = Ractive({
    target: '.user-form-container',
    template: '#user-form-body',
    data: {
        user: null,
        title: '',
        submitTitle: ''
    },
    saveUser: function (user) {
        // TODO validate

        if (!user.id) {
            customEvents.trigger('addUser', user);
        } else {
            customEvents.trigger('updateUser', user.id, user);
        }

        $('#user-form-modal').modal('hide');
    }
});

// initialize app ractive
var AppRactive = Ractive.extend({
    template: '#user-template',
    data: {
        users: null
    },
    addUserForm: function () {
        this.userFormRactive.set({
            title: 'Add user',
            submitTitle: 'Save',
            user: null
        });
        $('#user-form-modal').modal('show');
    },
    editUserForm: function (userId) {
        var user = new User({
            id: userId
        });
        var self = this;

        user.fetch().done(function (response, status, options) {
            self.userFormRactive.set({
                title: 'Edit user',
                submitTitle: 'Update',
                user: response
            });
            $('#user-form-modal').modal('show');
        }).fail(function (response, xhr, options) {
            console.log('error');
        });
    },
    deleteUser: function (userId) {
        if (confirm('Do you want to delete this user ?')) {
            customEvents.trigger('deleteUser', userId);
        }
    }
});

var appRactive = new AppRactive({
    target: '.user-container',
    userFormRactive: userFormRactive
});

new AppView({
    collection: users,
    appRactive: appRactive
});
