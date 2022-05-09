<template>
<div class="row">

    <div class="col-lg-12">

        <!-- Circle Buttons -->
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Edit Presensi</h6>
            </div>
            <div class="card-body">
                <p>Apakah anda yakin ingin mengahpus {{ akunadmin.name }} dengan NIK {{ akunadmin.email }} </p>
                <form @submit.prevent="destroy()">
                
                <button class="btn btn-outline-danger">Hapus</button>
                </form>
            </div>
        </div>

    </div>

</div>
</template>

<script>
// import Datepicker from 'vue3-datepicker'
import {reactive, ref, onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import axios from 'axios'

export default {
    // components: {
    // Datepicker
    // },
    // data() {
    // return {
    //     picked: new Date()
    // }
    // },

    setup(){
        //data binding
        let akunadmin = reactive({
            name: '',
            email: '',
            password: '',
        });

        const validation=ref([]);

        const router=useRouter();
        const route=useRoute();

        onMounted(()=> {
            axios.get(`http://127.0.0.1:8000/api/user/${route.params.id}`)
            .then((result) => {
                akunadmin.name = result.data.data.name
                akunadmin.email = result.data.data.email
                akunadmin.password = result.data.data.password
            }).catch((err) => {
                console.log(err.response.data)
            });
        });
    
        function destroy(){
            axios.delete(
                `http://127.0.0.1:8000/api/user/${route.params.id}`,
                akunadmin
            )
            .then(()=> {
                router.push({
                    name:'pengaturan.akunadmin'
                });
            }).catch((err)=> {
                console.log = err.response.data
            });
        }

        return {
            akunadmin,
            console,
            router,
            destroy
        }
    }
}
</script>
