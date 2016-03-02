(function () {
	function NotesCtrl(BoardsService, $routeParams, $log, $location) {
	$log.debug($routeParams);

	var vm = this,
		defauts = {
			title: '',
			content: ''
		};
	vm.board = BoardsService.getByIndex($routeParams.id);
	$log.debug(vm.board);
	if (!vm.board) {
		$location.path( "/" );
	}
	vm.add = function add(note) {
		BoardsService.addNote($routeParams.id, note);
		_reset();
	};
	vm.remove = function remove(note) {
		BoardsService.removeNote($routeParams.id, note);
	};

	vm.note = angular.copy(defauts);
	vm.add = function add(note) {
		BoardsService.addNote($routeParams.id, note);
		_reset();
	};
	function _reset() {
		vm.note = angular.copy(defauts);
	}
}

angular.module('noteriousApp')
.controller('NotesCtrl', NotesCtrl);

})();