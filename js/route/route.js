(function () {
function noteriousConfig($routeProvider) {
	var boards = {
		templateUrl: 'partial/boards.html',
		controller: 'BoardsCtrl as boardsCtrl'
	},
	notes = {
		templateUrl: 'partial/notes.html',
		controller: 'NotesCtrl as notesCtrl'
	},
	calculator = {
			templateUrl: 'partial/calculator.html',
			controller: 'CalculatorController as calcCtrl'
		}
	defaults = {
		redirectTo: '/'
	};

	$routeProvider
		.when('/', boards)
		.when('/board/:id', notes)
		.when('/calculator', calculator)
		.otherwise( defaults );
}

angular.module('noteriousApp')
	.config(noteriousConfig);
})();

