/*
The idea is to segment the memory into four parts: the data, the text, the stack, and the stack
All of this is handled internally, so that the other part of the simulator just provide an actual address
while internally that address is handled by the appropriate memory construct.
I have not figured out how to model the heap yet, so for now it only uses the data, stack, and text objs.
*/

export class Memory {

    // default value given so that compiler does not complain
    /*
    Stores the actual address where the text starts.
    This is the value that $pc should be initialized to
    */
    text_root_address: number = 0;
    /*
    Stores the actual address where the stack starts.
    This is the value that $sp should be initialized to
    */
    stack_root_address: number = 0;

    /*
    Instructions will be stored as is inside this array of strings and executed one by one.
    Perhaps some preprossecing could be done, like removing any unnecessary whitespaces
    */
    text: string[];
    /*
    data stores all global variables as numbers. The downside is that
    characters must be handled as numbers (which is not that bad).
    */
    data: number[];
    /*
    Stores values the same way as this.data
    */
    stack: number[];

    constructor() {
        this.text = new Array< string >();
        this.data = new Array< number >();
        this.stack = new Array< number >();
    }

    setProgramCounter( address: number ) {
        this.text_root_address = address;
    }

    setStackPointer( address: number ) {
        this.stack_root_address = address;
    }

    load_source_into_memory( source_code: string ) {
        let source_lines = source_code.split( '\n' );

        let address = 0;
        let data_flag = false; // if in .text area then false; if in .data area then true

        source_lines.forEach( line => {
            if( line == '' ) return; // empty lines are ignored
            if( line == '.data' ) { data_flag = true; return; }
            if( line == '.text' ) { this.setProgramCounter( address ); data_flag = false; return; }

            if( data_flag ) {
                this.data.push( parseInt( line ) ); //~ This is missing a validation stage and does not support proper compiler directives
            } else {
                this.text.push( line ); // removing initial whitespaces could be done here
            }

            address += 4;
        });

        this.setStackPointer( address );
    }
}