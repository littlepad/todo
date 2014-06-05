var todos = new Todo.Models.Todos();
var todoForm = new Todo.Views.TodoForm({el: '.todoForm', collection: todos});
var todoList = new Todo.Views.TodoList({el: '.todoList', collection: todos});

