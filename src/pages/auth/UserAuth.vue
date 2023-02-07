
<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">E-Mail</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <p class="errors" v-if="!formIsValid">
        Please enter a valid email and a password
      </p>
      <base-button>{{ submitButtonCaption }}</base-button>
      <base-button type="button" mode="flat" @click="switchAuthMode">{{
        switchModeButtonCaption
      }}</base-button>
    </form>
  </base-card>
</template>


<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
    };
  },

  computed: {
    submitButtonCaption() {
      return this.mode == 'login' ? 'Login' : 'Sign up';
    },
    switchModeButtonCaption() {
      return (this.mode == 'login' ? 'Sign up' : 'Login') + ' instead';
    },
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (
        this.email == '' ||
        !this.email.includes('@') ||
        this.password == ''
      ) {
        this.formIsValid = false;
        return;
      }
      //   const request = {
      //     email: this.email,
      //     password: this.password,
      //   };
      //   this.$store.dispatch('requests/contactCoach', request);

      //   this.$router.replace('/coaches');
    },
    switchAuthMode() {
      this.mode = this.mode == 'login' ? 'signup' : 'login';
    },
  },
};
</script>


<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
