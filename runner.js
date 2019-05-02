const glob = require("glob");
const path = require( 'path' );

var args = process.argv.splice(2);
if(args.length != 0) {
    name = args[0];
}

glob.sync(`deploy/${require('./package.json').name}-v${require('./package.json').version}.js`).forEach( function( file ) {
    require(path.resolve(file));
});