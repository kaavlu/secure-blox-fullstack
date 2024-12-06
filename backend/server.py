from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import os
import subprocess
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploaded_files")
OUTPUT_FOLDER = os.path.join(os.path.dirname(__file__), "output")
OUTPUT_FILE = os.path.join(OUTPUT_FOLDER, "output.json")

# Ensure the directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        # Save the uploaded file
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)

        # Run the script to process the file
        try:
            subprocess.check_call(
                ["python3", "script.py"],
                cwd=os.path.dirname(__file__)
            )
            return jsonify({"message": "File processed successfully"}), 200
        except subprocess.CalledProcessError as e:
            return jsonify({"error": f"Processing failed: {e.stderr}"}), 500

@app.route('/results', methods=['GET'])
def get_results():
    # Check if the output file exists
    if not os.path.exists(OUTPUT_FILE):
        return jsonify({"error": "No results found. Please upload a file first."}), 404

    try:
        with open(OUTPUT_FILE, "r") as f:
            data = json.load(f)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": f"Failed to read results: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
