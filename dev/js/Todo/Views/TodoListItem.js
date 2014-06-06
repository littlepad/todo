Todo.Views.TodoListItem = Todo.Views.ViewBase.extend({
	tagName: 'li',
	
	tmpl: '<input type="checkbox"><span class="text"><%= text %></span>',
	
	events: {
		'change input[type="checkbox"]': 'onChangeCheckbox'
	},
	
	initialize: function(options){
		'use strict';
		this.model = options.model;
		this.render();
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
	
	setCompleted: function(target) {
		'use strict';
		this.model.setCompleted();
		$(target).prop('disabled', true);
		console.log($(target));
		this.$el.addClass('done');
	}
});
