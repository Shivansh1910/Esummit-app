import { useMutation, UseMutationResult } from "react-query"
import { createOtp, setReminder, setTag, userDetail, verifyOtp } from "../../api/user"
import { ESUMMIT_CREATE_OTP, ESUMMIT_SET_REMINDER, ESUMMIT_SET_TAG, ESUMMIT_USER_DETAIL, ESUMMIT_VERIFY_OTP } from "../../contants/query-keys"
import { ErrorResponse, ICreateOtpResponse, ISetReminderResponse, ISetTagResponse, IVerifyOtpResponse } from "../../types/api/action.types"

export const useSetReminderMutation = (): UseMutationResult<ISetReminderResponse, ErrorResponse, { id: string, email: string }> => {
    return useMutation<ISetReminderResponse, ErrorResponse, { id: string, email: string }>({
        mutationKey: [ESUMMIT_SET_REMINDER],
        mutationFn: async ({ id, email }) => setReminder(id, email),
    })
}

export const useSetTagMutation = (): UseMutationResult<ISetTagResponse, ErrorResponse, { id: string, email: string, tag: string }> => {
    return useMutation<ISetTagResponse, ErrorResponse, { id: string, email: string, tag: string }>({
        mutationKey: [ESUMMIT_SET_TAG],
        mutationFn: async ({ id, email, tag }) => setTag(id, email, tag.toLowerCase()),
    })
}

export const useCreateOtpMutation = (): UseMutationResult<ICreateOtpResponse, ErrorResponse, { email: string }> => {
    return useMutation<ICreateOtpResponse, ErrorResponse, { email: string }>({
        mutationKey: [ESUMMIT_CREATE_OTP],
        mutationFn: async ({ email }) => createOtp(email),
    })
}

export const useVerifyOtpMutation = (): UseMutationResult<IVerifyOtpResponse, ErrorResponse, { email: string, value: string }> => {
    return useMutation<IVerifyOtpResponse, ErrorResponse, { email: string, value: string }>({
        mutationKey: [ESUMMIT_VERIFY_OTP],
        mutationFn: async ({ email, value }) => verifyOtp(email, value),
    })
}

export const useUserDetailMutation = (): UseMutationResult<IVerifyOtpResponse, ErrorResponse, { email: string }> => {
    return useMutation<IVerifyOtpResponse, ErrorResponse, { email: string }>({
        mutationKey: [ESUMMIT_USER_DETAIL],
        mutationFn: async ({ email }) => userDetail(email),
    })
}