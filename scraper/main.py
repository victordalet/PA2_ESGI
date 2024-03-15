import mysql.connector
import sys
from scraper import Scraper
from flask_cors import CORS, cross_origin
from flask import Flask, request, jsonify
from flasgger import Swagger
import datetime
import json
import urllib.request


class Main:
    url: str
    type: str
    db: mysql.connector.connection.MySQLConnection

    def __init__(self):
        self.db = mysql.connector.connect(
            host=sys.argv[1],
            port=sys.argv[5],
            user=sys.argv[2],
            password=sys.argv[3],
            database=sys.argv[4]
        )

    def insert_location(self, name, description, price, picture, address,
                        latitude, longitude, capacity, type):
        cursor = self.db.cursor()
        cursor.execute(
            "SELECT id FROM location ORDER BY id DESC LIMIT 1"
        )
        last_id = cursor.fetchall()
        last_id = last_id[0][0] + 1
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
                ' ',
                address,
                latitude,
                longitude,
                capacity,
                type
            )
        )
        self.db.commit()
        urllib.request.urlretrieve(picture, f'pictures/location-{last_id}.png')


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
    @cross_origin()
    def get_select_type():
        """
        Get Select Type
        ---
        responses:
            200:
                description : ["airbnb", "booking"]
        """
        return jsonify(["airbnb", "booking"])

    @app.route("/scrape", methods=["POST"])
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
        """
        key = request.data
        key = json.loads(key)
        type_scrape = key['type']
        nb_max = key['nb_max']
        scraper = Scraper(type_scrape)
        data = scraper.scrape()
        print(data)
        for i in range(len(data["names"])):
            if i == nb_max:
                break
            main.insert_location(
                data["names"][i],
                "description",
                data["prices"][i],
                data["pictures"][i],
                data["address"][i],
                0,
                0,
                0,
                type_scrape
            )
        return jsonify({"response": "success"})

    app.run(host="0.0.0.0", port=5000)
