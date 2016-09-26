<template>
	<div class="form-group form-group-sm">
		<label>History</label>
		<table class="table table-bordered table-hover" v-if="commandHistory.length > 0">
			<thead class="thead-default">
				<tr>
					<th>#</th>
					<th>详情</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(index, item) in commandHistory" track-by="$index">
					<th scope="row">{{index + 1}}</th>
					<td class="table-code">
						<span>{{item}}</span>
					</td>
					<td class="opt-button">
						<div>
							<button type="button" class="btn btn-danger btn-sm" @click="delCommand(index)">删除</button>
							<button type="button" class="btn btn-success btn-sm" @click="runCommand(index)">运行</button>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<p class="no-history" v-else>无历史记录</p>
	</div>
</template>
<style scoped>
.thead-default {

}
.thead-default th {
	color: #55595c;
	background-color: #eceeef;
}
.no-history {
	color: #55595c;
	background-color: #eceeef;
	font-size: 14px;
	padding: 10px 5px;
	border-radius: 5px;
	border: 1px solid #eee;
}
.opt-button {
	min-width: 120px;
	text-align: center;
	position: relative;
}
.opt-button>div {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
}
.table-code span{
	display: inline-block;vertical-align: middle;
	font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
	padding: 0;
	white-space: pre-wrap;
    font-size: 13px;
    line-height: 1.42857143;
    word-break: break-all;
    word-wrap: break-word;
    color: #333333;
}
</style>
<script>
import store from 'store';
import actions from 'actions';

export default {
	name: 'History',
	vuex: {
		getters: {
			commandHistory: () => store.state.commandHistory
		}
	},
	methods: {
		delCommand(index) {
			actions.delHistory(store, index);
		},
		runCommand() {

		}
	}
};
</script>
