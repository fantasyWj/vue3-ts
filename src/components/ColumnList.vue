<template>
	<div>
		<van-dropdown-menu>
			<van-dropdown-item v-model="value1" :options="option1" />
		</van-dropdown-menu>
		<div class="row">
			<div v-for="item in columnList" :key="item.id" class="col-4 card">
				<img :src="item.avatar" :alt="item.title" />
				<div class="card-body">
					<h3>{{ item.title }}</h3>

					<!-- <p>{{ item.descript }}</p> -->
					<button class="btn btn-primary" @click="toDetail(item)">
						进入专栏
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
// import { getList } from '@/api/api'
import { defineComponent, PropType, computed, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ColumnProps } from "../testData";
export default defineComponent({
	props: {
		list: {
			type: Array as PropType<ColumnProps[]>,
			required: true,
		},
	},
	setup(props) {
		const columnList = computed(() => {
			return props.list.map((item) => {
				if (!item.avatar) {
					item.avatar = require("@/assets/logo.png");
				}
				return item;
			});
		});
		const router = useRouter();
		const toDetail = (item: ColumnProps) => {
			router.push({
				path: "/columnDetail",
				query: { id: item.id },
			});
		};
		const value1 = ref(0);
		const option1 = reactive([
			{ text: "全部商品", value: 0 },
			{ text: "新款商品", value: 1 },
			{ text: "活动商品", value: 2 },
		]);
		return {
			columnList,
			toDetail,
			value1,
			option1,
		};
	},
});
</script>

<style lang="" scoped></style>
