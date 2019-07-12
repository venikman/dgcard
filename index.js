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
                handle: str
                    .required()
                    .min(2)
                    .max(40),
                work: str
                    .required()
                    .min(3)
                    .max(80),
                twitter: socialUrl,
                linkedin: socialUrl,
                web: socialUrl,
                email: str.optional().email()
            })
    );

    return { ...config };
}
