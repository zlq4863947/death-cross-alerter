import Axios from 'axios';

export async function postTelegram(chatId: number, msg: string): Promise<void> {
  const url = 'https://api.telegram.org/bot600341472:AAERUMaroaE5YoxnLvUESrTwYAdhVtmpP_Y/sendMessage';
  await Axios.post(url, {
    chat_id: chatId,
    text: msg,
  });
}
