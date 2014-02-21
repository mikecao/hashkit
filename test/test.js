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
            assert.equal(h.options.shuffle, true);
            assert.equal(h.options.chars, "WLgvI6CN7tqi8xfdFJZYDVeuP5K0kpAhmTEG2SjH39cXoyMzQbsraUBwl1OR4n");
            assert.equal(h.encode(1), "L");
            assert.equal(h.encode(10), "q");
            assert.equal(h.encode(100), "Lj");
            assert.equal(h.encode(1000), "F7");
            assert.equal(h.decode("L"), 1);
            assert.equal(h.decode("q"), 10);
            assert.equal(h.decode("Lj"), 100);
            assert.equal(h.decode("F7"), 1000);
        });
    });

    describe("number masking", function(){
        var h = new hashkit({"mask": true});
        it("should mask the real numbers", function(){
            assert.equal(h.options.mask, true);
            assert.equal(h.encode(1), "cop");
            assert.equal(h.encode(10), "xjO");
            assert.equal(h.encode(100), "bcrE");
            assert.equal(h.encode(1000), "KKTs");
            assert.equal(h.decode("cop"), 1);
            assert.equal(h.decode("xjO"), 10);
            assert.equal(h.decode("bcrE"), 100);
            assert.equal(h.decode("KKTs"), 1000);
        });
    });

    describe("random seeding", function(){
        var h = new hashkit({"shuffle": true, "mask": true, "seed": 99999});
        it("should randomize the output", function(){
            assert.equal(h.options.chars, "yWjaFqLb8uIliZz7vr2REC30MPUhSxtpY1J6TfswGcmXdV9KDnegoHQkAN54OB");
            assert.equal(h.encode(1), "WT7");
            assert.equal(h.encode(2), "AO");
            assert.equal(h.encode(3), "UB");
        });
    });
});
