const dgcard = require('./index');

test('returns object with minimum fields', () => {
    const options = {
        firstName: 'Stas',
        lastName: 'Nedbailov',
        work: 'developer',
        handle: 'venikman'
    };
    expect(dgcard(options)).toEqual(options);
});

test('returns object with maximum fields', () => {
    const options = {
        firstName: 'Stas',
        lastName: 'Nedbailov',
        work: 'developer',
        handle: 'venikman',
        twitter: 'https://twitter.com/venik_man',
        web: 'https://venikman.com',
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
