<template>
    <div class="container">

        <h1 class="text-primary fs-2">Identificacion de peligros y valoracion de riesgos</h1>
        <!-- <code class="code code--block">{{ formData }}</code> -->
        <FormulateForm name="formPeligrosYRiesgos" @submit.prevent v-model="formData" >
            <div class="area">
                <h2 class="text-primary fs-3">Area</h2>
                <article class="area__body">
                    <FormulateInput type="text" name="cargo" label="Cargo" />
                    
                    <div class="area__body-about">
                        <FormulateInput type="number" min="1" name="numeroTrabajadores" label="Numero de trabajadores" wrapper-class="wrapper-input"/>
                        <FormulateInput type="number" min="1" name="HorasAlDia" label="Horas al dia" />
                    </div>
                </article>
            </div>
    
            <section class="peligros">
                <h2 class="text-primary fs-3">Tipo de peligro</h2>
                <div class="router-links" >
                    <RouterLink
                    v-for="(peligro, index) in peligros"
                    :key="index"
                    :to="{name: 'peligro.show', params: {peligroTipo: peligro.title }}"
                    >

                    <button type="button" class="btn btn-outline-primary"
                    :class="{ 'active': peligroSelected == peligro.title}"
                    @click="peligroSelected = peligro.title"
                    >{{ peligro.title }}</button>

                    </RouterLink>
                </div>
                
                <RouterView />
                
            </section>

            <FormulateErrors />
            <div class="actions">
                <FormulateInput type="submit" label="enviar" />
            </div>
            
            
        </FormulateForm>

    </div>
</template>

  
<script>
import dataForm from "@/JsonData/peligrosRiesgos.json"
import { RouterLink, RouterView } from "vue-router"
import { mapState } from 'vuex'

export default {
    async mounted() {
        this.$store.state.forms.data = await dataForm;
    },
    data() {
        return {
            formData: {},
            searchCargo: "",
            cargos: ["Gerente", "Asesor comercial", "Auxiliar administrativo", "Administrador", "Logistica", "Guardas de seguridad", "Jefe servicio cliente", "Aux de cartera", "Operador vehiculo", "Asitente nomina"],
            peligroSelected: "Mecanico",
        };
    },
    methods: {
        assingCargo(cargo) {
            this.searchCargo = cargo;
        }
    },
    computed: {
        ...mapState({
            peligros: state => state.forms.data,
        }),
        cargosInSearch() {
            const cargos = this.cargos.map(cargo => cargo.toLowerCase());
            return cargos.filter(cargo => cargo.includes(this.searchCargo.toLowerCase()));
        }
    },
    components: { RouterView, RouterLink }
}
</script>

  
<style scoped>
body{
    background-color: rgb(145, 145, 145);
}
.router-links{
    margin: 1rem 0 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    flex-wrap: wrap;
}
.area, .peligros {
    padding: 1.5rem 0 .5rem;
}
.container {
    padding: 2rem 1rem;
    background-color: #fff;
}

.area__body-about{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
}

.area__body :deep(.in-input){
    padding: .2rem .5rem;
    width: 100%;
}
.area__body :deep(.la-input) {
    margin: .5rem 0 .25rem;
}


.in-input{
    width: 100%;
    border: none;
    font-size: 1.2rem;
    border: none;
    outline: none;
}
.el-input{
    background-color: #fff;
    border: solid .5px;
    border-radius: 5px;
    overflow: hidden;
    width: min(444px, 80vw);
    padding: .2rem .5rem;   
}
.la-input{
    font-size: 1.3rem;
}

.actions :deep(.in-input){
    width: inherit;
    padding: .25rem .5rem;
    background-color: #0d6efd;
    color: #fff;
    border: solid 1px #000;
    border-radius: 5px;
}

@media screen and ( max-width: 768px ){
    .area__body-about{
        grid-template-columns: 1fr;
    }
}

</style>
