const dgcard = require('../src/index');

test('returns object with minimum fields', () => {
    const options = {
        firstName: 'Stas',
        lastName: 'Nedbailov',
        work: 'developer',
        username: 'venikman'
    };
    expect(dgcard(options)).toEqual(options);
});

test('returns object with maximum fields', () => {
    const options = {
        firstName: 'Stas',
        lastName: 'Nedbailov',
        username: 'venikman',
        work: 'developer',
        twitter: 'https://twitter.com/venik_man',
        web: 'https://venikman.com',
        github: 'https://github.com/venikman',
        linkedin: 'https://www.linkedin.com/in/stanislau-niadbailau-51b012123/',
        email: 'nedbailov@gmail.com'
    };
    expect(dgcard(options)).toEqual(options);
});

test('no argument', () => {
    expect(() => {
        dgcard();
    }).toThrow('Required data argument');
});
