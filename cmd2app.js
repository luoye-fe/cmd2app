import program from 'commander';

program
	.version(require('./package.json').version)
	.usage('<command> [options]')
	.command('new', 'generate a new app from a cmd repo on github')
	.parse(process.argv);
