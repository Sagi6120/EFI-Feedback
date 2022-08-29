define( 'models/fileCollection',['models/fileModel'], function( fileModel ) {
	var collection = Backbone.Collection.extend( {
		model: fileModel
	} );
	return collection;
} );
