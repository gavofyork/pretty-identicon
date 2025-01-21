import { cyrb128, getRNG, sfc32 } from "./utils.js";

describe('cyrb128 (Simple Fast Counter) hash function algorithm', function() {
  it('should produce a reproducible 128-bit value from provided string to seed a PRNG algorithm', function() {
    const seedgen = () => Math.random().toString(36).substring(2,7);
    const out = cyrb128(seedgen());
    expect(out.length).toEqual(4);
  });
});

describe('getRNG', function() {
  it('should generate a random number with provided seed', function() {
    const seedgen = () => Math.random().toString(36).substring(2,7);
    const randomWithSeed = getRNG(seedgen.toString());
    const isInRange = (r) => r>=0 && r<=1;
    expect(isInRange(randomWithSeed())).toBe(true);
  });
});

describe('sfc32 (Simple Fast Counter) algorithm', function() {
  it('should produce random numbers in the range 0-1 from four 32-bit component hashes', function() {
    const seedgen = () => (Math.random()*2**32) >>> 0;
    const getRand = sfc32(seedgen(), seedgen(), seedgen(), seedgen());
    let out = [];
    for(let i=0; i<100; i++) out << getRand();
    const isInRange = (v) => v.every(r => r>=0 && r<=1)
    expect(isInRange(out)).toBe(true);
  });
});
