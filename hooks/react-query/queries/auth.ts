import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { AxiosResponseModified } from "../../../interfaces_and_types";
import { AuthQueryKeys } from "../query-keys";

export function useLoginQuery() {
    return useQuery<AxiosResponseModified, AxiosError>(AuthQueryKeys.UserLogin)
}