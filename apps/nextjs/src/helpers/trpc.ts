import { TRPCClientErrorLike } from "@trpc/client";
import { showServerErrorNotification, showValidationErrorNotification } from "./notifications";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trpcGenericErrorHandler = (error: TRPCClientErrorLike<any>) => {
  if (error.data?.code === "BAD_REQUEST") {
    showValidationErrorNotification();
  } else {
    showServerErrorNotification();
  }
};
