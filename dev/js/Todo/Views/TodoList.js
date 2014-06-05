Todo.Views.TodoList = Todo.Views.ViewBase.extend({
	initialize: function(){
		"use strict";
		this.collection.on('add', this.add, this);
	},
	add: function(todo) {
		"use strict";
		var item = new Todo.Views.TodoListItem({model:todo});
		this.$el.append(item.el);
	}
});
