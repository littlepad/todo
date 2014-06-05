(function(){
	Todo.Views.TodoList = Todo.Views.ViewBase.extend({
		initialize: function(){
			this.collection.on('add', this.add, this);
		},
		add: function(todo) {
			var item = new TodoListItem({model:todo});
			this.$el.append(item.el);
		}
	});
})();