import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      requests: [
        {
          id: 'dfsdfdsfs',
          userEmail: 'sjord@dfsd.com',
          message: 'dfsdfdsfs',
          coachId: 'dfsfsfs',
        },
      ],
    };
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
};
