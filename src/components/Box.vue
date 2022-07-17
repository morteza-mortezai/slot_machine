<script setup lang="ts">
defineProps<{
  choice: string
}>()

</script>

<template>
  <!-- based on recieved props show a svg pic -->
  <div class="box">
    <img src="@/assets/images/cherry-svgrepo-com.svg" alt="" srcset="" v-if="choice == 'c'" width="50" height="50">
    <img src="@/assets/images/lemon-svgrepo-com.svg" alt="" srcset="" v-if="choice == 'l'" width="50" height="50">
    <img src="@/assets/images/orange-svgrepo-com.svg" alt="" srcset="" v-if="choice == 'o'" width="50" height="50">
    <img src="@/assets/images/watermelon-svgrepo-com.svg" alt="" srcset="" v-if="choice == 'w'" width="50" height="50">
    <img src="@/assets/images/big-x-svgrepo-com.svg" alt="" srcset="" v-if="choice == 'x'" width="50" height="50">

  </div>
</template>
<style scoped >
.box {
  border: 1px solid black;
  display: inline-block;
  text-align: center;
  padding: 5px;
  border-radius: 3px;
  margin: 2px;
}
</style>
