FROM python:3.10

COPY . .

RUN pip install -r requirements.txt

CMD python -u main.py ${MYSQL_HOST} ${MYSQL_USER} ${MYSQL_PASSWORD} ${MYSQL_DATABASE} ${NB_EPOCHS} ${MYSQL_PORT}