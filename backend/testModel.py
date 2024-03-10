import cv2
import numpy as np
from tensorflow.keras.models import load_model


def test_model_proc(fn):
    IMAGE_SIZE = 64
    LEARN_RATE = 1.0e-4
    CH = 3
    print(fn)
    if fn != "":
        # Model Architecture and Compilation
        model = load_model("disease_model.h5")

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

        return result


# image_path = "static/uploads/1fff90a4-e84f-4d4b-8635-70a6212e40a7.jpg"
# result_message = test_model_proc(image_path)
# print(result_message)
