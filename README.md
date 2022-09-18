#### * Rearranging this project in a monorepo setup with Golang + Gin backend (see monorepo branch)

# SLink
#### A URL Shortener and Manager App built by using NextJS, React Query, Prisma.

## Features

* Shorten URL
* User Login/Register
* Enable/Disable URL
* See URL Analytics
* SSR Support (pending)
* Rewriting the API in GraphQL (pending)
* Convert your URL to a QR Code (pending)

## Technologies Used

* NextJS v12 (API Routes, Edge Middlewares)
* React-Query
* Prisma 2 (MySQL)
* JWE(Encrypted JWT) Authentication - Asymmetric Signing using jose npm library ([click here](https://www.npmjs.com/package/jose)) - RSA265 Signing Algorithm
* Auth0

## Run Locally
### 1. Clone the repository
```sh
$ git clone https://github.com/swayam-coder/url-shortener-nextjs.git
```

### 2. Install Dependencies
```sh
$ npm install 
```
### 3. Setup MySQL Atlas Database
```sh
Set up a MySQL database according to the given schema definition in the project.
```
### 4. Run locally
```sh
$ npm start 
```
