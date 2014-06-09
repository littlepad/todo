Todo.Views.TodoListItem = Todo.Views.ViewBase.extend({
	tagName: 'li',
	
	tmpl: '<p class="listItem"><input type="checkbox"><span class="text"><%= text %></span><a href="#" class="deleteButton">delete</a></p>',
	
	events: {
		'change input[type="checkbox"]': 'onChangeCheckbox',
		'mouseover p': 'onMouseover',
		'mouseout p': 'onMouseout',
		'click .deleteButton': 'onClick'
	},
	
	initialize: function(options){
		'use strict';
		this.model = options.model;
		this.render();

		this.listenTo(this.model, 'destroy', this.remove);
	},
	
	render: function() {
		'use strict';
		var html = _.template(this.tmpl, this.model.toJSON());
		this.$el.html(html);
		if(this.model.get('completed')) {
			this.setCompleted(this.$('input[type="checkbox"]'));
		}
	},
	
	onChangeCheckbox: function(e){
		'use strict';
		this.setCompleted(e.target);
	},

	onMouseover: function(e){
		'use strict';
		$(e.target).children('.deleteButton').addClass('showDeletebutton');
	},

	onMouseout: function(e) {
		'use strict';
		$(e.target).children('.deleteButton').removeClass('showDeletebutton');
	},

	onClick: function() {
		'use strict';
		this.model.destroy();
	},
	
	setCompleted: function(target) {
		'use strict';
		this.model.setCompleted();
		$(target).prop('disabled', true);
		$(target).prop('checked', true);
		this.$el.addClass('done');
	}
});
