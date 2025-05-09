<template>
  <div>
    <h1>Kontakt</h1>
    <form v-if="!form.submitted" class="vue-form" @submit.prevent="submit">
      <div v-if="form.sendError" class="error-message">
        <p>
          Das Emailsenden hat einen Fehler verursacht. Bitte überprüfe deine Eingaben und versuche es erneut.
        </p>
      </div>

      <fieldset>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <input
                v-model="form.name"
                class="form-control"
                name="txtName"
                placeholder="Dein Name?"
                type="text"
              />
            </div>
            <div class="form-group">
              <input
                v-model="form.email"
                :class="{ error: !emailIsValid }"
                class="form-control"
                name="txtEmail"
                placeholder="Deine Email?"
                type="text"
              />
              <p v-if="!emailIsValid">Die Email ist fehlerhaft.</p>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <textarea
                v-model="form.message"
                :maxlength="MAX_MESSAGE_LENGTH"
                class="form-control"
                name="txtMsg"
                placeholder="Was willst du uns sagen?"
                style="width: 100%; height: 150px"
              ></textarea>
              <span class="counter">{{ form.message.length }} / {{ MAX_MESSAGE_LENGTH }}</span>
            </div>
          </div>
        </div>

        <input
          v-model="form.contactByFax"
          name="contact_me_by_fax_only"
          style="display: none !important"
          tabindex="-1"
          type="checkbox"
        />

        <div class="col-md-12 text-center">
          <button v-if="!form.sending" class="btn btn-primary" type="submit">Senden</button>
          <button v-if="form.sending" class="btn" disabled>Email wird gesendet...</button>
          <button v-if="!form.sending" class="btn btn-secondary" @click="cancelMail">Cancel</button>
        </div>
      </fieldset>
    </form>

    <div v-else>
      <div class="col-md-12">
        <p>Email gesendet.</p>
        <p>Vielen Dank für deine Nachricht. Wir melden uns bald möglichst bei dir.</p>
      </div>
      <div class="col-md-12 text-center">
        <button class="btn btn-secondary" @click="cancelMail">Schließen</button>
      </div>
    </div>

    <div v-if="form.debug" class="debug">
      <pre><code>{{ form }}</code></pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* ─────────────────────────────
 * Imports
 * ───────────────────────────── */
import {computed, reactive} from 'vue';
import {closeModal} from '@kolirt/vue-modal';
import MailService from '@/services/mail.service.ts';

/* ─────────────────────────────
 * Konfiguration
 * ───────────────────────────── */
const MAX_MESSAGE_LENGTH = 255;

/* ─────────────────────────────
 * Computed Styles & Klassen
 * ───────────────────────────── */
const form = reactive({
  name: '',
  email: '',
  message: '',
  contactByFax: false,
  submitted: false,
  sending: false,
  sendError: false,
  debug: false
});

const emailIsValid = computed(() => {
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegExp.test(form.email);
});

/* ─────────────────────────────
 * Methoden
 * ───────────────────────────── */
function resetForm() {
  form.name = '';
  form.email = '';
  form.message = '';
  form.contactByFax = false;
  form.submitted = false;
  form.sending = false;
  form.sendError = false;
}

function cancelMail() {
  closeModal();
  resetForm();
}

async function submit() {
  form.sendError = false;

  if (!form.name || !form.email || !form.message || !emailIsValid.value) {
    form.sendError = true;
    return;
  }

  form.sending = true;

  try {
    const res = await MailService.sendMail({
      name: form.name,
      email: form.email,
      message: form.message,
      contactMeByFax: form.contactByFax
    });

    if (res.message === 'Email sent') {
      form.submitted = true;
    } else {
      form.sendError = true;
    }
  } catch (err) {
    console.error('catch', err);
    form.sendError = true;
  } finally {
    form.sending = false;
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
