var UserCollection = Backbone.Collection.extend({
    model: User,
    url: 'http://localhost:3000/customers'
});
