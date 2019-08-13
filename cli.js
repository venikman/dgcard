#!/usr/bin/env node

const boxen = require('boxen');
const chalk = require('chalk');
const got = require('got');
const joi = require('@hapi/joi');
const meow = require('meow');

const cli = meow(
    `
	Usage
	  $ djcard <input>

	Options
	  --firstName, -f  Include a first name

	Examples
	  $ djcard --firstName Stas
	  🌈 unicorns 🌈
`,
    {
        flags: {
            firstName: {
                type: 'string'
            },
            lastName: {
                type: 'string'
            }
        }
    }
);

function validate(option) {
    if (!option) {
        throw new Error('Required data argument');
    }
    const str = joi.string().trim();
    const socialUrl = str
        .optional()
        .min(1)
        .max(100)
        .uri({
            scheme: 'https'
        });
    const config = joi.attempt(
        option,
        joi
            .object()
            .required()
            .keys({
                firstName: str
                    .required()
                    .min(2)
                    .max(30),
                lastName: str
                    .required()
                    .min(2)
                    .max(30),
                username: joi
                    .string()
                    .required()
                    .regex(
                        /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,29}$/i, //github validation regex
                        'username'
                    ),
                work: str
                    .required()
                    .min(3)
                    .max(80),
                twitter: socialUrl,
                github: socialUrl,
                linkedin: socialUrl,
                web: socialUrl,
                email: str.optional().email()
            })
    );

    return { ...config };
}

async function stas(args) {
    const query = Object.keys(args).map(key => {
        return [key, args[key]];
    });
    const searchParams = new URLSearchParams(query);
    try {
        await got(
            'https://us-central1-dgcard-serveless.cloudfunctions.net/addMessage',
            { query: searchParams }
        );
    } catch (error) {
        console.log('err', error);
    }
}
try {
    console.log(dgcard(cli.flags));
    stas(cli.flags);
} catch (error) {
    if (error.isJoi) {
        console.log(error.details[0].message);
    }
}

function dgcard(argss) {
    const options = {
        padding: 1,
        margin: 1,
        borderStyle: 'round'
    };

    const args = validate(argss);

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
