import $ from 'jquery';
import bootstrap from 'bootstrap';
import 'bootstrap/css/bootstrap.css!';
import 'bootstrap/css/bootstrap-theme.css!'
import angular from 'angular';
import _ from 'lodash';

// Make jquery available in the console
window.$ = $;

$('body').show();

angular.module('fswd', [])
  .service('TodoListService', function($http) {
    var todoList = ['Groceries', 'Dinner', 'Breakfast'];

    this.retrieveTodoList = function() {
      return $http.get('/tasks')
        .then(function(response) {
          todoList = response.data;
        });
    };

    this.getTodoList = function() {
      return todoList;
    };

    this.removeTodo = function(item) {
      todoList = _.without(todoList, item);
    };

    this.addTodo = function(toAdd) {
      todoList = todoList.concat([ toAdd ]);
    };

  })
  .controller('TodoListController', function(TodoListService, $scope) {
    var vm = this;
    TodoListService.retrieveTodoList();

    vm.removeTodo = function(item) {
      TodoListService.removeTodo(item);
    };

    vm.addTodo = function(toAdd) {
      TodoListService.addTodo(toAdd);
    };

    $scope.$watch(function() {
      console.log('Watching the todo list!');
      return TodoListService.getTodoList();
    }, function(newVal, oldVal) {
      vm.todoList = newVal;
    });

  });

angular.element(document).ready(function() {
  angular.bootstrap(angular.element(document), ['fswd']);
  // this must be a bug of some kind
  // TODO: Dig into this
  angular.resumeBootstrap([]);
});

// $(function() {
//   $('button#add').click(function(e) {
//     // Make sure the form does not get submitted
//     e.preventDefault();
//
//     // extract the current value of the todo
//     var newTodo = $('input[name=todo]').val();
//
//     // create a completely new (unattached)
//     // list item element (<li>)
//     var newListElement = $('<li></li>');
//     var newListElementButton = $('<button>X</button>');
//     newListElementButton.click(function(e) {
//       e.preventDefault();
//
//       newListElement.fadeOut(1000, function() {
//         newListElement.remove();
//       });
//     });
//
//     // Set its text
//     newListElement.text(newTodo);
//     newListElement.append(newListElementButton);
//
//     // And add it to the end of the list
//     $('ul').append(newListElement);
//
//     // Then clear out the input element
//     $('input[name=todo]').val("");
//   });
// });
