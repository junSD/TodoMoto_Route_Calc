(function () {
	function BoardCtrl( BoardsService, $log, $routeParams) {
	var vm = this,
		defauts = {
			title: '',
			description: '',
			isPublic: false,
			notes: []
		};
	vm.board = angular.copy(defauts);

	vm.add = function add(board, boardForm) {
		BoardsService.add(board);
		_reset(boardForm);
	};

	function _reset(form) {
		$log.debug(form);

		if (form) {
			form.$setPristine();
			form.$setUntouched();
		}
		vm.board = angular.copy(defauts);
		console.log("Сработало else _reset");
	}
}

angular.module('noteriousApp')
	.controller('BoardCtrl', BoardCtrl);

})();