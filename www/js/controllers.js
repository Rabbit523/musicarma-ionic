angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
        $scope.openLink = function () {
            cordova.InAppBrowser.open("https://musicarma.dk/httpmusicarma-dk-7/", "_system");
        }
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })
    .controller('PlaylistsCtrl', function ($scope, $stateParams, pageContentService, $ionicModal) {
        $scope.playLists = [];
        $scope.tracks = [];
        $scope.albums = [];
        pageContentService.getPlatList().then(function (response) {
            $scope.playLists = response.playlists;
            $scope.tracks = response.tracks;
            $scope.albums = response.albums;
        })
        $ionicModal.fromTemplateUrl('templates/playerModel.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.player = modal;
        });
        $scope.$on("showplayerModel", function () {
            $scope.player.show();
        })
    })
    .controller('AlbumCtrl', function ($scope, $stateParams, pageContentService, $ionicModal) {
        $scope.albums = [];
        $scope.tracks = [];
        pageContentService.getPlatList().then(function (response) {
            $scope.albums = response.albums;
            $scope.tracks = response.tracks;
            if ($stateParams.artist) {
                $scope.albums = $scope.albums.filter(function (elem) { return elem.artist.toLocaleLowerCase() == $stateParams.artist.toLocaleLowerCase() })
            }
        })
        $ionicModal.fromTemplateUrl('templates/playerModel.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.player = modal;
        });
        $scope.$on("showplayerModel", function () {
            $scope.player.show();
        })
    })
    .controller('albumDetailCtrl', function ($scope, $stateParams, pageContentService,$ionicNavBarDelegate, $ionicModal) {
        $scope.album = {};
        $scope.tracks = [];
        pageContentService.getPlatList().then(function (response) {
            $scope.albums = response.albums;
            if ($stateParams.id) {
                var index = response.albums.findIndex(function (elem) { return elem.id == $stateParams.id })
                if(index>=0)
                    $scope.album = response.albums[index];
                $scope.tracks = response.tracks.filter(function (elem) { return elem.albumId == $stateParams.id })
            }
        })
        $ionicModal.fromTemplateUrl('templates/playerModel.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.player = modal;
        });
        $scope.$on("showplayerModel", function () {
            $scope.player.show();
        })
        $ionicNavBarDelegate.showBackButton(true);
    })
    .controller('rootController', function ($scope, $stateParams, Chats) {
        $scope.showModal = function () {
            $scope.$broadcast("showplayerModel");
        }
    })
    .controller('remserCtrl', function ($scope, pageContentService) {
      pageContentService.getremser().then(function (response) {
          $scope.data = response.blocks;
      })
  })
    .controller('OMCtrl', function ($scope, pageContentService) {
        pageContentService.getom().then(function (response) {
            $scope.data = response.blocks;
        })
    });
