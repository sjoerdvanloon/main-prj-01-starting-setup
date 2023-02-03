export default {
  async contactCoach(context, payload) {
    console.log('actions', 'contactCoach', payload);
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://coaches-dfbb0-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
      { method: 'POST', body: JSON.stringify(newRequest) }
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Something went wrong when posting a request');
      const error = new Error(responseData.message || 'Failed to post request');
      throw error;
    }

    var commitPayload = {
      ...newRequest,
      id: responseData.name,
      coachId: payload.coachId,
    };
    console.warn('x', commitPayload);

    context.commit('addRequest', commitPayload);
  },
  async fetchRequests(context) {
    var coachId = context.rootGetters.userId;
    const response = await fetch(
      `https://coaches-dfbb0-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json`,
      { method: 'GET' }
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.error(
        `Something went wrong when fetching requests for ${coachId}`
      );
      const error = new Error(responseData.message || 'Failed to post request');
      throw error;
    }

    var requests = [];
    for (const key in responseData) {
      var request = { id: key, coachId: coachId, ...responseData[key] };
      requests.push(request);
    }

    context.commit('setRequests', requests);
  },
};
