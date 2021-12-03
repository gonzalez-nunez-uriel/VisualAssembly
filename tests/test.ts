import { expect } from 'chai';
import { beforeEach } from 'mocha';
import { MIPS_Registers } from '../src/mips-registers';

describe('Register Tests', function() {
    context('Testing constructor', proper_init );

    context('Testing clear() method', proper_init );

    context('Testing data manipulation', function() {

        let registers: MIPS_Registers;

        beforeEach( function() {
            registers = new MIPS_Registers();
            registers.data[ 8 ].push( 4 ); // $t0 <- 4
        });

        it('Testing get() method', function() {
            let value = registers.get( 't0' );
            expect( value ).to.equal( 4 );
        })

        it('Testing set() method', function() {
            registers.set( 't1', 5 );
            let length = registers.data[ 9 ].length;
            expect(registers.data[ 9 ][ length - 1 ]).to.equal( 5 );
        });

        it('Testing multiple gets', function() {
            registers.data[ 9 ].push( 5 );
            registers.data[ 31 ].push( 10 );

            let value1 = registers.get( 't0' );
            let value2 = registers.get( 't1' );
            let value3 = registers.get( 'ra' );

            expect( value1 ).to.equal( 4 );
            expect( value2 ).to.equal( 5 );
            expect( value3 ).to.equal( 10 );
        });

        it('Testing multiple sets', function() {
            registers.set( 't1', 5 );
            registers.set( 't2', 6 );
            registers.set( 'ra', 10 );

            expect(registers.data[ 9 ][ registers.data[ 9 ].length - 1 ]).to.equal( 5 );
            expect(registers.data[ 10 ][ registers.data[ 10 ].length - 1 ]).to.equal( 6 );
            expect(registers.data[ 31 ][ registers.data[ 31 ].length - 1 ]).to.equal( 10 );
        });

        //~ ADD AN EXPECTED FAIL WHEN A BAD REGISTER IS ACCESSED
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