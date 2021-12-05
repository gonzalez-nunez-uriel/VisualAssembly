export abstract class Registers {
    // can there be an abstract constructor?
    // I want to require/force the implementation of a constructor

    protected abstract toIndex: Map<string, number>;
    protected abstract data: Array< Array<number> >;

    abstract get( register_name: string ): number | undefined;
    abstract set( register_name: string, value: number ): void;
    abstract clear(): void;
    abstract rewind( register_name: string ): void;

}