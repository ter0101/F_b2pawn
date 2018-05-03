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
           let html = ""
           dataSnapshot.forEach(function(childSnapshot){
               var childKey = childSnapshot.key
               var childData = childSnapshot.val()
   
               html += '<tr>'
               html += `<td>${childKey}</td>`
               html += `<td>${childData.email}</td>`
               html += `<td>${childData.password}</td>`
               html += `<td><button id="btnUpdate" class="btn btn-success" onclick="updateOnclick(${childKey})">update</button></td>`
               html += `<td><button id="btnDel" class="btn btn-danger" onclick="deleteOnclick(${childKey})">delete</button></td>`
               html += '</tr>'
   
               console.log(childKey,childData); 
           });   
           document.getElementById("priteza1234").innerHTML = html;  
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

async function deleteOnclick (key) {
    console.log(key)
    var ref = firebase.database().ref("pawner")
    try {
        await ref.remove(key)
        console.log("success")
    } catch (e) {
        console.log("Remove Faild:"+ e.message)
    }
}