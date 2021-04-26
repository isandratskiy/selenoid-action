import * as core from '@actions/core';
import * as fs from 'fs';

const BROWSERS_TEMPLATE = {
	chrome: {
		default: 'CHROME_VERSION',
		versions: {
			CHROME_VERSION: {
				image: 'selenoid/vnc_chrome:CHROME_VERSION',
				port: '4444',
				path: '/',
				tmpfs: {
					'/tmp': 'size=512m'
				}
			}
		}
	},
	firefox: {
		default: 'FIREFOX_VERSION',
		versions: {
			FIREFOX_VERSION: {
				image: 'selenoid/vnc_firefox:FIREFOX_VERSION',
				port: '4444',
				path: '/wd/hub',
				tmpfs: {
					'/tmp': 'size=512m'
				}
			}
		}
	}
};

async function replaceVersions(_chrome: string, _firefox: string) {
	const template = JSON.stringify(BROWSERS_TEMPLATE);
	const browsersJson = template
		.replace(/CHROME_VERSION/g, _chrome)
		.replace(/FIREFOX_VERSION/g, _firefox);

	fs.writeFile('browsers.json', browsersJson, err => {
		if (err) {
			core.error(err.message);
			throw err;
		}
		core.info('created browsers.json config');
	});
}

replaceVersions(core.getInput('chrome_version'), core.getInput('firefox_version')).catch(err => {
	core.error(err.message);
});
