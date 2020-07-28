<template>
	<view class="navbar">
		<!-- 状态栏 -->
		<view :style="{height: statusBarHeight + 'px'}"></view>
		<!-- 导航栏内容 -->
		<view class="navbar-content" :style="{height: navBarHeight + 'px', width: windowWidth + 'px'}">
			<view class="navbar-search">
				<view class="navbar-search_icon">
					<uni-icons type="search" size="16" color="#999"></uni-icons>
				</view>
				<view class="navbar-search_text">uni-app、vue</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight:　20,
				navBarHeight: 45,
				windowWidth: 375
			};
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
					font-size: 12px;
					color: #999;
				}
			}
		}
	}
</style>
