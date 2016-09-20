<template>
	<div class="welcome" v-show="!isFirst" transition="fade">
		<div class="close" @click.stop="close()">
			<i class="iconfont icon-aliicon"></i>
		</div>
		<h1>welcome</h1>
		<p>这是由 <a href="javascript:void(0)" @click="openUrl('https://github.com/luoye-fe/cmd2app')"><code>cmd2app</code></a> 自动生成的命令行 GUI 程序。</p>
		<p>开始使用之前，让我们先了解下一段命令行的构成。</p>
		<pre>
			<code>
cmd2app new gomeplusFED/meixin-h5-proxy ./temp
			</code>
		</pre>

		<span class="tips">此提示在打开过由  <a href="javascript:void(0)" @click="openUrl('https://github.com/luoye-fe/cmd2app')"><code>cmd2app</code></a> 生成的应用将不再展示。</span>
	</div>
</template>
<style scoped>
.welcome {
	position: fixed;
	z-index: 99999;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	overflow: auto;
	background-color: rgba(255, 255, 255, 1);
}

.welcome .close {
	position: fixed;
	right: 10px;
	top: 0px;
	cursor: pointer;
}

.welcome .close i {
	font-size: 24px;
}

.welcome .tips {
	color: #ff5151;
	font-size: 12px;
	position: fixed;
	left: 0;
	bottom: 0;
}
</style>
<script>
import {
	openUrl
} from 'utils/common';
export default {
	name: 'Welcome',
	data() {
		return {
			isFirst: window.localStorage.getItem('fet-welcome')
		};
	},
	ready() {
		window.localStorage.setItem('fet-welcome', false);
	},
	methods: {
		openUrl: openUrl,
		close() {
			this.isFirst = true;
		}
	}
};
</script>
