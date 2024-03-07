import mysql.connector
import prenoms
import sys
import datetime


class Main:
    db: mysql.connector.connection.MySQLConnection
    prenoms: str

    def __init__(self):
        self.prenoms = prenoms.get_prenom()
        self.db = mysql.connector.connect(
            host=sys.argv[1],
            user=sys.argv[2],
            password=sys.argv[3],
            database=sys.argv[4]
        )
        for i in range(int(sys.argv[5])):
            self.run()

    def run(self):
        self.insert_user()
        self.insert_location()
        self.insert_service()
        self.translation()
        self.db.commit()
        self.db.close()
        

    def insert_user(self):
        cursor = self.db.cursor()
        email = self.prenoms + '@gmail.com'
        date = datetime.datetime.now()
        date = date - datetime.timedelta(days=1)
        date.strftime("%Y-%m-%d %H:%M:%S")
        password = ('2af8512a8d99c1e07a2f'
                    '7968f5cc054cb492bad2523e34f'
                    '0da4e39e8eda2476ad816f55f6da'
                    '747e87db83d21bcc55ca6f98415fe44'
                    'e0bb3d034b3e5ad27e5e66')
        cursor.execute(
            "INSERT INTO USER (email,password,"
            "name,"
            "rules,"
            "created_at,"
            "updated_at,"
            "address) "
            "VALUES (%s,%s,%s,%s,%s,%s,%s)",
            (email, password, self.prenoms,
             'user', date, date, 'Paris'))

    def insert_location(self):
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
                self.prenoms + '@gmail.com',
                'test', 'test', 100,
                'test', 'Paris', 0,
                0, 2, "MAISON"))

    def insert_service(self):
        cursor = self.db.cursor()
        cursor.execute(
            "INSERT INTO service "
            "(created_at , updated_at, "
            "created_by, name,"
            "description, price, duration) "
            "VALUES (%s,%s,%s,%s,%s,%s,%s)",
            (datetime.datetime.now(),
             datetime.datetime.now(),
             self.prenoms + '@gmail.com',
             'test', 'test', 100, 100))
    
    def translation(self):
        fr = ["type de bien",
              "type de location",
              ""
              ]
        en = []




if __name__ == "__main__":
    Main()
