// Function to display success, error, or info messages dynamically
function showMessage(message, type = "success") {
    const messageBox = document.createElement("div");
    messageBox.className = `message-box ${type}`;
    messageBox.innerText = message;
    document.body.appendChild(messageBox);

    // Automatically remove the message after 3 seconds
    setTimeout(() => {
        messageBox.remove();
    }, 3000);
}

// Function to upload a PDF
function uploadPDF() {
    const pdfUpload = document.getElementById("pdfUpload").files[0]; // Get the file input

    if (!pdfUpload) {
        showMessage("Please select a PDF file to upload!", "error");
        return;
    }

    const formData = new FormData();
    formData.append("pdf", pdfUpload);

    // Show a message for the upload process
    showMessage("Uploading PDF...", "info");

    fetch("/upload", {
        method: "POST",
        body: formData
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                showMessage(`Error: ${data.error}`, "error");
            } else {
                showMessage("PDF uploaded successfully!", "success");
            }
        })
        .catch((error) => {
            console.error("Error uploading PDF:", error);
            showMessage("Failed to upload the PDF. Please try again.", "error");
        });
}

// Function to send a query and fetch a response
function askQuery() {
    const queryInput = document.getElementById("query"); // Get the textarea input
    const query = queryInput.value.trim();

    if (!query) {
        showMessage("Please enter a question!", "error");
        return;
    }

    const askButton = document.querySelector(".btn-secondary");
    askButton.disabled = true; // Disable the button to prevent multiple submissions

    showMessage("Processing your query...", "info");

    fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                showMessage(`Error: ${data.error}`, "error");
            } else {
                const responseBox = document.getElementById("response");
                responseBox.innerHTML = `<p>${data.response}</p>`;
                showMessage("Response received!", "success");
            }
        })
        .catch((error) => {
            console.error("Error processing query:", error);
            showMessage("Failed to process your query. Please try again.", "error");
        })
        .finally(() => {
            askButton.disabled = false; // Re-enable the button
        });
}

// Smooth scrolling for navigation links
document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = link.getAttribute("href").slice(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Adding animations when sections come into the viewport
const observerOptions = {
    threshold: 0.5 // Trigger when 50% of the section is visible
};

const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observing all sections for animations
document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section);
});

// Dynamically add CSS classes for notifications
const style = document.createElement("style");
style.innerHTML = `
    .message-box {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 20px;
        font-size: 16px;
        font-weight: bold;
        border-radius: 5px;
        z-index: 1000;
        opacity: 0.95;
    }

    .message-box.success {
        background-color: #4caf50;
        color: white;
    }

    .message-box.error {
        background-color: #f44336;
        color: white;
    }

    .message-box.info {
        background-color: #2196f3;
        color: white;
    }

    .message-box.warning {
        background-color: #ff9800;
        color: white;
    }

    .section.visible {
        animation: fadeIn 0.8s ease-in-out;
        opacity: 1;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
