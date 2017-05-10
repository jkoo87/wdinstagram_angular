"use strict";





(function(){


  let entries = [
    { author: "jkoo" ,
      body: "Build a simple angular app that can preform CRUD on dummy data. The data should have a: photo_url, author, & body. Add a router, and templates for at least a show & index view." ,
      photo_url: "https://pixlr.com/assets/landing/gallery/5-68c0f48120fefc5eb0cff67573d649da.jpg",
    },
    { author: "jkoo" ,
      body: "O “p” do termo projeto remete aos balões de diálogo. Lembrando aos membros sua missão evangelizadora de anunciar, comunicar a Paz." ,
      photo_url: "http://www.freedigitalphotos.net/images/img/homepage/golf-1-top-82328.jpg",
    },
    { author: "jkoo" ,
      body: "O “p” do termo projeto remete aos balões de diálogo. Lembrando aos membros sua missão evangelizadora de anunciar, comunicar a Paz." ,
      photo_url: "https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?h=350&auto=compress&cs=tinysrgb",
    }
  ]

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

  function WdinstagramIndexControllerFunction(){
    this.entries = entries
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
