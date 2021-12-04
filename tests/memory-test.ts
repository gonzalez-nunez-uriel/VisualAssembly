import { expect } from 'chai';
import { readFileSync } from 'fs';

import { Memory } from '../src/memory';

describe('Memory Tests', function() {
    it('Loading source into memory', function() {
        let file_name = process.cwd() + '/tests/test-file.s';
        let source = readFileSync(file_name, {encoding: 'utf8', flag:'r'});
        let expected_data = [10,12];
        let expected_text = ['    lw $t0,0($zero)','    lw $t1,4($zero)','    add $t2,$t1,$t0','    sw $t2,0($sp)','    halt'];
    
        let memory = new Memory();
        memory.load_source_into_memory( source );
        expect( memory.data ).to.eql(expected_data);
        expect( memory.text ).to.eql(expected_text);
    });
});