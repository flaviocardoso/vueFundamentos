<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <p v-show="messagem" class="centralizado">{{ messagem }}</p>
    <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="filtre pelo título da foto">
    {{ filtro }}
    <ul class="lista-fotos">
      <li class="lista-foto-item" v-for="foto of fotosComFiltro" :key="foto._id">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva v-meu-transform.animate.reverse="{ increment: 90, time: 0.5 }" :url="foto.url" :titulo="foto.titulo" />
          <router-link :to="{ name : 'altera', params : { id : foto._id } }">
            <meu-botao tipo="button" rotulo="ALTERAR"/>
          </router-link>
          <meu-botao 
            tipo="button" 
            rotulo="REMOVER" 
            @botaoAtivado="remove(foto)"
            :confirmacao="true"
            estilo="perigo" />
        </meu-painel>            
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';
import transform from '../../directives/transform';
import FotoService from '../../domain/foto/FotoService';
export default {
  components: {
    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao': Botao
  },
  directives: {
    'meu-transform': transform
  },
  data () {
    return {
      titulo: 'AluraPic',
      fotos: [],
      filtro: '',
      messagem: ''
    }
  },
  methods: {
      remove (foto) {
        this.service
          .apaga(foto._id)
          .then(() => {
              let indice = this.fotos.indexOf(foto);
              this.fotos.splice(indice, 1);
              this.messagem = 'Foto removida com sucesso';
            }, err => {
              this.messagem = err.message;
            });
      }
  },
  computed: {
    fotosComFiltro () {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
  },
  created() {
    this.service = new FotoService(this.$resource);
    this.service
      .lista()
      .then(fotos => this.fotos = fotos, err => {
        this.messagem = err.message;
        console.log(err);
      });
  }
}
</script>

<style>
  .centralizado {
    text-align: center;
  }
  .lista-fotos {
    list-style: none;
  }
  .lista-fotos .lista-foto-item {
    display: inline-block;
  }
  /* filtro de fotos */
  .filtro {
    display: block;
    width: 100%;
  }
</style>
