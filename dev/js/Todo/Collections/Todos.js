Todo.Collections.Todos = Todo.Collections.CollectionBase.extend({
	model: Todo.Models.Todo,

	localStorage: new Backbone.LocalStorage('todos-backbone'),

	getAll: function() {
		'use strict';
		return this.models;
	},
	
	getActive: function() {
		'use strict';
		return this.filter(function(todo) {
			return !todo.get('completed');
		});	
	},
	
	getCompleted: function() {
		'use strict';
		return this.filter(function(todo) {
			return todo.get('completed');
		});
	},

	// ordinalをソートの基準に設定
	comparator: function(model) {
		'use strict';
		return model.get('ordinal');
	}
});
