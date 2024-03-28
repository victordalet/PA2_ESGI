import sys
import os
import random
from roboflow import Roboflow
from ultralytics import YOLO
import yaml


class Train:
    rf: Roboflow
    project: object
    dataset: object
    model: object
    results: object

    def __init__(self):
        self.import_dataset()

    def import_dataset(self):
        self.rf = Roboflow(api_key=sys.argv[1])
        self.project = self.rf.workspace(sys.argv[2]).project(sys.argv[3])
        self.dataset = self.project.version(sys.argv[4]).download("yolov8-obb")

        with open(f'{self.dataset.location}/data.yaml', 'r') as file:
            data = yaml.safe_load(file)

        data['path'] = self.dataset.location

        with open(f'{self.dataset.location}/data.yaml', 'w') as file:
            yaml.dump(data, file, sort_keys=False)

    def train(self):
        self.model = YOLO("yolov8n-obb.pt")

        self.results = self.model.train(data=f"{self.dataset.location}/"
                                             f"yolov8-obb.yaml",
                                        epochs=int(sys.argv[5]), imgsz=640)

        self.model.val()

    def test(self):
        model = YOLO(f'runs/obb/train{sys.argv[6]}/weights/best.pt')

        random_file = random.choice(os.listdir
                                    (f"{self.dataset.location}/test/images"))
        file_name = os.path.join(f"{self.dataset.location}/test/images",
                                 random_file)

        results = model(file_name)

        for result in results:
            result.show()


if __name__ == '__main__':
    train = Train()
    train.train()
    train.test()
