<template>
	<div class="modal" transition="fade" v-show="requireSudoPwd.show">
		<div class="modal-dialog modal-sm">
			<div class="modal-content">
				<div class="modal-header">
					<button @click.stop="hide" type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
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
					<button type="button" class="btn btn-default" data-dismiss="modal" @click="hide">取消</button>
					<button type="button" class="btn btn-primary" @click="applySudoPwd()">确认</button>
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

export default {
	name: 'RequireSudoPwd',
	data() {
		return {
			win32: process.platform === 'win32',
			pwd: ''
		};
	},
	vuex: {
		getters: {
			requireSudoPwd: () => store.state.requireSudoPwd
		}
	},
	methods: {
		applySudoPwd() {
			actions.setSudoPwd(store, this.pwd);
			this.requireSudoPwd.apply();
			this.hide();
		},
		hide() {
			actions.setRequireSudoPwd(store, {
				show: false
			});
		}
	}
};
</script>
<style>
.modal {
	display: block;
}
.modal-sm {
	width: 400px;margin: 50px auto 0;
}
</style>
