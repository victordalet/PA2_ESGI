from flask_cors import CORS, cross_origin
from flask import Flask, request, jsonify
from flasgger import Swagger
import json

from chatbot import ChatBot

bot = ChatBot()

app = Flask(
    __name__, static_url_path="",
    static_folder="static",
    template_folder="templates"
)
cors = CORS(app)
swagger = Swagger(app)


@app.route("/chat", methods=["POST"])
@cross_origin()
def chat():
    """
    Chat Bot Response
    ---
    responses:
        200:
            description : {"response":"sentenses"}
    :return:
    """
    key = request.data
    key = json.loads(key)
    message = key['message']
    ints = bot.predict_class(message)
    res = bot.get_response(ints)
    return jsonify({"response": res})


app.run(host="0.0.0.0", port=5000)
