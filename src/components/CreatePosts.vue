<template>
	<vali-date-form @formSubmit="onSubmitForm">
		<div class="mb-3">
			<label for="validationServer03" class="form-label">标题</label>
			<emit-input
				v-model="titleValue"
				placeholder="请输入标题"
				type="text"
				ref="inputRef"
				tag="input"
			></emit-input>
		</div>
		<div class="mb-3">
			<label for="validationServer03" class="form-label">文章内容</label>
			<emit-input
				v-model="contentValue"
				placeholder="请输入"
				type="text"
				tag="testarea"
				rows="10"
			></emit-input>
		</div>

		<template #submit>
			<button class="btn btn-danger">提交表单</button>
		</template>
	</vali-date-form>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { GlobalData } from "../store/index";
import { PostProps } from "../testData";
import valiDateForm from "@/components/valiDateForm.vue";
import emitInput from "@/components/emitValue.vue";
// import dayjs, { Dayjs } from "dayjs";
export default defineComponent({
	components: {
		valiDateForm,
		emitInput,
	},
	setup() {
		const dateFormat = "YYYY/MM/DD";
		const titleValue = ref("");
		const contentValue = ref("");
		const router = useRouter(); //路由跳转
		const store = useStore<GlobalData>();
		const onSubmitForm = (val: string) => {
			if (val) {
				const { id } = store.state.users;
				if (id) {
					const newPosts: PostProps = {
						id: new Date().getTime(),
						title: titleValue.value,
						content: contentValue.value,
						columnId: id,
						createdAt: new Date().toLocaleString(),
					};
					store.commit("createPosts", newPosts);
					router.push({
						path: "/columnDetail",
						query: { id },
					});
				}

				// store.commit("login");
			}
		};
		return {
			titleValue,
			contentValue,
			onSubmitForm,
		};
	},
});
</script>
