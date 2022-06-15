#! /bin/bash
yarn build:css
yarn build:client
netlify deploy --dir=./packages/client/dist --prod