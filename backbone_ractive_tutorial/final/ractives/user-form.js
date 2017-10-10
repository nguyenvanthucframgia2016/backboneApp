var userFormRactive = Ractive({
    target: '.user-form-container',
    template: '#user-form-body',
    data: {
        user: null,
        title: '',
        submitTitle: '',
        errors: {}
    },
    validateUser: function (user) {
        customEvents.trigger('validationUser', user, this);
    }
});