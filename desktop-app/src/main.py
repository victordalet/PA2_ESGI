import sys
from PySide6 import QtWidgets
from connection import ConnectionPage
from home import HomePage
from constante import WIDTH, HEIGHT, NAME
from api import API


class App:
    app: QtWidgets.QApplication
    windowConnection: ConnectionPage
    windowsHome: HomePage
    api: API

    def __init__(self):
        self.api = API()
        self.app = QtWidgets.QApplication([])
        self.windowConnection = ConnectionPage()
        self.verify_token()
        sys.exit(self.app.exec_())

    def verify_token(self):
        if not self.api.verify_token():
            self.windowConnection.setWindowTitle(NAME)
            self.windowConnection.resize(WIDTH / 3, HEIGHT / 2)
            self.windowConnection.show()
        else:
            self.windowsHome = HomePage()
            self.windowsHome.setWindowTitle(NAME)
            self.windowsHome.resize(WIDTH, HEIGHT)
            self.windowsHome.show()


if __name__ == "__main__":
    App()
