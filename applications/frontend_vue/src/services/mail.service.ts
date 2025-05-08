import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

class MailService {
  axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'API-Key': API_KEY,
      'Content-Type': 'application/json'
    }
  });

  /* decrypt helper function */
  decryptCharcode(n, start, end, offset) {
    n = n + offset;
    if (offset > 0 && n > end) {
      n = start + (n - end - 1);
    } else if (offset < 0 && n < start) {
      n = end - (start - n - 1);
    }
    return String.fromCharCode(n);
  }

  /* decrypt string */
  decryptString(enc, offset) {
    const CHAR_CODES = {
      MIN_NUMBER: 0x2b,
      MAX_NUMBER: 0x3a,
      MIN_UPPERCASE: 0x40,
      MAX_UPPERCASE: 0x5a,
      MIN_LOWERCASE: 0x61,
      MAX_LOWERCASE: 0x7a
    };

    let dec = '';
    const len = enc.length;
    for (let i = 0; i < len; i++) {
      const n = enc.charCodeAt(i);
      if (n >= CHAR_CODES.MIN_NUMBER && n <= CHAR_CODES.MAX_NUMBER) {
        dec += this.decryptCharcode(n, CHAR_CODES.MIN_NUMBER, CHAR_CODES.MAX_NUMBER, offset); /* 0-9 . , - + / : */
      } else if (n >= CHAR_CODES.MIN_UPPERCASE && n <= CHAR_CODES.MAX_UPPERCASE) {
        dec += this.decryptCharcode(n, CHAR_CODES.MIN_UPPERCASE, CHAR_CODES.MAX_UPPERCASE, offset); /* A-Z @ */
      } else if (n >= CHAR_CODES.MIN_LOWERCASE && n <= CHAR_CODES.MAX_LOWERCASE) {
        dec += this.decryptCharcode(n, CHAR_CODES.MIN_LOWERCASE, CHAR_CODES.MAX_LOWERCASE, offset); /* a-z */
      } else {
        dec += enc.charAt(i);
      }
    }
    return dec;
  }

  /* decrypt spam-protected emails */
  linkTo_UnCryptMailto(s) {
    const OFFSET = 2;
    location.href = this.decryptString(s, OFFSET);
  }

  async sendMail(data) {
    const sendObject = {
      name: data.name,
      email: data.email,
      message: data.message,
      contactMeByFax: data.contactMeByFax
    };
    return await this.axiosInstance.post('send_email', sendObject).then((response) => {
      return response.data;
    });
  }
}

export default new MailService();
