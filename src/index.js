const joi = require('@hapi/joi');

module.exports = dgcard;

function dgcard(option) {
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
