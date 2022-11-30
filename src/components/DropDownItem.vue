<template>
	<li :class="{ isDisabled: disabled }"><slot></slot></li>
</template>

<script lang="ts">
import { defineProps, defineComponent } from "vue";
export default defineComponent({
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	// setup() {},
});
</script>
<style scoped>
.isDisabled {
	background-color: #6a6a6a;
	pointer-events: none;
}
</style>
