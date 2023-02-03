export default {
  async loadCoaches(context, payload) {
    console.log('actions', 'loadCoaches');

    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      console.log(
        'Do not query coaches',
        'shouldUpdate getter',
        context.getters.shouldUpdate,
        'forceRefresh',
        payload.forceRefresh
      );
      return;
    }

    var response = await fetch(
      'https://coaches-dfbb0-default-rtdb.europe-west1.firebasedatabase.app/coaches.json'
    );

    if (!response.ok) {
      console.error('Something went wrong');
      const error = new Error(responseData.message || 'Failed to fetch');
      throw error;
    }

    const responseData = await response.json();

    // Transform

    const coaches = [];
    for (const key in responseData) {
      const coach = {
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        areas: responseData[key].areas,
        hourlyRate: responseData[key].hourlyRate,
        id: key,
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },

  async addCoach(context, payload) {
    console.log('actions', 'addCoach', payload);
    const inputCoach = payload;

    const userId = context.rootGetters.userId;
    const coach = {
      firstName: inputCoach.first,
      lastName: inputCoach.last,
      description: inputCoach.desc,
      areas: inputCoach.areas,
      hourlyRate: inputCoach.rate,
    };

    const response = await fetch(
      `https://coaches-dfbb0-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`,
      { method: 'PUT', body: JSON.stringify(coach) }
    );

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Something went wrong');
      const error = new Error(responseData.message || 'Failed to fetch');
      throw error;
    }

    context.commit('addCoach', { ...coach, id: userId });
  },
};
