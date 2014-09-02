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
