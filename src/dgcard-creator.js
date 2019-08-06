const yargsParser = require('yargs-parser');
const got = require('got');

module.exports = {
    create: async allCliArgs => {
        const argMap = yargsParser(allCliArgs.slice(2));
        delete argMap._;
        const query = Object.keys(argMap).map(key => {
            return [key, argMap[key]];
        });
        console.log('query', query);
        const searchParams = new URLSearchParams(query);
        console.log('bwfore got');
        console.log('stass', searchParams);
        try {
            await got(
                'https://us-central1-dgcard-serveless.cloudfunctions.net/addMessage',
                { query: searchParams }
            );
            console.log('after promise');
        } catch (error) {
            console.log('err', error);
        }
        return argMap;
    }
};
