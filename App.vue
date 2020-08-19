<script>
	import store from '@/store/index.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 5f1fbc988ba7d80001858dd3
			this.$api.get_user({
				user_id: "5f1fbc988ba7d80001858dd3"
			}).then((res) => {
				// console.log(res);
				const {
					database
				} = res
				// console.log(database);
				this.$store.dispatch('set_userinfo', database)
			})
		}, 
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "components/feng-parse/parse.css";
</style>
