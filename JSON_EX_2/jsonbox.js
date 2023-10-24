$( "#ui-select-selectmenu" ).selectmenu();

$('#ui-select-chosen').chosen({
  width: '250px'
});

//$('#ui-select-selectric').selectric();


var vm = {
  nativeSelected: ko.observableArray(['SNACKS']),
  availableOptions: ko.observableArray([
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday'
  ])
};

ko.applyBindings(vm);
