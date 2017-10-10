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
            user: new User().toJSON(),
            errors: {}
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
                user: response,
                errors: {}
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