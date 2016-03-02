(function () {
	function BoardsService() {
	var boards = [],
		boardsService = {};

	boardsService.add = function add (board) {
		boards.push(board);
	};
	boardsService.remove = function remove (board) {
		boards = boards.reduce( function(result, item) {
			if(item != board) {
				result.push(item);
			}
			return result;
		}, []);
	};
	boardsService.getBoards = function getBoards () {
		return boards;
	};

	boardsService.getByIndex = function getByIndex (index) {
		return boards[index];

	};

	boardsService.addNote = function addNote (index, note) {
		return boards[index].notes.push(note);
	};
	// перебор массива для удаления Note
	// аналогичный удалению досок
	boardsService.removeNote = function removeNote (index, note) {
		boards[index].notes = boards[index].notes.reduce( function(result, item) {
			if(item != note) {
				result.push(item);
			}
			return result;
		}, []);
	};

	return boardsService;
}

angular.module('noteriousApp')
.factory('BoardsService', BoardsService);

})();