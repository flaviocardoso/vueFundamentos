<template>
    <div>
        <h1 class="centralizado">Cadastro</h1>
        <h2 v-if="foto._id" class="centralizado">Alterando</h2>
        <h2 v-else="id" class="centralizado">Incluindo</h2>
        <h2 class="centralizado">{{ foto.titulo }}</h2>
        <form @submit.prevent="grava()">
            <div class="controle">
                <label for="titulo">TÍTULO</label>
                <input
                    name="titulo"
                    data-vv-as="título"
                    v-validate
                    data-vv-rules="required|min:3|max:30" 
                    v-model="foto.titulo"
                    id="titulo" 
                    autocomplete="off"
                >
                <span class="erro" v-show="errors.has('titulo')">
                    {{ errors.first('titulo') }}
                </span>
            </div>
            <div class="controle">
                <label for="url">URL</label>
                <input
                    name="url"
                    data-vv-as="url"
                    v-validate
                    data-vv-rules="required" 
                    v-model="foto.url"
                    id="url" 
                    autocomplete="off"
                >
                <span class="erro" v-show="errors.has('url')">
                    {{ errors.first('url') }}
                </span>
                <imagem-responsiva 
                    v-show="foto.url" 
                    :url="foto.url" 
                    :titulo="foto.url" />
            </div>
            <div class="controle">
                <label for="descricao"></label>
                <textarea 
                    v-model="foto.descricao"
                    id="descricao" 
                    autocomplete="off"></textarea>
            </div>
            <div class="centralizado">
                <meu-botao rotulo="GRAVAR" tipo="submit" />
                <router-link :to="{ name: 'home' }">
                    <meu-botao rotulo="VOLTAR" tipo="button" />
                </router-link>
            </div>
        </form>
    </div>
</template>
<script>
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';
import Foto from '../../domain/foto/Foto';
import FotoService from '../../domain/foto/FotoService';
export default {
    components: {
        'imagem-responsiva': ImagemResponsiva,
        'meu-botao': Botao
    },
    data () {
        return {
            foto: new Foto(),
            id: this.$route.params.id
        }
    },
    methods: {
        grava () {
            this.$validator
            .validateAll()
            .then(success => {
                if (success) {                    
                    this.service
                        .cadastra(this.foto)
                        .then(() => {
                            if (this.id) {
                                this.$router.push({ name: 'home' });
                            }
                            this.foto = new Foto();
                        }, err => console.log(err));
                }
            });
            /*
            console.log('enviar os dados para a API');
            
            console.log(this.foto);

            this.foto = new Foto();
            */
        }
    },
    created() {
        this.service = new FotoService(this.$resource);

        if (this.id) {
            this.service
                .busca(this.id)
                .then(foto => this.foto = foto);
        }
    }
}
</script>
<style scoped>
    .centralizado {
        text-align: center;
    }
    .controle {
        font-size: 1.2em;
        margin-bottom: 20px;
    }
    .controle label {
        display: block;
        font-weight: bold;
    }
    .controle label + input, .controle textarea {
        width: 100%;
        font-size: inherit;
        border-radius: 5px
    }
    .centralizado {
        text-align: center;
    }
    .erro {
        color: red;
    }
</style>