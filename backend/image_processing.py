import cv2
import os
import uuid
from flask import current_app


def convert_gray(image_path):
    IMAGE_SIZE = 200

    try:
        # Convert to absolute path
        absolute_path = os.path.join(current_app.root_path, image_path[1:])
        img = cv2.imread(absolute_path)
        if img is None:
            raise Exception("Failed to read the image.")

        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img_resized = cv2.resize(img, (IMAGE_SIZE, IMAGE_SIZE))

        grayscale_image = cv2.cvtColor(img_resized, cv2.COLOR_RGB2GRAY)
        retval, threshold_image = cv2.threshold(
            grayscale_image, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU
        )

        grayscale_image_name = f"{uuid.uuid4()}.png"
        grayscale_image_path = os.path.join("static/uploads/", grayscale_image_name)

        cv2.imwrite(grayscale_image_path, grayscale_image)
        grayscale_image_url = f"/{grayscale_image_path}"

        threshold_image_name = f"{uuid.uuid4()}.png"
        threshold_image_path = os.path.join("static/uploads/", threshold_image_name)
        cv2.imwrite(threshold_image_path, threshold_image)
        threshold_image_url = f"/{threshold_image_path}"

        return grayscale_image_url, threshold_image_url
    except Exception as e:
        print(f"Error in image processing: {e}")
        return None, None
