<template>
	<div class="init">
		<div class="loading_con" transition="fade">
			<div class="loading">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<p>正在初始化 ...</p>
			</div>
		</div>
	</div>
</template>
<style scoped>
.init {
	display: none;
	position: fixed;
	z-index: 9999;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #fff;
	-webkit-user-select: none;
}
.loading_con {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0);
	z-index: 9999;
}

.loading_con .loading {
	width: 300px;
	height: 120px;
	font-size: 0;
	text-align: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.loading_con .loading p {
	font-size: 14px;
	color: #000;
	line-height: 28px;
	margin-top: 15px;
}

.loading_con .loading span {
	display: inline-block;
	vertical-align: top;
	width: 8px;
	height: 80px;
	background-color: #fff;
	margin: 0 4px;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
	border-radius: 2px;
}

.loading_con .loading span:nth-child(1) {
	animation: loading 1.2s ease-in-out 0s infinite;
	-webkit-animation: loading 1.2s ease-in-out 0s infinite;
	-moz-animation: loading 1.2s ease-in-out 0s infinite;
	-ms-animation: loading 1.2s ease-in-out 0s infinite;
}

.loading_con .loading span:nth-child(2) {
	animation: loading 1.2s ease-in-out -1.1s infinite;
	-webkit-animation: loading 1.2s ease-in-out -1.1s infinite;
	-moz-animation: loading 1.2s ease-in-out -1.1s infinite;
	-ms-animation: loading 1.2s ease-in-out -1.1s infinite;
}

.loading_con .loading span:nth-child(3) {
	animation: loading 1.2s ease-in-out -1.0s infinite;
	-webkit-animation: loading 1.2s ease-in-out -1.0s infinite;
	-moz-animation: loading 1.2s ease-in-out -1.0s infinite;
	-ms-animation: loading 1.2s ease-in-out -1.0s infinite;
}

.loading_con .loading span:nth-child(4) {
	animation: loading 1.2s ease-in-out -0.9s infinite;
	-webkit-animation: loading 1.2s ease-in-out -0.9s infinite;
	-moz-animation: loading 1.2s ease-in-out -0.9s infinite;
	-ms-animation: loading 1.2s ease-in-out -0.9s infinite;
}

.loading_con .loading span:nth-child(5) {
	animation: loading 1.2s ease-in-out -0.8s infinite;
	-webkit-animation: loading 1.2s ease-in-out -0.8s infinite;
	-moz-animation: loading 1.2s ease-in-out -0.8s infinite;
	-ms-animation: loading 1.2s ease-in-out -0.8s infinite;
}

.loading_con .loading span:nth-child(6) {
	animation: loading 1.2s ease-in-out -0.7s infinite;
	-webkit-animation: loading 1.2s ease-in-out -0.7s infinite;
	-moz-animation: loading 1.2s ease-in-out -0.7s infinite;
	-ms-animation: loading 1.2s ease-in-out -0.7s infinite;
}

@-webkit-keyframes loading {
	0%,
	40%,
	100% {
		transform: scaleY(0.4);
		-webkit-transform: scaleY(0.4);
	}
	20% {
		transform: scaleY(1.0);
		-webkit-transform: scaleY(1.0);
	}
}

@keyframes loading {
	0%,
	40%,
	100% {
		transform: scaleY(0.4);
		-webkit-transform: scaleY(0.4);
	}
	20% {
		transform: scaleY(1.0);
		-webkit-transform: scaleY(1.0);
	}
}
</style>
<script>
import { ipcRenderer } from 'electron';

import { copyObj } from '../utils/common.js';

export default {
	name: 'Init',
	data() {
		return {
			// showInit: 
		};
	},
	ready() {
		ipcRenderer.on('app-init-has-check', (ev, result) => {
			console.log(result);
		})
		ipcRenderer.send('app-init-will-check', copyObj(window.metaJSON));
		console.log(process.cwd());
	}
};
</script>
