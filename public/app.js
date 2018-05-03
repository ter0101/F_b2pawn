window.onload=function(){
    showdata();
   
}

function saveOnclick(){
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    insertData(email.value,password.value);
    // var ref = firebase.database().ref("admin");
    // ref.child("name/fname").set("root");
    // ref.child("name/lname").set("admin");
    // ref.child("admin").set("root");สร้าง child
}

function deleteOnclick(){

}

function updateOnclick(){
    var ref = firebase.database().ref();
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    ref.update({
        email:email,
        password:password
    })
}

function showdata(){
 var ref = firebase.database().ref("pawner").orderByChild("email");
    // ref.once('value').then(function(dataSnapshot){
    //     console.log(dataSnapshot.val());//ถ้าจะใช้ key ก็เอาkey มา .key
    // });
    ref.once('value').then(function(dataSnapshot){
        dataSnapshot.forEach(function(childSnapshot){
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            document.getElementById("key").innerHTML = childKey;
            console.log(childKey,childData); 
        });
    });
}

function insertData(email,password){
    var ref = firebase.database().ref("pawner");
    ref.push({
        email:email,
        password:password
    });
    console.log("Success");
}

function removeData(){
    var ref = firebase.database().ref("pawner");
    ref.remove()
        .then(function(){
            console.log("success");
        })
        .catch(function(error){
            console.log("Remove Faild:"+ error.message)
        });
}