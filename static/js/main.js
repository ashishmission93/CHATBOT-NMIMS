/* General Styles */
body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    color: #333;
    background: #f3f4f6;
}

/* Navbar Styles */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #4CAF50;
    padding: 10px 20px;
    color: white;
}

.navbar .logo h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
}

.navbar .nav-links {
    list-style: none;
    display: flex;
    gap: 15px;
    margin: 0;
}

.navbar .nav-links li a {
    color: white;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
}

.navbar .nav-links li a:hover {
    text-decoration: underline;
}

/* Hero Section */
.hero {
    background: linear-gradient(to right, #4caf50, #81c784);
    color: white;
    text-align: center;
    padding: 60px 20px;
}

.hero h1 {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 10px;
}

.hero p {
    font-size: 18px;
    margin-bottom: 20px;
}

.hero .btn-primary {
    background: #ffffff;
    color: #4caf50;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
}

.hero .btn-primary:hover {
    background: #e0e0e0;
}

/* Section Styles */
.section {
    padding: 40px 20px;
}

.section-container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

.section-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
}

/* Upload Section */
.upload-section {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.file-input {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

/* Chat Section */
.chat-section {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.query-input {
    width: 100%;
    max-width: 600px;
    height: 100px;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

/* Buttons */
.btn-secondary {
    background: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}

.btn-secondary:hover {
    background: #45a049;
}

/* Response Section */
.response-box {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.response-content {
    font-size: 16px;
    text-align: left;
    color: #555;
}

/* Footer */
footer {
    text-align: center;
    background-color: #4CAF50;
    color: white;
    padding: 10px 0;
    margin-top: 20px;
}
