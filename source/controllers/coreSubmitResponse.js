define('controllers/coreSubmitResponse',[], function() {
	var controller = Marionette.Object.extend( {
		initialize: function() {
			this.listenTo( nfRadio.channel( 'forms' ), 'submit:response', this.actionSubmit );
		},

		actionSubmit: function( response ) {
			/*
			 * If we have errors, don't hide or clear.
			 */
			if ( 0 != _.size( response.errors ) ) {
				return false;
			}

			if ( 1 == response.data.settings.clear_complete ) {
				// nfRadio.channel( 'form-' + response.data.form_id ).trigger( 'reset' );
				var formModel = nfRadio.channel( 'app' ).request( 'get:form', response.data.form_id );
				formModel.get( 'fields' ).reset( formModel.get( 'loadedFields' ) );
			}

			if ( 1 == response.data.settings.hide_complete ) {
				/**
				 * TODO: This needs to be re-worked for backbone. It's not dynamic enough.
				 */
				jQuery( '.nf-fields' ).hide();
				jQuery( '.nf-form-title' ).hide();
			}
		}

	});

	return controller;
} );
