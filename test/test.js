var assert = require("assert"),
    hashkit = require("../hashkit.js");

describe("Hashkit", function(){
    describe("defaults", function(){
        var h = new hashkit();
        it("should have the correct defaults", function(){
            assert.equal(h.options.chars, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");
            assert.equal(h.options.padding, 3);
            assert.equal(h.options.seed, 123456789);
            assert.equal(h.options.shuffle, false);
            assert.equal(h.options.mask, false);
        });
    });

    describe("encoding and decoding", function(){
        var h = new hashkit();
        it("should encode and decode successfully", function(){
            assert.equal(h.encode(1), "b");
            assert.equal(h.encode(10), "k");
            assert.equal(h.encode(100), "bM");
            assert.equal(h.encode(1000), "qi");
            assert.equal(h.decode("b"), 1);
            assert.equal(h.decode("k"), 10);
            assert.equal(h.decode("bM"), 100);
            assert.equal(h.decode("qi"), 1000);
        });
    });

    describe("character shuffling", function(){
        var h = new hashkit({"shuffle": true});
        it("should shuffle characters", function(){
            var h = new hashkit({shuffle: true});
            assert.equal(h.options.shuffle, true);
            assert.equal(h.options.chars, "WLgvI6CN7tqi8xfdFJZYDVeuP5K0kpAhmTEG2SjH39cXoyMzQbsraUBwl1OR4n");
        });
    });

    describe("number masking", function(){
        var h = new hashkit({"mask": true});
        it("should mask the real numbers", function(){
            assert.equal(h.options.mask, true);
            assert.notEqual(h.encode(1), "b");
        });
    });
});
