import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

class MailService {
  axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'API-Key': API_KEY,
      'Content-Type': 'application/json'
    }
  })

  async sendMail(data) {
    const sendObject = {
      name: data.name,
      email: data.email,
      message: data.message,
      contactMeByFax: data.contactMeByFax
    }
    return await this.axiosInstance.post('send_email', sendObject).then((response) => {
      return response.data
    })
  }
}

export default new MailService()
