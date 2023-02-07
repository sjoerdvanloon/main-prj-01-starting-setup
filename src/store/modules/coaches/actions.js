//import { convertCoachDtoToCoachState } from './dtoToStoreTypeConverter.js';
import { convertCoachDtoToCoachState } from './imextest.js';

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
    const convert = convertCoachDtoToCoachState;
    // alert(sayHi);
    //sayBye('ausdd');
    //console.log('Start', convertCoachDtoToCoachState);
    this.$axios
      .get('coaches.json')
      .then((x) => {
        // Transform

        const coaches = [];
        for (const key in x.data) {
          const coach = convert(key, x);
          coaches.push(coach);
        }
        console.log('coaches', coaches);
        context.commit('setCoaches', coaches);
        context.commit('setFetchTimestamp');
      })
      .catch((x) => {
        console.error('Something went wrong');
        const error = new Error(x.data || 'Failed to fetch');
        throw error;
      });

    // if (response.status != 200) {

    // }
    // console.log('End');
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
