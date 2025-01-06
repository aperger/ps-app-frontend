FROM node:18-alpine as build

ENV PRODUCTION=true

COPY . /workspace/

WORKDIR /workspace
RUN npm ci && npm run build

FROM nginx:stable-bullseye AS runtime


COPY --from=build /workspace/dist/app-frontend /usr/share/nginx/html/

# RUN chmod a+rwx /var/cache/nginx /var/run /var/log/nginx                        && \
#     sed -i.bak 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf && \
#     sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

RUN chmod a+rwx /var/cache/nginx /var/run /var/log/nginx && \
     sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf
COPY deploy/default-nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod 777 /etc/nginx/conf.d/default.conf

EXPOSE 8080
USER nginx
HEALTHCHECK     CMD     [ "service", "nginx", "status" ]
