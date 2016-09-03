angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope,$ionicLoading,$ionicPopup,$timeout, $cordovaCamera, $cordovaCapture,$cordovaToast) {
  $ionicLoading.show({ template: 'Wait Just a seconds!!!', noBackdrop: true, duration: 2000 });
  
  $timeout(function() {
    $ionicPopup.alert({
      title: 'Welcome',
      content: 'in ngCordova plugins!'
    }).then(function(res) {
      console.info('started');
      document.getElementById('now').innerHTML = "plugins are ready to use.....";
      document.getElementById('rr').style.display = "block";
    });  
  }, 2000);
  

  /*$cordovaToast
    .show('plugins are ready to use', 'long', 'center')
    .then(function(success) {
      // success
    }, function (error) {
      // error
    });

  $cordovaToast.showShortTop('Here is a message').then(function(success) {
    // success
  }, function (error) {
    // error
  });

  $cordovaToast.showLongBottom('Here is a message').then(function(success) {
    // success
  }, function (error) {
    // error
  });*/

  ///////////////////////////////////////////////////////////////////////////////Example 1
  $scope.record = function(){
    navigator.device.capture.captureAudio(captureSuccess,captureError,{limit:1});
  };
  // capture callback
  var captureSuccess = function(mediaFiles) {
      var i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
          path = mediaFiles[i].fullPath;
          console.dir(s[0]);
          //console.log('record name:'+path);
          alert("Audio capture done:"+s[0].fullPath);
      }
  };
  // capture error callback
  var captureError = function(error) {
      navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
  };



  ///////////////////////////////////////////////////////////////////////////////Example 2
  $scope.captureAudio = function() {
    var options = { limit: 1, duration: 5 };

    $cordovaCapture.captureAudio(options).then(function(audioData) {
      console.info("Audio data:"+angular.toJson(audioData));
      alert("Audio recorded:"+angular.toJson(audioData));
    }, function(err) {
      console.error("Audio error:"+arr);
      alert('error');
    });
  };


})

.controller('ChatsCtrl', function($scope, Chats, $cordovaToast, $cordovaCamera, $cordovaCapture, $ionicPlatform) {
  console.info("in ChatsCtrl");
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////Example 1 goes here....
  //$scope.pictureUrl = "http://placehold.it/300x300";
  $scope.takePicture = function(){
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true,
      correctOrientation:true
    };
    $cordovaCamera.getPicture({options}).then(
        function(data){
          console.trace();
          $scope.pictureUrl2 = 'data:image/jpeg;base64,'+data;
          console.log('camera data:'+angular.toJson(data));
          //alert('camera data:'+angular.toJson(data));
        },
        function(error){
          console.error('camera error:'+angular.toJson(error));
          alert('camera error:'+angular.toJson(error));
        });
  };
  //ends....



  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////Example 2 goes here....
  $scope.takePhoto = function () {
    console.info("is still in takePhoto");
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };
   
    $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.imgURI = "data:image/jpeg;base64," + imageData;
      }, function (err) {
          alert('can not load image');
      });
  };
                
  $scope.choosePhoto = function () {
    console.info("is still in choosePhoto");
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
  };

      $cordovaCamera.getPicture(options).then(function (imageData) {
          $scope.imgURI2 = "data:image/jpeg;base64," + imageData;
      }, function (err) {
          alert('can not load image');
      });
  };
  //ends....


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////Example 3 goes here....
  //.............................................................../capture video
  $scope.video = function(){
    console.info("in video function");
    navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1});
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
    navigator.device.capture.captureImage(captureSuccess2, captureError2, {limit:1});
  };
  var captureSuccess2 = function(mediaFiles) {
      var i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
          path = mediaFiles[i].fullPath;
          console.dir(s[0]);
          var v = "";
          v += "<img src='" + s[0].fullPath + "'>";
          v += "";
          //document.querySelector("#imageArea").innerHTML = v;
          $scope.imageArea = "data:image/jpeg;base64," + v;
      }
  };
  var captureError2 = function(error) {
      navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
  };
  //ends....

  //alert('hi');

  

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope,$cordovaGeolocation,$cordovaSocialSharing) {
  $scope.latlon2 = "jon";
  /*$scope.settings = {
    enableFriends: true
  };*/
  //alert('in AccountCtrl');
  $scope.geodata = function(){

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
      alert(lat+" " +long);
      //$scope.latlon
      document.getElementById('lat').innerHTML = position.coords.latitude;
      //$scope.lonlon
      document.getElementById('lon').innerHTML = position.coords.longitude;
    }, function(err) {
      console.error("some error");
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
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
      alert("after watch:"+lat+" " +long);
  });


  watch.clearWatch();
  // OR
  $cordovaGeolocation.clearWatch(watch)
    .then(function(result) {
      console.info("clearWatch called:"+result);
      }, function (error) {
      console.error(error);
    });
  };

$scope.postdata = function(){
    $cordovaSocialSharing
    .share('shared to you Im glade!', 'Ionic Post', null, 'http://shares.890m.com/') // Share via native share sheet
    .then(function(result) {
        $ionicPopup.alert({
          title: 'Done',
          content: 'Shared Successfully!'
        }).then(function(res) {
          console.info('done');
        });  
    }, function(err) {
      $ionicPopup.alert({
          title: 'Failed',
          content: 'Not shared! due to '+angular.toJson(err)
        }).then(function(res) {
          console.info('done'+res);
        });  
    });
};

});
