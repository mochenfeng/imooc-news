<template>
	<list-scroll class="list-scroll" @loadmore="loadmore">
		<view>
			<list-card mode="base" :item="item" v-for="(item, index) in list" :key="item._id"></list-card>
		</view>
		<uni-load-more v-if="list.length === 0 || list.length > 9" iconType="snow" :status="load.loading || 'loading'"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default() {
					return []
				}
			},
			load: {
				type: Object,
				default() {
					return {
						loading: "loading"
					}
				}
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			loadmore: function() {
				this.$emit('loadmore')
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		height: 100%;
	}
</style>
