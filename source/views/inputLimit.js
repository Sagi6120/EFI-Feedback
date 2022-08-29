define( 'views/inputLimit',[], function() {
    var view = Marionette.ItemView.extend({
        tagName: 'nf-section',
        template: '#nf-tmpl-field-input-limit',

        initialize: function() {
        	this.listenTo( nfRadio.channel( 'field-' + this.model.get( 'id' ) ), 'keyup:field', this.updateCount );
        	this.count = this.model.get( 'input_limit' );
        	this.render();
        },

        updateCount: function( el, model ) {
            var value = jQuery( el ).val();
            var regex = /\s+/gi;
            var words = value.trim().replace(regex, ' ').split(' ');
            var wordCount = words.length;
            var charCount = value.length;

            if ( 'char' == this.model.get( 'input_limit_type' ) ) {
                jQuery( el ).attr( 'maxlength', this.model.get( 'input_limit' ) );
                this.count = this.model.get( 'input_limit' ) - charCount;
            } else {
                this.count = this.model.get( 'input_limit' ) - wordCount;
                var limit = this.model.get( 'input_limit' );
                if( wordCount > limit ){
                    jQuery( el ).val( words.slice( 0, limit).join( ' ' ) );
                }
            }

        	this.render();
        },

        templateHelpers: function() {
        	var that = this;
        	return {
        		currentCount: function() {
        			return that.count;
        		}
        	}
        }

    });

    return view;
} );
