from flask import current_app
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from keras.models import Model
import matplotlib.pyplot as plt
from keras.preprocessing import image
from keras.applications.vgg16 import preprocess_input
import os
import uuid

model = load_model("disease_model.h5")


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


def visualize_activations(img_path, save_path):
    print("Inside : visualize_activations")

    # Create a unique directory to save the images
    os.makedirs(save_path, exist_ok=True)
    unique_id = str(uuid.uuid4())
    save_dir = os.path.join(save_path, unique_id)
    os.makedirs(save_dir)

    # Define a new model that outputs the activations for each layer
    layer_outputs = [layer.output for layer in model.layers]
    activation_model = Model(inputs=model.input, outputs=layer_outputs)

    # Load and preprocess an example image
    img = image.load_img(img_path, target_size=(64, 64))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)

    # Get the activations for each layer
    activations = activation_model.predict(img_array)

    # Visualization
    layer_names = [layer.name for layer in model.layers]
    image_urls = []

    for i, (layer_name, layer_activation) in enumerate(zip(layer_names, activations)):
        if (
            "conv2d" in layer_name.lower()
        ):  # Check if the layer is a Convolutional layer
            n_features = layer_activation.shape[
                -1
            ]  # Number of features in the feature map
            size = layer_activation.shape[1]  # Feature map shape (assuming square)
            n_cols = n_features // 8  # Display up to 8 features in a row
            display_grid = np.zeros((size * n_cols, 8 * size))

            for col in range(n_cols):
                for row in range(8):
                    channel_image = layer_activation[0, :, :, col * 8 + row]
                    channel_image -= channel_image.mean()
                    channel_image /= channel_image.std()
                    channel_image *= 64
                    channel_image += 128
                    channel_image = np.clip(channel_image, 0, 255).astype("uint8")
                    display_grid[
                        col * size : (col + 1) * size, row * size : (row + 1) * size
                    ] = channel_image

            scale = 1.0 / size
            plt.figure(
                figsize=(scale * display_grid.shape[1], scale * display_grid.shape[0])
            )
            plt.title(layer_name)
            plt.grid(False)
            plt.imshow(display_grid, aspect="auto", cmap="viridis")

            # Save the plot to a file
            image_path = os.path.join(save_dir, f"{layer_name}_activation_{i}.png")
            plt.savefig(image_path, bbox_inches="tight")
            plt.close()
            image_urls.append(image_path)

    return image_urls


def test_model_proc(fn, save_path):
    IMAGE_SIZE = 64
    LEARN_RATE = 1.0e-4
    CH = 3
    print(fn)
    if fn != "":
        # Model Architecture and Compilation

        img = cv2.imread(fn)
        img = cv2.resize(img, (IMAGE_SIZE, IMAGE_SIZE))
        img = np.array(img)

        img = img.reshape(1, IMAGE_SIZE, IMAGE_SIZE, 3)

        img = img.astype("float32")
        img = img / 255.0

        prediction = model.predict(img)
        result_predicated = np.argmax(prediction)
        print(result_predicated)

        if result_predicated == 0:
            result = "Cataract"
        elif result_predicated == 1:
            result = "Diabetic Retinopathy"
        elif result_predicated == 2:
            result = "Glaucoma"

        elif result_predicated == 3:
            result = "Normal"

        image_urls = visualize_activations(fn, save_path)
        return result, image_urls
