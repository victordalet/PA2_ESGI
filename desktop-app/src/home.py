from PySide6 import QtCore, QtWidgets, QtGui
import sys
from api import API


class HomePage(QtWidgets.QWidget):
    title: QtWidgets.QLabel
    button: QtWidgets.QPushButton
    button_your_tickets: QtWidgets.QPushButton
    layout: QtWidgets.QVBoxLayout
    table: QtWidgets.QTableWidget
    ticket_component: QtWidgets.QWidget
    input_message: QtWidgets.QLineEdit
    api: API
    tickets: list
    status_you_tickets: bool
    headers: list[str]
    messages: list

    def __init__(self):
        super().__init__()
        self.headers = ["TODO", "DOING", "DONE", "CANCEL"]
        self.messages = []
        self.create_components()
        self.display_element()
        self.api = API()
        self.tickets = self.api.get_ticket()
        self.create_table()
        self.status_you_tickets = False
        self.ticket_component = None

    def create_components(self):
        self.title = QtWidgets.QLabel("Home Page",
                                      alignment=QtCore.Qt.AlignCenter)
        self.title.setFont(QtGui.QFont("Arial", 20))
        self.title.setAlignment(QtCore.Qt.AlignCenter)
        self.button = QtWidgets.QPushButton("Logout")
        self.button.setFont(QtGui.QFont("Arial", 15))
        self.button.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))
        self.button.setFixedSize(100, 50)
        self.button.clicked.connect(self.logout)
        self.button_your_tickets = QtWidgets.QPushButton("Your Tickets")
        self.button_your_tickets.clicked.connect(self.filter_you_tickets)
        self.button_your_tickets.setFont(QtGui.QFont("Arial", 15))
        self.button_your_tickets.setCursor(
            QtGui.QCursor(QtCore.Qt.PointingHandCursor))
        self.button_your_tickets.setFixedSize(400, 50)

    def filter_you_tickets(self):
        if self.status_you_tickets:
            self.tickets = self.api.get_ticket()
        else:
            your_email: str = self.api.get_email()
            self.tickets = [ticket for ticket in self.tickets
                            if ticket["occupy_by"] == your_email]
        self.layout.removeWidget(self.ticket_component)
        self.layout.removeWidget(self.table)
        self.create_table()
        self.status_you_tickets = not self.status_you_tickets

    def create_table(self):
        self.table = QtWidgets.QTableWidget(1, 4)
        self.table.setHorizontalHeaderLabels(self.headers)
        nb_ticket_index = 0
        for ticket in self.tickets:
            if ticket["status"] == "TODO":
                self.table.insertRow(nb_ticket_index)
                self.table.setItem(nb_ticket_index, 0,
                                   QtWidgets.QTableWidgetItem(ticket["name"]))
            elif ticket["status"] == "DOING":
                self.table.insertRow(nb_ticket_index)
                self.table.setItem(nb_ticket_index, 1,
                                   QtWidgets.QTableWidgetItem(ticket["name"]))
            elif ticket["status"] == "DONE":
                self.table.insertRow(nb_ticket_index)
                self.table.setItem(nb_ticket_index, 2,
                                   QtWidgets.QTableWidgetItem(ticket["name"]))
            elif ticket["status"] == "CANCEL":
                self.table.insertRow(nb_ticket_index)
                self.table.setItem(nb_ticket_index, 3,
                                   QtWidgets.QTableWidgetItem(ticket["name"]))
            nb_ticket_index += 1
        self.table.cellClicked.connect(self.open_ticket)
        self.layout.addWidget(self.table)

    def open_ticket(self):
        if self.ticket_component is not None:
            self.layout.removeWidget(self.ticket_component)
        row = self.table.currentRow()
        ticket = self.tickets[row]
        if self.ticket_component is not None:
            for i in range(self.ticket_component.layout.count()):
                self.ticket_component.layout.itemAt(i).widget().deleteLater()

        self.ticket_component = QtWidgets.QWidget()
        self.add_element_in_ticket_component(ticket)
        self.layout.addWidget(self.ticket_component)

    def add_element_in_ticket_component(self, ticket: dict):

        self.ticket_component.layout = QtWidgets.QVBoxLayout(
            self.ticket_component)
        elements = ["name", "description", "status",
                    "occupy_by", "created_by", "created_at"]
        title_label = QtWidgets.QLabel("INFO TICKET")
        title_label.setFont(QtGui.QFont("Arial", 20))
        title_label.setAlignment(QtCore.Qt.AlignCenter)
        self.ticket_component.layout.addWidget(title_label)
        for element in elements:
            label = QtWidgets.QLabel(f"{element}: {ticket[element]}")
            label.setFont(QtGui.QFont("Arial", 20))
            self.ticket_component.layout.addWidget(
                QtWidgets.QLabel(label))

        if ticket["occupy_by"] != self.api.get_email():
            btn = QtWidgets.QPushButton("Occupy")
            btn.setFixedSize(100, 50)
            btn.clicked.connect(
                lambda: self.update_occupy_ticket(
                    ticket["id"], self.api.get_email()))
        else:
            btn = QtWidgets.QPushButton("Unattributed")
            btn.setFixedSize(100, 50)
            btn.clicked.connect(
                lambda: self.update_occupy_ticket(
                    ticket["id"], ""))
        self.ticket_component.layout.addWidget(btn)

        container = QtWidgets.QWidget()
        container.layout = QtWidgets.QHBoxLayout(container)
        container.layout.setAlignment(QtCore.Qt.AlignCenter)
        btn = QtWidgets.QPushButton("TODO")
        btn.setFixedSize(100, 50)
        btn.clicked.connect(
            lambda: self.update_status_ticket("TODO"))
        container.layout.addWidget(btn)
        btn = QtWidgets.QPushButton("DOING")
        btn.setFixedSize(100, 50)
        btn.clicked.connect(
            lambda: self.update_status_ticket("DOING"))
        container.layout.addWidget(btn)
        btn = QtWidgets.QPushButton("DONE")
        btn.setFixedSize(100, 50)
        btn.clicked.connect(
            lambda: self.update_status_ticket("DONE"))
        container.layout.addWidget(btn)
        btn = QtWidgets.QPushButton("CANCEL")
        btn.setFixedSize(100, 50)
        btn.clicked.connect(
            lambda: self.update_status_ticket("CANCEL"))
        container.layout.addWidget(btn)
        self.ticket_component.layout.addWidget(container)

        self.add_message_in_ticket_component(ticket)

    def add_message_in_ticket_component(self, ticket: dict):
        container = QtWidgets.QWidget()
        container.layout = QtWidgets.QVBoxLayout(container)
        container.layout.setAlignment(QtCore.Qt.AlignCenter)
        self.messages = self.api.get_message(ticket["id"])
        for message in self.messages:
            label = QtWidgets.QLabel(f"{message['created_by']}:"
                                     f" {message['message']}")
            label.setFont(QtGui.QFont("Arial", 10))
            container.layout.addWidget(label)
        self.input_message = QtWidgets.QLineEdit()
        self.input_message.setPlaceholderText("Your message")
        self.input_message.setFixedSize(400, 50)
        container.layout.addWidget(self.input_message)
        btn_send = QtWidgets.QPushButton("Send")
        btn_send.setFixedSize(100, 50)
        btn_send.clicked.connect(
            lambda: self.send_message(ticket["id"]))
        container.layout.addWidget(btn_send)
        self.ticket_component.layout.addWidget(container)

    def send_message(self, ticket_id: int):
        self.api.post_message(self.input_message.text(), ticket_id)
        self.layout.removeWidget(self.ticket_component)
        self.layout.removeWidget(self.table)
        self.tickets = self.api.get_ticket()
        self.create_table()

    def update_status_ticket(self, status: str) -> None:
        row = self.table.currentRow()
        id = self.tickets[row]["id"]
        self.api.update_status_ticket(id, status)
        self.layout.removeWidget(self.ticket_component)
        self.layout.removeWidget(self.table)
        self.tickets = self.api.get_ticket()
        self.create_table()

    def update_occupy_ticket(self, ticket_id: str, email: str) -> None:
        self.api.update_occupy_ticket(ticket_id, email)
        self.layout.removeWidget(self.ticket_component)
        self.layout.removeWidget(self.table)
        self.tickets = self.api.get_ticket()
        self.create_table()

    def display_element(self):
        self.layout = QtWidgets.QVBoxLayout(self)
        self.layout.addWidget(self.title)
        self.layout.addWidget(self.button)
        self.layout.addWidget(self.button_your_tickets)

    def logout(self):
        with open("token.txt", "w") as file:
            file.write("")
        self.close()
        sys.exit()
