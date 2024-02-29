import mysql.connector
import prenoms
import sys
import datetime


class Main:
    db: mysql.connector.connection.MySQLConnection

    def __init__(self):
        self.db = mysql.connector.connect(
            host=sys.argv[1],
            user=sys.argv[2],
            password=sys.argv[3],
            database=sys.argv[4]
        )
        self.run()

    def run(self):
        self.insert_user()
        self.db.close()

    def insert_user(self):
        cursor = self.db.cursor()
        email = prenoms.get_prenom() + '@gmail.com'
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
            (email, password, prenoms.get_prenom(),
             'user', date, date, 'Paris'))
        self.db.commit()


if __name__ == "__main__":
    main = Main()
