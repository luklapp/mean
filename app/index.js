'use strict';

var express = require( 'express' );
var app = express();
var server = require( 'http' ).createServer( app );
var morgan = require( 'morgan' );
var compression = require( 'compression' );

app.enable( 'trust proxy' );

app.disable( 'x-powered-by' );

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'jade' );

app.use( morgan( 'dev' ) );
app.use( compression() );

app.get( '/mean', function( req, res ) {
  res.render( 'index' );
} );

// Catch all
app.use( function( req, res ) {
  res
    .status( 404 )
    .json( {
      status: 'Document does not exist'
    } );
} );

// Error handling
app.use( function( err, req, res, next ) {
  res
    .status( 500 )
    .json( {
      status:  'INTERNAL SERVER ERROR',
      message: err.message,
      data:    err.stack
    } );
} );

module.exports = server;
