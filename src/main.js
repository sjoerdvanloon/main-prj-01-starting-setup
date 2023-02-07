import { createApp } from 'vue';

import router from './router.js';
import store from './store/index.js';
import App from './App.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
import axios from 'axios';
// import { sayHi, sayBye } from './imextest.js';

const app = createApp(App);

var baseUrl =
  'https://coaches-dfbb0-default-rtdb.europe-west1.firebasedatabase.app/';

app.use(router);
app.use(store);
axios.defaults.baseURL = baseUrl;
store.$axios = axios;
store.$sjoerdConverter = (x) => 'hi';

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');

// sayHi('Paul');
// sayBye('Paul');
