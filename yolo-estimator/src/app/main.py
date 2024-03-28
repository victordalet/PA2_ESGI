from flask_cors import CORS, cross_origin
from flask import Flask, request, jsonify
from flasgger import Swagger
from PIL import Image

from detector import Detector

detector = Detector("weight.pt")

app = Flask(
    __name__, static_url_path="",
    static_folder="static",
    template_folder="templates"
)
cors = CORS(app)
swagger = Swagger(app)


@app.route("/predict-price", methods=["POST"])
@cross_origin()
def predict_price():
    """
    Predict the price of the image
    ---
    responses:
        200:
            description : {"price":"2000"}
    :return:
    """
    file = request.files['image']
    img = Image.open(file.stream)
    price = detector.predict(img)
    return jsonify({"price": price})


@app.route("/predict-picture", methods=["POST"])
@cross_origin()
def predict_picture():
    """
    Predict the element of the image
    ---
    responses:
        200:
            description : {"price":"2000"}
    :return:
    """
    file = request.files['image']
    img = Image.open(file.stream)
    detector.predict_and_save(img, "static/result.png")
    return app.send_static_file("result.png")


app.run(host="0.0.0.0", port=5000)
