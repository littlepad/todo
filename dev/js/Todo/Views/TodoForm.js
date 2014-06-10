Todo.Views.TodoForm = Todo.Views.ViewBase.extend({
	initialize: function(){
		'use strict';
		this.$input = this.$('.todoForm__input');
	},
	events: {
		'submit': 'onSubmit'
	},
	onSubmit: function(e){
		'use strict';
		e.preventDefault();
		if(this.$input.val()) {
			this.collection.add(new Todo.Models.Todo({text: this.$input.val()}));
			this.$input.val("");
			this.$input.focus();
		}
	}
});
