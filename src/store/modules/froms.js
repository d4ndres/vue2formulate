
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
        }
    },
    actions: {
        setData( {commit}, data ){
            commit('setData', data)
        }       
    }
};