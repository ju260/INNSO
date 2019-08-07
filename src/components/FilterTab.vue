<template>
  <div>
    <span>search: </span>
    <input type="search" @input="debounceInput" />
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "FilterTab",
  methods: {
    debounceInput: _.debounce(function(e) {
      this.value = e.target.value;
      this.$emit("inputSearch", { value: this.value });
    }, 500)
  }
};
</script>
