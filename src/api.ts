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
