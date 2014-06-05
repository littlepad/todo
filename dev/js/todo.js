/**
 * @namespace Todo
 */
var Todo = window.Todo || {};

Todo.Models = {};
Todo.Collections = {};
Todo.Views = {};


Todo.Model.ModelBase = Backbone.Model.extend();

Todo.Models.Todo = Todo.Models.ModelBase.extend({
	defaults: {
		text: null
	}
});

Todo.Collections.CollectionBase = Backbone.Collection.extend();

Todo.Collections.Todos = Todo.Collections.CollectionBase.extend({
	model: Todo.Model.Todo 
});

Todo.Views.TodoForm = Todo.Views.ViewBase.extend({
	initialize: function(){
		"use strict";
		this.$input = this.$('input[type="text"]');
	},
	events: {
		'submit': 'onSubmit'
	},
	onSubmit: function(e){
		"use strict";
		e.preventDefault();
		this.collection.add(new Todo.Models.Todo({text: this.$input.val()}));
	}
});

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

Todo.Views.TodoListItem = Todo.Views.ViewBase.extend({
	tagName: 'li',
	initialize: function(options){
		"use strict";
		var html = '<input type="checkbox"><span class="text">' + options.model.get('text') + '</span>';
		this.$el.html(html);
	},
	events: {
		'click .text': 'onClickText',
		'change input[type="checkbox"]': 'onChangeCheckbox'
	},
	onClickText: function(){

	},
	onChangeCheckbox: function(e){
		"use strict";
		$(e.target).prop('disabled', true) ;
		this.$el.addClass("done");
	}
});

Todo.Views.ViewBase = Backbone.View.extend();

var todos = new Todo.Models.Todos();
var todoForm = new Todo.Views.TodoForm({el: '.todoForm', collection: todos});
var todoList = new Todo.Views.TodoList({el: '.todoList', collection: todos});

