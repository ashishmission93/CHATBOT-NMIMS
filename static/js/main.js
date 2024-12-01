function uploadPDF() {
    const pdfUpload = document.getElementById("pdfUpload").files[0];
    if (!pdfUpload) {
        alert("Please select a PDF to upload.");
        return;
    }

    const formData = new FormData();
    formData.append("pdf", pdfUpload);

    fetch("/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert(data.message);
        }
    });
}

function askQuery() {
    const query = document.getElementById("query").value;
    if (!query) {
        alert("Please enter a query.");
        return;
    }

    fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById("response").innerText = data.error;
        } else {
            document.getElementById("response").innerText = data.response;
        }
    });
}
