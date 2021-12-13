
import { Memory } from "./memory";
import { MIPS_Registers } from "./mips-registers";

interface Command {
    opt: string,
    args: string | null;
}

export class MIPS_Simulator {

    registers: MIPS_Registers;
    memory: Memory;
    isSourceLoaded: boolean;

    instructions: Map<string,Function>;

    constructor() {
        this.registers = new MIPS_Registers();
        this.memory = new Memory();
        this.isSourceLoaded = false;
        this.instructions = this.build_mips_instructions();
    }

    build_mips_instructions(): Map<string,Function> {

        let instructions = new Map<string,Function>();

        //~ Is it ok to return void and undefined? I think this is disingenuous since void implies that nothings needs to be handled
        instructions.set( 'add', function( args: string, registers: MIPS_Registers, memory: Memory ): void | undefined {
            let preprocessed_args = MIPS_Simulator.preprocess_args( args, 3 );

            //~THIS GUARD NEEDS TO BE IMPLEMENTED
            if( preprocessed_args == undefined ) { return undefined; }
            else {
                let addendA = registers.get( preprocessed_args[ 1 ] );
                let addendB = registers.get( preprocessed_args[ 2 ] );

                //~ THIS GUARD NEEDS TO BE IMPLEMENTED
                if( addendA == undefined || addendB == undefined ) { return undefined; }
                else {
                    let value =  addendA + addendB; 
                    registers.set( preprocessed_args[ 0 ], value );
                }   
            }   
        });
        
        instructions.set( 'lw', function( args: string, registers: MIPS_Registers, memory: Memory ): void | undefined {
            let preprocessed_args = MIPS_Simulator.preprocess_args( args, 2 );

            //~ THIS GUARD NEEDS TO BE IMPLEMENTED
            if( preprocessed_args == undefined ) { return undefined; }
            else {
                let target_reg = preprocessed_args[ 0 ];

                let slice_index = preprocessed_args[ 1 ].indexOf( '(' );
                let offset = parseInt( preprocessed_args[ 1 ].slice( 0, slice_index ) );
                let address_reg = preprocessed_args[ 1 ].slice( slice_index ).replace( '(', '' ).replace( ')', '' );

                let reg_address_base = registers.get( address_reg );

                //~ THIS GUARD NEEDS TO BE IMPLEMENTED
                if( reg_address_base == undefined ) { return undefined; }
                else {
                    let address = offset + reg_address_base;
                    let value = memory.get( address );
                    
                    /*
                    ~ I had an issue with the type compiler in TS. Originally I only had the guard
                    Number.isInteger() but I guess the TS analyzer cannot understand what it means.
                    As I understand, this guard is more than enough nut TS cannot handle it.
                    We should consider reporting it. Here is the original code:

                    if( Number.isInteger( value ) ){
                        registers.set( target_reg, value );
                    }
                    else { //~ THIS GUARD NEEDS TO BE IMPLEMENTED
                        return undefined;
                    }

                    And here is its previous form:
                    
                    if( !Number.isInteger( value ) ) { return undefined; }
                    else {
                        registers.set( target_reg, value );
                    }

                    */
                   //~ what about float values? There are registers for that, right?
                    if( (typeof value == "number" ) && Number.isInteger( value ) ){
                        registers.set( target_reg, value );
                    }
                    else { //~ THIS GUARD NEEDS TO BE IMPLEMENTED
                        return undefined;
                    } 
                }
            }
        });

        return instructions;
    }

    //~ I had to make this method static in order to access it directly @ MIPS_Simulator.build_mips_instructions
    //~ Is this the right way to do it? It is possible to make it private
    static preprocess_args( args: string, expected_num_of_args: number): string[] | undefined {
        let processed_args = args.replaceAll( ' ', '' ).split( ',' );
        if( processed_args.length == expected_num_of_args ) {
            return processed_args;
        } else { return undefined; }
    }

    load_source_into_memory( source: string ) {
        this.memory.load_source_into_memory( source );
        this.isSourceLoaded = true;
    }

    parse_mips( instruction: string ): Command | undefined {
        let index = instruction.indexOf( ' ' );
        let command: Command;

        if( index == -1 ) {
            command = {
                opt: instruction,
                args: null
            }
        }
        else {
            command =  {
                opt: instruction.slice( 0, index ), 
                args: instruction.slice( index + 1 )
            }
        }

        return command;
    }

    execute( instruction: string ): boolean | undefined {
        let command = this.parse_mips( instruction );

        //~ THIS GUARD NEEDS TO BE IMPLEMENTED
        if( command == undefined ) { return undefined; }
        else {
            let opt = this.instructions.get( command.opt );

            //~ THIS GUARD NEEDS TO BE IMPLEMENTED
            if( opt == undefined ) { return undefined; }
            else {
                opt( command.args, this.registers, this.memory );
            }
        }
    }
/*
    step(): boolean | undefined {
        //~ NEEDS TO BE IMPLEMENTED
        if( !this.isSourceLoaded ) { return undefined; }

        let pc = this.registers.get( 'pc' );

        //~ NEEDS TO BE IMPLEMENTED
        if( pc == undefined) { return undefined; }
        else {
            let instruction = this.memory.get( pc );

            if( instruction == undefined) { return undefined; }
            else if( instruction ) {  }
            else {
                this.execute( instruction );
            }
            
        }

       
    }*/



}