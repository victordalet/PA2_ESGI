from ultralytics import YOLO
from constante import PRICE


class Detector:
    def __init__(self, model_path: str):
        self.model = YOLO(model_path)

    def predict(self, image_path: str) -> int:
        result = self.model(image_path)
        json_result = result.pandas().xyxy[0].to_json()
        return self.predict_price(json_result)

    @staticmethod
    def predict_price(json_result: object) -> int:
        price: int = 0
        for i in range(len(json_result)):
            price += PRICE[json_result[i]['name']]
        return price

    def predict_and_save(self, image_path: str, save_path: str):
        result = self.model(image_path)
        result.save(save_path)
