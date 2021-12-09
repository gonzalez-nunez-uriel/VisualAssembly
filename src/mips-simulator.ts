
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

    instructions: any;

    constructor() {
        this.registers = new MIPS_Registers();
        this.memory = new Memory();
        this.isSourceLoaded = false;
        this.instructions = this.build_mips_instructions();
    }

    build_mips_instructions(): Map<string,Function> {

        let instructions = new Map<string,Function>();

        //~ Is it ok to return void and undefined? I think this is disingenuous since void implies that nothings needs to be handled
        instructions.set( 'add', function( args: string, registers: MIPS_Registers ): void | undefined {
            let preprocessed_args = MIPS_Simulator.preprocess_args( args, 3 );

            //~THIS GUARD NEEDS TO BE IMPLEMENTED
            if( !preprocessed_args ) { return undefined; }
            else {
                let addendA = registers.get( preprocessed_args[ 1 ] );
                let addendB = registers.get( preprocessed_args[ 2 ] );

                //~ THIS GUARD NEEDS TO BE IMPLEMENTED
                if( !addendA || !addendB ) { return undefined; }
                else {
                    let value =  addendA + addendB; 
                    registers.set( preprocessed_args[ 0 ], value );
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
        if( !command ) { return undefined; }
        else {
            let opt = this.instructions.get( command.opt );

            //~ THIS GUARD NEEDS TO BE IMPLEMENTED
            if( !opt ) { return undefined; }
            else {
                opt( command.args, this.registers );
            }
        }
    }
/*
    step(): boolean | undefined {
        //~ NEEDS TO BE IMPLEMENTED
        if( !this.isSourceLoaded ) { return undefined; }

        let pc = this.registers.get( 'pc' );

        //~ NEEDS TO BE IMPLEMENTED
        if( !pc ) { return undefined; }
        else {
            let instruction = this.memory.get( pc );

            if( !instruction ) { return undefined; }
            else if( instruction ) {  }
            else {
                this.execute( instruction );
            }
            
        }

       
    }*/



}