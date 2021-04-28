import * as core from '@actions/core';
import { execSync } from 'child_process';

const CHROME_VERSION = core.getInput('chrome_version');
const FIREFOX_VERSION = core.getInput('firefox_version');
const SELENOID_START_CMD = 'curl -s https://aerokube.com/cm/bash | bash && ./cm selenoid start';

async function dispatchCmd(): Promise<void> {
	if (CHROME_VERSION && FIREFOX_VERSION)
		execSync(
			`${SELENOID_START_CMD} --browsers 'chrome:${CHROME_VERSION};firefox:${FIREFOX_VERSION}' --tmpfs 512`,
			{stdio: 'inherit'}
		);
	else if (CHROME_VERSION)
		execSync(
			`${SELENOID_START_CMD} --browsers 'chrome:${CHROME_VERSION}' --tmpfs 512`,
			{ stdio: 'inherit' }
		);
	else if (FIREFOX_VERSION)
		execSync(
			`${SELENOID_START_CMD} --browsers 'firefox:${CHROME_VERSION}' --tmpfs 512`,
			{ stdio: 'inherit' }
		);
}

async function run(): Promise<void> {
	try {
		core.info('START INSTALLING SELENOID');
		await dispatchCmd();
		core.info('SELENOID INSTALLED SUCCESSFULLY');
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
