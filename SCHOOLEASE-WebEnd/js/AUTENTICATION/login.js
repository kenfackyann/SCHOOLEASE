
    document.querySelector("form").addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent default form submission

        const emailAddress = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        const response = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                 emailAddress: emailAddress,
             password: password
            }),
        });

        const data = await response.json();

        if (data.success) {
            
            localStorage.setItem("token", data.accessToken); // Store token (if using JWT)
            window.location.href = "../../index.html"; // Redirect to the user dashboard
            document.getElementById('message').innerText = data.message;
            document.getElementById('message').style.color = "green";
            document.getElementById('message').style.textShadow = " 0 0 8px rgba(204, 231, 255, 0.8)";
        } else {
            console.log(data.message);
            
            document.getElementById('message').innerText = data.message;
            document.getElementById('message').style.color = "red";
            document.getElementById('message').style.textShadow = " 0 0 8px rgba(204, 231, 255, 0.8)";

             // Show error message
        }
    });

