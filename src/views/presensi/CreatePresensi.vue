<template>
<div class="row">

    <div class="col-lg-12">

        <!-- Circle Buttons -->
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Tambah Presensi</h6>
            </div>
            <div class="card-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus egestas fringilla dolor, a imperdiet ipsum consectetur sit amet.</p>
                <form @submit.prevent="store()">
                <div class="form-row">
                <div class="col-md-6">
                    <label for="inputNIK">NIK</label>
                    <input type="text" class="form-control" id="inputNIK" placeholder="84739..." v-model="presensi.nik">
                    <div v-if="validation.nik" class="text-danger">
                        {{ validation.nik[0] }}
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="inputNama">Nama</label>
                    <input type="text" class="form-control" id="inputNama" placeholder="Nama Lengkap" v-model="presensi.nama">
                    <div v-if="validation.nama" class="text-danger">
                        {{ validation.nama[0] }}
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="inputTanggal">Tanggal</label>
                    <input type="text" class="form-control" id="inputNama" placeholder="TTTT-BB-HH" v-model="presensi.tanggal">
                    <div v-if="validation.tanggal" class="text-danger">
                        {{ validation.tanggal[0] }}
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="inputJamMasuk">Jam Masuk</label>
                    <input type="text" class="form-control" id="inputJamMasuk" placeholder="JJ:MM:DD" v-model="presensi.jam_masuk">
                    <div v-if="validation.jam_keluar" class="text-danger">
                        {{ validation.jam_keluar[0] }}
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="inputJamKeluar">Jam Keluar</label>
                    <input type="text" class="form-control" id="inputJamKeluar" placeholder="JJ:MM:DD" v-model="presensi.jam_keluar">
                    <div v-if="validation.lokasi" class="text-danger">
                        {{ validation.lokasi[0] }}
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="inputJamLokasi">Latitude</label>
                    <input type="text" class="form-control" id="inputLokasi" placeholder="..." v-model="presensi.latitude">
                    <div v-if="validation.latitude" class="text-danger">
                        {{ validation.latitude[0] }}
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="inputJamLokasi">Longitude</label>
                    <input type="text" class="form-control" id="inputLokasi" placeholder="..." v-model="presensi.longitude">
                    <div v-if="validation.longitude" class="text-danger">
                        {{ validation.longitude[0] }}
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
        const presensi = reactive({
            nik: '',
            nama: '',
            tanggal: '',
            jam_masuk: '',
            jam_keluar: '',
            latitude: '',
            longitude: ''
        });

        const validation=ref([]);

        const router=useRouter();
    
        function store(){
            axios.post(
                'http://127.0.0.1:8000/api/presensi',
                presensi
            )
            .then(()=> {
                router.push({
                    name:'presensi.presensi'
                });
            }).catch((err)=> {
                validation.value = err.response.data
            });
        }

        return {
            presensi,
            validation,
            router,
            store
        }
    }
}
</script>
