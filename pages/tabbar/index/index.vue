<template>
	<view class="content">
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<tab :list="tabList" @tab="tab"></tab>
		<!-- <view v-for="item in 100">{{item}}</view> -->
	</view>
</template>

<script>
	// easyCom components/组件名/组件名.vue 局部引入
	export default {
		data() {
			return {
				tabList: []
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			tab: function({data, index}) {
				console.log(data, index);
			},
			
			getLabel: function() {
				// console.log(this.$api)
				// 调用云函数的方法
				this.$api.get_label({
					name: 'get_label'
				}).then((res) => {
					const {data} = res
					this.tabList = data
					// console.log(this.tabList)
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
