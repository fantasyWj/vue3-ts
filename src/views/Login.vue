<template>
	<vali-date-form @formSubmit="onSubmitForm">
		<div class="mb-3">
			<label for="validationServer03" class="form-label">邮箱地址</label>
			<emit-input
				:rules="emailRules"
				v-model="modelValueEmail"
				placeholder="请输入邮箱"
				type="text"
				ref="inputRef"
				tag="input"
			></emit-input>
		</div>
		<div class="mb-3">
			<label for="validationServer03" class="form-label">密码</label>
			<emit-input
				:rules="passwordRules"
				v-model="modelValuePwd"
				placeholder="请输入密码"
				type="password"
				tag="input"
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
import { GlobalData } from "@/store";
import valiDateForm from "@/components/valiDateForm.vue";
import emitInput, { ValidataProp } from "@/components/emitValue.vue";
export default defineComponent({
	components: {
		valiDateForm,
		emitInput,
	},
	setup() {
		const modelValueEmail = ref("wangjun@123.com");
		const modelValuePwd = ref("");
		const emailRules: ValidataProp = [
			{ type: "required", message: "邮箱不能为空" },
			{ type: "email", message: "请输入正确的邮箱" },
		];
		const passwordRules: ValidataProp = [
			{ type: "required", message: "密码不能为空" },
			{ type: "length", message: "长度最多为6位" },
		];
		const inputRef = ref<any>(); //ref子节点
		const router = useRouter(); //路由跳转
		const store = useStore<GlobalData>();
		const onSubmitForm = (val: string) => {
			if (val) {
				store.commit("login");
				router.push({
					path: "/",
				});
			}
		};
		return {
			modelValueEmail,
			modelValuePwd,
			emailRules,
			passwordRules,
			onSubmitForm,
		};
	},
});
</script>
