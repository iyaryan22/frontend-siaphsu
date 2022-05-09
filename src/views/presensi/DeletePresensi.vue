<template>
<div class="row">

    <div class="col-lg-12">

        <!-- Circle Buttons -->
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Edit Presensi</h6>
            </div>
            <div class="card-body">
                <p>Apakah anda yakin ingin mengahpus? {{ presensi.nama }} dengan NIK {{ presensi.nik }} </p>
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
        let presensi = reactive({
            nik: '',
            nama: '',
            tanggal: '',
            jam_masuk: '',
            jam_keluar: '',
            lokasi: '',
        });

        const validation=ref([]);

        const router=useRouter();
        const route=useRoute();

        onMounted(()=> {
            axios.get(`http://127.0.0.1:8000/api/presensi/${route.params.id}`)
            .then((result) => {
                presensi.nik = result.data.data.nik
                presensi.nama = result.data.data.nama
                presensi.tanggal = result.data.data.tanggal
                presensi.jam_masuk = result.data.data.jam_masuk
                presensi.jam_keluar = result.data.data.jam_keluar
                presensi.lokasi = result.data.data.lokasi
            }).catch((err) => {
                console.log(err.response.data)
            });
        });
    
        function destroy(){
            axios.delete(
                `http://127.0.0.1:8000/api/presensi/${route.params.id}`,
                presensi
            )
            .then(()=> {
                router.push({
                    name:'presensi.presensi'
                });
            }).catch((err)=> {
                console.log = err.response.data
            });
        }

        return {
            presensi,
            console,
            router,
            destroy
        }
    }
}
</script>
