<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WhatsApp-Like Chatbot</title>
    <link rel="stylesheet" href="/static/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="chat-app">
        <!-- Sidebar Section -->
        <div class="chat-sidebar">
            <div class="user-profile">
                <img src="/static/user-avatar.png" alt="User Avatar" class="user-avatar">
                <h2>PDF Assistant</h2>
                <p>Upload a PDF and ask your questions!</p>
            </div>
            <ul class="chat-actions">
                <li><button onclick="showHelp()">📖 Help</button></li>
                <li><button onclick="showSettings()">⚙️ Settings</button></li>
                <li><button onclick="logout()">🚪 Logout</button></li>
            </ul>
        </div>

        <!-- Main Chat Section -->
        <div class="chat-main">
            <!-- Chat Header -->
            <header class="chat-header">
                <div class="chat-info">
                    <img src="/static/bot-avatar.png" alt="Bot Avatar" class="bot-avatar">
                    <div>
                        <h3>Chatbot Assistant</h3>
                        <p id="status">Online</p>
                    </div>
                </div>
                <div class="header-actions">
                    <button onclick="toggleNotifications()" class="header-btn">🔔</button>
                    <button onclick="openSettings()" class="header-btn">⚙️</button>
                </div>
            </header>

            <!-- Chat Display -->
            <div class="chat-display" id="chatDisplay">
                <!-- Messages will dynamically load here -->
            </div>

            <!-- Chat Input -->
            <div class="chat-input">
                <label for="pdfUpload" class="upload-btn" title="Upload PDF">📎</label>
                <input type="file" id="pdfUpload" accept=".pdf" hidden onchange="uploadPDF()" />
                <input
                    type="text"
                    id="queryInput"
                    class="chat-text-input"
                    placeholder="Type your message here..."
                    aria-label="Type your message"
                />
                <button onclick="sendMessage()" class="send-btn" title="Send Message">➤</button>
            </div>
        </div>
    </div>

    <!-- Help Modal -->
    <div class="modal" id="helpModal" style="display: none;">
        <div class="modal-content">
            <h2>How to Use the Chatbot</h2>
            <ol>
                <li>Upload a PDF using the 📎 icon.</li>
                <li>Ask a question in the text box.</li>
                <li>View the AI's response in the chat.</li>
                <li>Use the ⚙️ icon to adjust settings.</li>
            </ol>
            <button onclick="closeHelp()" class="close-btn">Close</button>
        </div>
    </div>

    <!-- Settings Modal -->
    <div class="modal" id="settingsModal" style="display: none;">
        <div class="modal-content">
            <h2>Settings</h2>
            <label>
                Notifications:
                <input type="checkbox" id="notificationsToggle" checked>
            </label>
            <label>
                Dark Mode:
                <input type="checkbox" id="darkModeToggle" onchange="toggleDarkMode()">
            </label>
            <button onclick="closeSettings()" class="close-btn">Save & Close</button>
        </div>
    </div>

    <script src="/static/scripts.js"></script>
</body>
</html>
