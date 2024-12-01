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
    <!-- Main Chat Application -->
    <div class="chat-app">
        <!-- Sidebar Section -->
        <div class="chat-sidebar">
            <div class="user-profile">
                <img src="/static/user-avatar.png" alt="User Avatar" class="user-avatar">
                <h2>PDF Assistant</h2>
                <p>Get instant answers from your uploaded PDF!</p>
            </div>
            <ul class="chat-actions">
                <li><button onclick="showHelp()">📖 Help</button></li>
                <li><button onclick="showActivityLog()">📝 Activity Log</button></li>
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
                    <button onclick="toggleNotifications()" class="header-btn" title="Toggle Notifications">🔔</button>
                    <button onclick="openSettings()" class="header-btn" title="Settings">⚙️</button>
                </div>
            </header>

            <!-- Chat Display Section -->
            <div class="chat-display" id="chatDisplay">
                <!-- Dynamic messages will be appended here -->
            </div>

            <!-- Chat Input Section -->
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
            <p>Follow these steps to get started with the PDF Assistant:</p>
            <ol>
                <li>Click the 📎 icon to upload your PDF.</li>
                <li>Type your question in the input box.</li>
                <li>Press "Send" to get your answer instantly.</li>
                <li>Use the ⚙️ button to adjust your preferences.</li>
                <li>View your activity log by clicking 📝 in the sidebar.</li>
            </ol>
            <button onclick="closeHelp()" class="close-btn">Close</button>
        </div>
    </div>

    <!-- Activity Log Modal -->
    <div class="modal" id="activityLogModal" style="display: none;">
        <div class="modal-content">
            <h2>Activity Log</h2>
            <p>Here’s a record of your recent activities:</p>
            <ul id="activityLog">
                <!-- Activity log items will be appended here dynamically -->
            </ul>
            <button onclick="closeActivityLog()" class="close-btn">Close</button>
        </div>
    </div>

    <!-- Settings Modal -->
    <div class="modal" id="settingsModal" style="display: none;">
        <div class="modal-content">
            <h2>Settings</h2>
            <p>Customize your chatbot experience:</p>
            <label>
                Enable Notifications:
                <input type="checkbox" id="notificationsToggle" checked>
            </label>
            <label>
                Dark Mode:
                <input type="checkbox" id="darkModeToggle" onchange="toggleDarkMode()">
            </label>
            <label>
                Text Size:
                <select id="textSize" onchange="adjustTextSize()">
                    <option value="small">Small</option>
                    <option value="medium" selected>Medium</option>
                    <option value="large">Large</option>
                </select>
            </label>
            <button onclick="closeSettings()" class="close-btn">Save & Close</button>
        </div>
    </div>

    <!-- Footer -->
    <footer class="chat-footer">
        <p>&copy; 2024 PDF Chatbot. Designed for instant knowledge sharing!</p>
    </footer>

    <!-- Scripts -->
    <script src="/static/scripts.js"></script>
</body>
</html>
