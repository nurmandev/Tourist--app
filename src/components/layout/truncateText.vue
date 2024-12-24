<template>
    <div>
      <p>
        {{ isTruncated ? truncatedText : text }}
        
      </p>
      <span
          v-if="isTruncatable"
          @click="toggleTruncate"
          class="cursor-pointer mt-2 flex items-end justify-end text-right text-primary font-medium"
        >
          {{ isTruncated ? 'View More' : 'Show Less' }}
        </span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      text: {
        type: String,
        required: true,
      },
      maxLength: {
        type: Number,
        default: 100,
      },
    },
    data() {
      return {
        isTruncated: true,
      };
    },
    computed: {
      isTruncatable() {
        return this.text.length > this.maxLength;
      },
      truncatedText() {
        return this.text.substring(0, this.maxLength) + "...";
      },
    },
    methods: {
      toggleTruncate() {
        this.isTruncated = !this.isTruncated;
      },
    },
  };
  </script>
  