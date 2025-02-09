import axios from "axios";

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
