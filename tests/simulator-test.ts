import { expect } from 'chai';

import { MIPS_Simulator } from '../src/mips-simulator';

describe('Simulator Tests', function() {
    context('Testing Arithmetic Instructions', function() {
        
        let simulator: MIPS_Simulator;

        beforeEach( function() {
            simulator = new MIPS_Simulator();
            simulator.registers.set('$t0',1);
            simulator.registers.set('$t1',1);
        });

        it('Testing Addition', function() {
            let instruction = 'add $t2, $t1, $t0';
            simulator.execute( instruction );
            expect( simulator.registers.get( '$t2' ) ).to.equal( 2 );
        });
    });
});
