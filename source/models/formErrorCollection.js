define( 'models/formErrorCollection',['models/formErrorModel'], function( errorModel ) {
	var collection = Backbone.Collection.extend( {
		model: errorModel
	} );
	return collection;
} );
