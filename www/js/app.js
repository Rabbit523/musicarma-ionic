// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'angularSoundManager'])
.constant("baseurl", "")
.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position("bottom");
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
    // setup an abstract state for the tabs directive
      .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'templates/tabs.html',
          controller: 'DashCtrl'
      })
    // Each tab has its own nav history stack:
    .state('tab.dash', {
        url: '/dash',
        abstract: true,
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })
    .state('tab.dash.playlists', {
        url: '/playlists',
        views: {
            'tab-playlists': {
                templateUrl: 'templates/tab-dash-playlists.html',
                controller: 'PlaylistsCtrl'
            }
        }
    })
        .state('tab.dash.albums', {
            url: '/albums',
            views: {
                'tab-albums': {
                    templateUrl: 'templates/tab-dash-albums.html',
                    controller: 'PlaylistsCtrl'
                }
            }
        })
        .state('tab.tracks', {
            url: '/tracks',
            views: {
                'tab-dash': {
                    templateUrl: 'templates/tab-dash-tracks.html',
                    controller: 'PlaylistsCtrl'
                }
            }
        })
    .state('tab.dashAlbum', {
             url: '/dashAlbum',
             abstract: true,
             views: {
                 'tab-dash': {
                     templateUrl: 'templates/tab-dashalbum.html'
                 }
             }
         })
        .state('tab.dashAlbum.album', {
            url: '/albums/:artist',
            views: {
                'tab-albums': {
                    templateUrl: 'templates/tab-dash-albums.html',
                     controller: 'AlbumCtrl'
                }
            }
        })
        .state('tab.dashAlbum.tracks', {
            url: '/dtracks',
            views: {
                'tab-tracks': {
                    templateUrl: 'templates/tab-dash-tracks.html',
                    controller: 'PlaylistsCtrl'
                }
            }
        })
   .state('tab.albumDetail', {
       url: '/albumDetail/:id',
       views: {
           'tab-dash': {
               templateUrl: 'templates/tab-albumDetail.html',
               controller: 'albumDetailCtrl'
           }
       }
   })
    .state('tab.ovelser', {
          url: '/ovelser',
          views: {
              'tab-ovelser': {
                  templateUrl: 'templates/tab-ovelser.html'
              }
          }
      })
          .state('tab.remser', {
              url: '/remser',
              views: {
                  'tab-remser': {
                      templateUrl: 'templates/tab-remser.html',
                      controller: 'remserCtrl'
                  }
              }
          })
    .state('tab.om', {
        url: '/om',
        views: {
            'tab-om': {
                templateUrl: 'templates/tab-om.html',
                controller: 'OMCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/tracks');

})
.filter("trusted_html", function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
})
.filter("trusted_url", function ($sce) {
    return function (input) {
        return $sce.trustAsResourceUrl(input);
    }
})
;
