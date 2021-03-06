define(function (require, exports, module) {
    var View = require('samsara/core/View');
    var Surface = require('samsara/dom/Surface');
    var Scrollview = require('samsara/layouts/Scrollview');
    var ParallaxCat = require('./ParallaxCat');

    // ParallaxCats is a scrollview of ParallaxCat images
    var ParallaxCats = View.extend({
        defaults: {
            cats : 0,
            skew : 0,
            parallaxAmount : 0
        },
        initialize: function (options) {
            // Create the scrollview
            var scrollview = new Scrollview({
                direction: Scrollview.DIRECTION.Y,
                drag: 0.3
            });

            // Create the parallaxCat images
            var cats = [];
            for (var i = 0; i < options.cats; i++) {
                var parallaxCat = new ParallaxCat({
                    proportions: [1, 2/3],
                    skew: options.skew,
                    src: './assets/cat' + (i + 1) + '.jpg',
                    parallaxAmount: options.parallaxAmount,
                    index: i
                });

                // Subscribe each image to the scrollview
                // so that they can shift themselves based
                // on the scrollview's progress to create a
                // parallax effect
                parallaxCat.subscribe(scrollview);

                cats.push(parallaxCat);
            }

            scrollview.addItems(cats);

            // Build the render subtree consisting of only the scrollview
            this.add(scrollview);
        }
    });

    module.exports = ParallaxCats;
});
