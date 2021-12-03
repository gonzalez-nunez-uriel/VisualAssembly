import { expect } from 'chai';
import { MIPS_Registers } from '../src/mips-registers';

describe("Register Tests", function() {
    context("Testing constructor", function() {
        let registers = new MIPS_Registers();
        it("Has 32 registers", function() {
            expect(registers.data.length).to.equal(32);
        });
        it("All registers are initialized to zero", function() {
            for(let i=0; i < 32; i++) {
                expect(registers.data[i][0]).to.equal(0);
            }
        });
        //it("There are 32 register names");
        //it("The register names are mapped correctly");
    });
});