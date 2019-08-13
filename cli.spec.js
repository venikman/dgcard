const execa = require('execa');
const chalk = require('chalk');
// const dgcard = require('cli.js');

// test('no argument', () => {
//     expect(() => {
//         dgcard();
//     }).toThrow('Required data argument');
// });

test('dgcard cli with optional', async () => {
    const output = await execa('node', [
        'cli.js',
        '--firstName',
        'First',
        '--lastName',
        'Last',
        '--email',
        'email@gmail.com',
        '--username',
        'username',
        '--twitter',
        'https://twitter.com/twitter_username',
        '--web',
        'https://site.com',
        '--linkedin',
        'https://www.linkedin.com/in/linked_in_path/',
        '--github',
        'https://github.com/github_username',
        '--work',
        'Position at Company'
    ]);
    const actual = output.stdout;
    expect(actual).toEqual(
        chalk.green(`\n   ╭──────────────────────────────────────────────────────────────╮
   │                                                              │
   │   First Last / username                                      │
   │                                                              │
   │         Work:  Position at Company                           │
   │        Email:  email@gmail.com                               │
   │      Twitter:  https://twitter.com/twitter_username          │
   │       GitHub:  https://github.com/github_username            │
   │     LinkedIn:  https://www.linkedin.com/in/linked_in_path/   │
   │          Web:  https://site.com                              │
   │                                                              │
   ╰──────────────────────────────────────────────────────────────╯\n`)
    );
});

test('dgcard cli without optional', async () => {
    const output = await execa('node', [
        'cli.js',
        '--firstName',
        'First',
        '--lastName',
        'Last',
        '--username',
        'venikman',
        '--email',
        'email@gmail.com',
        '--work',
        'Position at Company'
    ]);
    const actual = output.stdout;
    expect(actual).toEqual(
        chalk.green(`\n   ╭──────────────────────────────────────╮
   │                                      │
   │   First Last / venikman              │
   │                                      │
   │         Work:  Position at Company   │
   │        Email:  email@gmail.com       │
   │                                      │
   ╰──────────────────────────────────────╯\n`)
    );
});
