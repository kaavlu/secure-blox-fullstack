import sys
import json
import time
import os
from openai import OpenAI


class QuestionExtractor:
    def __init__(self, client):
        self.client = client

    def assistant_request(self, file_path):
        print("Uploading file...")
        with open(file_path, "rb") as file:
            uploaded_file = self.client.files.create(
                file=file,
                purpose='assistants'
            )
        print(f"File uploaded successfully. File ID: {uploaded_file.id}")

        print("Retrieving assistant...")
        assistant = self.client.beta.assistants.retrieve("asst_dTGzcEDkc4gsweh3FaEidJ9l")
        print(f"Assistant retrieved successfully. Assistant ID: {assistant.id}")

        print("Creating thread...")
        thread = self.client.beta.threads.create()
        print(f"Thread created successfully. Thread ID: {thread.id}")

        print("Sending message to assistant...")
        thread_message = self.client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content="Extract all questions from the document and format them in JSON.",
            attachments=[{
                "file_id": uploaded_file.id,
                "tools": [{"type": "file_search"}]
            }]
        )
        print("Message sent successfully. Waiting for the assistant to process...")

        run = self.client.beta.threads.runs.create_and_poll(
            thread_id=thread.id,
            assistant_id=assistant.id,
        )

        while run.status not in ["completed", "failed"]:
            print(f"Current run status: {run.status}. Waiting...")
            time.sleep(2)
            run = self.client.beta.threads.runs.retrieve(run_id=run.id, thread_id=thread.id)

        if run.status == "completed":
            print("Assistant has completed processing.")
            print("Fetching the response...")
            messages = self.client.beta.threads.messages.list(thread_id=thread.id)
            return messages.data

        raise RuntimeError("Assistant processing failed.")

    def process_data(self, messages_data):
        message = messages_data[0]

        content_blocks = message.content

        for block in content_blocks:
            if hasattr(block, "text") and hasattr(block.text, "value"):
                json_string = block.text.value
                break
        else:
            raise ValueError("No JSON content found in the message.")

        parsed_data = json.loads(json_string)

        filename = parsed_data.get("filename", "No filename found")
        questions = parsed_data.get("questions", [])

        return {
            "filename": filename,
            "questions": questions
        }

    def write_json(self, data, output_file="output.json"):
        with open(output_file, "w") as f:
            json.dump(data, f, indent=2)
        print(f"Data has been written to {output_file}")


class QuestionAnswerer:
    def __init__(self, client):
        self.client = client

    def assistant_request(self, file_path):
        print("Uploading file...")
        with open(file_path, "rb") as file:
            uploaded_file = self.client.files.create(
                file=file,
                purpose='assistants'
            )
        print(f"File uploaded successfully. File ID: {uploaded_file.id}")

        print("Retrieving assistant...")
        assistant = self.client.beta.assistants.retrieve("asst_0IZoz47dYZsFslKGXiKhgr6p")
        print(f"Assistant retrieved successfully. Assistant ID: {assistant.id}")

        print("Creating thread...")
        thread = self.client.beta.threads.create()
        print(f"Thread created successfully. Thread ID: {thread.id}")

        print("Sending message to assistant...")
        thread_message = self.client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content="Answer Questions. If you can't answer a question due to the answer not being contained in vector storage, make sure the question is left unanswered.",
            attachments=[{
                "file_id": uploaded_file.id,
                "tools": [{"type": "file_search"}]
            }]
        )
        print("Message sent successfully. Waiting for the assistant to process...")

        run = self.client.beta.threads.runs.create_and_poll(
            thread_id=thread.id,
            assistant_id=assistant.id,
        )

        while run.status not in ["completed", "failed"]:
            print(f"Current run status: {run.status}. Waiting...")
            time.sleep(2)
            run = self.client.beta.threads.runs.retrieve(run_id=run.id, thread_id=thread.id)

        if run.status == "completed":
            print("Assistant has completed processing.")
            print("Fetching the response...")
            messages = self.client.beta.threads.messages.list(thread_id=thread.id)
            return messages.data

        raise RuntimeError("Assistant processing failed.")

    def process_data(self, messages_data):
        message = messages_data[0]

        content_blocks = message.content

        for block in content_blocks:
            if hasattr(block, "text") and hasattr(block.text, "value"):
                json_string = block.text.value
                break
        else:
            raise ValueError("No JSON content found in the message.")

        parsed_data = json.loads(json_string)

        filename = parsed_data.get("filename", "No filename found")
        questions = parsed_data.get("questions", [])

        return {
            "filename": filename,
            "questions": questions
        }

    def write_json(self, data, output_file="answer.json"):
        with open(output_file, "w") as f:
            json.dump(data, f, indent=2)
        print(f"Data has been written to {output_file}")


def main():
    client = OpenAI()

    extractor = QuestionExtractor(client)
    answerer = QuestionAnswerer(client)

    try:
        # Extract questions
        input_file_path = r"/Users/manavk/Documents/secureblox/ml/output.json"
        output_file_path = "/Users/manavk/Documents/secureblox/full-stack/backend/output/o.json"
        messages_data = extractor.assistant_request(input_file_path)
        extracted_data = extractor.process_data(messages_data)
        extractor.write_json(extracted_data, output_file_path)

        # Answer questions
        answer_file_path = output_file_path
        answer_output_path = "/Users/manavk/Documents/secureblox/full-stack/backend/output/output.json"
        messages_data = answerer.assistant_request(answer_file_path)
        answered_data = answerer.process_data(messages_data)
        answerer.write_json(answered_data, answer_output_path)

    except Exception as e:
        print("An error occurred:", e)
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()
