import { expect } from 'chai';
import { beforeEach } from 'mocha';

import { MIPS_Registers } from '../src/mips-registers';

// new comment to test if branch rename worked
describe('Register Tests', function() {
    context('Testing constructor', proper_init );

    context('Testing clear() method', proper_init );

    context('Testing data manipulation', function() {

        let registers: MIPS_Registers;

        beforeEach( function() { // before each data manipulation test
            registers = new MIPS_Registers();
        });

    });

    
    
});

// REUSABLE TESTS -----------------------------------------
/*
WHY: The clear() method uses the constructor. Since more than
one test uses this block of code, I(UG) extracted it into a
function. I named it originally test_constructor() but changed
the name, in case it is reused to check for proper initialization
of obj.
*/
function proper_init() {
    let registers = new MIPS_Registers();
    it('Has 32 registers', function() {
        expect( registers.data.length ).to.equal( 32 );
    });
    it('All registers are initialized to zero', function() {
        for( let i = 0; i < 32; i++ ) {
            expect( registers.data[ i ][ 0 ] ).to.equal( 0 );
        }
    });
    it('There are 32 register names', function() {
        expect( registers.toIndex.size ).to.equal( 32 );
    });
    // This one is going to be tedious, so I left it for latter
    //it('The register names are mapped correctly');
}
