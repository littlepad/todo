Todo.Models.Todo = Todo.Models.ModelBase.extend({
	defaults: {
		text: null,
		completed: false
	},
	
	setCompleted: function() {
		'use strict';
		this.set('completed', true);
		this.save();
	},

	setText: function(text) {
		'use strict';
		this.set('text', text);
		this.save();
	}
});
