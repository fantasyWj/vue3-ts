<template>
	<div class="dropdown" ref="dropDownRef">
		<a
			class="btn btn-secondary dropdown-toggle"
			href="#"
			@click.prevent="toogleMenu"
		>
			{{ title }}
		</a>
		<ul class="dropdown-menu" :style="{ display: 'block' }" v-if="showMenu">
			<slot></slot>
		</ul>
	</div>
</template>
<!-- vetur -->
<!-- volar -->
<script lang="ts">
import { ref, watch, defineComponent } from "vue";
import useDropDown from "../hooks/useDropDown";
export default defineComponent({
	props: {
		title: {
			type: String,
			required: true,
		},
	},
	setup() {
		const showMenu = ref(false);
		const toogleMenu = () => {
			showMenu.value = !showMenu.value;
		};
		const dropDownRef = ref<HTMLElement | null>(null);
		// 点击外部隐藏dropdown
		const isDropDown = useDropDown(dropDownRef);
		watch(isDropDown, () => {
			if (isDropDown.value && showMenu.value) {
				showMenu.value = false;
			}
		});
		return {
			showMenu,
			toogleMenu,
			isDropDown,
			dropDownRef,
		};
	},
});
</script>
