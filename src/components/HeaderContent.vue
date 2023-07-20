<template>
  <div class="header">
    <div class="header-icon">
      <slot name="icon"> </slot>
    </div>
    <div class="header-title">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script setup name="dashboard"></script>

<style scoped>
.header {
  background-color: #fff;
  display: flex;
  align-items: center;
  color: #8d8e91;
  font-size: 24px;

  .header-icon {
    margin-right: 10px;
    margin-top: 8px;
  }

  .header-title {
  }
}
</style>
