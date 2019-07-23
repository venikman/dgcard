const subject = require('../src/dgcard-creator');

test('return passed arguments', () => {
    const actual = subject.create([
        'node',
        './src/cli.js',
        '--name',
        'stas',
        '--age',
        '26'
    ]);

    expect(actual).toEqual({ name: 'stas', age: 26 });
});
