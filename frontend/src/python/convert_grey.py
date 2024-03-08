import cv2
import numpy as np
import matplotlib.pyplot as plt


def convert_grey(fn):
    IMAGE_SIZE = 200

    img = cv2.imread(fn)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img_resized = cv2.resize(img, (IMAGE_SIZE, 200))

    x1, y1 = img_resized.shape[0], img_resized.shape[1]

    gs = cv2.cvtColor(img_resized, cv2.COLOR_RGB2GRAY)
    gs = cv2.resize(gs, (y1, x1))

    retval, threshold = cv2.threshold(
        gs, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU
    )

    # Plot the original image
    plt.figure(figsize=(12, 4))

    plt.subplot(1, 3, 1)
    plt.imshow(img_resized)
    plt.title("Original Image")
    plt.axis("off")

    # Plot the grayscale image
    plt.subplot(1, 3, 2)
    plt.imshow(gs, cmap="gray")
    plt.title("Grayscale Image")
    plt.axis("off")

    # Plot the thresholded image
    plt.subplot(1, 3, 3)
    plt.imshow(threshold, cmap="gray")
    plt.title("Threshold Image")
    plt.axis("off")

    plt.show()


if __name__ == "__main__":
    image_path = sys.argv[1]
    result = convert_grey(image_path)

    # Convert the processed image to base64
    _, img_encoded = cv2.imencode(".png", result["threshold_image"])
    img_base64 = base64.b64encode(img_encoded).decode("utf-8")

    print(img_base64)
