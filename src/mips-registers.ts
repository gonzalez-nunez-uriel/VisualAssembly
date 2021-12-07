import { Registers } from './registers';

export class MIPS_Registers extends Registers{
    // I am not sure if it works this way, but it looks like declaring these here does not affect the abstract properties
    // Abstract properties are not allowed in Java. Are they allowed in TS?
    /*
    These variables should be private, but are left not private for the purpose of
    testing. I wish there was a way for private fields to be accessible to a testing
    framework for the sake of testing.
    */
    toIndex: Map<string, number>;
    data: Array< Array<number> >;

    constructor() {
        super();
        // Initializing values in registers with zeros
        
        this.data = new Array< Array<number> >( 32 );
        /*
        For the previous line and the commented block of code that follows:
        JS has a rather clumsy way to handle uninitialized objects. In the previous
        line I had to indicate the number of them. Otherwise I would have had to create
        them one by one, in a loop similar to the one below. I think there is a better way
        to do this. Anyway, writting this reminded me of the old days of Java. I have to say
        I do not like to program like this anymore and perhaps slightly regret switching to
        TypeScript. In something more Pythonic, I could just go
        for i in range(32):
            t = new Array< number >();
            t.push( 0 );
            data.push( t );

        I guess there is no way to avoid hardcoding the 32 - I mean, after all there are 32 registers.
        I think the code is good as is, but definetely a point of reflection.
        Thinking further about it, this is the only way. From a memory/object point of view, no language
        or technology can improve this, because this is as good as it gets. To have an array of k objects
        you need to create/assign the k objects and then assign them to the array. That is the only way.
        It still pisses me off that TS failed silently when I was trying to push on an undefined obj.
        */

        /*
        this.data.forEach( register_value_array => {
            register_value_array = new Array< number >();
            register_value_array.push( 0 );
        });*/

        for( let i = 0; i < 32; i++ ) {
            this.data[ i ] = new Array<number>();
            this.data[ i ].push( 0 );
        }

        let register_names = ['$zero','$at','$v0','$v1','$a0','$a1','$a2','$a3','$t0','$t1','$t2','$t3','$t4','$t5','$t6','$t7','$s0','$s1','$s2','$s3','$s4','$s5','$s6','$s7','$t8','$t9','$k0','$k1','$gp','$sp','$fp','$ra'];
        this.toIndex = new Map<string, number>();
        register_names.forEach( ( k, v ) => {
            this.toIndex.set( k, v );
        });
    }

    clear(): void {
        this.constructor();
    }

    private getDataIndex( register_name: string ): number | undefined {
        return this.toIndex.get( register_name );
    }

    get( register_name: string ): number | undefined {
        let data_index = this.getDataIndex( register_name );
        if( !data_index ) { // if data_index is undefined or null
            /*
            This means that the register_name provided is not recognized.
            */
            //~ HANDLE ERROR CASE
            return undefined;
        } else {
            let register_data_array = this.data[ data_index ];
            let last_index = register_data_array.length - 1;
            return register_data_array[ last_index ];
        }
    }

    set( register_name: string, value: number ): void {
        let data_index = this.getDataIndex( register_name );
        if( !data_index ) { // if data_index is undefined or null
            /*
            This means that the register_name provided is not recognized.
            */
            //~ HANDLE ERROR CASE
        } else {
            let register_data_array = this.data[ data_index ];
            register_data_array.push( value );
        }
    }

    rewind( register_name: string ): void {
        let data_index = this.getDataIndex( register_name );
        if( !data_index ) { // if data_index is undefined or null
            /*
            This means that the register_name provided is not recognized.
            */
            //~ HANDLE ERROR CASE
        } else {
            let register_data_array = this.data[ data_index ];
            register_data_array.pop();
        }
    }
}
