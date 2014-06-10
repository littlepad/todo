Todo.Views.TodoListItem = Todo.Views.ViewBase.extend({
	tagName: 'li',
	
	className: 'todoListItem',
	
	tmpl: '<p><input type="checkbox" class="todoListItem__checkbox"><span class="todoListItem__text"><%= text %></span><a href="#" class="todoListItem__deleteButton">delete</a></p>',
	
	events: {
		'change .todoListItem__checkbox': 'onChangeCheckbox',
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
			this.setCompleted(this.$('.todoListItem__checkbox'));
		}
	},
	
	onChangeCheckbox: function(e){
		'use strict';
		this.setCompleted(e.target);
	},

	onMouseover: function(e){
		'use strict';
		$(e.target).children('.todoListItem__deleteButton').addClass('todoListItem__deleteButton--show');
	},

	onMouseout: function(e) {
		'use strict';
		$(e.target).children('.todoListItem__deleteButton').removeClass('todoListItem__deleteButton--show');
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
		this.$el.addClass('todoListItem--completed');
	}
});
