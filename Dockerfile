# pull official base image
FROM node:13.12.0-alpine

# set working directory
ENV APP_WORKDIR=/amo-app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/client/node_modules/.bin:$PATH
RUN mkdir -p $APP_WORKDIR
WORKDIR $APP_WORKDIR
# install app dependencies
COPY package.json package-lock.json $APP_WORKDIR/


# add app
COPY ./docker-entrypoint.sh /

VOLUME [$APP_WORKDIR]
COPY . $APP_WORKDIR

ENTRYPOINT ["client/docker-entrypoint.sh"]
CMD ["npm", "start"]