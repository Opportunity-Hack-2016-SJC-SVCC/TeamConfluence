angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state,$window,$http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.comment;
  $scope.asset_id;
  $scope.user_rating;

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/review.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeReview = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.review = function(id) {
    $scope.modal.show();
    $scope.asset_id=id;
    console.log("lalala"+id);
  };

  $scope.reviewButt1= function () {
    $scope.user_rating=1;
var link = 'http://52.10.82.147:9000/review?user_rating='+1+"&asset_id="+$scope.asset_id+"&comment= ";
 $http.get(link).then(function (response) {
  console.log(response.data);
  console.log("nnnnnn");
      $window.location.reload();

   });

  };


$scope.reviewButt2= function () {
$scope.user_rating=2;
console.log($scope.comment);
$window.location.reload();
var link = 'http://52.10.82.147:9000/review?user_rating='+$scope.user_rating+"&asset_id="+$scope.asset_id+"&comment= ";
 $http.get(link).then(function (response) {
  console.log(response.data);
  console.log("nnnnnn");

   });      
  };
  $scope.reviewButt3= function () {
$scope.user_rating=3;
      
var link = 'http://52.10.82.147:9000/review?user_rating='+$scope.user_rating+"&asset_id="+$scope.asset_id+"&comment= ";
 $http.get(link).then(function (response) {
  console.log(response.data);
  console.log("nnnnnn");
      $window.location.reload();
  
   });  };
  // Perform the login action when the user submits the login form
  $scope.doReview = function() {
    console.log('teri maa ki', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    // $timeout(function() {
      //$scope.closeReview();
      // $state.reload();

      // $window.location.reload();
      // $state.go('app.confirm');
    // }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})


//  map view controller 
.controller('BrowseCtrl', function($scope, $http, $state, $window) {
  // $state.go('app.search');
  // console.log("ksdj"+$window.innerHeight);
   $('#mapid').css('height', $window.innerHeight);
    $(window).resize(function(){
      $('#mapid').css('height', $window.innerHeight );
    })
  Smap.init("mapid");

  // Smap.Smap().on('click', function(e) {
  //   console.log(e.latlng);
  // });
  var link = "http://52.10.82.147:9000/asset";
  $http.get(link).then(function (response) {
    console.log(response.data[0].location);
    console.log("get assets");
    Window.dataJson = response.data;
    // $("#mapid").css("height", "500px" );
    var _Polyline, _geoL;
    // console.log("hello");
    $scope.poly = [];
    Window.dataJson.forEach(function(item){
      if(item.asset_type=='p'){
        _Polyline=  new L.Polyline(JSON.parse(item.location), {
          color: 'red', 
          weight: 10,
          opacity: .8,
          smoothFactor: 1,
        }).addTo(Smap.Smap())
        .on( "click", function(){
          console.log(this);
          $scope.review(this.properties.id);
        });
        _Polyline.properties = {
          id: item.asset_id,
          type: item.asset_type,
          name: item.asset_name
        };
        $scope.poly.push(_Polyline);
      }else{
        _geoL= L.circle(JSON.parse(item.location), 15, {
          color: '#ED2324',
          fillColor: 'ED2324',
          fillOpacity: 1
        }).addTo(Smap.Smap())
          .on( "click", function(){
          console.log(this);
          $scope.review(this.properties.id);
        });
        _geoL.properties = {
          id: item.asset_id,
          type: item.asset_type,
          name: item.asset_name
        };
      }
      Window.review = function(id){
        $scope.review(id);
      };

    });
  }); 

  
  $scope.reset = function(){
    $scope.poly.forEach(function(item){
      item.off('click');
      console.log(item);
      // item.addOneTimeEventListener('click', function(){
      //   console.log(this);
      //   // $scope.reset();
      // });
    });
  }


  
})

.controller('LoginCtrl',function($scope, $http, $window, $timeout, $state){

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log("hello");

    var url;
  $http.get("http://52.10.82.147:9000/url").then(function (response) {
    console.log("aksdjbfksajb");
    console.log(response.data);
    url=response.data;
  });

    console.log("it works");
    $window.open(url,"Please Sign in with Google ID","width:500px, height: 700px");


    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $state.go('app.browse');
    }, 500);
  };
})

.controller('confirmCtrl', function($scope, $state, $timeout) {
  console.log("confirmation page");
  $timeout(function() {
      $state.go('app.browse');
    }, 200);
});


var GetCurentLocation = function(success, error){
  var s = success || function(){console.log("postion sucessfully found")};
  var e = error || function(){console.log("error in determining the location.")};
  var a = $.geolocation.get({
    success:  function(position) {
            s(position);
          }, 
    error:    function(){
            e();
          }
  });
};










// for the the dummy data;
Window.dataJson = [
  {
    c: [
      {
        "lat": "37.37904130969469", 
        "lng": "-121.92266464233398"
      },
      {
        "lat": "37.37324372702349", 
        "lng": "-121.91824436187743"
      }
    ],
    type: 'p',
    id: '1', 
  },
  {
    c: [
      {
        "lat": "37.37910951388253", 
        "lng": "-121.92270755767822"
      },
      {
        "lat": "37.378700287825076", 
        "lng": "-121.92341566085817"
      },
      {
        "lat": "37.37737028771697",
        "lng": "-121.92514300346373"
      }
    ],
    type: 'p',
    id: '2' 
  },
  {
    c: {
      "lat": "37.379211820047985", 
      "lng": "-121.92257881164551"
    },
    type: 'c',
    id: '3', 
  },

];




// [
//   {
//     "lat": "37.37904130969469", 
//     "lng": "-121.92266464233398"
//   },
//   {
//     "lat": "37.37324372702349", 
//     "lng": "-121.91824436187743"
//   }
// ];




