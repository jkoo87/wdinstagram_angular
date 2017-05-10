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
    "$stateParams",
    "$state",
    WdinstagramShowControllerFunction
  ])
  .controller("WdinstagramNewController", [
    "$state",
    WdinstagramNewControllerFunction
  ])
  .controller("WdinstagramEditController", [
    "$stateParams",
    "$state",
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

  function WdinstagramNewControllerFunction($state){
    this.entries = entries
    this.newEntry = {}
    this.create = function() {
      this.entries.push(this.newEntry)
      this.newEntry = {}
      $state.go('wdinstagramShow', { id: this.entries.length-1})
    }
  }

  function WdinstagramEditControllerFunction($stateParams, $state) {
    this.entry = entries[$stateParams.id]
    this.update = function() {
      this.entry = entries[$stateParams.id]
      $state.go('wdinstagramShow', { id: $stateParams.id})
    }
  }

  function WdinstagramShowControllerFunction($stateParams, $state, $index){
    this.entry = entries[$stateParams.id]
    this.id = $stateParams.id
    this.delete = function() {
      entries.splice($stateParams.id, 1)
      $state.go('wdinstagramIndex')
    }
  }


})();
