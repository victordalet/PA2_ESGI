from ultralytics import YOLO
from constante import PRICE
import json


class Detector:
    def __init__(self, model_path: str):
        self.model = YOLO(model_path)

    def predict(self, image_path: str, save_path: str) -> int:
        result = self.model(image_path)
        for r in result:
            r.save(save_path)
            return self.predict_price(r.tojson())

    @staticmethod
    def predict_price(json_result: str) -> int:
        json_result = json.loads(json_result)
        price = 0
        for i in range(len(json_result)):
            print(json_result[i])
            print(PRICE[json_result[i]['name']])
            price += PRICE[json_result[i]['name']]
        return price
