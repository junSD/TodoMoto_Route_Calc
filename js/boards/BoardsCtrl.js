(function () {
	function BoardsCtrl(BoardsService) {
	var vm = this;

	vm.boards = BoardsService.getBoards();

	vm.remove = function remove(board) {
		BoardsService.remove(board);
		vm.boards = BoardsService.getBoards();
	}
}

angular.module('noteriousApp')
	.controller('BoardsCtrl', BoardsCtrl);
})();