document.addEventListener('DOMContentLoaded', function() {
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const messages = document.getElementById('messages');

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (userMessage === '') return;

        // Display user message
        displayMessage(userMessage, 'user');
        chatInput.value = '';

        // Simulate bot response (Replace this with actual bot response logic)
        setTimeout(() => {
            const botResponse = "I'm a chatbot! How can I help you?";
            displayMessage(botResponse, 'bot');
        }, 1000);
    }

    function displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = message;
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }
});