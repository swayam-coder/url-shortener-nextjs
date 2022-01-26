import axios, { AxiosResponse } from "axios";
import { AuthInfo, AxiosResponseModified } from "../interfaces_and_types";
import { UrlMetaData } from "../interfaces_and_types";

export function login(userInfo: AuthInfo) {
    return axios.post<any, AxiosResponseModified>('/api/login', userInfo);
}

export function register(userInfo: AuthInfo) {
    return axios.post<any, AxiosResponseModified>('/api/register', userInfo);
}

export function getHistory() {
    return axios.get(`/api/history/`);
}

export function shorten(url: string, urlMetaData: UrlMetaData) {
    return axios.post<any, AxiosResponseModified>('/api/', {url, ...urlMetaData});
}