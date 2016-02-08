var EventModel = Backbone.Model.extend({
    idAttribute: "_id",
    defaults: {
        votes: 0
    }
});

var EventsColletion = Backbone.Collection.extend({
    model: EventModel,
    url: "/events"
});

var EventView = Backbone.View.extend({
    tagName: "div",
    className: "mdl-cell mdl-cell--4-col",
    events: {
        'submit .vote-form': "addVote"
    },
    initialize: function() {
        //return results as graphic for this event
        //this.model.on('change:votes', function() {}, this);
    },
    addVote: function(evt) {
        var that = this;
        var postData = _.object(_.map($(evt.target).serializeArray(), _.values));
        postData.byUser = "56b254dc6e49bc920df0dd00";
        postData.eventid = $(evt.target).data('form');

        //submit results with ajax and update model with results
        $.ajax({
            type: 'POST',
            url: '/votes',
            dataType: 'json',
            data: postData,
            success: function(data) {
                console.log("success: " + data);
                that.model.set('votes', data);
            },
            error: function() {
                console.log("we have problem");
            }
        });
        return false;
    },
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
		var template = $("#eventsTemplate").html();
        var compiled = Handlebars.compile(template);
        var html = compiled(this.model.attributes);
        this.$el.html(html);
        return this;
	}
});

var EventsColletionView = Backbone.View.extend({
    tagName: "div",
    className: "mdl-grid",
    initialize: function() {
        this.listenTo(this.collection, "reset", this.render);
    },
    render: function () {
        this.$el.html("");
        this.collection.each(function(data) {
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
});
