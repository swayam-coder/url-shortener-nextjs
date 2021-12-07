import axios from "axios";
import { AuthInfo } from "../interfaces_and_types";

export function login(userInfo: AuthInfo) {
    return axios.post('/api/login', userInfo)
}

export function register(userInfo: AuthInfo) {
    return axios.post('/api/login', userInfo)
}

export function getHistory() {
    return axios.get(`/api/history/`);
}