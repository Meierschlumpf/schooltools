import { NotificationProps, showNotification } from "@mantine/notifications";

export const showValidationErrorNotification = () => {
  showErrorNotification({
    title: "Validierungsfehler",
    message: "Bitte überprüfen sie Ihre Eingabe",
  });
};

export const showServerErrorNotification = () => {
  showErrorNotification({
    title: "Serverfehler",
    message: "Ooups! Da ging wohl was schief.",
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
