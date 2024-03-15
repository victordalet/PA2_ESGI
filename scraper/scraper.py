import undetected_chromedriver as uc
import random


class Scraper:
    _type: str
    options: uc.ChromeOptions
    driver: uc.Chrome
    _return_data: dict

    def __init__(self, type):
        self.options = uc.ChromeOptions()
        self.options.arguments.extend(["--no-sandbox",
                                       "--disable-setuid-sandbox"])
        self.driver = uc.Chrome(headless=True, use_subprocess=False)
        self._type = type
        self._return_data: dict = {
            "names": [],
            "prices": [],
            "pictures": [],
            "address": [],
        }

    def scrape(self) -> dict:
        if self._type == "airbnb":
            self.scrape_airbnb()
        if self._type == "booking":
            self.scrape_booking()
        self.clean_data()
        self.driver.close()
        return self._return_data

    def clean_data(self):
        for key, values in self._return_data.items():
            if (len(self._return_data[key]) <
                    len(self._return_data["pictures"])):
                temp_lint = self._return_data["pictures"]
                len_max = len(self._return_data[key])
                self._return_data["pictures"] = temp_lint[:len_max]

    def scrape_airbnb(self):
        url: str = "https://www.airbnb.fr/"
        self.driver.get(url)
        html: str = self.driver.page_source
        split_picture = html.split('picture":"')
        for i in range(1, len(split_picture)):
            picture = split_picture[i].split('","')[0]
            self._return_data["pictures"].append(picture)
        split_name = html.split('name":"')
        for i in range(1, len(split_name)):
            name = split_name[i].split('","')[0]
            self._return_data["names"].append(name)
        for _ in range(len(self._return_data["pictures"])):
            self._return_data["prices"].append(random.randint(50, 400))
            self._return_data["address"].append("FRANCE")

    def scrape_booking(self):
        url = ("https://www.booking.com/searchresults.fr.html?"
               "label=gen173rf-1FCAEoggI46AdIM1gDaE2IAQGYAQ2"
               "4ARnIAQzYAQHoAQH4AQuIAgGiAgtwdXJld293LmNvbagCA7gC"
               "zqzRrwbAAgHSAiQ2MDViYmUzYS1kZjQzLTQyMWYtODI4YS01Nzg1N"
               "GY1Y2Q3YWbYAgbgAgE&sid=d69c5dae3239d091cec79f267fb0aaef"
               "&aid=304142&dest_id=-1456928&dest_type=city&group_adults="
               "2&req_adults=2&no_rooms=1&group_children=0&req_children=0")

        self.driver.get(url)
        html: str = self.driver.page_source
        split_picture = html.split('https://cf.bstatic.com/xdata/images')
        for i in range(1, len(split_picture)):
            picture = split_picture[i].split('"')[0]
            self._return_data["pictures"].append(
                f'https://cf.bstatic.com/xdata/images{picture}')
        split_name = html.split('title="')[5:]
        for i in range(len(split_name)):
            name = split_name[i].split('"')[0]
            self._return_data["names"].append(name)
        for _ in range(len(self._return_data["pictures"])):
            self._return_data["prices"].append(random.randint(50, 400))
        split_address = html.split('sLocality">')
        for i in range(1, len(split_address)):
            address = split_address[i].split('<')[0]
            self._return_data["address"].append(address)
