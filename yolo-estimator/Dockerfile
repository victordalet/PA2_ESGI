FROM python:3.10


COPY src/app/ .

RUN pip install -r requirements.txt

RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y

CMD python3 main.py -u
