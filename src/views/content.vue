<template>
	<div>
		
		<column-list :list="ColumnList"></column-list>
		<about></about>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import ColumnList from "@/components/ColumnList.vue"; //列表栏
import { useStore } from "vuex";
import { GlobalData } from "../store/index";
import About from "./About.vue";
export default defineComponent({
	name: "Home",
	components: {
		ColumnList,
		About,
	},
	setup() {
		const store = useStore<GlobalData>();
		const ColumnList = computed(() => store.state.column);
		

		return {
			ColumnList,
			About,
			
		};
	},
});
</script>
