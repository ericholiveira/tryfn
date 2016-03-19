var expect = require("chai").expect;
var Try = require('../src');
describe("Try object",function(){
    it("must support values",function(){
        expect(Try(true).value).to.equal(true);
    });
    it("must support functions without error",function(){
        expect(Try(function(){
            return true;
        }).value).to.equal(true);
    });
    it("must support functions without error using constructor",function(){
        expect(new Try(function(){
            return true;
        }).value).to.equal(true);
    });

    it("must support functions with error",function(){
        expect(Try(function(){
            throw new Error('TryError');
        }).error.message).to.equal('TryError');
    });

    it("must support catch",function(){
        expect(Try(function(){
            throw new Error('TryError');
        }).catch(true)).to.equal(true);
    });

    it("must support catch with function",function(){
        expect(Try(function(){
            throw new Error('TryError');
        }).catchFn(function(e){
            expect(e.message).to.equal('TryError');
            return false;
        })).to.equal(false);
    });

    it("must support catch with switch/case like syntax",function(){
        var tryResult = Try(function(){
            throw new Error('TryError');
        }).catchCase(Number,true);
        expect(tryResult.value).to.equal(null);
        expect(tryResult.error.message).to.equal('TryError');
        expect(tryResult.catchCase(5).value).to.equal(5);
    });

    it("must support catch with switch/case like syntax on functions",function(){
        var tryResult = Try(function(){
            throw new Error('TryError');
        }).catchCaseFn(Number,function(){return true;});
        expect(tryResult.value).to.equal(null);
        expect(tryResult.error.message).to.equal('TryError');
        expect(tryResult.catchCaseFn(function(e){
            expect(e.message).to.equal('TryError');
            return 5;
        }).value).to.equal(5);
    });

});
