(function(){
	"use strict";
	Todo.Collections.Todos = Todo.Collections.CollectionBase.extend({
		model: Todo.Model.Todo 
	});
})();