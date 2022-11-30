<template>
	<nav class="navbar navbar-dark bg-primary mb-4 px-4">
		<router-link class="navbar-brand" to="/">者也专栏</router-link>
		<ul v-if="!userMsg.isLogin" class="list-inline mb-0">
			<li class="list-inline-item">
				<router-link to="/login" class="btn btn-outline-light my-2"
					>登陆</router-link
				>
			</li>
			<li class="list-inline-item">
				<router-link to="/signup" class="btn btn-outline-light my-2"
					>注册</router-link
				>
			</li>
		</ul>
		<ul class="list-inline mb-0" v-else>
			<li class="list-inline-item">
				<drop-down :title="`你好，${userMsg.name}`">
					<drop-down-item @click="createNewPosts">新增内容</drop-down-item>
					<drop-down-item :disabled="true">编辑内容</drop-down-item>
					<drop-down-item>退出登录</drop-down-item>
				</drop-down>
			</li>
		</ul>
	</nav>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";
import DropDown from "./DropDown.vue";
import DropDownItem from "./DropDownItem.vue";
export interface userType {
	isLogin: boolean;
	name?: string;
	id?: number;
}
export default defineComponent({
	props: {
		userMsg: {
			type: Object as PropType<userType>,
			required: true,
		},
	},
	components: {
		DropDown,
		DropDownItem,
	},
	setup() {
		const router = useRouter();
		const createNewPosts = () => {
			router.push({
				path: "/createPosts",
				// query: {
				// 	id: 1,
				// },
			});
		};
		return {
			createNewPosts,
		};
	},
});
</script>
<style lang="" scoped></style>
