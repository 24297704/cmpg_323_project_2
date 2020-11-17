##############################################################
########################## BUILDER ###########################
##############################################################
FROM node:14-alpine as builder
WORKDIR /app
RUN apk add --no-cache --update git
COPY ./package.json .
RUN npm install --production
##############################################################
########################### MAIN #############################
##############################################################
FROM node:14-alpine
WORKDIR /app
#Install Depandancies
RUN apk add --no-cache --update bash curl \
  && npm install pm2 -g --production
#Copy Code From Source
COPY . .
#Copy Node Modules From Builder
COPY --from=builder /app/node_modules /app/node_modules

#RUN npm update
CMD pm2-runtime start npm -- start
##############################################################
########################### END ##############################
##############################################################
