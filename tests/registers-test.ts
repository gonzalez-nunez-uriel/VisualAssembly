import { expect } from 'chai';
import { beforeEach } from 'mocha';

import { MIPS_Registers } from '../src/mips-registers';

// new comment to test if branch rename worked
describe('Register Tests', function() {
    let registers: MIPS_Registers;
    const register_names = ['$zero','$at','$v0','$v1','$a0','$a1','$a2','$a3','$t0','$t1','$t2','$t3','$t4','$t5','$t6','$t7','$s0','$s1','$s2','$s3','$s4','$s5','$s6','$s7','$t8','$t9','$k0','$k1','$gp','$sp','$fp','$ra'];

    beforeEach( function() { // before each data manipulation test
        registers = new MIPS_Registers();
    });

    it('Testing constructor', function() {
        proper_init( registers );
    });

    it('Testing clear() method', function() {
        proper_init( registers );
    });

    context('Testing data manipulation', function() {

        

        context('Testing get and set methods', function() {
            it('Simple set and get', function() {
                registers.set( '$t0', 1 );
                let value = registers.get( '$t0' );
                expect( value ).to.equal( 1 );
            });

            it('Multiple sets one get', function() {
                registers.set( '$t0', 1 );
                registers.set( '$t0', 2 );
                registers.set( '$t0', 3 );
                let value = registers.get( '$t0' );
                expect( value ).to.equal( 3 );
            });

            it('Set and get on each register', function() {
                
                let value: number | undefined;
                for( let i = 0; i < 32; i++ ) {
                    registers.set( register_names[i], i );
                    value = registers.get( register_names[i] );
                    expect( value ).to.equal( i );
                }
            });
        });

        context('Testing rewind method', function() {
            it('Single rewind', function() {
                registers.set( '$v0', 1 );
                registers.set( '$v0', 2 );
    
                registers.rewind( '$v0' );
    
                expect( registers.get( '$v0' ) ).to.equal( 1 );
            });
    
            it('Multiple rewinds on the same register', function() {
                registers.set( '$t0', 1 );
                registers.set( '$t0', 2 );
                registers.set( '$t0', 3 );
                registers.set( '$t0', 4 );
    
                registers.rewind( '$t0' );
                registers.rewind( '$t0' );
    
                expect( registers.get( '$t0' ) ).to.equal( 2 );
            });
    
            it('Rewind until initial value', function() {
                registers.set( '$t0', 1 );
                registers.set( '$t0', 2 );
                registers.set( '$t0', 3 );
    
                registers.rewind( '$t0' );
                registers.rewind( '$t0' );
                registers.rewind( '$t0' );
    
                expect( registers.get( '$t0' ) ).to.equal( 0 );
            });

            //~ It might be a good idea for someone else to look at this test and confirm it works
            it('Testing rewind method on every register', function() {
                const MAX = 10;
                let k: number;
                for( let i = 0; i < 32; i++ ) { // loop through all 32 registers
                    k = Math.floor( Math.random() * MAX ) + 1; // select a random number of values to set and rewind
                    
                    for( let j = 0; j < k; j++ ){ // for a random number of times, set values
                        registers.set( register_names[i], i + j );
                    }

                    expect( registers.get( register_names[i]) ).to.equal( i + k - 1 );

                    for( let j = k - 1; j > 0; j-- ){
                        registers.rewind( register_names[i] );
                        expect( registers.get( register_names[i] ) ).to.equal( i + j - 1 );
                    }
                    
                    registers.rewind( register_names[i] );
                    expect( registers.get( register_names[i]) ).to.equal( 0 ); 
                }
            });
    
            /*
            TODO
            Once there is error handling, it needs to rewind past the initial value an throw an error.
            */
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
function proper_init( registers: MIPS_Registers) {
    
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
    
    it('The register names are mapped correctly', function() {
        let register_names = ['$zero','$at','$v0','$v1','$a0','$a1','$a2','$a3','$t0','$t1','$t2','$t3','$t4','$t5','$t6','$t7','$s0','$s1','$s2','$s3','$s4','$s5','$s6','$s7','$t8','$t9','$k0','$k1','$gp','$sp','$fp','$ra'];
         registers.toIndex.forEach((v,k) => {
             expect( register_names.includes( k ) ).to.equal( true );
         });
    });
}
