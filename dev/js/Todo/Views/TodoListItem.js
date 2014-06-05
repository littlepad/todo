Todo.Views.TodoListItem = Todo.Views.ViewBase.extend({
	tagName: 'li',
	initialize: function(options){
		"use strict";
		var html = '<input type="checkbox"><span class="text">' + options.model.get('text') + '</span>';
		this.$el.html(html);
	},
	events: {
		'click .text': 'onClickText',
		'change input[type="checkbox"]': 'onChangeCheckbox'
	},
	onClickText: function(){

	},
	onChangeCheckbox: function(e){
		"use strict";
		$(e.target).prop('disabled', true) ;
		this.$el.addClass("done");
	}
});
