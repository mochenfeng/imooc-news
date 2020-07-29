<template>
	<view class="icons" @click.stop="likeTap">
		<uni-icons size="20" color="#f07373" :type="like?'heart-filled':'heart'"></uni-icons>
	</view>
</template>

<script>
	export default {
		props:{
			item: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				like: false
			};
		},
		watch:{
			item: function(newVal) {
				this.like = this.item.is_like
			}
		},
		created() {
			this.like = this.item.is_like
		},
		methods:{
			likeTap: function() {
				console.log("收藏成功");
				this.like = !this.like
				this.setupdateLikes()
			},
			setupdateLikes: function() {
				uni.showLoading()
				this.$api.update_like({
					user_id: '5f1fbc988ba7d80001858dd3',
					article_id:　this.item._id
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: this.like?'收藏成功':'取消收藏',
						icon: 'none'
					})
					console.log(res);
				}).catch(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
	.icons {
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
	}
</style>
