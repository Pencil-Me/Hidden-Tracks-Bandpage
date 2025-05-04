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

  /* decrypt helper function */
  decryptCharcode(n, start, end, offset) {
    n = n + offset
    if (offset > 0 && n > end) {
      n = start + (n - end - 1)
    } else if (offset < 0 && n < start) {
      n = end - (start - n - 1)
    }
    return String.fromCharCode(n)
  }

  /* decrypt string */
  decryptString(enc, offset) {
    let dec = ''
    const len = enc.length
    for (let i = 0; i < len; i++) {
      const n = enc.charCodeAt(i)
      if (n >= 0x2b && n <= 0x3a) {
        dec += this.decryptCharcode(n, 0x2b, 0x3a, offset) /* 0-9 . , - + / : */
      } else if (n >= 0x40 && n <= 0x5a) {
        dec += this.decryptCharcode(n, 0x40, 0x5a, offset) /* A-Z @ */
      } else if (n >= 0x61 && n <= 0x7a) {
        dec += this.decryptCharcode(n, 0x61, 0x7a, offset) /* a-z */
      } else {
        dec += enc.charAt(i)
      }
    }
    return dec
  }

  /* decrypt spam-protected emails */
  linkTo_UnCryptMailto(s) {
    location.href = this.decryptString(s, 2)
  }

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
