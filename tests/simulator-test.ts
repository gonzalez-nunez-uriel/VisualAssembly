import { expect } from 'chai';

import { MIPS_Simulator } from '../src/mips-simulator';

describe('Simulator Tests', function() {
    context('Testing Arithmetic Instructions', function() {
        
        let simulator: MIPS_Simulator;

        beforeEach( function() {
            simulator = new MIPS_Simulator();
            simulator.registers.set( '$t0',1 );
            simulator.registers.set( '$t1',1 );
            simulator.memory.data_root_address = 0;
            simulator.memory.text_root_address = 100; // arbitrarily large numbers
            simulator.memory.stack_root_address = 200;
        });

        it('Testing Addition', function() {
            let instruction = 'add $t2, $t1, $t0';
            simulator.execute( instruction );
            expect( simulator.registers.get( '$t2' ) ).to.equal( 2 );
        });

        it('Testing Load Word', function() {
            simulator.memory.set( 4, 32 );
            let instruction = 'lw $t3, 4($zero)';
            simulator.execute( instruction );
            expect( simulator.registers.get( '$t3' ) ).to.equal( 32 );
        });

        it('Testing Store Word', function() {
            simulator.registers.set( '$t3', 32);
            let instruction = 'sw $t3, 4($zero)';
            simulator.execute( instruction );
            expect( simulator.memory.get( 4 ) ).to.equal( 32 );
        });
    });
});
