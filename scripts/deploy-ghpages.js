var ghpages = require('gh-pages');
var fs = require('fs');
main();
function main() {
    var str =
    "<!doctype html><html><head><title>ffffffffffffffff</title>"+
    "<style type='text/css'> body { margin:0; } </style></head><body>"+
    "<div id='root'></div><script src='./bundle.js'></script></body></html>";
    fs.writeFileSync('./dist/index.html', str);
    ghpages.publish('./dist', console.error.bind(console));
}
