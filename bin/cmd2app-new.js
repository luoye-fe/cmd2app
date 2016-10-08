#!/usr/bin/env node

// babel entrance
require('babel-core/register')({
	"presets": ["es2015", "stage-2"],
	"plugins": ["transform-runtime"],
	"comments": false
});

require('./new.js');
