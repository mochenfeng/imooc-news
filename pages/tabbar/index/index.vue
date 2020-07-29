<template>
	<view class="home">
		<!-- 自定义导航栏 -->
		<navbar></navbar>
		<tab :list="tabList" :tabIndex="tabIndex" @tab="tab"></tab>
		<view class="home-list">
			<list :tab="tabList" :activeIndex="activeIndex" @change="change"></list>
		</view>
	</view>
	</view>
	</view>
	</view>
</template>

<script>
	// easyCom components/组件名/组件名.vue 局部引入
	export default {
		data() {
			return {
				tabList: [],
				tabIndex: 0,
				activeIndex: 0
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			tab: function({
				data,
				index
			}) {
				// console.log(index);
				this.activeIndex = index
			},

			getLabel: function() {
				// console.log(this.$api)
				// 调用云函数的方法
				this.$api.get_label({
					name: 'get_label'
				}).then((res) => {
					const {
						data
					} = res
					
					data.unshift({
						name: '全部'
					})
					this.tabList = data
					// console.log(this.tabList)
				})
			},

			change: function(current) {
				this.tabIndex = current
				this.activeIndex = current
				// console.log("当前swiper的值:" + current);
			}

		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;

		.home-list {
			flex: 1;
			box-sizing: border-box;
		}
	}
</style>
