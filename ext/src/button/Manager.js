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
Ext.define('Ext.button.Manager', {
    singleton: true,
    
    alternateClassName: 'Ext.ButtonToggleManager',
    
    groups: {},
    
    buttonSelector: '.' + Ext.baseCSSPrefix + 'btn',
    
    init: function(){
        var me = this;
        if (me.initialized) {
            return;
        }
        Ext.getBody().on('keydown', me.onKeyDown, me);
        me.initialized = true;
    },
    
    // Buttons must react to SPACE and ENTER to trigger the click handler.
    // Now that they are <a> elements, we use a keydown listener.
    onKeyDown: function(e) {
        var k = e.getKey(),
            btn;

        // SPACE and ENTER trigger a click
        if (k === e.SPACE || k === e.ENTER) {

            // Look for a Button's encapsulating element
            btn = e.getTarget(this.buttonSelector);

            // If found, fire the Button's onClick
            if (btn) {
                Ext.getCmp(btn.id).onClick(e);
            }
        }
    },
    
    toggleGroup: function(btn, state) {
        if (state) {
            var g = this.groups[btn.toggleGroup],
                length = g.length,
                i;

            for (i = 0; i < length; i++) {
                if (g[i] !== btn) {
                    g[i].toggle(false);
                }
            }
        }
    },
    
    register: function(btn) {
        var me = this,
            groups = this.groups,
            group = groups[btn.toggleGroup];
            
        me.init();
        if (!btn.toggleGroup) {
            return;
        }
            
        if (!group) {
            group = groups[btn.toggleGroup] = [];
        }
        group.push(btn);
        btn.on('toggle', me.toggleGroup, me);
    },

    unregister: function(btn) {
        if (!btn.toggleGroup) {
            return;
        }
        var me = this,
            group = me.groups[btn.toggleGroup];
            
        if (group) {
            Ext.Array.remove(group, btn);
            btn.un('toggle', me.toggleGroup, me);
        }
    },

    // Gets the pressed button in the passed group or null
    // @param {String} group
    // @return {Ext.button.Button}
    getPressed: function(group) {
        var g = this.groups[group],
            i = 0,
            len;
            
        if (g) {
            for (len = g.length; i < len; i++) {
                if (g[i].pressed === true) {
                    return g[i];
                }
            }
        }
        return null;
    } 
});
