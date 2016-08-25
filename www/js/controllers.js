angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

})

.controller('ChatsCtrl', function($scope, Chats, $cordovaCapture) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
  console.info("in ChatsCtrl");
  
  //.............................................................../capture video
  $scope.video = function(){
    console.info("in video function");
    navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:2});
  };
  var captureSuccess = function(mediaFiles) {
      var i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
          path = mediaFiles[i].fullPath;
          console.dir(s[0]);
          var v = "<video controls='controls'>";
          v += "<source src='" + s[0].fullPath + "' type='video/mp4'>";
          v += "</video>";
          document.querySelector("#videoArea").innerHTML = v;
      }
  };
  var captureError = function(error) {
      navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
  };

  ///............................/////////////////////////////////.../capture image
  $scope.image = function(){
    console.info("in image function");
    navigator.device.capture.captureImage(captureSuccess2, captureError2, {limit:2});
  };
  var captureSuccess2 = function(mediaFiles) {
      var i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
          path = mediaFiles[i].fullPath;
          console.dir(s[0]);
          var v = "";
          v += "<img src='" + s[0].fullPath + "'>";
          v += "";
          document.querySelector("#imageArea").innerHTML = v;
      }
  };
  var captureError2 = function(error) {
      navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
  };

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
  alert('in AccountCtrl');
  /*var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
      alert(lat+" " +long);
    }, function(err) {
      // error
    });


  var watchOptions = {
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
  });


  watch.clearWatch();
  // OR
  $cordovaGeolocation.clearWatch(watch)
    .then(function(result) {
      // success
      }, function (error) {
      // error
    });*/
});
