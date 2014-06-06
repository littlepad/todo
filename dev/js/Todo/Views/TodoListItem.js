Todo.Views.TodoListItem = Todo.Views.ViewBase.extend({
	tagName: 'li',
	initialize: function(options){
		'use strict';
		this.model = options.model;
		var html = '<input type="checkbox"><span class="text">' + this.model.get('text') + '</span>';
		if(this.model.get('completed')) {
			this.setCompleted('input[type="checkbox"]');
		}
		this.$el.html(html);
	},
	events: {
		'click .text': 'onClickText',
		'change input[type="checkbox"]': 'onChangeCheckbox'
	},
	onClickText: function(){

	},
	onChangeCheckbox: function(e){
		'use strict';
		this.setCompleted(e.target);
	},
	setCompleted: function(target) {
		'use strict';
		this.model.setCompleted();
		$(target).prop('disabled', true) ;
		this.$el.addClass('done');
	}
});
