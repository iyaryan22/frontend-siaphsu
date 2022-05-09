<template>
<div class="row">

    <div class="col-lg-12">

        <!-- Circle Buttons -->
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Tambah Admin</h6>
            </div>
            <div class="card-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus egestas fringilla dolor, a imperdiet ipsum consectetur sit amet.</p>
                <form @submit.prevent="store()">
                <div class="form-row">
                <div class="col-md-6">
                    <label for="inputName">Username</label>
                    <input type="text" class="form-control" id="inputname" placeholder="Username" v-model="akunadmin.name">
                    <div v-if="validation.name" class="text-danger">
                        {{ validation.name[0] }}
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="inputEmail">Email</label>
                    <input type="text" class="form-control" id="inputEmail" placeholder="Email" v-model="akunadmin.email">
                    <div v-if="validation.email" class="text-danger">
                        {{ validation.email[0] }}
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="inputPassword">Password</label>
                    <input type="text" class="form-control" id="inpuPassword" placeholder="Password" v-model="akunadmin.password">
                    <div v-if="validation.password" class="text-danger">
                        {{ validation.password[0] }}
                    </div>
                </div>
                </div>
                <br>
                <button class="btn btn-outline-primary">Submit</button>
                </form>
            </div>
        </div>

    </div>

</div>
</template>

<script>
// import Datepicker from 'vue3-datepicker'
import {reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
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
        const akunadmin = reactive({
            no: '',
            name: '',
            email: '',
            password: '',
        });

        const validation=ref([]);

        const router=useRouter();
    
        function store(){
            axios.post(
                'http://127.0.0.1:8000/api/user',
                akunadmin
            )
            .then(()=> {
                router.push({
                    name:'pengaturan.akunadmin'
                });
            }).catch((err)=> {
                validation.value = err.response.data
            });
        }

        return {
            akunadmin,
            validation,
            router,
            store
        }
    }
}
</script>
