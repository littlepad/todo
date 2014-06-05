(function(){
	Todo.Views.TodoForm = Todo.Views.ViewBase.extend({
		initialize: function(){
			this.$input = this.$('input[type="text"]');
		},
		events: {
			'submit': 'onSubmit'
		},
		onSubmit: function(e){
			e.preventDefault();
			this.collection.add(new Todo.Models.Todo({text: this.$input.val()}));
		}
	});
})();