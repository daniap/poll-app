$(function functionName() {
    // var eventsColletion = new EventsColletion();
    // eventsColletion.fetch({
    //     success: function functionName(data) {
    //         var view = new EventsColletionView({ collection: data });
    //         $('body').append(view.render().el);
    //     }
    // });
    new RouterApp();
    Backbone.history.start();
});
