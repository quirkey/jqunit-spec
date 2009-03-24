(function($) {

  with(jqUnit) {
    // RSpec/Bacon Style
    describe('Sample Test', 'sample', {
      before: function() {
        // this is a assignment object so we cant mess
        // with the actual test suite
        this.sample = {
          name: 'Sample object',
          values: [1,2,3]
        }
      }
    })
    .it('should be an object', function() {
      isType(this.a('sample'), Object);
    })
    .it('should have a name', function() {
      equals(this.a('sample').name, 'Sample object');
    });
    
    
    // Shoulda style
    context('a Sample Test', {
      setup: function() {
        // this is a assignment object so we cant mess
        // with the actual test suite
        this.sample = {
          name: 'Sample object',
          values: [1,2,3]
        }
      }
    })
    .should('be an object', function() {
      isType(this.a('sample'), Object);
    })
    .should('have a name', function() {
      equals(this.a('sample').name, 'Sample object');
    });
    
})(jQuery);
