(function(){
	"use strict";

	var Todo = Backbone.Model.extend({
		defaults: {
			text: null
		}
	});

	var Todos = Backbone.Collection.extend({
		model: Todo
	});

	var TodoForm = Backbone.View.extend({
		initialize: function(){
			this.$input = this.$('input[type="text"]');
		},
		events: {
			'submit': 'onSubmit'
		},
		onSubmit: function(e){
			e.preventDefault();
			this.collection.add(new Todo({text: this.$input.val()}));
		}
	});

	var TodoList = Backbone.View.extend({
		initialize: function(){
			this.collection.on('add', this.add, this);
		},
		add: function(todo) {
			var item = new TodoListItem({model:todo});
			this.$el.append(item.el);
		}
	});

	var TodoListItem = Backbone.View.extend({
		tagName: 'li',
		initialize: function(options){
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
			$(e.target).prop('disabled', true) ;
			this.$el.addClass("done");
		}
	});

	var todos = new Todos();
	var todoForm = new TodoForm({el: '.todoForm', collection: todos});
	var todoList = new TodoList({el: '.todoList', collection:todos});
})();
