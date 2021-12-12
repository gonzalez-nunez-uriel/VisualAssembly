import { expect } from 'chai';
import { readFileSync } from 'fs';
import { beforeEach } from 'mocha';

import { Memory } from '../src/memory';

describe('Memory Tests', function() {

    let memory: Memory;
    let source = readFileSync(  process.cwd() + '/tests/test-file.s', { encoding: 'utf8', flag: 'r' } );

    beforeEach( function() {
        memory = new Memory();
    });

    it('Loading source into memory', function() {
        
        let expected_data = [ 10, 12 ];
        let expected_text = [ 'lw $t0,0($zero)', 'lw $t1,4($zero)', 'add $t2,$t1,$t0', 'sw $t2,0($sp)', 'halt' ];
    
        memory.load_source_into_memory( source );
        expect( memory.data ).to.eql( expected_data );
        expect( memory.text ).to.eql( expected_text );
    });
    
    it('Initializing root addresses', function() {
        /*
        //~ It would be useful to chain this test with the previous one
        If load_source_into_memory fails, then this test will fail to. It would be nice not to run this test if the
        previous one fails. Otherwise, we would think that two things are broken when it could be the case that it is
        only one.
        */
        memory.load_source_into_memory( source );

        let [ data_root, text_root, stack_root ] = memory.getRootAddresses();
        expect( data_root ).to.equal( 0 );
        expect( text_root ).to.equal( 8 );
        expect( stack_root ).to.equal( 28 );

    });

    it('Get instructions at root', function() {
        memory.load_source_into_memory( source );

        let some_instruction_at_root = memory.get( 8 );
        
        expect( some_instruction_at_root ).to.eql( 'lw $t0,0($zero)' );
    });

    it('Get instructions', function() {
        memory.load_source_into_memory( source );

        let some_instruction = memory.get( 20 ); 
        
        expect( some_instruction ).to.eql( 'sw $t2,0($sp)' );
    });

    it('Get values at root', function() {
        memory.load_source_into_memory( source );

        let some_data_at_root = memory.get( 0 );

        expect( some_data_at_root ).to.equal( 10 );
    });

    it('Get values', function() {
        memory.load_source_into_memory( source );
        
        let some_data = memory.get( 4 );

        expect( some_data ).to.equal( 12 );
    });
});