import { useQuery } from "react-query";
import { getHistory, shorten } from "../../../lib/crud-operations";
import toast from "react-hot-toast";
import { HttpError } from "http-errors-enhanced";
import { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import { UrlMetaData } from "../../../interfaces_and_types";
import { Dispatch, SetStateAction } from "react";

export enum mainQueryKeys {
    ShortenURL = "shorten",
    GetHistory = "history"
} 

export function useShortenQuery(url: string | null, urlMetaData: UrlMetaData, setShortUrl: Dispatch<SetStateAction<string | null>>) {
    return useQuery([mainQueryKeys.ShortenURL, url], () => shorten(url!, urlMetaData), {
        // enabled: logininfo ? (logininfo.userId ? true : false) : false,  // this is to prevent loading if logininfo isnt available and if login is available then fetching is done before hand
        enabled: false,
        refetchOnWindowFocus: false,
        onSuccess: ({ data }) => {   // onSuccess directly gets the axios response (AxiosResponse) 
            if(data && data.shortenedUrlpath) {
                setShortUrl(
                    `${document.location.protocol}//${document.location.host}/${data.shortenedUrlpath}`
                );
                toast.success("URL Shortened 🤩", { id: "datastate" });
            } else {
                throw new HttpError(204, "Couldn't get shortened url 🙁");
            }
        },
        onError: (error: AxiosError | Error) => {
            if(!axios.isAxiosError(error)) {
                toast.error((error as HttpError).message, { id: "datastate" });
            } else {
                toast.error("Something wrong happened! Please try again 🙁", { id: "datastate" });  // onError callback will be executed after 3 retries (by default) by queryclient
                console.log(error);
            }
        }
    });
}

export function useHistoryQuery(logininfo: AxiosResponse) {
    return useQuery([mainQueryKeys.GetHistory, logininfo.data.data?.userId ?? ""], getHistory, {
        // enabled: logininfo ? (logininfo.userId ? true : false) : false,  // this is to prevent loading if logininfo isnt available and if login is available then fetching is done before hand
        enabled: false,
        refetchOnWindowFocus: false
    });
}