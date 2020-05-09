<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
};
</script>

<style scoped>
#tab-bar {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #f6f6f6;
  display: flex;
  box-shadow: 0 -2px 1px rgba(100, 100, 100, 0.1);
}
</style>