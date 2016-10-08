<template>
	<div class="client">
		<div class="arrow" :class="{'arrow-close': !showClient}" @click="toggleClient()">
			<i class="iconfont icon-arrow-copy"></i>
		</div>
		<div class="client-list" :class="{'client-close': !showClient, 'client-open': showClient}" v-show="showClient">
			<ul>
				<li v-for="(key, item) in clients">
					<div class="code" @click.stop="selectExecDetail(key)">
<pre><code>{{item.data}}</code></pre>
					</div>
					<i class="iconfont icon-aliicon" @click="closeClient(key)"></i>
				</li>
			</ul>
		</div>
		<div class="modal" transition="fade" v-show="showModal">
			<div class="modal-dialog modal-sm">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title">提示</h4>
					</div>
					<div class="modal-body">
						<p>将结束当前进程，确认？</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal" @click="showModal = false">取消</button>
						<button type="button" class="btn btn-primary" @click="apply()">确认</button>
					</div>
				</div>
			</div>
		</div>
		<m-exec-detail :exec-detail="execDetail" :show.sync="showExecDetail"></m-exec-detail>
	</div>
</template>
<style scoped>
.client {
	position: fixed;bottom: 0;left: 0;width: 100%;
	background-color: #fff;
}
.arrow {
	width: 100%;
	text-align: center;
	cursor: pointer;
	background-color: rgba(51,56,66, 1);
	border-top-right-radius: 5px;
	border-top-left-radius: 5px;
}
.arrow i {
	display: inline-block;vertical-align: middle;
	color: #fff;
	font-size: 14px;
	line-height: 24px;
	transform: rotate(-90deg);
	transition: all ease 0.3s;
}
.arrow.arrow-close i{
	transform: rotate(90deg)!important;
}
.client-list {
	width: 100%;
	transition: all ease 0.2s;
}
.client-list ul {
	padding: 0;
	display: flex;
	overflow: auto;
}
.client-list ul li {
	list-style: none;
	margin: 5px 10px;
	width: 140px;height: 140px;position: relative;
}
.client-list ul li .icon-aliicon{
	position: absolute;font-size: 16px;cursor: pointer;right: -8px;top: -8px;
}
.client-list ul li .code{
	width: 300px;height: 300px;overflow: auto;
	transform: scale(0.46);
	transform-origin: 0 0;
	cursor: pointer;
	box-sizing: border-box;
	transition: all ease 0.2s;
	position: relative;
}
.client-list ul li .code pre{
	font-family: 'Menlo';font-size: 12px;line-height: 20px;
	position: absolute;width: 100%;height: 100%;overflow: auto;
}
.client-list ul li .code:hover{
	box-shadow: 0 1px 5px rgba(50,176,213,0.7);
}

.client-close {
	height: 0px;
}
.client-open {
	height: 150px;
}
</style>
<script>
import Vue from 'vue';

import store from 'store';
import actions from 'actions';

import { ipcRenderer } from 'electron';

import ExecDetail from './exec-detail.vue';

export default {
	name: 'Client',
	data() {
		return {
			clients: {},
			execDetail: '',
			showExecDetail: false,
			showModal: false,
			willCloseKey: ''
		}
	},
	vuex: {
		getters: {
			metaJSON: () => store.state.metaJSON,
			showClient: () => store.state.showClient
		}
	},
	ready() {
		ipcRenderer.on('command-begin', (ev, pid) => {
			actions.toggleClient(store, true);
			// 检查是否有已运行的进程，没有的话覆盖掉
			if (Object.keys(this.clients).length) {
				const firstClientPid = Object.keys(this.clients)[0];
				const firstClient = this.clients[Object.keys(this.clients)[0]];
				if (firstClient.status === 'close') {
					let curData = firstClient.data;
					Vue.delete(this.clients, firstClientPid);
					Vue.set(this.clients, pid, {
						data: curData,
						status: 'running'
					})
					return;
				}
			}
			Vue.set(this.clients, pid, {
				data: '',
				status: 'running'
			})
		})
		ipcRenderer.on('command-runing', (ev, obj) => {
			this.clients[obj.pid].data += obj.data;
		})
		ipcRenderer.on('command-close', (ev, pid) => {
			this.clients[pid].status = 'close';
		})
	},
	methods: {
		toggleClient() {
			actions.toggleClient(store, !this.showClient);
		},
		selectExecDetail(key) {
			this.execDetail = this.clients[key].data;
			this.showExecDetail = true
		},
		closeClient(key) {
			this.willCloseKey = key;
			if (this.clients[key].status === 'close') {
				Vue.delete(this.clients, key);
				return;
			}
			this.showModal = true;
		},
		apply() {
			ipcRenderer.send('command-force-close', this.willCloseKey);
			this.clients[this.willCloseKey].data += '\nprocess close.';
			this.showModal = false;
		}
	},
	components: {
		'm-exec-detail': ExecDetail
	},
	watch: {
		clients: {
			handler() {
				let key = this.willCloseKey === '' ? Object.keys(this.clients)[0] : this.willCloseKey;
				if (this.clients[key] === undefined) {
					return;
				}
				this.execDetail = this.clients[key].data;
			},
			deep: true
		}
	}
};	
</script>
