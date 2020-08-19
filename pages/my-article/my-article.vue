<template>
	<view>
		<uni-load-more v-if="lists.length === 0 && !this.articleShow" status="loading"></uni-load-more>
		<list-card v-for="item in lists" :key="item.id" :item="item"></list-card>
		<view v-if="articleShow" class="no-data">没有数据</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: [],
				articleShow: false
			}
		},
		onLoad() {
			this.getMyArticle()
		},
		methods: {
			getMyArticle() {
				this.$api.get_my_article().then(res => {
					const {
						data
					} = res
					this.lists = data
					this.articleShow = this.lists.length === 0?true:false
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
		justify-content: center;
	}
	
	.no-data {
		padding: 50px;
		text-align: center;
		font-size: 14px;
		color: #999;
	}
</style>
