FROM nginx:1.15.0-alpine


RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx_local.conf /etc/nginx/conf.d
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]