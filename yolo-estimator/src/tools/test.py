import sys
from ultralytics import YOLO


class Test:

    def __init__(self, model_path, image_path: str):
        model = YOLO(model_path)

        results = model(image_path)

        for result in results:
            result.show()


if __name__ == '__main__':
    Test(sys.argv[1], sys.argv[2])
