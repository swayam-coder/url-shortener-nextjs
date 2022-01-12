import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { AxiosResponseModified } from "../../../interfaces_and_types";

export enum AuthQueryKeys {
    UserLogin = 'userlogin'
} 

export function useHistoryQuery() {
    return useQuery<AxiosResponseModified, AxiosError>(AuthQueryKeys.UserLogin);
}
