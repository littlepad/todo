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
		completed: false,
		ordinal: 0
	},
	
	setCompleted: function() {
		'use strict';
		this.set('completed', true);
		this.save();
	},

	setText: function(text) {
		'use strict';
		this.set('text', text);
		this.save();
	},

	setOrdinal: function(ordinal) {
		'use strict';
		this.set('ordinal', ordinal);
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
	},

	// ordinalをソートの基準に設定
	comparator: function(model) {
		'use strict';
		return model.get('ordinal');
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
			this.collection.add(new Todo.Models.Todo({text: this.$input.val(), ordinal:this.collection.length}));
			this.$input.val("");
			this.$input.focus();
		}
	}
});

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

Todo.Views.TodoListItem = Todo.Views.ViewBase.extend({
	tagName: 'li',
	
	className: 'todoListItem',
	
	tmpl: '<p class="todoListItem__view"><input type="checkbox" class="todoListItem__checkbox"><span class="todoListItem__text"><%= text %></span><a href="#" class="todoListItem__deleteButton">delete</a></p>' +
		'<form class="todoListItem__editor"><input type="text" class="todoListItem__input" value="<%= text %>"></form>',
	
	events: {
		'change .todoListItem__checkbox': 'onChangeCheckbox',
		'click .todoListItem__deleteButton': 'onClick',
		'dblclick': 'onDoubleClick',
		'submit': 'onSubmit',
		'drop': 'onDrop'
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
		return this;
	},
	
	onChangeCheckbox: function(e){
		'use strict';
		this.setCompleted(e.target);
	},

	onClick: function() {
		'use strict';
		this.model.destroy();
	},

	onDoubleClick: function() {
		'use strict';
		if(this.model.get('completed')) return;
		this.$el.addClass('todoListItem--edit');
		var $input = this.$el.find('.todoListItem__input');
		$input.val(this.model.get('text'));
		$input.focus();
	},

	onSubmit: function() {
		'use strict';
		var $input = this.$el.find('.todoListItem__input');
		if($input.val()) {
			this.model.setText($input.val());
			this.render();
		}
		this.$el.removeClass('todoListItem--edit');
	},
	
	setCompleted: function(target) {
		'use strict';
		this.model.setCompleted();
		$(target).prop('disabled', true);
		$(target).prop('checked', true);
		this.$el.addClass('todoListItem--completed');
	},

	onDrop: function(event, index) {
		'use strict';
		this.$el.trigger('updateSort', [this.model, index]);
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

$(function() {
	'use strict';
	$('.sortable').sortable({
		update: function( event, ui ){
			ui.item.trigger('drop', ui.item.index());
		}
	});
});
