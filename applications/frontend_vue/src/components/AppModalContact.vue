<template>
  <div>
    <h1>Kontakt</h1>
    <form class="vue-form" @submit.prevent="submit" v-if="!submitted">
      <div class="error-message">
        <p v-show="sendError">
          Das Emailsenden hat einen Fehler verursacht. Bitte überprüfe deine Eingaben und versuche
          es erneut.
        </p>
      </div>

      <fieldset>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <input
                type="text"
                name="txtName"
                class="form-control"
                placeholder="Dein Name?"
                value="''"
                v-model="name"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                name="txtEmail"
                class="form-control"
                placeholder="Deine Email?"
                :class="{ email, error: !email.valid }"
                value=""
                v-model="email.value"
              />
              <p v-show="!email.valid">Die Email ist fehlerhaft.</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <textarea
                name="txtMsg"
                class="form-control"
                placeholder="Was willst du uns sagen?"
                style="width: 100%; height: 150px"
                v-model="message.text"
                :maxlength="message.maxlength"
              ></textarea>
              <span class="counter">{{ message.text.length }} / {{ message.maxlength }}</span>
            </div>
          </div>
        </div>

        <input
          type="checkbox"
          formControlName="contactByFax"
          name="contact_me_by_fax_only"
          value="1"
          style="display: none !important"
          tabindex="-1"
          v-model="contactMeByFax"
          autocomplete="off"
        />

        <div class="col-md-12">
          <div class="form-group text-center">
            <button v-if="!sending" type="submit" name="btnSubmit" class="btn btn-primary">
              Senden
            </button>
            <button v-if="sending" disabled>Email wird gesendet...</button>

            <button
              v-if="!sending"
              name="btnCancel"
              class="btn btn-secondary"
              @click="cancelMail()"
            >
              Cancel
            </button>
          </div>
        </div>
      </fieldset>
    </form>

    <div v-if="submitted">
      <div class="col-md-12">
        <p>Email gesendet.</p>
        <p>Vielen Dank für deine Nachricht wir melden uns bald möglichst bei dir.</p>
      </div>
      <div class="col-md-12">
        <div class="form-group text-center">
          <button name="btnCancel" class="btn btn-secondary" @click="cancelMail()">
            Schließen
          </button>
        </div>
      </div>
    </div>

    <div class="debug" v-if="debugOn">
      <pre><code>{{ $data }}</code></pre>
    </div>
  </div>
</template>

<script>
import { closeModal } from '@kolirt/vue-modal'
import MailService from '@/services/mail.service.js'

export default {
  data() {
    return {
      name: '',
      email: {
        value: '',
        valid: true
      },
      message: {
        text: '',
        maxlength: 255
      },
      contactMeByFax: false,
      submitted: false,
      sending: false,
      sendError: false,
      debugOn: false
    }
  },
  components: {},
  methods: {
    cancelMail() {
      closeModal()
    },
    // submit form handler
    submit() {
      this.sending = true

      if (!this.name || !this.email.valid || !this.email.value || !this.message.text) {
        this.sendError = true
        this.sending = false
        return
      }

      MailService.sendMail({
        name: this.name,
        email: this.email.value,
        message: this.message.text,
        contactMeByFax: this.contactMeByFax
      })
        .then((e) => {
          console.log(e, e.message)
          switch (e.message) {
            case 'Error':
              // something is wrong submitted
              this.sendError = true
              this.sending = false
              break
            case 'Email sent':
              this.submitted = true
              break
            default:
              this.sendError = true
              this.sending = false
              break
          }
        })
        .catch((e) => console.log('catch', e))
    },
    // validate by type and value
    validate(type, value) {
      if (type === 'email') {
        this.email.valid = this.isEmail(value)
      }
    },
    // check for valid email adress
    isEmail(value) {
      const emailRegExp =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      return emailRegExp.test(value)
    }
  },
  watch: {
    // watching nested property
    'email.value': function (value) {
      this.validate('email', value)
    }
  },
  computed: {},
  mounted() {
    this.name = ''
    this.email = {
      value: '',
      valid: true
    }
    this.message = {
      text: '',
      maxlength: 255
    }
    this.contactMeByFax = false
    this.submitted = false
    this.sending = false
    this.sendError = false
    this.debugOn = false
  }
}
</script>

<style lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    background: #ffffff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4aae9b;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4aae9b;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4aae9b;
    border: 1px solid #4aae9b;
    border-radius: 2px;
  }
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
