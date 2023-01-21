import { useMutation, UseMutationResult } from 'react-query';
import {
  createOtp,
  distributeKit,
  giveHospitalityKit,
  markEventAttendance,
  setReminder,
  setTag,
  userDetail,
  verifyOtp,
} from '../../api/user';
import { getCoordinates } from '../../api/events';
import {
  ESUMMIT_CREATE_OTP,
  ESUMMIT_DISTRIBUTE_KIT,
  ESUMMIT_EVENT_MARK_ATTENDANCE,
  ESUMMIT_HOSPI_KIT,
  ESUMMIT_SET_REMINDER,
  ESUMMIT_SET_TAG,
  ESUMMIT_USER_DETAIL,
  ESUMMIT_VENUE_COORDINATES,
  ESUMMIT_VERIFY_OTP,
} from '../../contants/query-keys';
import {
  ErrorResponse,
  ICreateOtpResponse,
  IKitResponse,
  ISetReminderResponse,
  ISetTagResponse,
  IVerifyOtpResponse,
} from '../../types/api/action.types';
import {
  IGetCoordinatesResponse,
  IGiveHospitalityKitResponse,
} from '../../types/api/events.types';

export const useSetReminderMutation = (): UseMutationResult<
  ISetReminderResponse,
  ErrorResponse,
  { id: string; email: string }
> => {
  return useMutation<
    ISetReminderResponse,
    ErrorResponse,
    { id: string; email: string }
  >({
    mutationKey: [ESUMMIT_SET_REMINDER],
    mutationFn: async ({ id, email }) => setReminder(id, email),
  });
};

export const useSetTagMutation = (): UseMutationResult<
  ISetTagResponse,
  ErrorResponse,
  { id: string; email: string; tag: string }
> => {
  return useMutation<
    ISetTagResponse,
    ErrorResponse,
    { id: string; email: string; tag: string }
  >({
    mutationKey: [ESUMMIT_SET_TAG],
    mutationFn: async ({ id, email, tag }) =>
      setTag(id, email, tag.toLowerCase()),
  });
};

export const useCreateOtpMutation = (): UseMutationResult<
  ICreateOtpResponse,
  ErrorResponse,
  { email: string }
> => {
  return useMutation<ICreateOtpResponse, ErrorResponse, { email: string }>({
    mutationKey: [ESUMMIT_CREATE_OTP],
    mutationFn: async ({ email }) => createOtp(email),
  });
};

export const useVerifyOtpMutation = (): UseMutationResult<
  IVerifyOtpResponse,
  ErrorResponse,
  { email: string; value: string }
> => {
  return useMutation<
    IVerifyOtpResponse,
    ErrorResponse,
    { email: string; value: string }
  >({
    mutationKey: [ESUMMIT_VERIFY_OTP],
    mutationFn: async ({ email, value }) => verifyOtp(email, value),
  });
};

export const useUserDetailMutation = (): UseMutationResult<
  IVerifyOtpResponse,
  ErrorResponse,
  { email: string }
> => {
  return useMutation<IVerifyOtpResponse, ErrorResponse, { email: string }>({
    mutationKey: [ESUMMIT_USER_DETAIL],
    mutationFn: async ({ email }) => userDetail(email),
  });
};

export const useDistributeKitMutation = (): UseMutationResult<
  IKitResponse,
  ErrorResponse,
  { attendanceId: string | undefined }
> => {
  return useMutation<
    IKitResponse,
    ErrorResponse,
    { attendanceId: string | undefined }
  >({
    mutationKey: [ESUMMIT_DISTRIBUTE_KIT],
    mutationFn: async ({ attendanceId }) => distributeKit(attendanceId),
  });
};

export const useMarkEventAttendanceMutation = (): UseMutationResult<
  IKitResponse,
  ErrorResponse,
  { event: string; email: string }
> => {
  return useMutation<
    IKitResponse,
    ErrorResponse,
    { event: string; email: string }
  >({
    mutationKey: [ESUMMIT_EVENT_MARK_ATTENDANCE],
    mutationFn: async ({ email, event }) => markEventAttendance(email, event),
  });
};

export const useGetCoordinatesMutation = (): UseMutationResult<
  IGetCoordinatesResponse,
  ErrorResponse,
  { venue: string }
> => {
  return useMutation<IGetCoordinatesResponse, ErrorResponse, { venue: string }>(
    {
      mutationKey: [ESUMMIT_VENUE_COORDINATES],
      mutationFn: async ({ venue }) => getCoordinates(venue),
    },
  );
};

export const useGiveHospitalityKitMutation = (): UseMutationResult<
  IGiveHospitalityKitResponse,
  ErrorResponse,
  { email: string }
> => {
  return useMutation<
    IGiveHospitalityKitResponse,
    ErrorResponse,
    { email: string }
  >({
    mutationKey: [ESUMMIT_HOSPI_KIT],
    mutationFn: async ({ email }) => giveHospitalityKit(email),
  });
};
