/*
The idea is to segment the memory into four parts: the data, the text, the stack, and the stack
All of this is handled internally, so that the other part of the simulator just provide an actual address
while internally that address is handled by the appropriate memory construct.
I have not figured out how to model the heap yet, so for now it only uses the data, stack, and text objs.
*/

//~ optimize latter
function remove_front_whitespaces( text_input: string ): string {
    let index = text_input.indexOf( ' ' );
    while( true ){
        if ( index != 0 )
            break;
        text_input = text_input.slice( 1 );
        index = text_input.indexOf( ' ' );
    }
    return text_input;
}

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
    Stores the actual address where the global variables are stored.
    This is the value that the $gp should be initialized to
    */
    data_root_address: number = 0;

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
        this.text = new Array<string>();
        this.data = new Array<number>();
        this.stack = new Array<number>();
    }

    setProgramCounter( address: number ) {
        this.text_root_address = address;
    }

    setStackPointer( address: number ) {
        this.stack_root_address = address;
    }

    setGlobalPointer( address: number ) {
        this.data_root_address = address;
    }

    getRootAddresses(): [number,number,number] {
        return [this.data_root_address, this.text_root_address, this.stack_root_address];
    }

    load_source_into_memory( source_code: string ) {
        /*
        # THINGS TO IMPLEMENT (in no particular order)
        1) .data and similar should only appear once
        2) .data should go before .text

        This will not work. I need to implement a simple compiler to handle the labels
        But that is going to be challenging. We need a working product now, so this will
        stay as is, the GUI will be implemented and everythin will be up and running. Then
        we come back and refactor out most of this functionality and impement a simple compiler.
        */

        let source_lines = source_code.split( '\n' );

        let address = 0;
        let data_flag = false; // if in .text area then false; if in .data area then true

        source_lines.forEach( line => {
            if( line == '' ) return; // empty lines are ignored
            if( line == '.data' ) { this.setGlobalPointer( address ); data_flag = true; return; }
            if( line == '.text' ) { this.setProgramCounter( address ); data_flag = false; return; }

            if( data_flag ) {
                this.data.push( parseInt( line ) ); //~ This is missing a validation stage and does not support proper compiler directives
            } else {
                this.text.push( remove_front_whitespaces( line ) );
            }

            address += 4;
        });

        this.setStackPointer( address );
    }

    findHandler( address: number ): [ number, Array<string> | Array<number> ]{
        //~ WHAT IF ADDRESS IS OUT OF RANGE?
        /*
        Assumes that this.data_root_address < this.text_root_address < this.stack_root_address
        It also assumes that address is a multiple of 4.
        */
        let virtual_address: number;

        if( address >= this.data_root_address && address < this.text_root_address ) {
            virtual_address = ( address - this.data_root_address ) / 4;
            return [ virtual_address, this.data ];
        }
            
        else if( address >= this.text_root_address && address < this.stack_root_address ){
            virtual_address = ( address - this.text_root_address ) / 4;
            return [ virtual_address, this.text ];
        }
            
        else { // until the heap functionality is implemented, the only option left is the stack
            virtual_address = ( address - this.stack_root_address ) / 4;
            return [ virtual_address, this.stack ];
        }
    }

    get( address: number ): string | number | undefined {
        /*
        Assumes that this.data_root_address < this.text_root_address < this.stack_root_address
        */

        //~ THIS GUARD NEEDS TO BE IMPLEMENTED
        if( !Number.isInteger( address ) || !( address % 4 == 0 )  || ( address < 0 ) ) { return undefined; }
 
        let [ internal_index, mem_handler ] = this.findHandler( address );

        return mem_handler[ internal_index ];
    }
}