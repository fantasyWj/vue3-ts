<template>
	<div class="home">
		<global-header :userMsg="userHeader"></global-header>
		<router-view />
		<footer>
			<ui>
				<li>底部</li>
			</ui>
		</footer>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import GlobalHeader from "@/components/GolbalHeader.vue"; //顶部
import { useStore } from "vuex";
import { GlobalData } from "../store/index";
export default defineComponent({
	name: "Home",
	components: {
		GlobalHeader,
	},
	setup() {
		const store = useStore<GlobalData>();
		const userHeader = computed(() => store.state.users);
		return {
			userHeader,
		};
	},
});
</script>
