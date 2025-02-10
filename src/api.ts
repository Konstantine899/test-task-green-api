import axios, { AxiosError } from "axios";

interface ISettingsResponse {
  wid: string;
  countryInstance: string;
  typeAccount: string;
  webhookUrl: string;
  webhookUrlToken: string;
  delaySendMessagesMilliseconds: number;
  markIncomingMessagesReaded: string;
  markIncomingMessagesReadedOnReply: string;
  sharedSession: string;
  proxyInstance: string;
  outgoingWebhook: string;
  outgoingMessageWebhook: string;
  outgoingAPIMessageWebhook: string;
  incomingWebhook: string;
  deviceWebhook: string;
  statusInstanceWebhook: string;
  stateWebhook: string;
  enableMessagesHistory: string;
  keepOnlineStatus: string;
  pollMessageWebhook: string;
  incomingBlockWebhook: string;
  incomingCallWebhook: string;
  editedMessageWebhook: string;
  deletedMessageWebhook: string;
}

interface ILogoutResponse {
  isLogout: boolean;
}

interface ISendMessageResponse {
  idMessage: string;
}

interface IReceiveMessage {
  receiptId: number;
  body: {
    typeWebhook: string;
    instanceData: {
      idInstance: number;
      wid: string;
      typeInstance: string;
    };
    timestamp: number;
    idMessage: string;
    senderData: {
      chatId: string;
      sender: string;
      senderName: string;
      senderContactName: string;
    };
    messageData: {
      typeMessage: string;
      textMessageData: {
        textMessage: string;
      };
    };
  };
}

interface IDeleteNotification {
  result: boolean;
  reason: string;
}

export const getSettings = async (
  idInstance: string,
  apiTokenInstance: string
): Promise<ISettingsResponse> => {
  try {
    const url = `${__API_URL__}/waInstance${idInstance}/getSettings/${apiTokenInstance}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении настроек:", error);
    throw error;
  }
};

export const logout = async (
  idInstance: string,
  apiTokenInstance: string
): Promise<ILogoutResponse> => {
  try {
    const url = `${__API_URL__}/waInstance${idInstance}/logout/${apiTokenInstance}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении настроек:", error);
    throw error;
  }
};

export const sendMessage = async (
  idInstance: string,
  apiTokenInstance: string,
  phoneNumber: string,
  message: string
): Promise<ISendMessageResponse> => {
  try {
    const url = `${__API_URL__}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    const response = await axios.post<ISendMessageResponse>(url, {
      chatId: `${phoneNumber}@c.us`,
      message,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при отправке сообщения:", error);
    throw error;
  }
};

export const receiveMessage = async (
  idInstance: string,
  apiTokenInstance: string
): Promise<IReceiveMessage | null> => {
  try {
    const url = `${__API_URL__}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=5`;
    const response = await axios.get<IReceiveMessage>(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error(
        "receiveMessage: Axios error details:",
        axiosError.response?.data,
        axiosError.response?.status
      );
    }
    return null;
  }
};

export const deleteNotification = async (
  idInstance: string,
  apiTokenInstance: string,
  receiptId: number
): Promise<IDeleteNotification> => {
  try {
    const url = `${__API_URL__}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`;
    const response = await axios.delete(url);
    return response.data;
  } catch (error: any) {
    console.error("Ошибка удаления уведомления:", error);
    return null;
  }
};
