import { createStore } from 'vuex';
import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';
import coachesModule from './modules/coaches/index.js';
import requestsModule from './modules/requests/index.js';

const store = createStore({
  modules: { coaches: coachesModule, requests: requestsModule },
  strict: true,
  state() {
    return {
      userId: 'c1',
    };
  },
  getters: getters,
  actions: actions,
  mutations: mutations,
});

export default store;
