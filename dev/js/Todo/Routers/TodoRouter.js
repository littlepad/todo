Todo.Routers.TodoRouter = Todo.Routers.RouterBase.extend({
	initialize: function(options){
		'use strict';
		this.listView = options.view;
		this.collection = options.collection;
	},
	
	routes: {
		'active': 'active',
		'completed': 'completed',
		'*all': 'all'
	},
	
	all: function() {
		'use strict';
		this.listView.showAll();
	},
	
	active: function() {
		'use strict';
		this.listView.showActive();
	},

	completed: function() {
		'use strict';
		this.listView.showCompleted();
	}
	
});