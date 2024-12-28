<template>
    <router-link  to="">
        <span @click="$router.go(-1)" class=" w-[40px] h-10  flex items-center justify-center bg-white  rounded-lg "><ArrowLeft /> </span>
    </router-link>
    </template>

<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next';
</script>
