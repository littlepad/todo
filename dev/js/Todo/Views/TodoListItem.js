Todo.Views.TodoListItem = Todo.Views.ViewBase.extend({
	tagName: 'li',
	
	className: 'todoListItem',
	
	tmpl: '<p class="todoListItem__view"><input type="checkbox" class="todoListItem__checkbox"><span class="todoListItem__text"><%= text %></span><a href="#" class="todoListItem__deleteButton">delete</a></p>' +
		'<form class="todoListItem__editor"><input type="text" class="todoListItem__input" value="<%= text %>"></form>',
	
	events: {
		'change .todoListItem__checkbox': 'onChangeCheckbox',
		'click .todoListItem__deleteButton': 'onClick',
		'dblclick': 'onDoubleClick',
		'submit': 'onSubmit',
		'drop': 'onDrop'
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
		return this;
	},
	
	onChangeCheckbox: function(e){
		'use strict';
		this.setCompleted(e.target);
	},

	onClick: function() {
		'use strict';
		this.model.destroy();
	},

	onDoubleClick: function() {
		'use strict';
		if(this.model.get('completed')) return;
		this.$el.addClass('todoListItem--edit');
		var $input = this.$el.find('.todoListItem__input');
		$input.val(this.model.get('text'));
		$input.focus();
	},

	onSubmit: function() {
		'use strict';
		var $input = this.$el.find('.todoListItem__input');
		if($input.val()) {
			this.model.setText($input.val());
			this.render();
		}
		this.$el.removeClass('todoListItem--edit');
	},
	
	setCompleted: function(target) {
		'use strict';
		this.model.setCompleted();
		$(target).prop('disabled', true);
		$(target).prop('checked', true);
		this.$el.addClass('todoListItem--completed');
	},

	onDrop: function(event, index) {
		'use strict';
		this.$el.trigger('updateSort', [this.model, index]);
	}
});
