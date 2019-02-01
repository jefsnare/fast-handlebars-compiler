const path = require('path');
const fhc = require('./src/compiler');

exports.fastHandlebarsCompiler = (config, callback) => {
    if (!config) {
        throw Error("Fast Handlebars Compiler - No configuration given (I don't know what to do!)");
    }

    const templates = config.length;
    let parsed = 0;

    fhc.registerComponentPartials(config);
    fhc.registerPagePartials(config);

    config.entries.forEach((conf) => {
        fhc.buildTemplate(
            path.join(config.layoutPath, conf.entry),
            path.join(config.outputPath, conf.output),
            conf.data,
            () => {
                parsed += 1;

                if (parsed === templates && !once) {
                    callback();
                }
            });
    });
}