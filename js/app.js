"use strict";

let entries = [
  { author: "jkoo" ,
    body: "Build a simple angular app that can preform CRUD on dummy data. The data should have a: photo_url, author, & body. Add a router, and templates for at least a show & index view." ,
    photo_url: "https://pixlr.com/assets/landing/gallery/5-68c0f48120fefc5eb0cff67573d649da.jpg",
    id: 0
  },
  { author: "jkoo" ,
    body: "Apr 27, 2017 - The HTML picture element is a container used to specify mult" ,
    photo_url: "https://s-media-cache-ak0.pinimg.com/736x/11/c8/49/11c849dd69eb68a21a170ffc524e5bbd.jpg",
    id: 1
  },
  { author: "jkoo" ,
    body: "O “p” do termo projeto remete aos balões de diálogo. Lembrando aos membros sua missão evangelizadora de anunciar, comunicar a Paz." ,
    photo_url: "https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?h=350&auto=compress&cs=tinysrgb",
    id: 2
  }
]



// (function(){
  angular
  .module("wdinstagram", ["ui.router"])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .controller("wdinstagramIndexController", [
    wdinstagramIndexControllerFunction
  ])
  .controller("wdinstagramShowController", [
    "$stateParams",
    wdinstagramShowControllerFunction
  ])

  function RouterFunction($stateProvider){
    $stateProvider
    .state("wdinstagramIndex", {
      url: "/",
      templateUrl: "js/ng-views/index.html",
      controller: "wdinstagramIndexController",
      controllerAs: "vm"
    })
    .state("wdinstagramShow", {
      url: "/wdinstrams/:id",
      templateUrl: "js/ng-views/show.html",
      controller: "wdinstagramShowController",
      controllerAs: "vm"
    });
  }

  function wdinstagramIndexControllerFunction(){
    this.entries = entries
  }

  function wdinstagramShowControllerFunction($stateParams){
    this.entry = entries[$stateParams.id]
  }


// })();
