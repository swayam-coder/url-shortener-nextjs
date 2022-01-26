import { useMutation } from "react-query";
import { AxiosResponseModified } from "../../../interfaces_and_types";
import { AxiosError } from "axios";
import { AuthInfo } from "../../../interfaces_and_types";
import { login, register } from "../../../lib/crud-operations";
import { AuthQueryKeys } from "../query-keys";

export function useLoginMutation(userInfo: AuthInfo) {
    return useMutation<AxiosResponseModified, AxiosError, AuthInfo>(AuthQueryKeys.UserLogin, (userInfo) => login(userInfo));
}

export function useRegisterMutation(userInfo: AuthInfo) {
    return useMutation<AxiosResponseModified, AxiosError, AuthInfo>(AuthQueryKeys.UserLogin, (userInfo) => register(userInfo));
}