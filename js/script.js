angular.module('noteriousApp', ['ngRoute'])
	.config(noteriousConfig)
	.controller('MainCtrl', MainCtrl)
	.controller('BoardsCtrl', BoardsCtrl)
	.controller('BoardCtrl', BoardCtrl)
	.controller('NotesCtrl', NotesCtrl)
	.controller('CalculatorController', CalculatorController)
	.factory('BoardsService', BoardsService);


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

function MainCtrl() {}

function BoardsCtrl(BoardsService) {
	var vm = this;
	//  на первом этапе boards будет заполнено значение defauts (объект),
	// при выполении действия  - ng-click="boardCtrl.add(boardCtrl.board, boardForm)"
	// а затем, т.к в boards уже есть 1 объект, Ангуляр изменит модель
	// с помощью вызова ng-repeat="board in boardsCtrl.boards" в boards.html
	// и отрисует еще одну доску, и т.д.
	vm.boards = BoardsService.getBoards();

	vm.remove = function remove(board) {
		BoardsService.remove(board);
	// после удаления какой-либо доски, изменить отображение:
	// "перериросовать" Ангуляром
		vm.boards = BoardsService.getBoards();
	}
}

function BoardCtrl( BoardsService, $log, $routeParams) {
	// по методу ТодоМото - внутри this наз., например - vm
	var vm = this,
	// объект значений полей по умолчанию в boards
		defauts = {
			title: '',
			description: '',
			isPublic: false,
			notes: []
		};
	// копирум в board ----> объект defauts
	vm.board = angular.copy(defauts);
	// !!! 1 !!!! 
	// добавляем board (defauts) ----> в массив boards (boardsService.boards)
	// и после этот массив уже используется в контроллере BoardsCtrl
	vm.add = function add(board, boardForm) {
		BoardsService.add(board);
		_reset(boardForm);
	};
	// проверка формы ( впринципе можно без этого )
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

function NotesCtrl(BoardsService, $routeParams, $log, $location) {
	$log.debug($routeParams);

	var vm = this,
		defauts = {
			title: '',
			content: '',
			isPublic: false
		};
	// получаем текущий индекс доски
	// в массиве boards (boardsService.boards)
	vm.board = BoardsService.getByIndex($routeParams.id);

	$log.debug(vm.board);

	if (!vm.board) {
		$location.path( "/" );
	}
	// создаем стартовую запись
	// передаем в note - defauts 
	// и Ангуляр отрисовывает нам первый Note

	vm.note = angular.copy(defauts);

	// при вызове ф-ции - обращаемся к сервису BoardsService
	// который возвращает своей ф-цией ---> boards[index].notes
	// и тогда запускается прописанный в темплейте
	// ng-repeat="note in notesCtrl.board.notes"
	// отрисовывается Ангуляром новый Note

	vm.add = function add(note) {
		BoardsService.addNote($routeParams.id, note);
		// отрисовать Note по default
		_reset();
	};

	vm.remove = function remove(note) {
		BoardsService.removeNote($routeParams.id, note);
	};
	
	function _reset() {
		vm.note = angular.copy(defauts);
	}
}
function BoardsService() {
	var boards = [],
		boardsService = {};

	boardsService.add = function add (board) {
		boards.push(board);
	};
	// перебор массива и применение ф-ции колбека
	// function(result, item) к каждому элементу массива
	// слева - направо
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


function CalculatorController($scope) {
  	var  inc_conversion = 0.0625,
    hal_conversion = 0.0450,
    cfl_conversion = 0.0146,
    led_conversion = 0.0125;
    
    

    $scope.hoursPerDay = 1;
    $scope.cost = 12;
    // $scope.selected = $scope.items[0].subItem;

    $scope.items = [{
      value:375,
      label:375
    },{
      value:600,
      label:600
    },{
      value:900,
      label:900
    },{
      value:1125,
      label:1125
    },{
      value:1600,
      label:1600
    }
     ];
     $scope.current_lumens = $scope.items[1].value;
     console.log($scope.current_lumens);

    // Event handlers
    $scope.onEditChange = function () {
      $scope.onEditChangeResult = "The value is hoursPerDay: '" + $scope.hoursPerDay + "'" + ". The value is cost: '" + $scope.cost + "'"
      + " The value is current_lumens: '" + $scope.current_lumens;

      $scope.inc_wattage = ($scope.current_lumens * inc_conversion).toFixed(1);
      $scope.hal_wattage = ($scope.current_lumens * hal_conversion).toFixed(1);
      $scope.cfl_wattage = ($scope.current_lumens * cfl_conversion).toFixed(1);
      $scope.led_wattage = ($scope.current_lumens * led_conversion).toFixed(1);

      $scope.inc_cost = ((($scope.inc_wattage * 365 * $scope.hoursPerDay) /1000) * ($scope.cost/100)).toFixed(2);
      $scope.hal_cost = ((($scope.hal_wattage * 365 * $scope.hoursPerDay) /1000) * ($scope.cost/100)).toFixed(2);
      $scope.cfl_cost = ((($scope.cfl_wattage * 365 * $scope.hoursPerDay) /1000) * ($scope.cost/100)).toFixed(2);
      $scope.led_cost = ((($scope.led_wattage * 365 * $scope.hoursPerDay) /1000) * ($scope.cost/100)).toFixed(2);
    };



    // Вызов по дефаулту
    $scope.onEditChange();
    
	

  };