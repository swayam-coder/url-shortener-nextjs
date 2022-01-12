import { useMutation } from "react-query";
import { AxiosResponseModified } from "../../../interfaces_and_types";
import { AxiosError } from "axios";
import { AuthInfo } from "../../../interfaces_and_types";
import { login } from "../../../lib/crud-operations";

export function useLoginQuery() {
    return useMutation<AxiosResponseModified, AxiosError, AuthInfo, () => Response>("userlogin", login);
}