import { isEven } from "./math"


describe('isEven', ()=> {

    it('should return true if given an even number', () =>  {
        // function under test
        const result = isEven(2);
        expect(result).toEqual(true)
    })
    
    it('should return false is given an odd number', () =>  {
        // function under test
        const result = isEven(1);
        expect(result).toEqual(false)
    })

})


// to test redux application
// dispatch an action
// check the store
// we call thsi social test : 
    // tests that involves multiple objext to work together 
    // less fragile (they know a little or nothing about the imolimentation)
    // cheaper to write
    // cheaer to maintain
    // more reliable

