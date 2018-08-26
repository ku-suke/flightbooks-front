# flightbooks-front

## Prequisities
First, we need to setup firebase auth info.

Create `.env` and add secret info to the document.

```.env
VUE_APP_FIREBASE_API_KEY=<Your API Key>
VUE_APP_FIREBASE_AUTH_DOMAIN=<Your Auth Domain>
VUE_APP_FIREBASE_DATABASE_URL=<Your Databse URL>
VUE_APP_FIREBASE_PROJECT_ID=<Your Project ID>
VUE_APP_FIREBASE_STORAGE_BUCKET=<Your Storage Bucket>
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=<Your Messaging Sender ID>
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

### Run your end-to-end tests
```
yarn run test:e2e
```
