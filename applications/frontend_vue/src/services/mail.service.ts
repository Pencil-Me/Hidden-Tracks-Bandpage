import type { AxiosError, AxiosInstance } from 'axios';
import axios from 'axios';

class MailService {
  private static readonly CHAR_CODES = {
    MIN_NUMBER: 0x2b,
    MAX_NUMBER: 0x3a,
    MIN_UPPERCASE: 0x40,
    MAX_UPPERCASE: 0x5a,
    MIN_LOWERCASE: 0x61,
    MAX_LOWERCASE: 0x7a
  };
  private API_URL: string = import.meta.env.VITE_API_URL;
  private API_KEY: string = import.meta.env.VITE_API_KEY;
  private axiosInstance: AxiosInstance = axios.create({
    baseURL: this.API_URL,
    headers: {
      'API-Key': this.API_KEY,
      'Content-Type': 'application/json'
    }
  });

  /* Decrypt spam-protected emails */
  public linkTo_UnCryptMailto(s: string): void {
    const OFFSET = 2;
    location.href = this.decryptString(s, OFFSET);
  }

  /* Send email */
  public async sendMail(data: {
    name: string;
    email: string;
    message: string;
    contactMeByFax?: boolean;
  }): Promise<{ success: boolean; data?: { message: string }; error?: string }> {
    try {
      const res = await this.axiosInstance.post('/send_email', {
        name: data.name,
        email: data.email,
        message: data.message,
        contactMeByFax: data.contactMeByFax || false
      });

      return {
        success: true,
        data: res.data
      };
    } catch (error: unknown) {
      const errorTyp = error as AxiosError;
      console.error('Fehler beim Senden der E-Mail:', error);

      return {
        success: false,
        error: errorTyp.message || 'Unbekannter Fehler'
      };
    }
  }

  /* Decrypt helper function */
  private decryptCharcode(n: number, start: number, end: number, offset: number): string {
    n += offset;
    if (offset > 0 && n > end) {
      n = start + (n - end - 1);
    } else if (offset < 0 && n < start) {
      n = end - (start - n - 1);
    }
    return String.fromCharCode(n);
  }

  /* Decrypt string */
  private decryptString(enc: string, offset: number): string {
    let dec = '';
    for (let i = 0; i < enc.length; i++) {
      const n = enc.charCodeAt(i);

      if (n >= MailService.CHAR_CODES.MIN_NUMBER && n <= MailService.CHAR_CODES.MAX_NUMBER) {
        dec += this.decryptCharcode(
          n,
          MailService.CHAR_CODES.MIN_NUMBER,
          MailService.CHAR_CODES.MAX_NUMBER,
          offset
        );
      } else if (
        n >= MailService.CHAR_CODES.MIN_UPPERCASE &&
        n <= MailService.CHAR_CODES.MAX_UPPERCASE
      ) {
        dec += this.decryptCharcode(
          n,
          MailService.CHAR_CODES.MIN_UPPERCASE,
          MailService.CHAR_CODES.MAX_UPPERCASE,
          offset
        );
      } else if (
        n >= MailService.CHAR_CODES.MIN_LOWERCASE &&
        n <= MailService.CHAR_CODES.MAX_LOWERCASE
      ) {
        dec += this.decryptCharcode(
          n,
          MailService.CHAR_CODES.MIN_LOWERCASE,
          MailService.CHAR_CODES.MAX_LOWERCASE,
          offset
        );
      } else {
        dec += enc.charAt(i);
      }
    }
    return dec;
  }
}

export default new MailService();
