document.getElementById('get-started').addEventListener('click', function() {
    document.getElementById('chatbot').style.display = 'flex';
});

document.getElementById('close-chatbot').addEventListener('click', function() {
    document.getElementById('chatbot').style.display = 'none';
});

document.getElementById('start-chat').addEventListener('click', function() {
   
    // Implement chatbot interaction logic here
});


const token = localStorage.getItem("token");

document.querySelector('.hero' && '#authButtons').addEventListener('click',function(){
    document.querySelector('#authButtons').classList.remove('show')
})




async function toggleAuthButtons() {
    document.querySelector('.loader_box').classList.add('show');
    const response = await fetch("http://localhost:3001/auth/authenticateUsers", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
    
    
    const data =  await response.json();
    console.log(data)
     
    const authButtons = document.getElementById("authButtons");
    const userData = document.querySelector(".user");
    const email = document.querySelector(".userEmail");
    const name = document.querySelector(".userName");
    
    
    console.log();
    
    if(data.success ){
        name.innerText = data.user.userName
        email.innerText = data.user.email
        document.querySelector('.loader_box').classList.remove('show');
userData.classList.toggle("show"); 

      }
    else{
        document.querySelector('.loader_box').classList.remove('show');
        authButtons.classList.toggle("show"); 
        
    }
 
}

function logOut(){
    localStorage.clear();
    location.reload();
}