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
    return $resource('http://localhost:3000/entries/:id', {}, {
      update: { method: "PUT"}
    })
  }

  function WdinstagramIndexControllerFunction( WdinstagramFactory){
    this.entries = WdinstagramFactory.query()
  }

  function WdinstagramNewControllerFunction(WdinstagramFactory, $state){
    this.entry = new WdinstagramFactory()
    this.create = function(){
      this.entry.$save(this.entry, function(data){
        let id = data.id
        $state.go('wdinstagramShow', { id: id})
      })
    }
  }

  function WdinstagramEditControllerFunction(WdinstagramFactory, $stateParams, $state) {
    this.entry = WdinstagramFactory.get({id: $stateParams.id})
    this.update = function(){
      this.entry.$update({id: $stateParams.id}, function(data){
        let id = data.id
        $state.go('wdinstagramShow', { id: id})
      })

    }

  }

  function WdinstagramShowControllerFunction(WdinstagramFactory, $stateParams, $state){
    this.entry = WdinstagramFactory.get({id: $stateParams.id})
    this.delete = function() {
      this.entry.$delete({id: $stateParams.id}, function(){
          $state.go('wdinstagramIndex').success
      })
    }
  }


})();
