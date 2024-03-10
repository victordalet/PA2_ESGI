from PySide6 import QtCore, QtWidgets
import sys


class HomePage(QtWidgets.QWidget):
    title: QtWidgets.QLabel
    button: QtWidgets.QPushButton
    layout: QtWidgets.QVBoxLayout

    def __init__(self):
        super().__init__()
        self.create_components()
        self.display_element()

    def create_components(self):
        self.title = QtWidgets.QLabel("Home Page",
                                      alignment=QtCore.Qt.AlignCenter)
        self.button = QtWidgets.QPushButton("Logout")
        self.button.clicked.connect(self.logout)

    def display_element(self):
        self.layout = QtWidgets.QVBoxLayout(self)
        self.layout.addWidget(self.title)
        self.layout.addWidget(self.button)

    def logout(self):
        with open("token.txt", "w") as file:
            file.write("")
        self.close()
        sys.exit()
