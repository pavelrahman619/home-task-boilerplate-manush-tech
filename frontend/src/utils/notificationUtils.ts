// src/utils/notificationUtils.ts
import { notifications } from '@mantine/notifications';

export const showSuccess = (message: string, title = 'Success') => {
  notifications.show({
    title,
    message,
    color: 'green',
    autoClose: 3000,
  });
};

export const showError = (message: string, title = 'Error') => {
  notifications.show({
    title,
    message,
    color: 'red',
    autoClose: 5000,
  });
};

export const showInfo = (message: string, title = 'Info') => {
  notifications.show({
    title,
    message,
    color: 'blue',
    autoClose: 4000,
  });
};

export const showWarning = (message: string, title = 'Warning') => {
  notifications.show({
    title,
    message,
    color: 'yellow',
    autoClose: 4000,
  });
};
