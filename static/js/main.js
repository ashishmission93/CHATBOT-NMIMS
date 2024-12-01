// main.js
$(document).ready(function () {
    const chatBox = $('#chat-box');
    const userInput = $('#user-input');
    const sendBtn = $('#send-btn');
    const clearBtn = $('#clear-btn');

    // Function to scroll to the bottom of the chat box
    function scrollToBottom() {
        chatBox.scrollTop(chatBox[0].scrollHeight);
    }

    // Function to format the message with timestamp
    function formatMessage(sender, message, timestamp) {
        return `
            <div class="message ${sender.toLowerCase()}-message">
                <div><strong>${sender}:</strong> ${message}</div>
                <div class="timestamp">${timestamp}</div>
            </div>
        `;
    }

    // Function to show the typing indicator
    function showTypingIndicator() {
        chatBox.append('<div class="typing-indicator"><em>Bot is typing...</em></div>');
        scrollToBottom();
    }

    // Function to remove the typing indicator
    function removeTypingIndicator() {
        chatBox.find('.typing-indicator').remove();
    }

    // Function to handle empty input gracefully
    function handleEmptyInput() {
        alert('Please enter a message.');
        userInput.focus();
    }

    // Clear the chat box on Clear Chat button click
    clearBtn.click(function () {
        $.ajax({
            url: "/clear_chat",
            type: "POST",
            success: function (response) {
                chatBox.html('');  // Clear the chat box
            },
            error: function () {
                alert("An error occurred while clearing the chat.");
            }
        });
    });

    // Send a message to the bot when the user clicks "Send"
    sendBtn.click(function () {
        const message = userInput.val().trim();

        // Check if input is empty
        if (!message) {
            handleEmptyInput();
            return;
        }

        // Get the current timestamp
        const timestamp = new Date().toLocaleTimeString();

        // Append user's message to the chat box
        chatBox.append(formatMessage("You", message, timestamp));
        userInput.val('');  // Clear the input field
        scrollToBottom();  // Scroll to the bottom of the chat box

        // Show typing indicator
        showTypingIndicator();

        // Send the message to the server
        $.ajax({
            url: "/chat",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ message: message }),
            success: function (response) {
                // Remove typing indicator
                removeTypingIndicator();

                // Append bot's response to the chat box
                const botMessage = response.response;
                const botTimestamp = new Date().toLocaleTimeString();
                chatBox.append(formatMessage("Bot", botMessage, botTimestamp));
                scrollToBottom();  // Scroll to the bottom of the chat box
            },
            error: function () {
                // Remove typing indicator
                removeTypingIndicator();

                // Display error message in the chat box
                chatBox.append(formatMessage("Bot", "Sorry, something went wrong. Please try again.", new Date().toLocaleTimeString()));
                scrollToBottom();
            }
        });
    });

    // Trigger send button when Enter key is pressed
    userInput.keypress(function (event) {
        if (event.which === 13) {
            sendBtn.click();
            event.preventDefault();
        }
    });

    // Optimized scroll handling to keep chat smooth
    function optimizedScroll() {
        let isAtBottom = chatBox[0].scrollHeight - chatBox.scrollTop() === chatBox.outerHeight();
        if (isAtBottom) {
            scrollToBottom();
        }
    }

    chatBox.on('scroll', optimizedScroll);
});
