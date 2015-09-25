angular.module('cat-tinder', ['ionic', 'ionic.contrib.ui.tinderCards'])

  .directive('noScroll', function () {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attr) {
        $element.on('touchmove', function (e) {
          e.preventDefault();
        });
      }
    }
  })
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .controller('CardsCtrl', function ($scope, $http, $log) {

    $scope.cards = [];

    $scope.cardSwipedLeft = function (index) {
      console.log('Left swipe');
    }

    $scope.cardSwipedRight = function (index) {
      console.log('Right swipe');
    }

    $scope.cardDestroyed = function (index) {
      $scope.cards.splice(index, 1);
    }

    var USERNAME = 'andy_milestone0';
    var API_KEY = 'b7cd88473d09073c9a11';
    var URL = "https://pixabay.com/api/?username=" +
      USERNAME + "&key=" + API_KEY + "&q=" + encodeURIComponent('cats');

    function getImages() {
      $http.get(URL).success(function (data) {
        if (parseInt(data.totalHits) > 0)
          data.hits.forEach(function (hit) {
            $scope.cards.push(angular.extend({},
              {image: hit.webformatURL, title: hit.user}));
          });
        else
          $log.debug('No hits');
      });
    }

    getImages();
  })
;
