// axios.ts

import Axios from 'axios';

export default {
  install: (app, options) => {
    console.log('install');
    app.config.globalProperties.$axios = Axios.create({
      baseURL: options.baseUrl,
      //   headers: {
      //     Authorization: options.token ? `Bearer ${options.token}` : '',
      //   },
    });
  },
};
