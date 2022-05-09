<template>
<!-- Page Wrapper -->
  <div id="wrapper">

      <template v-if="isLoggedIn">
      <!-- Sidebar -->
      <!-- <div v-if="isLoggedIn"> -->
      <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div class="sidebar-brand-icon">
                <img class="fas" src="/src/assets/customcss/img/logo-hsu.png" width="30"/>
            </div>
            <div class="sidebar-brand-text mx-3">SIAP HSU<sup>vBETA</sup></div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0">

        <!-- Nav Item - Dashboard -->
        <li class="nav-item">
            <a class="nav-link" href="index.html">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Beranda</span></a>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            Menu
        </div>

        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                aria-expanded="true" aria-controls="collapseTwo">
                <i class="fas fa-fw fa-cog"></i>
                <span>Data Presensi</span>
            </a>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Pilih:</h6>
                    <router-link :to="{name:'presensi.presensi'}" style="text-decoration: none;">
                        <a class="collapse-item" href="buttons.html">Presensi</a>
                    </router-link>
                </div>
            </div>
        </li>

        <!-- Nav Item - Utilities Collapse Menu -->
        <li class="nav-item">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                aria-expanded="true" aria-controls="collapseUtilities">
                <i class="fas fa-fw fa-wrench"></i>
                <span>Pengaturan</span>
            </a>
            <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Pilih:</h6>
                    <router-link :to="{name:'pengaturan.akunadmin'}" style="text-decoration: none;">
                    <a class="collapse-item" href="utilities-color.html">Akun Admin</a>
                    </router-link>
                    <router-link :to="{name:'pengaturan.jamkerja'}" style="text-decoration: none;">
                    <a class="collapse-item" href="utilities-animation.html">Jam Kerja</a>
                    </router-link>
                    <router-link :to="{name:'pengaturan.titikkoordinat'}" style="text-decoration: none;">
                    <a class="collapse-item" href="utilities-other.html">Titik Koordinat</a>
                    </router-link>
                </div>
            </div>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>

      </ul>
      <!-- </div> -->
      <!-- End of Sidebar -->
      </template>

      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">

          <!-- Main Content -->
          <div id="content">

              <template v-if="isLoggedIn">
              <!-- Topbar -->
              <!-- <div v-if="isLoggedIn"> -->
              <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                <!-- Sidebar Toggle (Topbar) -->
                <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                    <i class="fa fa-bars"></i>
                </button>

                <!-- Topbar Navbar -->
                <ul class="navbar-nav ml-auto">

                    <div class="topbar-divider d-none d-sm-block"></div>

                    <!-- Nav Item - User Information -->
                    <li class="nav-item dropdown no-arrow">
                        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="mr-2 d-none d-lg-inline text-gray-600 small">
                                Super {{ user.name }}
                            </span>
                            <img class="img-profile rounded-circle"
                                src="/src/assets/customcss/bootstrap/img/undraw_profile.svg">
                        </a>
                        <!-- Dropdown - User Information -->
                        <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown">
                            <a class="dropdown-item" href="#">
                                <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                Profile
                            </a>
                            <a class="dropdown-item" href="#">
                                <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                Settings
                            </a>
                            <a class="dropdown-item" href="#">
                                <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                Activity Log
                            </a>
                            <template v-if="isLoggedIn">
                            <div class="dropdown-divider"></div>
                            <a @click.prevent="logout" class="dropdown-item" href="#">
                                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Logout
                            </a>
                            </template>
                        </div>
                    </li>

                </ul>

              </nav>
              <!-- </div> -->
              <!-- End of Topbar -->
              </template>

              <!-- Begin Page Content -->
              <div class="container-fluid">

                  <!-- Page VUE JS -->
                  <router-view @setData="getData"></router-view>

              </div>
              <!-- /.container-fluid -->

          </div>
          <!-- End of Main Content -->

          <!-- Footer -->
          <footer class="sticky-footer bg-white">
            <div class="container my-auto">
                <div class="copyright text-center my-auto">
                    <span>Copyright 2022&copy; Dinas Komunikasi, Informatika dan Persandian Kabupaten Hulu Sungai Utara</span>
                </div>
            </div>
          </footer>
          <!-- End of Footer -->

      </div>
      <!-- End of Content Wrapper -->

  </div>
  <!-- End of Page Wrapper -->
  
</template>

<script>

export default {
    emits: ['setData'],
    data(){
        return { 
         user: null,
         isLoggedIn: null, 
        }
    },
    beforeMount() {
      this.getData()   
    }, 
    methods : {  
      getData(){  
          this.isLoggedIn = localStorage.getItem('jwt') !== null; 
          this.user = JSON.parse(localStorage.getItem('user')) 
      },
      logout(){
          localStorage.removeItem('jwt')
          localStorage.removeItem('user')
          this.getData()
          this.$router.push({
                        name:'login.loginweb'

                });
      }
    }
  }
</script>
