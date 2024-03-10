from flask import Flask, flash, jsonify, request, redirect, url_for  # Import url_for
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
import uuid
from image_processing import convert_gray, test_model_proc
from flask import current_app

app = Flask(__name__)
CORS(app)

ALLOWED_EXTENSIONS = set(["png", "jpg", "jpeg"])
UPLOAD_FOLDER = "static/uploads/"


app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def delete_folder_and_contents(folder_path):
    if not os.path.exists(folder_path):
        return  # Folder doesn't exist, nothing to delete

    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        try:
            if os.path.isfile(file_path):
                os.remove(file_path)
            elif os.path.isdir(file_path):
                delete_folder_and_contents(file_path)  # Recursive call
        except OSError as e:
            print(f"Error deleting '{file_path}': {e}")
            raise  # Re-raise the error for potential handling by the main program

    try:
        os.rmdir(folder_path)
    except OSError as e:
        print(f"Error deleting folder '{folder_path}': {e}")
        raise


@app.route("/")
def hello_world():
    return "Hello, Mangesh!"


@app.route("/process_image", methods=["POST"])
def process_image():
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
    # Delete Previous Images
    delete_folder_and_contents(app.config["UPLOAD_FOLDER"])
    os.makedirs(app.config["UPLOAD_FOLDER"])
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        # Generate unique filename using uuid
        unique_filename = f"{uuid.uuid4()}.{filename.rsplit('.', 1)[1]}"
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], unique_filename)

        file.save(file_path)
        # Image successfully uploaded, return success response
        image_url = f"/static/uploads/{unique_filename}"

        grayscale_image, threshold_image = convert_gray(image_url)

        # Model testing
        absolute_path = os.path.join(current_app.root_path, image_url[1:])
        result_message, activation_urls = test_model_proc(
            absolute_path, app.config["UPLOAD_FOLDER"]
        )
        activation_urls = [url.replace("\\", "/") for url in activation_urls]

        print(result_message)

        if grayscale_image is not None and threshold_image is not None:
            return (
                jsonify(
                    {
                        "message": "Image processed successfully",
                        "success": True,
                        "imageUrl": image_url,
                        "grayscale_image": grayscale_image,
                        "threshold_image": threshold_image,
                        "result": result_message,
                        "activation_urls": activation_urls,
                    }
                ),
                200,
            )
        else:
            return (
                jsonify({"message": "Error processing image", "success": False}),
                500,  # Internal Server Error
            )

    return (
        jsonify(
            {"message": "Allowed image types are - png, jpg, jpeg", "success": False}
        ),
        400,  # Bad request
    )


if __name__ == "__main__":
    app.run()
