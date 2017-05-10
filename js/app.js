"use strict";

let dummyData = [
  { title: "Hello" ,
    author: "jkoo" ,
    content: "Build a simple angular app that can preform CRUD on dummy data. The data should have a: photo_url, author, & body. Add a router, and templates for at least a show & index view." ,
    photo_url: "http://wallpaper-gallery.net/images/picture/picture-14.jpg"
  },
  { title: "WDInstagram Angular" ,
    author: "jkoo" ,
    content: "Apr 27, 2017 - The HTML picture element is a container used to specify mult" ,
    photo_url: "http://www.apicius.es/wp-content/uploads/2012/07/IMG-20120714-009211.jpg"
  },
  { title: "Part 1 CRUD with dummy data" ,
    author: "jkoo" ,
    content: "O “p” do termo projeto remete aos balões de diálogo. Lembrando aos membros sua missão evangelizadora de anunciar, comunicar a Paz." ,
    photo_url: "http://www.comshalom.org/portal/wp-content/uploads/2014/05/07/redacao/nova-logo-PJJ.jpg"
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
    console.log("index")
  }

  function wdinstagramShowControllerFunction(){
        console.log("show")
  }


// })();
