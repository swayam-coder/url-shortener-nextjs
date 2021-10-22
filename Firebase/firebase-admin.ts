import admin from "firebase-admin"
import React from "react"
import serviceAccount from "./secret.json"

export const verifyIdToken = (token) => {
    if(!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(`${serviceAccount}`),
        })
    }
}

export const auth = () => admin.auth()