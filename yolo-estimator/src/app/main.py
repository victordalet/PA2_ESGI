from flask_cors import CORS, cross_origin
from flask import Flask, request, jsonify
from flasgger import Swagger
import base64

from detector import Detector

detector = Detector("weight.pt")

app = Flask(
    __name__, static_url_path="",
    static_folder="static",
    template_folder="templates"
)
cors = CORS(app)
swagger = Swagger(app)


@app.route("/predict", methods=["POST"])
@cross_origin()
def predict():
    """
    Predict the price of the image and save the result
    ---
    responses:
        200:
            description : {"price":"2000"}
    :return:
    """
    img = request.files["image"]
    img.save("static/image.png")
    price = detector.predict('static/image.png', "static/result.png")
    print(price)
    with open("static/result.png", "rb") as img_file:
        img_base64 = base64.b64encode(img_file.read())
    return jsonify({"price": price, "image": img_base64.decode("utf-8")})


app.run(host="0.0.0.0", port=5000)
