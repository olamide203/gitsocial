FROM node

# create app working directory

WORKDIR /gittz

# Install app dependencies

COPY ./package.json .
COPY ./packages/backend/package.json ./packages/backend/

RUN corepack enable
RUN yarn set version stable
RUN yarn plugin import workspace-tools
RUN yarn config set httpRetry 10
RUN yarn workspaces focus --all --production

# Bundle app source
COPY ./packages/backend/  ./packages/backend/


WORKDIR /gittz/packages/backend

ENV NODE_ENV production
# Expose a port
EXPOSE 5000

CMD ["yarn", "start"]