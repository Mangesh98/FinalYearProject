from flask import Flask, flash, jsonify, request, redirect, url_for  # Import url_for
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
import uuid

app = Flask(__name__)
CORS(app)

ALLOWED_EXTENSIONS = set(["png", "jpg", "jpeg"])
UPLOAD_FOLDER = "static/uploads/"

app.secret_key = "supersecretkey"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/")
def hello_world():
    return "Hello, Mangesh!"


@app.route("/upload_image", methods=["POST"])
def upload_image():
    print("Inside upload_image")

    if "file" not in request.files:
        return (
            jsonify({"message": "No file part", "success": False}),
            400,  # Bad request
        )

    file = request.files["file"]
    if file.filename == "":
        return (
            jsonify({"message": "No selected file", "success": False}),
            400,  # Bad request
        )

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        # Generate unique filename using uuid
        unique_filename = f"{uuid.uuid4()}.{filename.rsplit('.', 1)[1]}"
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], unique_filename)

        file.save(file_path)
        # Image successfully uploaded, return success response
        image_url = f"/static/uploads/{unique_filename}"
        # backend\static\uploads\755918f3-bd06-4e48-a5be-2d52e50b0618.jpg
        print(f"Full image URL: {image_url}")
        return (
            jsonify(
                {
                    "message": "Image uploaded successfully",
                    "success": True,
                    "imageUrl": image_url,
                }
            ),
            200,
        )

    return (
        jsonify(
            {"message": "Allowed image types are - png, jpg, jpeg", "success": False}
        ),
        400,  # Bad request
    )


if __name__ == "__main__":
    app.run()
