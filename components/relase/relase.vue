<template>
	<view>
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="popup-header_item" @click="close">取消</text>
					<text class="popup-header_item" @click="submit">发布</text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="commentsValue" maxlength="200" fixed placeholder="请输入评论内容" />
					<view class="popup-count">{{commentsValue.length}}/200</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		props:{
			show:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				commentsValue:''
			};
		},
		methods: {
			open: function() {
				// 打开窗口之前清空内容
				this.commentsValue = ''
				this.$refs.popup.open()
			},
			
			// 关闭弹窗
			close: function() {
				this.commentsValue = ''
				this.$refs.popup.close()
			},
			// 发布
			submit: function() {
				// console.log("发布");
				if(!this.commentsValue) {
					uni.showToast({
						title:"请输入评论内容",
						icon:"none"
					})
					return
				}
				// this.setUpdateComment({content: this.commentsValue, ...this.replyFormData})
				this.$emit('submit', this.commentsValue)
				
			},
		}
	}
</script>

<style lang="scss">
	.popup-wrap {
		background-color: #fff;
		.popup-header {
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			color: #666;
			border-bottom: 1px solid #F5F5F5;
			.popup-header_item {
				height: 50px;
				line-height: 50px;
				padding: 0 15px;
			}
		}
		.popup-content {
			width: 100%;
			padding: 15px;
			box-sizing: border-box;
			.popup-textarea {
				width: 100%;
				height: 200px;
				
			}
			.popup-count {
				display: flex;
				justify-content: flex-end;
				font-size: 12px;
				color: #999;
			}
		}
	}
</style>
