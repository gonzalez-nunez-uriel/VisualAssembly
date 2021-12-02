export class MIPS_Registers{
    // I am not sure if it works this way, but it looks like declaring these here does not affect the abstract properties
    toIndex: Map< string, number >;
    data: Array< Array< number > >;

    constructor() {
        //super();
        // Initializing values in registers with zeros
        
        this.data = new Array< Array< number > >(32); // not sure if this will work
        /*
        this.data.forEach( register_value_array => {
            register_value_array = new Array< number >();
            register_value_array.push( 0 );
        });*/

        for(let i=0; i < 32; i++) {
            this.data[i] = new Array< number >();
            this.data[i].push( 0 );
        }

        let register_names = ['zero','at','v0','v1','a0','a1','a2','a3','t0','t1','t2','t3','t4','t5','t6','t7','s0','s1','s2','s3','s4','s5','s6','s7','t8','t9','k0','k1','gp','sp','fp','ra'];
        this.toIndex = new Map< string, number >();
        register_names.forEach( ( k, v ) => {
            this.toIndex.set( k, v );
        });
    }

    show() {
        this.toIndex.forEach( (v, k) => {
            console.log(k,' ',v);
        });
    }
}
