<template>
    <MainLayout #main>
        <NoteList @notesList="notes"></NoteList>
    </MainLayout>
</template>

<script setup>
import MainLayout from '../layouts/MainLayout.vue';
import NoteList from './notes/NoteList.vue'

</script>

<style scoped lang="scss"></style>
