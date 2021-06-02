
<template>
  <b-modal id="modal-contact" @hide="resetWindow">
    <h1>Kontakt</h1>
    <form class="vue-form" @submit.prevent="submit" v-if="!submitted">
      <div class="error-message">
        <p v-show="!email.valid">Die Email ist fehlerhaft.</p>
        <p v-show="senderror">Das Emailsenden hat einen Fehler verursacht. Bitte versuche es erneut.</p>
      </div>

      <fieldset>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <input type="text" name="txtName" class="form-control"
                     placeholder="Dein Name?"
                     value="" v-model="name"/>
            </div>
            <div class="form-group">
              <input type="text" name="txtEmail" class="form-control"
                     placeholder="Deine Email?"
                     :class="{ email , error: !email.valid }"
                     value="" v-model="email.value"/>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <textarea name="txtMsg" class="form-control"
                        placeholder="Was willst du uns sagen?" style="width: 100%; height: 150px;"
                        v-model="message.text"
                        :maxlength="message.maxlength"></textarea>
              <span class="counter">{{ message.text.length }} / {{ message.maxlength }}</span>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group text-center">
            <input v-if="!sended" type="submit" name="btnSubmit" class="btn btn-primary"
                   value="Send Form" />
            <div v-if="sended">Email wird gesendet...</div>
          </div>
        </div>
      </fieldset>
    </form>

    <div v-if="submitted">
      <p>Email gesendet.</p>
      <p>Vielen Dank für deine Nachricht wir melden uns bald möglichst bei dir.</p>
    </div>

<!--    <div class="debug">-->
<!--      <pre><code>{{ $data }}</code></pre>-->
<!--    </div>-->

  </b-modal>
</template>

<script>
import axios from "axios";

var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function initialState (){
  return {
    name: "",
    email: {
      value: "",
      valid: true
    },
    message: {
      text: "",
      maxlength: 255
    },
    submitted: false,
    sended: false,
    senderror: false
  }
}

export default {
  name: 'modal-contact',
  data: function() {
    return initialState();
  },
  components: {
  },
  methods: {
    resetWindow: function (){
      Object.assign(this.$data, initialState());
    },
    // submit form handler
    submit: function() {
      // console.log('submit');
      this.sended = true;
      axios.post(
          process.env.BASE_URL + '/api/functions/mail.php',
          {
            'name': this.name,
            'email': this.email.value,
            'message': this.message.text,
            'sendmail': 'doitbaby'
          })
          .then((e) => {
            // console.log('then');
            switch(e.data) {
              case "Error":
                // console.log("something is wrong submitted");
                this.senderror = true;
                this.sended = false;
                break;
              case "Email send":
                // console.log("Yay");
                this.submitted = true;
                break;
              default:
                this.senderror = true;
                this.sended = false;
                // console.log("unknown", e);
                break;
            }
          })
          .catch((e) => console.log('catch', e));
    },
    // validate by type and value
    validate: function(type, value) {
      if (type === "email") {
        this.email.valid = this.isEmail(value);
      }
    },
    // check for valid email adress
    isEmail: function(value) {
      return emailRegExp.test(value);
    },
    // check or uncheck all
    checkAll: function(event) {
      this.selection.features = event.target.checked ? this.features : [];
    }
  },
  watch: {
    // watching nested property
    "email.value": function(value) {
      this.validate("email", value);
    }
  },
  computed: {
  }
};
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
    background: #FFFFFF;
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
    color: #4AAE9B;
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
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease
}
</style>