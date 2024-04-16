

function getModuleResponse(question, module) {
    switch(module) {
        case 'research':
            return researchResponse(question);
        case 'tutorial':
            return tutorialResponse(question);
        case 'review':
            return reviewResponse(question);
        case 'incident':
            return incidentResponse(question);
        case 'multiagent':
            return multiagentResponse(question);
        default:
            return 'Module not set correctly.';
    }
}

// Define response functions for each module
function researchResponse(question) {
    return `Answer from research module: ${question}`;
}

function tutorialResponse(question) {
    return `Answer from tutorial module: ${question}`;
}

function reviewResponse(question) {
    return `Answer from review module: ${question}`;
}

function incidentResponse(question) {
    return `Answer from incident module: ${question}`;
}
function multiagentResponse(question) {
    return `Answer from multi agent: ${question}`;
}

function setModule(moduleName) {
    // Update the module message
    const moduleMessage = document.getElementById('moduleMessage');
    if (!moduleMessage) {
        console.error('Module message container not found');
        return;
    }
    moduleMessage.innerHTML = `${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)} module is now active. Please proceed with your queries.`;

    // Highlight the selected button
    const buttons = document.querySelectorAll('.menu button');
    buttons.forEach(button => {
        if (button.id === 'btn-' + moduleName) {
            button.classList.add('selected');
            button.textContent = 'Selected';
        } else {
            button.classList.remove('selected');
            button.textContent = 'Choose';
        }
    });

    return moduleName;
}

document.addEventListener("DOMContentLoaded", function() {
    let currentModule = setModule('research');  // Set default module as "Research"

    const buttons = document.querySelectorAll('.menu button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            currentModule = setModule(this.id.replace('btn-', ''));
        });
    });
    

    // Function to handle sending the question
    function sendQuestion() {
        const input = document.getElementById('userInput');
        if (input.value.trim() !== '') {
            const chatHistory = document.getElementById('chatHistory');
            const question = input.value;
            input.value = ''; // Clear input after sending
            const response = getModuleResponse(question, currentModule);

            chatHistory.innerHTML += `<div class="user-message"><span class="message-label">You:</span><span class="message-text">${question}</span></div>`;
            chatHistory.innerHTML += `<div class="bot-response"><span class="message-label">Bot:</span><span class="message-text">${response}</span></div>`;
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }
    }

    const inputButton = document.querySelector('.chat-input button');
    const input = document.getElementById('userInput');
    console.log(inputButton);
    // Event listener for the button click
    inputButton.addEventListener('click', sendQuestion);

    // Event listener for pressing the Enter key in the input field
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default action of the Enter key
            sendQuestion(); // Call the send function
        }
    });

    //clear chat history
    const clearButton = document.getElementById('clearChat');
    const chatHistory = document.getElementById('chatHistory');

    clearButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear the chat history?')) {
            chatHistory.innerHTML = '';
        }
    });
});