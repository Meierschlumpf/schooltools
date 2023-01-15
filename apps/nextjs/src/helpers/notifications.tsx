import { NotificationProps, showNotification } from "@mantine/notifications";
import { Trans } from "next-i18next";

export const showValidationErrorNotification = () => {
  showErrorNotification({
    title: <Trans i18nKey="common:error.validation.title" />,
    message: <Trans i18nKey="common:error.validation.message" />,
  });
};

export const showServerErrorNotification = () => {
  showErrorNotification({
    title: <Trans i18nKey="common:error.server.title" />,
    message: <Trans i18nKey="common:error.server.message" />,
  });
};

export const showErrorNotification = (props: NotificationProps) => {
  showNotification({
    ...props,
    color: "red",
  });
};

export const showSuccessNotification = (props: NotificationProps) => {
  showNotification({
    ...props,
    color: "teal",
  });
};
