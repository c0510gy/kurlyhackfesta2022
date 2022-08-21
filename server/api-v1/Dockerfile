FROM python:3.8

# development || production
ENV PYTHON_ENV production
RUN export PYTHON_ENV

ENV PYTHONUNBUFFERED 1

RUN mkdir /gravimetric
WORKDIR /gravimetric

ADD ./ /gravimetric/

RUN pip install -r /gravimetric/requirements.txt

RUN chmod 755 /gravimetric/start
EXPOSE 8000

ENTRYPOINT ["/gravimetric/start"]
