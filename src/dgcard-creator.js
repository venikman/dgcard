const yargsParser = require('yargs-parser');

module.exports = {
    create: allCliArgs => {
        const argMap = yargsParser(allCliArgs.slice(2));
        delete argMap._;
        return argMap;
    }
};
