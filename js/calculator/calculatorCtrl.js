(function  () {
  function CalculatorController($scope) {
    var  inc_conversion = 0.0625,
    hal_conversion = 0.0450,
    cfl_conversion = 0.0146,
    led_conversion = 0.0125;
    
    $scope.hoursPerDay = 1;
    $scope.cost = 12;

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

  angular.module('noteriousApp')
         .controller('CalculatorController', CalculatorController);
})();