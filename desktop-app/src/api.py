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
