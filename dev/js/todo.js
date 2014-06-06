/**
 * @namespace Todo
 */
var Todo = window.Todo || {};

Todo.Models = {};
Todo.Collections = {};
Todo.Views = {};
Todo.Routers = {};

Todo.Models.ModelBase = Backbone.Model.extend();

Todo.Models.Todo = Todo.Models.ModelBase.extend({
	defaults: {
		text: null,
		completed: false
	},
	
	setCompleted: function() {
		'use strict';
		this.set('completed', true);
	}
});

Todo.Collections.CollectionBase = Backbone.Collection.extend();

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

Todo.Views.ViewBase = Backbone.View.extend();

Todo.Views.TodoForm = Todo.Views.ViewBase.extend({
	initialize: function(){
		'use strict';
		this.$input = this.$('input[type="text"]');
	},
	events: {
		'submit': 'onSubmit'
	},
	onSubmit: function(e){
		'use strict';
		e.preventDefault();
		this.collection.add(new Todo.Models.Todo({text: this.$input.val()}));
	}
});

Todo.Views.TodoList = Todo.Views.ViewBase.extend({
	initialize: function(){
		'use strict';
		this.collection.on('add', this.add, this);
	},
	
	add: function(todo) {
		'use strict';
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
	},
	
	addItems: function(items) {
		'use strict';
		for (var i = 0; i < items.length; i++) {
			console.log(items[i]);
			console.log(items[i].get('text'));
			this.add(items[i]);
		}
	}
	
});

Todo.Views.TodoListItem = Todo.Views.ViewBase.extend({
	tagName: 'li',
	initialize: function(options){
		'use strict';
		this.model = options.model;
		var html = '<input type="checkbox"><span class="text">' + this.model.get('text') + '</span>';
		if(this.model.get('completed')) {
			this.setCompleted('input[type="checkbox"]');
		}
		this.$el.html(html);
	},
	events: {
		'click .text': 'onClickText',
		'change input[type="checkbox"]': 'onChangeCheckbox'
	},
	onClickText: function(){

	},
	onChangeCheckbox: function(e){
		'use strict';
		this.setCompleted(e.target);
	},
	setCompleted: function(target) {
		'use strict';
		this.model.setCompleted();
		$(target).prop('disabled', true) ;
		this.$el.addClass('done');
	}
});

Todo.Routers.RouterBase = Backbone.Router.extend();
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
var todos = new Todo.Collections.Todos();
var todoForm = new Todo.Views.TodoForm({el: '.todoForm', collection: todos});
var todoList = new Todo.Views.TodoList({el: '.todoList', collection: todos});
var todoRouter = new Todo.Routers.TodoRouter({view: todoList, collection: todos});
Backbone.history.start();