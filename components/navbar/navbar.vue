<template>
	<view class="navbar">
		<!-- 状态栏 -->
		<view :style="{height: statusBarHeight + 'px'}"></view>
		<!-- 导航栏内容 -->
		<view class="navbar-content" :class="{search:isSearch}" :style="{height: navBarHeight + 'px', width: windowWidth + 'px'}" @click.stop="open">
			<view v-if="isSearch" class="navbar-content_search-icons" @click="back">
				<uni-icons type="back" size="22" color="#fff"></uni-icons>
			</view>
			<view v-if="!isSearch" class="navbar-search">
				<!-- 非搜索页显示 -->
				<view class="navbar-search_icon">
					<uni-icons type="search" size="16" color="#999"></uni-icons>
				</view>
				<view class="navbar-search_text">uni-app、vue</view>
			</view>
			
			<view v-else class="navbar-search">
				<input class="navbar-search_text" type="text" v-model="val" placeholder="请输入您要输入的内容"
					@input="inputChange"/>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isSearch: {
				type: Boolean,
				default: false
			},
			value: {
				type: [String, Number],
				default: ''
			},
		},
		data() {
			return {
				statusBarHeight:　20,
				navBarHeight: 45,
				windowWidth: 375,
				val: ''
			};
		},
		watch:{
			value(newVal) {
				this.val = newVal
			}
		},
		created() {
			// 获取手机系统信息
			const info = uni.getSystemInfoSync()
			//设置状态栏高度
			this.statusBarHeight = info.statusBarHeight
			console.log(info)
			this.windowWidth = info.windowWidth
			
			// h5 app mp-alipay
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			// 获取胶囊的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			console.log(menuButtonInfo)
			
			// (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
			console.log(this.navBarHeight)
			
			this.windowWidth = menuButtonInfo.left
			// #endif
		},
		methods: {
			back: function() {
				uni.switchTab({
					url: '/pages/tabbar/index/index'
				})
			},
			open: function() {
				if(this.isSearch) return
				uni.navigateTo({
					url: '/pages/home-search/home-search'
				})
			},
			inputChange: function(e) {
				const {value} = e.detail
				this.$emit('input', value)
			}
			
		}
	}
</script>

<style lang="scss">
	@import '../../common/css/icons.css';
	.navbar {
		position: sticky;
		top: 0;
		left: 0;
		z-index: 999;
		width: 100%;
		background-color: $mk-base-color;
		.navbar-content {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 15px;
			height: 45px;
			box-sizing: border-box;
			.navbar-search {
				display: flex;
				align-items: center;
				padding: 0 10px;
				width: 100%;
				height: 30px;
				border-radius: 30px;
				background-color: white;
				.navbar-search_icon {
					// width: 10px;
					// height: 10px;
					// border: 1px solid red;
					margin-right: 10px;
				}
				.navbar-search_text {
					width: 100%;
					font-size: 14px;
					color: #999;
				}
			}
			
			&.search {
				padding-left: 0;
				.navbar-content_search-icons {
					margin-left: 10px;
					margin-right: 10px;
				}
				.navbar-search {
					border-radius: 5px;
				}
			}
		}
	}
</style>
