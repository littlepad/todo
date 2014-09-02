Todo.Views.TodoList = Todo.Views.ViewBase.extend({
	events: {
		'updateSort': 'onUpdateSort'
	},

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
		this.render();
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
	},
	
	addItems: function(items) {
		'use strict';
		for (var i = 0; i < items.length; i++) {
			this.add(items[i]);
		}
	},

	onUpdateSort: function(event, todo, position) {
		'use strict';

		// collectionから該当modelを削除
		this.collection.remove(todo);

		this.collection.each(function (model, index) {
			var ordinal = index;
			if (index >= position) {
				ordinal += 1;
			}
			model.setOrdinal(ordinal);
		});

		// 差し込まれたindexへmodelを新たに挿入
		todo.setOrdinal(position);
		this.collection.add(todo, {at: position});

		// modelを保存
		this.collection.each(function(model, index){
			model.save();
		});

		// ソート
		this.collection.sort();
		this.render();
	},

	render: function() {
		'use strict';
		this.$el.children().remove();
		this.collection.each(this.appendModelView, this);
		return this;
	},

	appendModelView: function(model) {
		'use strict';
		var el = new Todo.Views.TodoListItem({model: model}).render().el;
		this.$el.append(el);
	}

});
