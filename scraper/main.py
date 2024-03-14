import mysql.connector
import sys
from scraper import Scraper
from flask_cors import CORS, cross_origin
from flask import Flask, request, jsonify
from flasgger import Swagger
from datetime import datetime
import json


class Main:
    url: str
    type: str
    db: mysql.connector.connection.MySQLConnection
    scraper: Scraper

    def __init__(self):
        self.db = mysql.connector.connect(
            host=sys.argv[1],
            port=sys.argv[5],
            user=sys.argv[2],
            password=sys.argv[3],
            database=sys.argv[4]
        )
        self.scraper = Scraper()

    def insert_location(self, name, description, price, picture, address,
                        latitude, longitude, capacity, type):
        cursor = self.db.cursor()
        cursor.execute(
            "INSERT INTO location "
            "(created_at,updated_at,"
            "created_by,name,description,"
            "price,picture,address,"
            "latitude,longitude,capacity,type) "
            "VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
            (
                datetime.datetime.now(),
                datetime.datetime.now(),
                'admin',
                name,
                description,
                price,
                picture,
                address,
                latitude,
                longitude,
                capacity,
                type
            )
        )

    def insert_service(self, name, description, price, picture, location_id):
        cursor = self.db.cursor()
        cursor.execute(
            "INSERT INTO service "
            "(created_at,updated_at,"
            "created_by,name,description,"
            "price,picture,location_id) "
            "VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",
            (
                datetime.datetime.now(),
                datetime.datetime.now(),
                'admin',
                name,
                description,
                price,
                picture,
                location_id
            )
        )


if __name__ == "__main__":
    main = Main()
    app = Flask(
        __name__, static_url_path="",
        static_folder="static",
        template_folder="templates"
    )
    cors = CORS(app)
    swagger = Swagger(app)

    @app.route("/type", methods=["GET"])
    def get_select_type():
        return jsonify(["airbnb", "seloger"])

    @app.route("/scrap", methods=["POST"])
    @cross_origin()
    def scrap():
        """
        Scrap Location
        ---
        parameters:
            - name: url
              in: query
              type: string
              required: true
              description: The url of the location
            - name: type
              in: query
              type: string
              required: true
              description: The type of the location
        ---
        responses:
            200:
                description : {"response":"success"}
        :return:
        """
        key = request.data
        key = json.loads(key)
        url = key['url']
        type = key['type']
        scraper = Scraper()
        scraper.set_url(url)
        scraper.set_type(type)
        scraper.scrape()
        return jsonify({"response": "success"})

    app.run(host="0.0.0.0", port=5000)
