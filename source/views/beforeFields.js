define( 'views/beforeFields',[], function( ) {

    var view = Marionette.ItemView.extend({
        tagName: "nf-section",
        template: "#nf-tmpl-before-fields",

    });

    return view;
} );
