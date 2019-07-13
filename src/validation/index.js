const validatation = {
  validate: function(fields) {
    if (!fields) return true;
    for (var field in fields) {
      var rules = fields[field].rules;
      var value = fields[field].value;
      for (var i = 0; i < rules.length; i++) {
        var funName = 'is'+this.capitalizeFirstLetter(rules[i]);
        var checkValidation = this[funName](fields[field]);
        if(checkValidation) {
          return checkValidation;
        }
      }
    }
  },
  capitalizeFirstLetter: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  isEmpty: function (field_info) {
    var value = field_info.value.replace(/\s+/g, '');
    return (value) ? false: field_info.fieldname+ ' is required';
  },
  isEmail: function (field_info) {
    var value = field_info.value.replace(/\s+/g, '');
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (re.test(String(value).toLowerCase())) ? false: field_info.fieldname+ ' is not valid';
  },
  isPhone: function(field_info) {
    var value = field_info.value.replace(/\s+/g, '');
    if (!value) return false;
    var re = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    return (re.test(field_info.value)) ? false: field_info.fieldname+ ' is not valid';
  },
  isName: function(field_info) {
    var value = field_info.value.replace(/\s+/g, '');
    if (!value) return false;
    var re = /[^a-zA-Z0-9]/;
    return (re.test(field_info.value)) ? false: field_info.fieldname+ ' is not valid';
  },
  isPostalcode: function(field_info) {
    var regex = new RegExp(/^\d{6}$/);    
    return (regex.test(field_info.value)) ? false: field_info.fieldname+ ' is not valid';
  }
}
 export default validatation;
