from flask import Flask, render_template, request, jsonify
from PyPDF2 import PdfReader
import openai
import os

app = Flask(__name__)

# Set your OpenAI API Key from the environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

# Variable to store extracted PDF text
pdf_content = ""

# Function to extract text from a PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    reader = PdfReader(pdf_path)
    for page in reader.pages:
        text += page.extract_text()
    return text

# Function to query OpenAI GPT
def query_gpt(prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an AI assistant to answer queries based on a PDF."},
                {"role": "user", "content": prompt}
            ]
        )
        return response['choices'][0]['message']['content'].strip()
    except Exception as e:
        return f"Error querying OpenAI: {e}"

# Home page route
@app.route("/")
def home():
    return render_template("index.html")

# Route to upload PDF and extract text
@app.route("/upload", methods=["POST"])
def upload_pdf():
    global pdf_content
    pdf_file = request.files.get("pdf")
    if not pdf_file:
        return jsonify({"error": "No PDF file provided"}), 400

    # Save and read the PDF
    pdf_path = "./uploaded.pdf"
    pdf_file.save(pdf_path)
    pdf_content = extract_text_from_pdf(pdf_path)

    return jsonify({"message": "PDF uploaded and text extracted successfully."}), 200

# Route to handle chat queries
@app.route("/chat", methods=["POST"])
def chat_with_pdf():
    global pdf_content
    query = request.json.get("query", "")
    if not query:
        return jsonify({"error": "No query provided"}), 400

    if not pdf_content:
        return jsonify({"error": "No PDF content available. Please upload a PDF first."}), 400

    # Generate a prompt for OpenAI API
    prompt = f"Use the following content to answer the query:\n\n{pdf_content}\n\nQuery: {query}"
    response = query_gpt(prompt)

    return jsonify({"response": response}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)
