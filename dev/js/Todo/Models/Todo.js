Todo.Models.Todo = Todo.Models.ModelBase.extend({
	defaults: {
		text: null,
		completed: false
	},
	
	setCompleted: function() {
		'use strict';
		this.set('completed', true);
	}
});
