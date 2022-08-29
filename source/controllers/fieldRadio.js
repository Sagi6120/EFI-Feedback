define('controllers/fieldRadio',[], function() {
	var controller = Marionette.Object.extend( {
		initialize: function() {
			this.listenTo( nfRadio.channel( 'listradio' ), 'change:modelValue', this.changeModelValue );
			this.listenTo( nfRadio.channel( 'listradio' ), 'init:model', this.register );
			nfRadio.channel( 'listradio' ).reply( 'get:calcValue', this.getCalcValue, this );
			
			this.listenTo( nfRadio.channel( 'listradio' ), 'change:field', this.updateCheckedClass, this );
		},

		register: function( model ) {
			model.set( 'renderOptions', this.renderOptions );
			model.set( 'renderOtherText', this.renderOtherText );
			/*
			 * When we init a model, we need to set our 'value' to the selected option's value.
			 * This is the list equivalent of a 'default value'.
			 */ 
			if ( 0 != model.get( 'options' ).length ) {
				/*
				 * Check to see if we have a selected value.
				 */
				var selected = _.find( model.get( 'options' ), function( opt ) { return 1 == opt.selected } );
				/*
				 * We don't have a selected value, so use our first option.
				 */
				if ( 'undefined' == typeof selected ) {
					selected = model.get( 'options' )[0];
				}

				model.set( 'value', selected.value );
			}
		},

		changeModelValue: function( model ) {
			if ( 1 == model.get( 'show_other' ) ) {
				// model.set( 'reRender', true );
				model.trigger( 'reRender');
			}
		},

		renderOptions: function() {
			var that = this;
			var html = '';
			if ( '' == this.value ) {
				var valueFound = true;
			} else {
				var valueFound = false;
			}
			
			_.each( this.options, function( option, index ) {
				if ( option.value == that.value ) {
					valueFound = true;
				}

				option.fieldID = that.id;
				option.classes = that.classes;
				option.currentValue = that.value;
				option.index = index;
				var template = Marionette.TemplateCache.get( '#nf-tmpl-field-listradio-option' );
				html += template( option );
			} );

			if ( 1 == this.show_other ) {
				if ( 'nf-other' == this.value ) {
					valueFound = false;
				}
				var data = {
					fieldID: this.id,
					classes: this.classes,
					currentValue: this.value,
					renderOtherText: this.renderOtherText,
					valueFound: valueFound
				};
				var template = Marionette.TemplateCache.get( '#nf-tmpl-field-listradio-other' );
				html += template( data );
			}

			return html;
		},

		renderOtherText: function() {
			if ( 'nf-other' == this.currentValue || ! this.valueFound ) {
				if ( 'nf-other' == this.currentValue ) {
					this.currentValue = '';
				}
				var data = {
					fieldID: this.fieldID,
					classes: this.classes,
					currentValue: this.currentValue
				};
				var template = Marionette.TemplateCache.get( '#nf-tmpl-field-listradio-other-text' );
				return template( data );
			}
		},

		getCalcValue: function( fieldModel ) {
			var calc_value = 0;
			if ( 0 != fieldModel.get( 'options' ).length ) {
				/*
				 * Check to see if we have a selected value.
				 */
				var selected = _.find( fieldModel.get( 'options' ), function( opt ) { return fieldModel.get( 'value' ) == opt.value } );
				/*
				 * We don't have a selected value, so use our first option.
				 */
				if ( 'undefined' == typeof selected ) {
					selected = fieldModel.get( 'options' )[0];
				}

				var calc_value = selected.calc;
			}
			return calc_value;
		},

		updateCheckedClass: function( el, model ) {
			jQuery( '[name="' + jQuery( el ).attr( 'name' ) + '"]' ).removeClass( 'nf-checked' );
			jQuery( el ).closest( 'ul' ).find( 'label' ).removeClass( 'nf-checked-label' );
			jQuery( el ).addClass( 'nf-checked' );
			jQuery( el ).closest( 'li' ).find( 'label[for="' + jQuery( el ).prop( 'id' ) + '"]' ).addClass( 'nf-checked-label' );


		}

	});

	return controller;
} );
