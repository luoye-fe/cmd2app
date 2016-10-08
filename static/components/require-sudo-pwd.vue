<template>
	<div class="modal" transition="fade" v-show="showModal">
		<div class="modal-dialog modal-sm">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">提示</h4>
				</div>
				<div class="modal-body">
					<div v-if="win32">
						<p>请用管理员身份打开应用</p>
					</div>
					<div v-else>
						<p>请输入管理员密码</p>
						<input type="text" class="form-control" v-model="pwd">
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal" @click="showModal = false">取消</button>
					<button type="button" class="btn btn-primary" @click="apply()">确认</button>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
.modal {
	display: block;
}
.modal-sm {
	width: 400px;margin: 50px auto 0;
}
</style>
<script>
import { ipcRenderer } from 'electron';
import { copyObj } from '../utils/common.js';

export default {
	name: 'RequireSudoPwd',
	data() {
		return {
			win32: process.platform === 'win32',
			pwd: ''
		};
	},
	props: ['showModal', 'metaJson'],
	methods: {
		apply() {
			this.showModal = false;
			if (process.platform === 'win32') {
				return;
			}
			ipcRenderer.send('app-init-input-pwd', this.pwd);
			setTimeout(() => {
				ipcRenderer.send('app-init-will-check', copyObj(this.metaJson));
			}, 0);
		}
	}
};
</script>
