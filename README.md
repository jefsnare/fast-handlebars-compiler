# Fast Handlebars Compiler

Compiling Handlebars templates in a fast way.

## Example configuration

```
const fhc = require('fast-handlebars-compiler');

fhc.build({
    entry: path.join(process.cwd(), "src", "layouts", "default.hbs"),
    output: path.join(process.cwd(), "dist", "index.html"),
    data: {
      title: 'Index',
      properties: {
        pagecontent: 'index'
      }
    }
});

```

## watch files with nodemon

`nodemon --watch src/**/*.hbs --exec fastHandlebars`