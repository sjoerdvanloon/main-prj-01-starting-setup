export default {
  addRequest(state, payload) {
    console.log('mutations', 'addRequest', payload);

    state.requests.push(payload);
  },
  setRequests(state, payload) {
    console.log('mutations', 'setRequests', payload);

    state.requests = payload;
  },
};
