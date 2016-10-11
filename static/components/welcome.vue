<template>
	<div class="welcome" v-show="!isFirst" transition="fade">
		<div class="close" @click.stop="close()">
			<i class="iconfont icon-aliicon"></i>
		</div>
		<h1>welcome</h1>
		<p>这是由 <a href="javascript:void(0)" @click="openUrl('https://github.com/luoye-fe/cmd2app')"><code>cmd2app</code></a> 自动生成的命令行 GUI 程序。</p>
		<p>开始使用之前，让我们先了解下一段命令行的构成。</p>
		<pre><code></code>{{code}}</pre>
		<p>根据上面的命令行构成，我们提供简洁的 GUI 界面可以得出所需的结果，并记录到历史中，方便下次调用。</p>
		<span class="tips">此提示在打开过由  <a href="javascript:void(0)" @click="openUrl('https://github.com/luoye-fe/cmd2app')"><code>cmd2app</code></a> 生成的应用将不再展示。</span>
	</div>
</template>
<style scoped>
.welcome {
	position: fixed;
	z-index: 9998;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	overflow: auto;
	background-color: rgba(255, 255, 255, 1);
	padding: 0 15px;
	box-sizing: border-box;
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
			isFirst: window.localStorage.getItem('cmd2app-welcome'),
			code: 
`cmd2app --port=8001 new gomeplusFED/meixin-h5-proxy ./temp --con=test

cmd2app 			-> bin
port 				-> global option
new 				-> command
gomeplusFED			-> command params 1
./temp 				-> command params 2
con				-> command option
`
		};
	},
	ready() {
		window.localStorage.setItem('cmd2app-welcome', false);
	},
	methods: {
		openUrl: openUrl,
		close() {
			this.isFirst = true;
		}
	}
};
</script>
