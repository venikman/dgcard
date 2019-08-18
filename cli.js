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
	  --first-name, Include a first name [required]
	  --last-name, Include a last name [required]
	  --work, Include your work title [required]
	  --username, Include your username [required]
	  --email, Include your email
	  --twitter, Include your twitter
	  --linkedin, Include your linkedIn page
	  --github, Include your github page
	  --web, Include your web page

	Examples
      $ dgcard --first-name Stas --last-name Nedb --work humana --username venikman --email nedb@gmail.com

      ╭─────────────────────────────────╮
      │                                 │
      │   Stas Nedb / venikman          │
      │                                 │
      │         Work:  humana           │
      │        Email:  nedb@gmail.com   │
      │                                 │
      ╰─────────────────────────────────╯
`,
    {
        flags: {
            'first-name': {
                type: 'string'
            },
            'last-name': {
                type: 'string'
            },
            work: {
                type: 'string'
            },
            username: {
                type: 'string'
            },
            email: {
                type: 'string'
            },
            twitter: {
                type: 'string'
            },
            linkedin: {
                type: 'string'
            },
            github: {
                type: 'string'
            },
            web: {
                type: 'string'
            },
            save: {
                type: 'boolean',
                default: false
            }
        }
    }
);

stas(cli.flags)
    .then(args => {
        console.log(dgcard(args));
    })
    .catch(error => {
        if (error.isJoi) {
            console.log(error.details[0].message);
        }
    });

async function stas(argss) {
    const args = validate(argss);
    if (args.save) {
        console.log('saving...');
        delete args.save;
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
    return args;
}

function dgcard(args) {
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
                email: str.required().email(),
                save: joi.boolean().required()
            })
    );

    return { ...config };
}