import axios from "axios";

export const getSettings = async (
  idInstance: string,
  apiTokenInstance: string
) => {
  try {
    const url = `${__API_URL__}/waInstance${idInstance}/getSettings/${apiTokenInstance}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении настроек:", error);
    throw error;
  }
};
