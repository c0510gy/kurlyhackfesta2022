FROM node:14.18.2

RUN mkdir /gravimetric_web
WORKDIR /gravimetric_web

ENV PATH /gravimetric_web/node_modules/.bin:$PATH

ADD ./ /gravimetric_web/

RUN rm -rf ./node_modules
RUN npm install

RUN chmod 755 /gravimetric_web/start
EXPOSE 3000

ENTRYPOINT ["/gravimetric_web/start"]
