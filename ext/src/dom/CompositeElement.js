/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

Pre-release code in the Ext repository is intended for development purposes only and will
not always be stable. 

Use of pre-release code is permitted with your application at your own risk under standard
Ext license terms. Public redistribution is prohibited.

For early licensing, please contact us at licensing@sencha.com

Build date: 2013-02-13 19:36:35 (686c47f8f04c589246d9f000f87d2d6392c82af5)
*/
//@tag dom,core
/**
 * @class Ext.dom.CompositeElement
 * <p>This class encapsulates a <i>collection</i> of DOM elements, providing methods to filter
 * members, or to perform collective actions upon the whole set.</p>
 * <p>Although they are not listed, this class supports all of the methods of {@link Ext.dom.Element} and
 * {@link Ext.fx.Anim}. The methods from these classes will be performed on all the elements in this collection.</p>
 * <p>All methods return <i>this</i> and can be chained.</p>
 * Usage:
 <pre><code>
 var els = Ext.select("#some-el div.some-class", true);
 // or select directly from an existing element
 var el = Ext.get('some-el');
 el.select('div.some-class', true);

 els.setWidth(100); // all elements become 100 width
 els.hide(true); // all elements fade out and hide
 // or
 els.setWidth(100).hide(true);
 </code></pre>
 */
Ext.define('Ext.dom.CompositeElement', {
    alternateClassName: 'Ext.CompositeElement',

    extend: 'Ext.dom.CompositeElementLite',

    // private
    getElement: function(el) {
        // In this case just return it, since we already have a reference to it
        return el;
    },

    // private
    transformElement: function(el) {
        return Ext.get(el);
    }

}, function() {
    /**
     * Selects elements based on the passed CSS selector to enable {@link Ext.Element Element} methods
     * to be applied to many related elements in one statement through the returned {@link Ext.CompositeElement CompositeElement} or
     * {@link Ext.CompositeElementLite CompositeElementLite} object.
     * @param {String/HTMLElement[]} selector The CSS selector or an array of elements
     * @param {Boolean} [unique] true to create a unique Ext.Element for each element (defaults to a shared flyweight object)
     * @param {HTMLElement/String} [root] The root element of the query or id of the root
     * @return {Ext.CompositeElementLite/Ext.CompositeElement}
     * @member Ext.dom.Element
     * @method select
     * @static
     */

    Ext.dom.Element.select = function(selector, unique, root) {
        var elements;

        if (typeof selector == "string") {
            elements = Ext.dom.Element.selectorFunction(selector, root);
        }
        else if (selector.length !== undefined) {
            elements = selector;
        }
        else {
            //<debug>
            throw new Error("[Ext.select] Invalid selector specified: " + selector);
            //</debug>
        }
        return (unique === true) ? new Ext.CompositeElement(elements) : new Ext.CompositeElementLite(elements);
    };
});

/**
 * Shorthand of {@link Ext.Element#method-select}.
 * @member Ext
 * @method select
 * @inheritdoc Ext.Element#select
 */
Ext.select = Ext.Element.select;
