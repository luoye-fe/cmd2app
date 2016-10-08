#!/usr/bin/env node

// babel entrance
require('babel-core/register')({
	ignore: false
});

require('./cmd2app.js');
