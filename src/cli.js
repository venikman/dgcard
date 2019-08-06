#!/usr/bin/env node

const boxen = require('boxen');
const chalk = require('chalk');
const parser = require('./dgcard-creator').create;

console.log(dgcard());

function dgcard() {
    const args = parser(process.argv);
    const options = {
        padding: 1,
        margin: 1,
        borderStyle: 'round'
    };

    const data = {
        name: `${args.firstName} ${args.lastName}`,
        email: args.email,
        username: `/ ${args.username}`,
        work: args.work,
        twitter: args.twitter,
        github: args.github,
        linkedin: args.linkedin,
        web: args.web,
        labelWork: '      Work:',
        labelEmail: '     Email:',
        labelTwitter: '   Twitter:',
        labelGitHub: '    GitHub:',
        labelLinkedIn: '  LinkedIn:',
        labelWeb: '       Web:'
    };

    const newline = '\n';
    const heading = `${data.name} ${args.username ? data.username : ''}`;
    const working = `${data.labelWork}  ${data.work}`;
    const emailing = `${data.labelEmail}  ${data.email}`;
    const twittering = data.twitter
        ? `${data.labelTwitter}  ${data.twitter}`
        : '';
    const githubing = data.github ? `${data.labelGitHub}  ${data.github}` : '';
    const linkedining = data.linkedin
        ? `${data.labelLinkedIn}  ${data.linkedin}`
        : '';
    const webing = data.web ? `${data.labelWeb}  ${data.web}` : '';

    let output =
        heading +
        newline +
        newline +
        working +
        newline +
        emailing +
        (twittering ? newline + twittering : '') +
        (githubing ? newline + githubing : '') +
        (linkedining ? newline + linkedining : '') +
        (webing ? newline + webing : '');

    return chalk.green(boxen(output, options));
}
