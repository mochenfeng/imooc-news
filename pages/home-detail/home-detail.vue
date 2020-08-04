<template>
	<view class="detail">
		<view class="detail-title">
			{{formData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-header_logo">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header_content">
				<view class="detail-header_content-title">
					{{formData.author.author_name}}
				</view>
				<view class="detail-header_content-info">
					<text>{{formData.create_time}}</text>
					<text>{{formData.browse_count}} 浏览</text>
					<text>{{formData.thumbs_up_count}} 赞</text>
				</view>
			</view>
			<button class="detail-header_button" type="default" @click="follow(formData.author.id)">{{formData.is_author_like?'取消关注':'关注'}}</button>
		</view>

		<view class="detail-content">
			<view class="detail-html">
				<uParse :content="formData.content" :noData="noData"></uParse>
			</view>
			<view class="detail-comment">
				<view class="comment-title">最新评论</view>
				<view class="comment-content" v-for="item in commentsList" :key="item.coment_id">
					<comments-box :comments="item" @reply="reply"></comments-box>
				</view>
			</view>
		</view>
		
	
		<view class="detail-bottom">
			<view class="detail-bottom_input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>

			<view class="detail-bottom_icons">
				<view class="detail-bottom_icons-box" @click="open">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom_icons-box" @click="likeTap(formData._id)">
					<uni-icons :type="formData.is_like?'heart-filled':'heart'" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom_icons-box" @click="thumbsup(formData._id)">
					<uni-icons :type="formData.is_thumbs_up?'hand-thumbsup-filled':'hand-thumbsup'" size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>

		<relase ref="popup" @submit="submit"></relase>
	</view>
</template>

<script>
	import uParse from "@/components/feng-parse/parse.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uParse,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				formData: {},
				noData: '<p style="text-aling:center; color:#666;">详情加载中...</p>',
				
				// 输入框的值
				commentsValue: '',
				commentsList: [],
				replyFormData: {}
			}
		},
		onLoad(query) {
			this.formData = JSON.parse(query.params)
			this.getDetail()
			this.getComments()
		},
		onReady() {
		},
		methods: {
			// 打开评论列表
			open: function() {
				uni.navigateTo({
					url: '/pages/detail-comments/detail-comments?id=' + this.formData._id
				})
			},
			
			// 点赞
			thumbsup: function(article_id) {
				this.setUpdateThumbs(article_id)
			},
			
			// 收藏文章
			likeTap: function(article_id) {
				this.setUpdateLike(article_id)
			},
			
			// 关注作者
			follow: function(author_id) {
				this.setUpdateAuthor(author_id)
			},
			
			// 打开评论发布窗口
			openComment: function() {
				this.$refs.popup.open()
			},
			// 关闭弹窗
			close: function() {
				this.$refs.popup.close()
			},
			
			// 发布
			submit: function(content) {
				// this.setUpdateComment({content})
				console.log(content);
				this.setUpdateComment({content, ...this.replyFormData})
			},
			
			
			
			// 回复
			reply: function(e) {
				this.replyFormData = {
					"comment_id": e.comments.comment_id,
					"is_reply": e.is_reply
				}
				
				if(e.comments.reply_id) {
					this.replyFormData.reply_id = e.comments.reply_id
				}
				console.log(this.replyFormData);
				this.openComment()
			},
			
			setUpdateComment: function(content) {
				const formData = {
					article_id: this.formData._id,
					...content
				}
				// console.log(formdata);
				uni.showLoading()
				this.$api.update_comment(formData).then((res) => {
					// console.log(res);
					uni.hideLoading()
					uni.showToast({
						title:"评论成功"
					})
					this.getComments()
					this.close()
					this.replyFormData = {}
					this.commentsValue = ""
				})
			},
			
			// 获取详情信息
			getDetail: function() {
				this.$api.get_detail({
					article_id: this.formData._id
				}).then((res) => {
					const {
						data
					} = res
					this.formData = data
					console.log(res);
					
				})
			},
			
			// 请求评论内容
			getComments: function() {
				this.$api.get_comments({
					article_id: this.formData._id
				}).then(res => {
					console.log(res);
					const {data} = res
					this.commentsList = data
				})
			},
			
			
			// 关注作者
			setUpdateAuthor: function(author_id) {
				uni.showLoading()
				this.$api.update_author({
					author_id
				}).then(res => {
					uni.hideLoading()
					this.formData.is_author_like = !this.formData.is_author_like
					uni.showToast({
						title: this.formData.is_author_like? '关注作者成功':'取消关注作者',
						icon: 'none'
					})
				})
			},
			
			// 收藏文章
			setUpdateLike: function(article_id) {
				uni.showLoading()
				this.$api.update_like({
					article_id
				}).then(res => {
					uni.hideLoading()
					this.formData.is_like = !this.formData.is_like
					uni.$emit('update_article')
					uni.showToast({
						title: this.formData.is_like?'收藏成功':'取消收藏',
						icon: 'none'
					})
					console.log('收藏成功');
				})
			},
			
			// 点赞文章
			setUpdateThumbs: function(article_id ) {
				uni.showLoading()
				this.$api.update_thumbsup({
					article_id
				}).then(res => {
					uni.hideLoading()
					this.formData.is_thumbs_up = true
					this.formData.thumbs_up_count++
					uni.showToast({
						title: res.msg,
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		padding: 15px 0;
		// padding-bottom: 54px;
	}

	.detail-title {
		padding: 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}

	.detail-header {
		display: flex;
		align-items: center;
		margin-top: 10px;
		padding: 0 15px;

		.detail-header_logo {
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.detail-header_content {
			width: 100%;
			padding-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;

			.detail-header_content-title {
				font-size: 14px;
				color: #333;
			}

			.detail-header_content-info {
				color: #999;

				text {
					margin-right: 10px;
				}
			}
		}
		.detail-header_button {
			flex-shrink: 0;
			height: 30px;
			font-size: 12px;
			background-color: $mk-base-color;
			color: #fff;
		}
	}

	.detail-content {
		margin-top: 20px;
		min-height: 500px;

		.detail-html {
			padding: 0 15px;
		}
		.detail-comment {
			margin-top: 30px;
			.comment-title {
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px solid #F5F5F5;
			}
			.comment-content {
				padding: 0 15px;
				border-top: 1px solid #eee;
			}
		}
	}

	.detail-bottom {
		position: sticky;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 44px;
		border-top: 1px solid #f5f5f5;
		background-color: #fff;
		box-sizing: border-box;

		.detail-bottom_input {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 10px;
			padding: 0 10px;
			width: 100%;
			height: 30px;
			border: 1px solid #ddd;
			border-radius: 5px;

			text {
				font-size: 14px;
				color: #999;
			}
		}

		.detail-bottom_icons {
			display: flex;
			flex-shrink: 0;
			padding: 0 10px;

			.detail-bottom_icons-box {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 44px;
			}
		}
	}

</style>
