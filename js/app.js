"use strict";





(function(){


  angular
  .module("wdinstagram", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory( "WdinstagramFactory", [
    "$resource",
    WdinstagramFactoryFunction
  ])
  .controller("WdinstagramIndexController", [
    "WdinstagramFactory",
    WdinstagramIndexControllerFunction
  ])
  .controller("WdinstagramShowController", [
    "WdinstagramFactory",
    "$stateParams",
    "$state",
    WdinstagramShowControllerFunction
  ])
  .controller("WdinstagramNewController", [
    "WdinstagramFactory",
    "$state",
    WdinstagramNewControllerFunction
  ])
  .controller("WdinstagramEditController", [
    "WdinstagramFactory",
    "$stateParams",
    WdinstagramEditControllerFunction
  ])

  function RouterFunction($stateProvider){
    $stateProvider
    .state("wdinstagramIndex", {
      url: "/",
      templateUrl: "js/ng-views/index.html",
      controller: "WdinstagramIndexController",
      controllerAs: "vm"
    })
    .state("wdinstagramShow", {
      url: "/wdinstrams/:id",
      templateUrl: "js/ng-views/show.html",
      controller: "WdinstagramShowController",
      controllerAs: "vm"
    })
    .state("wdinstramsNew", {
      url: "/wdinstagrams/new",
      templateUrl: "js/ng-views/new.html",
      controller: "WdinstagramNewController",
      controllerAs: "vm"
    })
    .state("wdinstagramEdit", {
      url: "/wdinstagrams/:id/edit",
      templateUrl: "js/ng-views/edit.html",
      controller: "WdinstagramEditController",
      controllerAs: "vm"
    })
  }

  function WdinstagramFactoryFunction($resource){
    return $resource('http://localhost:3000/entries/:id')
  }

  function WdinstagramIndexControllerFunction( WdinstagramFactory){
    this.entries = WdinstagramFactory.query()
  }

  function WdinstagramNewControllerFunction(WdinstagramFactory, $state){
    this.entry = new WdinstagramFactory()
    this.create = function(){
      this.entry.$save()
      $state.go('wdinstagramShow', { id: this.entry.id})
    }
  }

  function WdinstagramEditControllerFunction(WdinstagramFactory, $stateParams) {
    this.entry = WdinstagramFactory.get({id: $stateParams.id})

  }

  function WdinstagramShowControllerFunction(WdinstagramFactory, $stateParams, $state, $index){
    this.entry = WdinstagramFactory.get({id: $stateParams.id})
    this.delete = function() {
      this.entry.$delete({id: $stateParams.id})
      $state.go('wdinstagramIndex')
    }
  }


})();
