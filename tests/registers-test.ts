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
        });

        // WARNING: Tightly coupled test
        it('Testing set() method', function() {
            registers.set( '$t1', 5 );
            let length = registers.data[ 9 ].length;
            expect(registers.data[ 9 ][ length - 1 ]).to.equal( 5 );
        });

        it('Testing multiple sets on different registers', function() {
            registers.set( '$t1', 5 );
            registers.set( '$t2', 6 );
            registers.set( '$ra', 10 );

            expect( registers.get( '$t1' ) ).to.equal( 5 );
            expect( registers.get( '$t2' ) ).to.equal( 6 );
            expect( registers.get( '$ra' ) ).to.equal( 10 );
        });

        it('Tesing multiple sets on the same register', function() {
            registers.set( '$t1', 5 );
            registers.set( '$t1', 6 );
            registers.set( '$t1', 10 );

            expect( registers.get( '$t1' ) ).to.equal( 10 );
        });

        // WARNING: Tightly coupled test
        it('Tesing internal representation of multiple sets on the same register', function() {
            registers.set( '$t1', 5 );
            registers.set( '$t1', 6 );
            registers.set( '$t1', 10 );

            expect( registers.data[ 9 ] ).to.eql( [0,5,6,10] );
        });

        it('Testing get() method', function() {
            registers.set( '$t0', 4 );
            let value = registers.get( '$t0' );
            expect( value ).to.equal( 4 );
        })

        it('Testing multiple gets on different registers', function() {
            registers.set( '$t0', 4 );
            //registers.data[ 9 ].push( 5 );
            registers.set( '$t1', 5 );
            //registers.data[ 31 ].push( 10 );
            registers.set( '$ra', 10 );

            let value1 = registers.get( '$t0' );
            let value2 = registers.get( '$t1' );
            let value3 = registers.get( '$ra' );

            expect( value1 ).to.equal( 4 );
            expect( value2 ).to.equal( 5 );
            expect( value3 ).to.equal( 10 );
        });

        //~ ADD AN EXPECTED FAIL WHEN A BAD REGISTER IS ACCESSED
    });

    context('Testing rewind method', function() {
        let registers: MIPS_Registers;

        beforeEach( function() {
            registers = new MIPS_Registers();
        });

        it('Testing one rewind', function() {
            registers.set( '$t0', 5 );
            registers.set( '$t0', 8 );
    
            registers.rewind( '$t0' );
    
            expect( registers.get( '$t0' ) ).to.equal( 5 );
        });

        it('Testing two rewinds', function() {
            registers.set( '$t0', 5 );
            registers.set( '$t0', 8 );
            registers.set( '$t0', 10 );

            registers.rewind( '$t0' );
            registers.rewind( '$t0' );

            expect( registers.get( '$t0' ) ).to.equal( 5 );
        });

        it('Testing rewing all the way to init value', function() {
            registers.set( '$t0', 5 );
            registers.set( '$t0', 8 );
            registers.set( '$t0', 10 );

            registers.rewind( '$t0' );
            registers.rewind( '$t0' );
            registers.rewind( '$t0' );

            expect( registers.get( '$t0' ) ).to.equal( 0 );
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