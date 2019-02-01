const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

function fromDir(startPath, filter, callback) {
    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    let files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        let filename = path.join(startPath, files[i]);
        let stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter, callback); //recurse
        } else if (filter.test(filename)) callback(filename);
    }
}

function createPartialName(filename, depth) {
    const tempArr = filename.split('.')[0].split('\\');
    return tempArr.slice(Math.max(tempArr.length - depth, 1)).join('/');
}

module.exports = {
    registerPagePartials: (config) => {
        fromDir(config.pagePath, /\.hbs$/, function (filename) {
            const contents = fs.readFileSync(filename);
            const partialName = createPartialName(filename, 1);
            Handlebars.registerPartial(partialName, Handlebars.compile(`${contents}`));
        });
    },

    registerComponentPartials: (config) => {
        fromDir(config.componentPath, /\.hbs$/, function (filename) {
            const contents = fs.readFileSync(filename);
            const partialName = createPartialName(filename, 2);
            Handlebars.registerPartial(partialName, Handlebars.compile(`${contents}`));
        });
    },

    buildTemplate: (source, output, data, callback) => {
        const contents = fs.readFileSync(source);
        let template = Handlebars.compile(`${contents}`);
        let html = template(data);

        const dir = "./dist/";

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        fs.writeFile(output, html, (err) => {
            if (err) return console.log(err);

            callback();
        });
    }
}