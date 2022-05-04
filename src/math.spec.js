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


