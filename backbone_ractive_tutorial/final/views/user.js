var UserView = Backbone.View.extend({
    validate: function (ractive) {
        Backbone.Validation.bind(this, {
            ractive: ractive
        });

        // pass true as an argument, this will force a validation before the result is returned
        if (this.model.isValid(true)) {
            var userId = this.model.get('id');

            if (! userId) {
               customEvents.trigger('saveUser', this.model);
            } else {
               customEvents.trigger('updateUser', userId, this.model);
            }

            $('#user-form-modal').modal('hide');
        }
    }
});