define( 'views/beforeField',[], function() {
    var view = Marionette.ItemView.extend({
        tagName: 'nf-section',
        template: '#nf-tmpl-field-before'
    });

    return view;
} );
