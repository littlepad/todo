Todo.Views.TodoForm = Todo.Views.ViewBase.extend({
	initialize: function(){
		'use strict';
		this.$input = this.$('input[type="text"]');
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
		}
	}
});
