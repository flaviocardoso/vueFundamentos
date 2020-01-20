import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes';
import VeeValidade from 'vee-validate';
import pt_BR from './locale/pt_BR';
//import './directives/Transform'; /* Chamando diretiva diretamente */
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

import './assets/css/teste.css';
import './assets/js/teste';

Vue.use(VueResource);
// Vue.http.options.root = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000';
Vue.http.options.root = 'http://localhost:3000';
// Vue.http.interceptors.push((req, next) => {
//   req.headers.set('Authorization', 'informação de segurança aqui');
//   console.log('Lidando com request');

//   next(res => {
//     console.log('Lidando com resposta');
//     console.log(res.body);
//   })
// });
Vue.use(VueRouter);

const router = new VueRouter ({
  routes,
  mode: 'history'
});

Vue.use(VeeValidade, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: pt_BR
    }
  }
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
