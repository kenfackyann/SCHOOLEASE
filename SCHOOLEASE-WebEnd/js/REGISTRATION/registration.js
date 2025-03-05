// const nameBox= document.getElementById('name');
// const emailBox = document.getElementById('email');
// const passwordBox = document.getElementById('password');
// const confirmPasswordBox = document.getElementById('confirmPassword');

// const { log } = require("neo-async");

        // JavaScript for toggling password visibility
        const togglePassword = document.querySelector('#togglePassword');
        const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');
        const password = document.querySelector('#password');
        const confirmPassword = document.querySelector('#confirmPassword');

        togglePassword.addEventListener('click', function () {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });

        toggleConfirmPassword.addEventListener('click', function () {
            const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPassword.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
  
document.getElementById('registration_form').addEventListener('submit',async function(e){
e.preventDefault();
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const accountType = "searcher";

console.log(name,email,password);

const response = await fetch('http://localhost:3001/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    Name: name,
    emailAddress: email,
    password: password,
    accountType: accountType
  })
});

const data = await response.json();
document.getElementById('message').innerText = data.message;

if (response.status === 201) {
  alert('Registration successful!');
  window.location.href = '../../index.html.html';
}

})