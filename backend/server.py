from flask import Flask, jsonify
import os
import json  # Import JSON module

app = Flask(__name__)

@app.route('/results', methods=['GET'])
def get_results():
    output_path = "/tmp/output.json"  # Path where the output JSON is saved

    # Check if the file exists
    if not os.path.exists(output_path):
        return jsonify({"error": "No results found. Process a file first."}), 404

    # Read the JSON file and return its contents
    try:
        with open(output_path, "r") as json_file:
            data = json.load(json_file)  # Use the imported json module
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": f"Failed to read results: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
