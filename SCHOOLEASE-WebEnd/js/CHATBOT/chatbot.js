// chatbot.js

// Define the series of questions
const questions = [
    "in Which  region do you want your school to be ?",
    "in what field are you looking for ?",
    "what school fee do you want for the school ?",
    "what is the language will you prefere for the school ?",
    // "what department are you looking for ?",
  
    
   
];
const randomAnswers = [
    "ok i see",
    "interesting option",
    "let me see what i can find for that",
    "thats a good idea",
]

// Keywords to extract from the user's input
const keywordMapping = {
    region: ["center","littoral","west","southwest","northwest","north","farnorth","south","east","adamawa"],
    field: ["it","management","banking","social science","science","biomedical"],
    language: ["english","french","arabic","local language"],
    // department:[""]
   
};
const lastMessage = "thankyou for your answers let me search for a school that respects your criterias"
// Track the current question index
let currentQuestionIndex = 0;
let userResponses = {};

function sendMessage() {
    const inputBox = document.getElementById('userInput');
    const userMessage = inputBox.value.trim();
    
    if (userMessage) {
        addMessageToChat('user', userMessage);

        if (currentQuestionIndex === 3) { // Handle price input
            const price = parseInt(userMessage, 10);
            if (isNaN(price)) {
                addMessageToChat('bot', "Please enter a valid number for the school fee.");
                return;
            } else {
                userResponses['price'] = price;
                inputBox.value = '';
                addMessageToChat('bot', randomAnswers[Math.floor(Math.random() * randomAnswers.length)]);
                askNextQuestion();
            }
        } else {
            if (!extractKeyword(userMessage)) {
                addMessageToChat('bot', getValidInputsMessage());
            } else {
                inputBox.value = '';
                addMessageToChat('bot', randomAnswers[Math.floor(Math.random() * randomAnswers.length)]);
                askNextQuestion();
            }
        }
    }
}

// Function to add messages to the chat
function addMessageToChat(sender, message) {
    const chatBox = document.getElementById('chatBox');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to ask the next question
function askNextQuestion() {
    if (currentQuestionIndex < questions.length){
        
        addMessageToChat('bot', questions[currentQuestionIndex]);
        currentQuestionIndex++;
    }
    else{
        addMessageToChat('bot', lastMessage);
         // Send userResponses as a POST request
         fetch('http://localhost:3001/univ/filterUniv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userResponses) // Send the collected answers
        })
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data.length) {
                displayUniversities(data.data);
            } else {
                addMessageToChat('bot', 'Sorry, no universities found matching your criteria.');
            }
        })
        .catch(error => {
            addMessageToChat('bot', 'There was an error processing your request. Please try again.');
            console.error('Error:', error);
        });
    }
   
        
    }

    function displayUniversities(schools) {
        const schoolContainer = document.getElementById('schoolContainer');
        schoolContainer.innerHTML = ''; // Clear the container
        
        if (schools.length > 0) {
            schools.forEach(school => {
                const imageUrl = `/images/${school.imageName || 'default.jpg'}`;
                const schoolCard = `
                    <div class="school-card">
                        <div class="school-info">
                            <div class="school-logo">
                            <img src="../../img/public/${school.image}" alt="School Logo" class="school-logo-image" />
                            </div>
                            <div>
                                <h4>${school.university_name}</h4>
                              
                                <div class="school-details">
                                    <span><span >location_on</span>${school.region} || ${school.location}</span>
                                    <span><span ><a href="${school.website}" target="_blank">Visit Website</a></span>
                                </div>
                            </div>
                        </div>
                     
                    </div>
                `;
                schoolContainer.innerHTML += schoolCard;
            });
        } else {
            schoolContainer.innerHTML = 'No universities found.';
        }
    }
// Function to extract keyword from user input
function extractKeyword(userInput) {
    
    const lowercaseInput = userInput.toLowerCase();
    let foundKeyword = false;

    for (const [key, keywords] of Object.entries(keywordMapping)) {
        for (const keyword of keywords) {
            if (lowercaseInput.includes(keyword)) {
                userResponses[key] = keyword;
                foundKeyword = true;
                break;
            }
        }
    }

    return foundKeyword;
}
// Function to get a message with valid inputs
function getValidInputsMessage() {
    let message = "I didn't understand that. Please enter one of the following options:\n";
    if (currentQuestionIndex === 1) {
        message += `regions:\n ${keywordMapping.region.join(", \n")}.`;
    } else if (currentQuestionIndex === 2) {
        message += `fields:\n ${keywordMapping.field.join(",\n ")}.`;
    } else if (currentQuestionIndex === 4) {
        message += `languages:\n ${keywordMapping.language.join(",\n ")}.`;
    }
    return message;
}

// Function to perform a search based on extracted keywords


// Start the chatbot by asking the first question
askNextQuestion();
console.log(userResponses);
