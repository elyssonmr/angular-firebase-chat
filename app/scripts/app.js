'use strict';

angular
  .module('angularFirebaseChatApp', [
    'ngRoute', 'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'ChatController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
