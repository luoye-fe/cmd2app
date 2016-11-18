<template>
	<div class="modal" transition="fade" v-show="show && !win32">
		<div class="modal-dialog modal-sm">
			<div class="modal-content">
				<div class="modal-header">
					<button @click.stop="hide" type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title">提示</h4>
				</div>
				<div class="modal-body">
					<div v-else>
						<p>请输入管理员密码</p>
						<input type="password" class="form-control" v-model="pwd" @keypress.enter="applySudoPwd">
						<span v-show="error" style="font-size: 12px;line-height: 28px;color: #ff5151;">密码错误</span>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal" @click="hide">取消</button>
					<button type="button" class="btn btn-primary" @click="applySudoPwd">确认</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import store from 'store';
import actions from 'actions';

import { ipcRenderer } from 'electron';
import { copyObj } from '../utils/common.js';

import Event from './event.vue';

export default {
	name: 'RequireSudoPwd',
	data() {
		return {
			win32: process.platform === 'win32',
			pwd: '',
			show: true,
			error: false
		};
	},
	ready() {
		if (this.win32) {
			Event.$emit('can-init');
			return;
		}
		ipcRenderer.on('pwd-checked', (ev, result) => {
			if (result.error) {
				this.error = true;
			} else {
				Event.$emit('can-init');
				actions.setSudoPwd(store, this.pwd);
				this.hide();
			}
		})
	},
	methods: {
		applySudoPwd() {
			ipcRenderer.send('pwd-check', this.pwd);
			this.hide();
		},
		hide() {
			this.show = false;
		}
	}
};
</script>
<style>
.modal {
	display: block;
	background: #fff;
}
.modal-sm {
	width: 400px;margin: 50px auto 0;
}
</style>
