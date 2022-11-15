FROM nginx:alpine
LABEL name="lso-hebergement"
COPY /dist/Hotel /usr/share/nginx/html
COPY /default.conf /etc/nginx/conf.d
RUN chmod -R 777 /usr/share/nginx/html
EXPOSE 80
