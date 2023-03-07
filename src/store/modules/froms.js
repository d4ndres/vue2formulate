import peligrosRiesgos from '@/JsonData/peligrosRiesgos.json'

export default {
    state: {
        data: null,
    },
    getters: {
        sanitizeString(){
            return text => {
                const t = text.toLowerCase()
                return t.substring(0,1).toUpperCase()+t.substring(1,t.length)
            }
        },
        getData(state){
            return state.data
        }
    },
    mutations: {
        setData( state, data ){
            state.data = data
        },
        updateData( state, { data, index}){

            state.data[index]['efectosYOcurrencia'] = data
        }
    },
    actions: {
        setData( {commit} ){
            commit('setData', peligrosRiesgos)
        },
        updateData( { state, commit }, peligro ){
            peligro['index'] = state.data.findIndex( item => item.title == peligro.peligroName )
            commit('updateData', peligro)
        }

    }
};