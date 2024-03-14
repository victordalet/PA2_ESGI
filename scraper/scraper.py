class Scraper:
    _url: str
    _type: str

    def __init__(self):
        self._url = ''
        self._type = ''

    def set_url(self, url):
        self._url = url

    def set_type(self, type):
        self._type = type

    def scrape(self):
        pass
