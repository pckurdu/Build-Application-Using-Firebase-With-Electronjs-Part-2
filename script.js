var app=angular.module('myApp',['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:'login.html',
            controller:'loginCtrl'
        })
        .when('/dashboard',{
            templateUrl:'dashboard.html',
            controller:'dashboardCtrl'
        })
        .otherwise({
            redirectTo:'/'
        })
});

app.controller('loginCtrl',function($scope,$location,$rootScope){

$rootScope.auth=false;//I created auth object from rootScope and set it to false as initial

    $scope.login=function(){//the function that will work when the login button is clicked

        auth.signInWithEmailAndPassword($scope.username,$scope.password).then((res)=>{//the function that controls the user in the firebase

            $rootScope.auth=true;
            console.log(res.user);
            $location.path('/dashboard');//if the user has a firebase, go to the dashboard page
        })

    }
    $scope.signup=function(){//the function that will work when the signup button is clicked

        auth.createUserWithEmailAndPassword($scope.username,$scope.password).then(res=>{//the function that adds user to firebase
            console.log(res.user);
            $rootScope.auth=true;
            $location.path('/dashboard');//if the user has a firebase, go to the dashboard page
        });
    }
});

app.controller('dashboardCtrl',function($rootScope,$scope,$location){

if($rootScope.auth==true){
  $scope.ekle=function(){

      db.collection('makaleler').add({
          baslik:$scope.baslik,
          icerik:$scope.icerik
      }).then(()=>{
          console.log("ekleme işlemi başarılı");
      }).catch(err=>{
          console.log(err.message);

      })

  }

  var ul=document.getElementById('ul');

  db.collection('makaleler').onSnapshot(snap=>{
      //console.log(snap.docs);
      var belgeler=snap.docs;
      if(belgeler.length){
          let html='';
          belgeler.forEach(belge=>{
              //console.log(belge);
              var b=belge.data();
              console.log(b);
              var li=`<li class="list-group-item">${b.baslik}---${b.icerik}</li>`;
              html +=li;
          });
          ul.innerHTML=html;
      }

  })
}

})
