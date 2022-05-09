<template>
    
    <h3>Ini adalah Halaman Jam Kerja</h3>
    <template v-if="!isLoggedIn">anda login</template>

</template>

<script>
export default {
    emits: ['setData'],
}
</script>
