<template>
	<!-- <a-form
		:model="formState"
		name="time_related_controls"
		v-bind="formItemLayout"
		@finish="onFinish"
	>
		<a-form-item name="rangePicker" label="RangePicker" v-bind="rangeConfig">
			<a-range-picker
				v-model:value="formState.rangePicker"
				value-format="YYYY-MM-DD"
			/>
		</a-form-item>
		<a-form-item
			:wrapper-col="{
				xs: { span: 24, offset: 0 },
				sm: { span: 16, offset: 8 },
			}"
		>
			<a-button type="primary" html-type="submit">Submit</a-button>
		</a-form-item>
	</a-form> -->
	<a-form
		layout="inline"
		:model="form"
		:label-col="{ style: { width: '80px' } }"
		@finish="onFinishTwo"
	>
		<a-form-item label="ip地址">
			<a-input
				class="connect-form-item"
				v-model:value="form.ipModel"
				:allowClear="true"
			/>
		</a-form-item>
		<a-form-item label="用户ID">
			<a-input
				class="connect-form-item"
				v-model:value="form.userIdModel"
				:allowClear="true"
			/>
		</a-form-item>
		<a-form-item label="连接时间">
			<a-range-picker
				class="connect-form-item"
				v-model:value="form.rangeModel"
				:allowClear="true"
				picker="day"
			/>
		</a-form-item>
		<a-form-item class="right">
			<a-button type="primary" html-type="submit">
				<template #icon><SearchOutlined /></template>
				搜索
			</a-button>
			<a-button style="margin-left: 15px">
				<template #icon><RedoOutlined /></template>
				重置
			</a-button>
		</a-form-item>
		<em class="clear"></em>
	</a-form>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";

interface FormState {
	"date-picker": string;
	"date-time-picker": string;
	"month-picker": string;
	rangePicker: [string, string];
	"range-time-picker": [string, string];
	"time-picker": string;
}
export default defineComponent({
	setup() {
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
			},
		};
		const rangeConfig = {
			rules: [
				{
					type: "array" as const,
					required: true,
					message: "Please select time!",
				},
			],
		};
		const formState = reactive({ rangePicker: [] });
		const form = reactive({
			ipModel: "",
			userIdModel: "",
			rangeModel: [],
		});
		const onFinish = (values: any) => {
			console.log("Success:", values["rangePicker"][0], formState);
		};
		const onFinishTwo = (values: any) => {
			console.log("Success:", values);
		};
		return {
			form,
			formState,
			onFinish,
			formItemLayout,
			rangeConfig,
			onFinishTwo,
		};
	},
});
</script>
