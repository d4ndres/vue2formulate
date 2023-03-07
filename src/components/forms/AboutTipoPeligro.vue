<template>
<article v-if="peligro" class="peligro">
    <h3 class="text-secondary fs-3"> {{ peligroName }} </h3>
    <div class="info">
        <div v-if="peligro.descripcion">
            <p><strong>Descripcion</strong></p>
            <p>{{ sanitizeString( peligro.descripcion) }}</p>
        </div>
        <div v-if="peligro.funteDelPeligro">
            <p><strong>FunteDelPeligro</strong></p>
            <p>{{ sanitizeString( peligro.funteDelPeligro) }}</p>
        </div>
    </div>
    <FormulateForm  name="efectosYOcurrenciaAsObject" v-model="efectosYOcurrenciaAsObject">
        <h3 class="text-secondary fs-4">Efectos y concurrencia</h3>
        <div class="efecto" v-for="efecto in efectosYOcurrencia" :key="efecto.title">
            <!-- maybe scroll smooth  -->
            <div class="efecto-body">
                <h4 class="text-secondary f5">{{ sanitizeString(efecto.title) }}</h4>
                <div class="wrapper-radio-flex">
                    <FormulateInput :name="`${efecto.title}RequisitoLegal`" :options="{ si: 'Si', no: 'No'}" type="radio" label="Es requisito legal" value="si" />
                </div>
                <FormulateInput :value="1" :name="`${efecto.title}Consecuencia`" type="number" min="1" max="6" label="Consecuencia" />
                <FormulateInput :name="`${efecto.title}Descripcion`" type="textarea" label="Descripción" :value="sanitizeString( efecto.descripcion )" />
            </div>
        </div>
        <div class="input-agregar ">
            <FormulateInput type="submit" label="siguiente efecto" @click="siguiente" />
        </div>
        <code class="code code--block">{{ efectosYOcurrenciaAsObject }}</code>
    </FormulateForm>

    <FormulateForm  name="controlesData" @submit.prevent v-model="controlesData">
        <h3 class="text-secondary fs-4">Controles</h3>

        <div class="controles">
            <div class="existente" v-if="!!controlesExistentes.length">
                <h4 class="text-secondary fs-5">Existentes</h4>
                <FormulateInput v-for="existente in controlesExistentes" :key="existente.title" :name="`${existente.tipo}${existente.title}`" type="textarea" :label="existente.title" :value="sanitizeString( existente.descripcion )" />
            </div>
            <div class="recomendados" v-if="!!controlesRecomendados.length">
                <h4 class="text-secondary fs-5">Recomendados</h4>
                <FormulateInput v-for="recomendado in controlesRecomendados" :key="recomendado.title" :name="`${recomendado.tipo}${recomendado.title}`" type="textarea" :label="recomendado.title" :value="sanitizeString( recomendado.descripcion )" />
            </div>
            <div class="controlNuevo">
                <h4 class="text-secondary fs-5">Nuevo</h4>
                <FormulateForm v-model="nuevoControl" name="nuevoControl">
                    
                    <div class="controles-inputs-options">
                        <FormulateInput name="title" lable="title" type="select" :options="{ eliminacion:'Eliminacion', sustitucion:'Sustitucion', 'control de ingenieria':'Control de ingenieria', 'control en el medio':'Control en el medio', individuo:'Individuo',}" label="controles"/>
                        <FormulateInput name="tipo" type="select" :options="{existentes: 'Existente', recomendados: 'Recomendado'}" label="Tipo de control" />
                    </div>
                    <FormulateInput name="descripcion" :value="''" type="textarea" label="Descripcion" />
                    
                    <div class="input-agregar ">
                        <FormulateInput type="submit" label="Agregar control" @click="agregarCnotrol" />
                    </div>
                </FormulateForm>
                <!-- <code class="code code--block primary">{{ nuevoControl }}</code> -->
            </div>

        </div>

        <!-- <code class="code code--block">{{ controlesData }}</code> -->

    </FormulateForm>

</article>
</template>

<script>

import {
    mapGetters
} from 'vuex';


export default {
    name: 'AboutTipoPeligro',
    props: {
        peligroName: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            efectosYOcurrenciaAsObject: {},
            controlesData: {},
            nuevoControl: {},
            peligro: null
        }
    },
    mounted(){
        this.initData()
        // console.log(this.peligro);
    },
    // watch: {
    //     efectosYOcurrenciaAsObject(newValue) {
    //         console.log( newValue);
    //     }
    // },
    computed: {

        efectosYOcurrencia() {
            return this.peligro.efectosYOcurrencia
        },
        controles() {
            return this.peligro.controles
        },
        controlesExistentes() {
            return this.controles.filter(control => control.descripcion != 'no existe' && control.descripcion && control.tipo == 'existentes')
        },
        controlesRecomendados() {
            return this.controles.filter(control => control.descripcion != 'no existe' && control.descripcion && control.tipo == 'recomendados')

        },
        ...mapGetters(['sanitizeString'])
    },
    methods: {
        initData(){
            this.peligro = this.$store.state.forms.data.find( item => item.title == this.peligroName);
        },
        agregarCnotrol() {
            // const index = this.controles.findIndex( control => {
            //     return control.title.toLowerCase() == this.nuevoControl.title.toLowerCase()
            //     && control.tipo.toLowerCase() == this.nuevoControl.tipo.toLowerCase()
            // })
            // this.controles.splice( index, 1, this.nuevoControl)
            // : this.nuevoControl.descripcion )

            let nuevoControl = {}
            const name = `${this.recomendado.tipo}${this.recomendado.title}`
            nuevoControl[name] = this.nuevoControl.descripcion
            Object.assign({}, this.controlesData, {})
        },
        siguiente() {
            let data = []
            for( let subObj of this.peligro.efectosYOcurrencia ){
                let subData = {}
 
                for( let key of Object.keys( subObj ) ) {
                    if( key == 'title') {
                        subData[key] = subObj[key]
                        continue
                    }
                    const keyAsObject = subObj.title+key.substring(0,1).toUpperCase()+key.substring(1,key.length)
                    subData[keyAsObject] = this.efectosYOcurrenciaAsObject[keyAsObject] 
                    
                }
                data.push( subData )
            }
            
            let updatePeligro = {
                peligroName: this.peligroName,
                data: data,
                title: 'efectosYOcurrencia'
            }

            this.$store.dispatch('updateData', updatePeligro )

            // this.$store.state.forms.data[0].efectosYOcurrencia = data
            // console.log(this.$store.state.forms.data[0]);

        }
    },

}
</script>

<style scoped>
.info > div {
    margin: .5rem 0 ;
}
.info p {
    margin: 0;
}
.peligro {
    margin: 1rem 0;
    /* background-color: blue; */
}
.controles :deep(.la-input) {
    margin: .5rem 0 .25rem;
}

.peligro :deep(.in-input){
    padding: .2rem .5rem;
}
.controles :deep(.in-input),
.efecto :deep(.in-input){
    width: 100%;
}



.wrapper-radio-flex :deep(.formulate-input-wrapper){
    display: flex;
}
.wrapper-radio-flex :deep(.el-input){
    display: flex;
}
.wrapper-radio-flex :deep(.formulate-input-wrapper .formulate-input-wrapper){
    margin: 0 5px;
}
.wrapper-radio-flex :deep(.in-input){
    padding: 0;
}



.info {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 1rem 2rem;
    margin: 1rem 0;
}

.efecto {
    display: flex;
    margin: 1rem 0;
}

.controles {
    padding: 0 1rem;
}
.efecto-inter-nav {
    min-width: 1rem;
}

.efecto-body {
    border-left: rgba(0, 0, 0, .3) solid .5px;
    padding: .5rem;
    display: grid;
    column-gap: 1rem;
    width: 98%;
    grid-template-columns: 20% 80%;
}
.controles{
    width: 100%;
}

.input-agregar :deep(.in-input){
    width: inherit;
    padding: .25rem .5rem;
    background-color: #0d6efd;
    color: #fff;
    border: solid 1px #000;
    border-radius: 5px;
}

.controles-inputs-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
}

@media screen and ( max-width: 768px ){
    .efecto-body {
        grid-template-columns: 1fr;
    }
}
</style>
