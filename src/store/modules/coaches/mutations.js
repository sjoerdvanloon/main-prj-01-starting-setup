export default {
  addCoach(state, payload) {
    console.log('mutations', 'addCoach', payload);

    state.coaches.push(payload);
  },
  setCoaches(state, payload) {
    console.log('mutations', 'setCoaches', payload);

    state.coaches = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
