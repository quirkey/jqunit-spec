(function($) {

  jqUnit.Spec = function(name) {
    this.before = false;
    this.after = false;
    this.assigns = {};
    jqUnit.module(name);
  };


  // RSpec style describe
  // takes an arbitrary number of arguments that are contactenated as strings
  // the last argument is the configuration object
  // which can have before: after: callbacks
  function describe() {
    var args = [].splice.call(arguments, 0);    
    // configuration function
    var config = (args[args.length - 1].constructor == Object) ? args.pop() : {};
    var spec = new jqUnit.Spec(args.join(' '));
    spec.before = config['before'] || config['setup'];
    spec.after  = config['after'] || config['teardown'];
    return spec;
  }


  $.extend(jqUnit.Spec.prototype, {
    
    // RSpec style test definition
    it: function(name, callback, nowait) {
      var spec = this;
      if (spec.before) spec.before.apply(spec.assigns);
      jqUnit.test(name, function() { callback.apply(spec); }, nowait);
      if (spec.after) spec.after.apply(spec.assigns);
      return spec;
    },

    // Shoulda style test definition
    should: function(name, callback, nowait) {
      name = 'should ' + name;
      return this.it.apply(this, [name, callback, nowait]);
    },

    a: function(key) {
      if (typeof key == 'undefined') {
        return this.assigns;
      } else {
        return this.assigns[key];
      }
    }

  });


  $.extend(jqUnit, {
    // aliases for describe
    describe: describe,
    context: describe,

    // asserts that the method is defined (like respond_to?)
    defined: function(object, method) {
      return jqUnit.ok(typeof object[method] == 'function', method + 'is not defined on' + object);
    },

    // asserts that the object is of a certain type
    isType: function(object, type) {
      return jqUnit.ok(object.constructor === type, object.toString() + ' is not of type ' + type + ', is ' + object.constructor);
    },

    match: function(matcher, string) {
      return jqUnit.ok(string.match(matcher));
    } 

  });


  })(jQuery);
