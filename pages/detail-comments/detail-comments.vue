<template>
	<view>
		<view class="comments-content" v-for="item in commentsList" :key="item.comment_id">
			<comments-box :comments="item" @reply="reply"></comments-box>
		</view>
		<uni-load-more v-if="commentsList.length === 0 || commentsList.length > 5" iconType="snow" :status="loading"></uni-load-more>
		<relase ref="popup" @submit="submit"></relase>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commentsList: [],
				article_id: '',
				page: 1,
				pageSize: 5,
				loading: 'loading'
			}
		},
		onLoad(query) {
			this.article_id = query.id
			this.getComments()
			console.log(query);
		},
		
		// 上拉加载
		onReachBottom() {
			if(this.loading === 'noMore') return
			this.page++
			this.getComments()
		},
		methods: {
			
			// 发布评论
			submit: function(content) {
				this.setUpdateComment({content, ...this.replyFormData})
			},
			
			// 打开评论发布窗口
			openComment: function() {
				this.$refs.popup.open()
			},
			
			// 关闭弹窗
			close: function() {
				this.$refs.popup.close()
			},
			
			/**
			 * 监听回复 
			 * @param {Object} e
			 */
			reply: function(e) {
				this.replyFormData = {
					"commit_id": e.comments.comment_id,
					"is_reply": e.is_reply
				}
				if(e.comments.reply_id) {
					this.replyFormData.reply_id = e.comments.reply_id
				}
				this.openComment()
			},
			
			
			/**
			 * 更新评论
			 * @param {Object} content
			 */
			setUpdateComment: function(content){
				const formdata ={
					article_id:this.article_id,
					...content
				}
				// 数据重置，避免key重复，添加重复数据
				this.commentsList =  []
				this.page = 1 
				this.loading = 'loading'
				// console.log(formdata);
				uni.showLoading()
				this.$api.update_comment(formdata).then((res)=>{
					console.log(res);
					uni.hideLoading()
					uni.showToast({
						title:'评论发布成功'
					})
					this.getComments()
					this.close()
					this.replyFormData = {}
				})
			},
			
			/**
			 * 获取评论
			 */
			getComments: function() {
				this.$api.get_comments({
					article_id: this.article_id,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					const {data} = res
					if(data.length === 0 ) {
						this.loading = 'noMore'
						return
					}
					
					// 对象复制
					let oldFormData = JSON.parse(JSON.stringify(this.commentsList))
					oldFormData.push(...data)
					console.log(res);
					this.commentsList = oldFormData
				})
			}
		}
	}
</script>

<style lang="scss">
	.comments-content {
		padding: 0 15px;
	}
</style>
