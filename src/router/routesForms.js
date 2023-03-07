//Forms 
const FormsPeligrosYRiesgos = () => import('@/components/forms/FormsPeligrosYRiesgos.vue')
const FormsList = () => import('@/views/forms/FormsList.vue')

const formRotes = [
    {
        path: '/forms',
        name: 'forms',
        
        component: FormsList,
    },
    {
        path: '/forms/formPeligrosYRiesgos',
        redirect: '/forms/formPeligrosYRiesgos/Mecanico',
        name: 'formPeligrosYRiesgos',
        component: FormsPeligrosYRiesgos,
        children:[{
            path: ':peligroName',
            name: 'peligro.show',
            component: () => import('@/components/forms/AboutTipoPeligro.vue'),
            props: true
        }]
    }
]

export default formRotes;