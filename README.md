# Searchable #

Adds a search box to existing select box to filter items

## How to use ##

### Syntax ###

    #JS
    new Searchable(select[, options]);

### Arguments ###

1. select - (string) A string of the id for an Element, (element) Element reference - the select box
2. options - (object) a key/value set of options

### Options ###

- container - (object) element attributes to be applied on container element
- query - (object) element attributes to be applied on query element (search box)
- results - (object) element attributes to be applied on results element (select box)
- keepSelected - (bool) if true, selected values will stay even when they don't match search criteria. Defaults to true
- addMassSelect - (bool) try to add a MassSelect to select box. Defaults to false

### Events ###

- keyUp - (function) callback to execute when the search box is being edited (search)