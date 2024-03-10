import requests


class API:
    url: str

    def __init__(self):
        with open("api.txt", "r") as file:
            self.url = file.read()

    def test_connection(self, email: str, password: str) -> bool:
        response = requests.post(f'{self.url}/user/connectionAdmin',
                                 headers={"Content-Type": "application/json"},
                                 json={"email": email, "password": password})
        response_json = response.json()
        if response_json["connection"] is not None:
            with open("token.txt", "w") as file:
                file.write(response_json["connection"])
            return True

        return False

    def verify_token(self) -> bool:
        with open("token.txt", "r") as file:
            token = file.read()
        if token == "":
            return False
        response = requests.post(f'{self.url}/user/isAdmin',
                                 headers={"authorization": token})
        response_json = response.json()
        return response_json["connection"]

    def get_ticket(self) -> list:
        with open("token.txt", "r") as file:
            token = file.read()
        response = requests.get(f'{self.url}/ticket',
                                headers={"authorization": token})
        response_json = response.json()
        return response_json

    def get_email(self) -> str:
        with open("token.txt", "r") as file:
            token = file.read()
        response = requests.post(f'{self.url}/user/token-to-mail',
                                 headers={"authorization": token})
        response_json = response.json()
        return response_json["email"]

    def update_status_ticket(self, ticket_id: str, status: str) -> None:
        with open("token.txt", "r") as file:
            token = file.read()
        requests.put(f'{self.url}/ticket/{ticket_id}/status',
                     headers={"authorization": token},
                     json={"status": status})
        return

    def update_occupy_ticket(self, ticket_id: str, email: str) -> None:
        with open("token.txt", "r") as file:
            token = file.read()
        requests.put(f'{self.url}/ticket/{ticket_id}/occupy',
                     headers={"authorization": token},
                     json={"occupy_by": email})
        return

    def post_message(self, message: str, id: int) -> None:
        with open("token.txt", "r") as file:
            token = file.read()
        requests.post(f'{self.url}/ticket/{id}/message',
                      headers={"authorization": token},
                      json={"message": message,
                            "created_by": self.get_email()})
        return

    def get_message(self, id: int) -> list:
        with open("token.txt", "r") as file:
            token = file.read()
        response = requests.get(f'{self.url}/ticket/{id}/message',
                                headers={"authorization": token})
        response_json = response.json()
        return response_json
