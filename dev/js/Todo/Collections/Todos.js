Todo.Collections.Todos = Todo.Collections.CollectionBase.extend({
	model: Todo.Models.Todo,
	
	getAll: function() {
		'use strict';
		console.log(this.length);
		return this.models;
	},
	
	getActive: function() {
		'use strict';
		console.log(this.filter(function(todo) { return !todo.get('completed'); }).length);
		return this.filter(function(todo) {
			return !todo.get('completed');
		});	
	},
	
	getCompleted: function() {
		'use strict';
		console.log(this.filter(function(todo) { return todo.get('completed'); }).length);
		return this.filter(function(todo) {
			return todo.get('completed');
		});
	}
});
