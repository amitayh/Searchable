/*
---
description: Adds a search box to existing select box to filter items

license: MIT-style

authors:
- Amitay Horwitz

requires:
- core/1.3.1: '*'

provides:
- Searchable

...
*/

(function($) {

this.Searchable = new Class({

    Implements: [Options, Events],

    options: {
        container: {'class': 'searchable'},
        query: {'class': 'query', 'placeholder': 'Search...', 'type': 'text'},
        results: {'class': 'multiple_select', 'multiple': true},
        keepSelected: true,
        addMassSelect: false
    },

    initialize: function(select, options) {
        this.setOptions(options);
        this.query = new Element('input', this.options.query);
        this.results = $(select).set(this.options.results);
        this.optionElements = this.results.getElements('option');

        var container = new Element('div', this.options.container);
        container.inject(this.results, 'after').adopt(this.query, this.results);
        
        this.query.addEvent('keyup', this.onKeyUp.bind(this));
        this.results.addEvent('change', this.fireEvent.bind(this, 'change'));

        if (this.options.addMassSelect && MassSelect) {
            new MassSelect(this.results);
        }
    },

    clear: function(all) {
        var selector = !!all ? 'option' : 'option:not(:selected)',
            options = this.results.getElements(selector);
        options.dispose();
        this.results.fireEvent('change');
        return this;
    },

    add: function(value, name, force) {
        if (!force) {
            // Don't add if value already exists
            var checkValue = function(el) { return el.get('value') == value; };
            if (this.optionElements.some(checkValue)) {
                return this;
            }
        }
        var option = new Element('option', {value: value, text: name});
        this.optionElements.push(option);
        option.inject(this.results);
        return this;
    },

    onKeyUp: function() {
        var value = this.query.get('value'), options = this.optionElements, regex;
        this.clear(!this.options.keepSelected);
        if (value !== '') {
            regex = new RegExp(value, 'i');
            options = options.filter(function(option) {
                return (option.get('selected') && this.options.keepSelected) || regex.test(option.get('text'));
            }, this);
        }
        this.results.adopt(options);
        this.fireEvent('keyUp');
    }

});

})(document.id);