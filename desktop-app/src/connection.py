from PySide6 import QtCore, QtWidgets
from api import API
from home import HomePage


class ConnectionPage(QtWidgets.QWidget):
    title: QtWidgets.QLabel
    label_email: QtWidgets.QLabel
    label_password: QtWidgets.QLabel
    button: QtWidgets.QPushButton
    layout: QtWidgets.QVBoxLayout
    input_email: QtWidgets.QLineEdit
    input_password: QtWidgets.QLineEdit
    msg_error_field: QtWidgets.QMessageBox
    msg_error_connection: QtWidgets.QMessageBox
    api: API

    def __init__(self):
        super().__init__()
        self.create_components()
        self.display_element()
        self.api = API()

    def create_components(self):
        self.title = QtWidgets.QLabel("Connection Page",
                                      alignment=QtCore.Qt.AlignCenter)
        self.label_email = QtWidgets.QLabel("Email")
        self.label_password = QtWidgets.QLabel("Password")
        self.input_email = QtWidgets.QLineEdit()
        self.input_password = QtWidgets.QLineEdit()
        self.input_password.setEchoMode(QtWidgets.QLineEdit.Password)
        self.button = QtWidgets.QPushButton("Login")
        self.button.clicked.connect(self.test_connection)
        self.msg_error_field = QtWidgets.QLabel("Please fill all fields")
        self.msg_error_field.hide()
        self.msg_error_connection = QtWidgets.QLabel("Connection error")
        self.msg_error_connection.hide()

    def display_element(self):
        self.layout = QtWidgets.QVBoxLayout(self)
        self.layout.addWidget(self.title)
        self.layout.addWidget(self.msg_error_field)
        self.layout.addWidget(self.msg_error_connection)
        self.layout.addWidget(self.label_email)
        self.layout.addWidget(self.input_email)
        self.layout.addWidget(self.label_password)
        self.layout.addWidget(self.input_password)
        self.layout.addWidget(self.button)

    def test_connection(self):
        self.msg_error_field.hide()
        self.msg_error_connection.hide()
        if self.input_email.text() == "" or self.input_password.text() == "":
            self.msg_error_field.show()
            return
        result = self.api.test_connection(self.input_email.text(),
                                          self.input_password.text())
        if result:
            home = HomePage()
            self.title.hide()
            self.label_email.hide()
            self.label_password.hide()
            self.input_email.hide()
            self.input_password.hide()
            self.button.hide()
            self.msg_error_field.hide()
            self.msg_error_connection.hide()
            self.layout.addWidget(home)

        else:
            self.msg_error_connection.show()
