Todo.Views.TodoList = Todo.Views.ViewBase.extend({
	initialize: function(){
		'use strict';
		this.listenTo(this.collection, 'add', this.add);
		this.listenTo(this.collection, 'reset', this.showAll);
		this.collection.fetch();
	},
	
	add: function(todo) {
		'use strict';
		todo.save();
		var item = new Todo.Views.TodoListItem({model:todo});
		this.$el.append(item.el);
	},
	
	showAll: function() {
		'use strict';
		this.$el.empty();
		this.addItems(this.collection.getAll());
	},
	
	showActive: function() {
		'use strict';
		this.$el.empty();
		this.addItems(this.collection.getActive());
	},
	
	showCompleted: function() {
		'use strict';
		this.$el.empty();
		this.addItems(this.collection.getCompleted());
		console.log("showCompleted");
	},
	
	addItems: function(items) {
		'use strict';
		for (var i = 0; i < items.length; i++) {
			this.add(items[i]);
		}
	}
	
});
