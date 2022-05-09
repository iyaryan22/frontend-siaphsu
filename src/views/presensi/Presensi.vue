<template>
  <router-link to="CreatePresensi"
    class="btn btn-primary btn-sm rounded shadow mb-3"
    >Tambah</router-link>
  <div class="between:flex bottom:margin-3">
    <div class="center:flex-items">
      <span class="right:margin-1">Show</span>
      <select v-model="currentEntries" class="select" @change="paginateEntries">
        <option v-for="se in showEntries" :key="se" :value="se">{{ se }}</option>
      </select> 
      <span class="left:margin-1">entries</span>
    </div>
    <div class="end:flex">
      <input type="search" class="input px:width-25" placeholder="Search here..." v-model="searchInput" @keyup="searchEvent">
    </div>
  </div>

  <table class="table table:border secondary-5:border">
    <thead>
      <tr>
        <th v-for="th in tableHeader" :key="th">
          <div class="between:flex center:items">
            <span>{{ th.text }}</span>
            <span @click.prevent="sortByColumn(th.name)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter none:event" viewBox="0 0 16 16">
                <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </span>
          </div>
        </th>
      </tr>
      <tr>
        <td>#</td>
        <td><input type="search" class="input" placeholder="Filter NIK" v-model="col.nik" @keyup="filterByColumn"></td>
        <td><input type="search" class="input" placeholder="Filter Umur" v-model="col.nama" @keyup="filterByColumn"></td>
        <td><input type="search" class="input" placeholder="Filter Tanggal" v-model="col.tanggal" @keyup="filterByColumn"></td>
        <td><input type="search" class="input" placeholder="Filter Jam Masuk" v-model="col.jam_masuk" @keyup="filterByColumn"></td>
        <td><input type="search" class="input" placeholder="Filter Jam Keluar" v-model="col.jam_keluar" @keyup="filterByColumn"></td>
        <td><input type="search" class="input" placeholder="Filter Latitude" v-model="col.latitude" @keyup="filterByColumn"></td>
        <td><input type="search" class="input" placeholder="Filter Longitude" v-model="col.longitude" @keyup="filterByColumn"></td>
        <td>#</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(td, index) in tableData" :key="td">
        <td>{{ index+1 }}</td>
        <td>{{ td.nik }}</td>
        <td>{{ td.nama }}</td>
        <td>{{ td.tanggal }}</td>
        <td>{{ td.jam_masuk }}</td>
        <td>{{ td.jam_keluar }}</td>
        <td>{{ td.latitude }}</td>
        <td>{{ td.longitude }}</td>
        <td>
          <div class="btn-group">
            <router-link :to="{name:'presensi.editpresensi', params:{id: td.id}}" class="btn btn-sm btn-outline-info">Edit</router-link>
            <router-link :to="{name:'presensi.deletepresensi', params:{id: td.id}}" class="btn btn-sm btn-outline-danger">Delete</router-link>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  
  <div class="between:flex y:margin-3">
    <div class="start:flex-items">Show {{ showInfo.from }} to {{ showInfo.to }} of {{ showInfo.of }} entries</div>
    <div class="end:flex center:items">
      <ul class="pagination:nav">
        <li :class="['nav-item', { 'disabled': currentPage === 1 }]">
          <a href="#" class="nav-link" @click.prevent="currentPage = 1, paginateEntries()">First</a>
        </li>
        <li :class="['nav-item', { 'disabled': currentPage === 1 }]">
          <a href="#" class="nav-link" @click.prevent="(currentPage < 1) ? currentPage = 1 : currentPage -= 1, paginateEntries()">Prev</a>
        </li>
        <li v-for="pagi in showPagination" :key="pagi" :class="['nav-item', {'ellipsis': pagi === '...', 'active': pagi === currentPage}]">
          <a href="#" class="nav-link" @click.prevent="paginateEvent(pagi)">{{ pagi }}</a>
        </li>
        <li :class="['nav-item', { 'disabled': currentPage === allPages }]">
          <a href="#" class="nav-link" @click.prevent="(currentPage > allPages) ? currentPage = allPages : currentPage += 1, paginateEntries()">Next</a>
        </li>
        <li :class="['nav-item', { 'disabled': currentPage === allPages }]">
          <a href="#" class="nav-link" @click.prevent="currentPage = allPages, paginateEntries()">Last</a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import { $array, $object } from '../../assets/alga.min.js'
import axios from 'axios'
import { onMounted, ref } from 'vue'
export default {
  emits: ['setData'],
  name: 'DataTable',
  data() {
    return {
      columns: [
        { name: 'no', text: 'NO'},
        { name: 'nik', text: 'NIK'},
        { name: 'nama', text: 'Nama'},
        { name: 'tanggal', text: 'Tanggal'},
        { name: 'jam_masuk', text: 'Jam Masuk'},
        { name: 'jam_keluar', text: 'Jam Keluar'},
        { name: 'latitude', text: 'Latitude'},
        { name: 'longitude', text: 'Longitude'},
        { name: 'action', text: 'Action'},
      ],
      entries: [],
      showEntries: [5, 10, 15, 25, 50, 75, 100],
      currentEntries: 10,
      filteredEntries: [],
      currentPage: 1,
      allPages: 1,
      searchInput: '',
      searchEntries: [],
      col: {
            nik: '',
            nama: '',
            tanggal: '',
            jam_masuk: '',
            jam_keluar: '',
            latitude: '',
            longitude: ''
      },
      sortcol: {
            nik: '',
            nama: '',
            tanggal: '',
            jam_masuk: '',
            jam_keluar: '',
            latitude: '',
            longitude: ''
      }
    }
  },
  computed: {
    showInfo() {
      return $array.show(this.getCurrentEntries())(this.currentPage, this.currentEntries)
    },
    showPagination() {
      return $array.pagination(this.allPages, this.currentPage, 3)
    },
    tableHeader() {
      return this.columns
    },
    tableData() {
      return this.filteredEntries
    }
  },
  created() {
    this.getAllEmployees().then(res => {
      this.entries = res.data
      this.paginateData(this.entries)
      //this.filteredEntries = $array.paginate(this.entries)(this.currentPage, this.currentEntries)
      //this.allPages = $array.pages(this.entries, this.currentEntries)
    })
  },
  methods: {
    async getAllEmployees() {
      const response = await fetch('http://127.0.0.1:8000/api/presensi')
      return response.json()
    },
    paginateEntries() {
      if(this.searchInput.length >= 3) {
        this.searchEntries = $array.search(this.searchInput)(this.entries)
        this.paginateData(this.searchEntries)
        //this.filteredEntries = $array.paginate(this.searchEntries)(this.currentPage, this.currentEntries)
        //this.allPages = $array.pages(this.searchEntries, this.currentEntries)
      } else {
        this.searchEntries = []
        this.paginateData(this.entries)
        this.col = {
            nik: '',
            nama: '',
            tanggal: '',
            jam_masuk: '',
            latitude: '',
            longitude: ''
        }
        //this.filteredEntries = $array.paginate(this.entries)(this.currentPage, this.currentEntries)
        //this.allPages = $array.pages(this.entries, this.currentEntries)
      }
    },
    paginateEvent(page) {
      this.currentPage = page
      this.paginateEntries()
    },
    searchEvent() {
      this.currentPage = 1
      this.paginateEntries()
    },
    paginateData(data) {
      this.filteredEntries = $array.paginate(data)(this.currentPage, this.currentEntries)
      this.allPages = $array.pages(data, this.currentEntries)
    },
    getCurrentEntries() {
      return (this.searchEntries.length <= 0) ? this.entries : this.searchEntries
    },
    uniqColumnData(column) {
      return $array.unique(this.getCurrentEntries(), column)
    },
    filterByColumn() {
      const filterCol = $object.removeBy('')(this.col)
      let filterData = this.getCurrentEntries()
      if(Object.entries(filterCol).length >= 1) {
        filterData = $array.filtered(...Object.values(filterCol))(this.getCurrentEntries(), Object.keys(filterCol))
      }
      this.paginateData(filterData)
    },
    sortByColumn(column) {
      this.col = {
            nik: '',
            nama: '',
            tanggal: '',
            jam_masuk: '',
            jam_keluar: '',
            latitude: '',
            longitude: ''
      }
      let sortedEntries = this.getCurrentEntries()
      const sortedColumn = this.sortcol[column]
      if(sortedColumn === '') {
        this.sortcol[column] = 'asc'
        sortedEntries = $array.sorted(this.getCurrentEntries())(column, 'asc')
      } else if(sortedColumn === 'asc') {
        this.sortcol[column] = 'desc'
        sortedEntries = $array.sorted(this.getCurrentEntries())(column, 'desc')
      } else if(sortedColumn === 'desc') {
        this.sortcol[column] = ''
      }
      this.paginateData(sortedEntries)
    }
  }
  
}
</script>