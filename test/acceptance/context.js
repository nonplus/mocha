
describe('Context', function(){
  beforeEach(function(){
    this.calls = ['before'];
  })

  describe('nested', function(){
    beforeEach(function(){
      this.calls.push('before two');
    })

    it('should work', function(){
      this.calls.should.eql(['before', 'before two']);
      this.calls.push('test');
    })

    after(function(){
      this.calls.should.eql(['before', 'before two', 'test']);
      this.calls.push('after two');
    })
  })

  after(function(){
    this.calls.should.eql(['before', 'before two', 'test', 'after two']);
  })
})


describe('LazyContext', function() {

  var calls = [];

  before(function(){
    calls.should.eql([]);
    calls.push('before');
  })

  describe("lazy", function() {

    beforeEach(function() {
      calls.push("lazy beforeEach");
      throw new Error("shouldn't be called");
    })

    before(function(done) {
      process.nextTick(function() {
        calls.push("lazy before");
        throw new Error("shouldn't be called");
        done();
      });
    })

    it("is pending and shouldn't cause before/after(Each) call")

    describe("nested", function() {
      it("is also pending and shouldn't cause before/after(Each) calls")      
    })

    after(function(done) {
      process.nextTick(function() {
        calls.push("lazy after");
        throw new Error("shouldn't be called");
        done();
      });
    })

    afterEach(function() {
      calls.push("lazy afterEach");
      throw new Error("shouldn't be called");
    })

  });

  describe("eager", function() {

    beforeEach(function() {
      calls.should.eql(["before", "eager before A", "eager before B", "eager nested before"]);
      calls.push("eager beforeEach A");
    })

    before(function(done) {
      process.nextTick(function() {
        calls.should.eql(["before"]);
        calls.push("eager before A");
        done();
      });
    })

    beforeEach(function(done) {
      process.nextTick(function() {
        calls.should.eql(["before", "eager before A", "eager before B", "eager nested before", "eager beforeEach A"]);
        calls.push("eager beforeEach B");
        done();
      });
    })

    before(function() {
      calls.should.eql(["before", "eager before A"]);
      calls.push("eager before B");
    })

    describe("nested", function() {

      before(function(done) {
        process.nextTick(function() {
          calls.should.eql(["before", "eager before A", "eager before B"]);
          calls.push("eager nested before");
          done();
        });
      })

      beforeEach(function() {
        calls.should.eql(["before", "eager before A", "eager before B", "eager nested before",
          "eager beforeEach A", "eager beforeEach B"]);
        calls.push("eager nested beforeEach");
      })

      it("should work", function() {
        calls.should.eql(["before", "eager before A", "eager before B", "eager nested before",
          "eager beforeEach A", "eager beforeEach B", "eager nested beforeEach"]);
        calls.push("should work");
      })

      afterEach(function(done) {
        process.nextTick(function() {
          calls.should.eql(["before", "eager before A", "eager before B", "eager nested before",
            "eager beforeEach A", "eager beforeEach B", "eager nested beforeEach",
            "should work"]);
          calls.push("eager nested afteEach");
          done();
        });
      })

      after(function() {
        calls.should.eql(["before", "eager before A", "eager before B", "eager nested before",
          "eager beforeEach A", "eager beforeEach B", "eager nested beforeEach",
          "should work",
          "eager nested afteEach", "eager afterEach A", "eager afterEach B"]);
        calls.push("eafer nested after");
      })

    })

    afterEach(function(done) {
      process.nextTick(function() {
        calls.should.eql(["before", "eager before A", "eager before B", "eager nested before",
          "eager beforeEach A", "eager beforeEach B", "eager nested beforeEach",
          "should work",
          "eager nested afteEach"]);
        calls.push("eager afterEach A");
        done();
      });
    })

    after(function() {
      calls.should.eql(["before", "eager before A", "eager before B", "eager nested before",
        "eager beforeEach A", "eager beforeEach B", "eager nested beforeEach",
        "should work",
        "eager nested afteEach", "eager afterEach A", "eager afterEach B", "eafer nested after"]);
      calls.push("eager after A");
    })

    afterEach(function() {
      calls.should.eql(["before", "eager before A", "eager before B", "eager nested before",
        "eager beforeEach A", "eager beforeEach B", "eager nested beforeEach",
        "should work",
        "eager nested afteEach", "eager afterEach A"]);
      calls.push("eager afterEach B");
    })

    describe("lazy 2", function() {

      beforeEach(function() {
        calls.push("lazy 2 beforeEach");
        throw new Error("shouldn't be called");
      })

      before(function(done) {
        process.nextTick(function() {
          calls.push("lazy 2 before");
          throw new Error("shouldn't be called");
          done();
        });
      })

      it("is pending and shouldn't cause before/after(Each) call")

      describe("nested", function() {
        it("is also pending and shouldn't cause before/after(Each) calls")      
      })

      after(function(done) {
        process.nextTick(function() {
          calls.push("lazy 2 after");
          throw new Error("shouldn't be called");
          done();
        });
      })

      afterEach(function() {
        calls.push("lazy 2 afterEach");
        throw new Error("shouldn't be called");
      })

    });    

    after(function() {
      calls.should.eql(["before", "eager before A", "eager before B", "eager nested before",
        "eager beforeEach A", "eager beforeEach B", "eager nested beforeEach",
        "should work",
        "eager nested afteEach", "eager afterEach A", "eager afterEach B",
        "eafer nested after", "eager after A"]);
      calls.push("eager after A");
    })

  })

  after(function() {
    calls.should.eql(["before", "eager before A", "eager before B", "eager nested before",
      "eager beforeEach A", "eager beforeEach B", "eager nested beforeEach",
      "should work",
      "eager nested afteEach", "eager afterEach A", "eager afterEach B",
      "eafer nested after", "eager after A", "eager after A"]);
  })

});