var EventModel = Backbone.Model.extend({
    idAttribute: "_id"
});

var EventsColletion = Backbone.Collection.extend({
    model: EventModel,
    url: "/events"
});

var EventView = Backbone.View.extend({
    tagName: "div",
    className: "mdl-cell mdl-cell--4-col",
    eventDate: function() {
        var date = new Date(this.model.get('start'));
        date = date.toLocaleString('en-US', {month: "short", day: "numeric", year: 'numeric', hour: 'numeric', minute: 'numeric'});
        this.model.set('start', date);
    },
	cleanupView: function() {
		this.undelegateEvents();
		this.unbind();
		this.remove();
	},
	render: function() {
        this.eventDate();
		var template = $("#eventstemplate").html();
        var compiled = Handlebars.compile(template);
        var html = compiled(this.model.attributes);
        this.$el.html(html);
        return this;
	}
});

var EventsColletionView = Backbone.View.extend({
    tagName: "div",
    className: "mdl-grid",
    events: {
        'submit .vote-form': "addVote"
    },
    addVote: function(evt) {
        evt.preventDefault();
        var button = $(evt.target);
        var form = button.parents('.mdl-card').find('.vote-form');

        form.submit(function(evt){

            var postData = _.object(_.map($(this).serializeArray(), _.values));
            postData.byUser = "testUser";
            postData.eventid = form.data('form');

            console.log('is submit: ' + postData);
            $.ajax({
                url:  window.location + "vote",
                dataType: 'json',
    			type: 'POST',
                data: postData,
                success: function(data, textStatus, jqXHR) {
                    console.log("success");
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log("we have problem");
                }
            });
        });
    },
    initialize: function() {
        this.listenTo(this.collection, "reset", this.render);
    },
    render: function () {
        this.$el.html("");
        this.collection.each(function(data) {
            console.log(data);
            var eventView = new EventView({model: data});
            this.$el.append(eventView.render().el);
        }, this);
        return this;
    }
});

var RouterApp = Backbone.Router.extend({
    routes: {
        "": "main"
    },
    main: function() {
        var eventsColletion = new EventsColletion();
        eventsColletion.fetch({reset: true});
        var view = new EventsColletionView({ collection: eventsColletion });
        $('#appContainer').html(view.render().el);
    }
})
