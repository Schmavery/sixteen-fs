var ghpages = require('gh-pages');
var fs = require('fs');

function copyFolder( source, target ) {
  files = fs.readdirSync( source );
  files.forEach( function ( file ) {
      copyFileSync(path.join( source, file ), targetFolder );
  } );
}

copyFolder('assets','dist');
ghpages.publish('./dist', console.error.bind(console));
