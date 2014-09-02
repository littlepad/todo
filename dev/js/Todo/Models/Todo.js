Todo.Models.Todo = Todo.Models.ModelBase.extend({
	defaults: {
		text: null,
		completed: false,
		ordinal: 0
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
	},

	setOrdinal: function(ordinal) {
		'use strict';
		this.set('ordinal', ordinal);
	}
});
