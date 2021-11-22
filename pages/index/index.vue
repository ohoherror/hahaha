<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
		async init(){
			let url = 'https://open.fxiaoke.com/cgi/corpAccessToken/get/V2'
			let obj = {			
				appId:"FSAID_13199a5",
				appSecret:"1020d23d62944b1c805f889fe2241145",
				permanentCode:"568263C35007AD1705EB2503B23DC8EF"			
			}
			let res = await this.$myRequest(url,obj,'post')
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
