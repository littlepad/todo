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
		this.save();
	}
});

Todo.Collections.CollectionBase = Backbone.Collection.extend();

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
	}
});

Todo.Views.ViewBase = Backbone.View.extend();

Todo.Views.TodoForm = Todo.Views.ViewBase.extend({
	initialize: function(){
		'use strict';
		this.$input = this.$('.todoForm__input');
	},
	events: {
		'submit': 'onSubmit'
	},
	onSubmit: function(e){
		'use strict';
		e.preventDefault();
		if(this.$input.val()) {
			this.collection.add(new Todo.Models.Todo({text: this.$input.val()}));
			this.$input.val("");
			this.$input.focus();
		}
	}
});

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

Todo.Views.TodoListItem = Todo.Views.ViewBase.extend({
	tagName: 'li',
	
	className: 'todoListItem',
	
	tmpl: '<p><input type="checkbox" class="todoListItem__checkbox"><span class="todoListItem__text"><%= text %></span><a href="#" class="todoListItem__deleteButton">delete</a></p>',
	
	events: {
		'change .todoListItem__checkbox': 'onChangeCheckbox',
		'click .todoListItem__deleteButton': 'onClick'
	},
	
	initialize: function(options){
		'use strict';
		this.model = options.model;
		this.render();
		
		this.listenTo(this.model, 'destroy', this.remove);
	},
	
	render: function() {
		'use strict';
		var html = _.template(this.tmpl, this.model.toJSON());
		this.$el.html(html);
		if(this.model.get('completed')) {
			this.setCompleted(this.$('.todoListItem__checkbox'));
		}
	},
	
	onChangeCheckbox: function(e){
		'use strict';
		this.setCompleted(e.target);
	},

	onClick: function() {
		'use strict';
		this.model.destroy();
	},
	
	setCompleted: function(target) {
		'use strict';
		this.model.setCompleted();
		$(target).prop('disabled', true);
		$(target).prop('checked', true);
		this.$el.addClass('todoListItem--completed');
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
		'all': 'all'
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