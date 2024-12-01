// Global Variables
let activityLog = []; // To store user activity for the activity log
let darkMode = false; // To track dark mode status

// Function to display messages dynamically in the chat
function appendMessage(message, sender) {
    const chatDisplay = document.getElementById("chatDisplay");

    const messageElement = document.createElement("div");
    messageElement.className = `chat-message ${sender}`;
    messageElement.innerHTML = `<p>${message}</p>`;

    chatDisplay.appendChild(messageElement);
    chatDisplay.scrollTop = chatDisplay.scrollHeight; // Auto-scroll to the latest message

    // Log activity
    if (sender === "user") {
        logActivity(`User: ${message}`);
    } else if (sender === "bot") {
        logActivity(`Bot: ${message}`);
    }
}

// Function to send a query/message
function sendMessage() {
    const queryInput = document.getElementById("queryInput");
    const message = queryInput.value.trim();

    if (!message) {
        showNotification("Please type a message before sending!", "error");
        return;
    }

    appendMessage(message, "user"); // Append the user's message to the chat

    queryInput.value = ""; // Clear input field

    // Simulate bot typing
    appendTypingIndicator();

    fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: message })
    })
        .then((response) => response.json())
        .then((data) => {
            removeTypingIndicator();
            if (data.error) {
                appendMessage("Something went wrong. Please try again.", "bot");
                showNotification("Error: Unable to process your query.", "error");
            } else {
                appendMessage(data.response, "bot");
                showNotification("Bot responded successfully!", "success");
            }
        })
        .catch((error) => {
            removeTypingIndicator();
            appendMessage("Failed to connect to the server. Please try again.", "bot");
            console.error("Error:", error);
            showNotification("Network error. Check your connection.", "error");
        });
}

// Function to upload a PDF file
function uploadPDF() {
    const pdfUpload = document.getElementById("pdfUpload").files[0];

    if (!pdfUpload) {
        showNotification("Please select a PDF file to upload.", "error");
        return;
    }

    const formData = new FormData();
    formData.append("pdf", pdfUpload);

    showNotification("Uploading PDF...", "info");

    fetch("/upload", {
        method: "POST",
        body: formData
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                appendMessage("Failed to upload PDF. Please try again.", "bot");
                showNotification("Error: Unable to upload PDF.", "error");
            } else {
                appendMessage("PDF uploaded successfully! You can now ask questions.", "bot");
                showNotification("PDF uploaded successfully!", "success");
            }
        })
        .catch((error) => {
            appendMessage("Failed to upload the PDF. Please try again.", "bot");
            console.error("Error:", error);
            showNotification("Network error. Check your connection.", "error");
        });
}

// Function to append a typing indicator
function appendTypingIndicator() {
    const chatDisplay = document.getElementById("chatDisplay");

    const typingElement = document.createElement("div");
    typingElement.className = "chat-typing-indicator";
    typingElement.id = "typingIndicator";
    typingElement.innerHTML = `
        <div class="typing-dots">
            <span></span><span></span><span></span>
        </div>
        <p>Bot is typing...</p>
    `;

    chatDisplay.appendChild(typingElement);
    chatDisplay.scrollTop = chatDisplay.scrollHeight; // Auto-scroll to the typing indicator
}

// Function to remove the typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById("typingIndicator");
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Function to log activity
function logActivity(activity) {
    const timestamp = new Date().toLocaleTimeString();
    activityLog.push(`[${timestamp}] ${activity}`);
}

// Function to show the activity log modal
function showActivityLog() {
    const activityLogModal = document.getElementById("activityLogModal");
    const activityLogList = document.getElementById("activityLog");

    // Clear existing log
    activityLogList.innerHTML = "";

    // Populate log items
    activityLog.forEach((log) => {
        const logItem = document.createElement("li");
        logItem.textContent = log;
        activityLogList.appendChild(logItem);
    });

    activityLogModal.style.display = "flex";
}

// Function to close the activity log modal
function closeActivityLog() {
    const activityLogModal = document.getElementById("activityLogModal");
    activityLogModal.style.display = "none";
}

// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    darkMode = !darkMode;

    if (darkMode) {
        body.classList.add("dark-mode");
        showNotification("Dark mode enabled!", "success");
    } else {
        body.classList.remove("dark-mode");
        showNotification("Dark mode disabled!", "info");
    }
}

// Function to adjust text size
function adjustTextSize() {
    const textSize = document.getElementById("textSize").value;
    const chatMessages = document.querySelectorAll(".chat-message p");

    chatMessages.forEach((message) => {
        message.style.fontSize = textSize === "small" ? "12px" : textSize === "large" ? "18px" : "14px";
    });

    showNotification(`Text size adjusted to ${textSize}.`, "info");
}

// Function to show a notification
function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Function to display the help modal
function showHelp() {
    const helpModal = document.getElementById("helpModal");
    helpModal.style.display = "flex";
}

// Function to close the help modal
function closeHelp() {
    const helpModal = document.getElementById("helpModal");
    helpModal.style.display = "none";
}

// Function to show settings modal
function showSettings() {
    const settingsModal = document.getElementById("settingsModal");
    settingsModal.style.display = "flex";
}

// Function to close settings modal
function closeSettings() {
    const settingsModal = document.getElementById("settingsModal");
    settingsModal.style.display = "none";
}

// Add event listener for modal close on outside click
window.addEventListener("click", (event) => {
    const helpModal = document.getElementById("helpModal");
    const activityLogModal = document.getElementById("activityLogModal");
    const settingsModal = document.getElementById("settingsModal");

    if (event.target === helpModal) {
        closeHelp();
    }
    if (event.target === activityLogModal) {
        closeActivityLog();
    }
    if (event.target === settingsModal) {
        closeSettings();
    }
});
