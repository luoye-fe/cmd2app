<template>
	<div class="exec-detail" v-show="show" transition="fade">
		<div class="main">
<pre><code>{{execDetail}}</code></pre>
			<i class="iconfont icon-aliicon" @click="show = false"></i>
		</div>
	</div>
</template>
<style scoped>
.exec-detail {
	position: fixed;top: 0;left: 0;background-color: rgba(0, 0, 0, 0.3);width: 100%;height: 100%;
}
.exec-detail .main {
	position: absolute;width: 650px;height: 650px;top: 50%;
	left: 50%;margin-top: -325px;margin-left: -325px;
}
.exec-detail .main pre {
	position: absolute;width: 100%;height: 100%;overflow: auto;
}
.exec-detail .main .icon-aliicon {
	position: absolute;font-size: 16px;cursor: pointer;top: -6px;right: -6px;
}
</style>
<script>
export default {
	name: 'ExecDetail',
	props: ['execDetail', 'show']
};
</script>
