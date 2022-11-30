<template>
	<div>
		<form action="">
			<slot></slot>
			<div @click.prevent="submitForm">
				<slot name="submit">
					<button class="btn btn-primary">提交</button>
				</slot>
			</div>
		</form>
	</div>
</template>
<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
type ValidateFunc = () => boolean;
import mitt from "mitt";
type Emits<EventType extends string | symbol, T> = {
	on(type: EventType, handler: (arg: T) => void): void;
	off(type: EventType, handler: (arg: T) => void): void;
	emit(type: EventType, arg: T): void;
};
type Emitter = Emits<"form-input-created", ValidateFunc>;
export const emitter: Emitter = mitt<Emitter>();
export default defineComponent({
	emits: ["formSubmit"],
	setup(props, context) {
		const funcArr: ValidateFunc[] = [];
		const submitForm = () => {
			const result = funcArr.map((func) => func()).every((r) => r);
			context.emit("formSubmit", result);
		};
		const callBack = (func: ValidateFunc) => {
			if (func) {
				funcArr.push(func);
			}
		};
		emitter.on("form-input-created", callBack);
		onUnmounted(() => {
			emitter.off("form-input-created", callBack);
		});
		return {
			submitForm,
		};
	},
});
</script>

<style lang="" scoped></style>
