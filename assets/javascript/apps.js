
//linking to firebase
var config = {
    apiKey: "AIzaSyAq7povbZzrGIB3LRHMJiOxKX8zDbt3JAI",
    authDomain: "train-schedular-7a2a4.firebaseapp.com",
    databaseURL: "https://train-schedular-7a2a4.firebaseio.com",
    projectId: "train-schedular-7a2a4",
    storageBucket: "train-schedular-7a2a4.appspot.com",
    messagingSenderId: "752554378005"
};
  
//initializing firebase
  firebase.initializeApp(config);

  var database = firebase.database();
//onclick function, grabing the user input
$('#submit').click(function(){
    if($('#train_name').val().trim() && $('#destination').val().trim() &&  $('#time').val().trim() && $('#frequency').val().trim())
    { 
    database.ref().push({
        trainName:$('#train_name').val().trim(),
        destination: $('#destination').val().trim(),
        startTime: $('#time').val().trim(),
        frequency: $('#frequency').val().trim()
      });
    }
});

//document.ready, 
$(document).ready(function(){    
    database.ref().on("value", function(snapshot){
        var values=snapshot.val();
        snapshot.forEach(function(childSnapshot) {
        getListTIme(childSnapshot);
        });
        
    });
});

//train tables, caluation of time, moments, appending tables with calcuations
function getListTIme(childSnapshot){
      
    var nextArrival1=moment(childSnapshot.val().startTime, 'HH:mm a');
            
    nextArrival1=nextArrival1.add(childSnapshot.val().frequency,'mins');    

    var newTime=new moment ();//.format("HH:mm:ss");

    var min=newTime.diff(nextArrival1,'minutes');

    // if(min>childSnapshot.val().frequency){

    // }
    $("#table").html("");
    var mod=min%childSnapshot.val().frequency;
   
    if(mod===0) {
      var nextArrival=newTime.add(mod,'minutes');
      nextArrival= nextArrival.format('HH:mm');
      $("#traintable").append("<tr><td>"+childSnapshot.val().trainName+"</td><td>"+childSnapshot.val().destination+"</td><td>"+childSnapshot.val().frequency+"</td><td>"+nextArrival+"</td><td>"+mod+"</td></tr>");
    } else {
      mod=childSnapshot.val().frequency-mod;
      var nextArrival=newTime.add(mod,'minutes');
     nextArrival= nextArrival.format('HH:mm');   
    $("#traintable").append("<tr><td>"+childSnapshot.val().trainName+"</td><td>"+childSnapshot.val().destination+"</td><td>"+childSnapshot.val().frequency+"</td><td>"+nextArrival+"</td><td>"+mod+"</td></tr>");
    }

  
}