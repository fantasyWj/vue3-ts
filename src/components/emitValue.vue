<template>
	<div class="col-md-6">
		<input
			v-if="tag == 'input'"
			class="form-control"
			:class="{ 'is-invalid': inputRef.error }"
			:value="inputRef.val"
			@input="emitModelValue"
			@blur="inputValidate"
			v-bind="$attrs"
		/>
		<textarea
			v-else
			class="form-control"
			:class="{ 'is-invalid': inputRef.error }"
			:value="inputRef.val"
			@input="emitModelValue"
			@blur="inputValidate"
			v-bind="$attrs"
		></textarea>
		<div class="invalid-feedback" v-if="inputRef.error">
			{{ inputRef.message }}
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from "vue";
import { emitter } from "./valiDateForm.vue";
interface ValidateRef {
	type: "required" | "email" | "length" | "password";
	message: string;
}
export type ValidataProp = ValidateRef[];
type TagType = "input" | "textarea";
const emailReg =
	/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;
const pwdReg = /^[A-Za-z0-9]+$/g;
export default defineComponent({
	props: {
		rules: Array as PropType<ValidataProp>,
		modelValue: String,
		tag: {
			type: String as PropType<TagType>,
			default: "input",
		},
	},
	inheritAttrs: false,
	setup(props, context) {
		const inputRef = reactive({
			val: props.modelValue || "",
			error: false,
			message: "",
		}); //输入的数据
		// input
		const emitModelValue = (e: KeyboardEvent) => {
			const inputVal = (e.target as HTMLInputElement).value;
			inputRef.val = inputVal;
			context.emit("update:modelValue", inputVal);
		};
		// blur
		const inputValidate = () => {
			if (props.rules) {
				const RuleProp = props.rules;
				const allPassed = RuleProp?.every((item) => {
					let passed = true;
					switch (item.type) {
						case "required":
							passed = inputRef.val.trim() !== "";
							inputRef.message = item.message;
							break;
						case "length":
							passed = inputRef.val.length <= 6;
							inputRef.message = item.message;
							break;
						case "email":
							passed = emailReg.test(inputRef.val);
							inputRef.message = item.message;
							break;
						case "password":
							passed = pwdReg.test(inputRef.val);
							inputRef.message = item.message;
							break;
						default:
							break;
					}
					return passed;
				});
				// 判断是否通过规则 通过为true
				inputRef.error = !allPassed;
				return allPassed;
			}
			return true;
		};
		onMounted(() => {
			emitter.emit("form-input-created", inputValidate);
		});
		return {
			inputRef,
			emitModelValue,
			inputValidate,
		};
	},
});
</script>

<style lang="" scoped></style>
