export class Vehiculo {
    constructor(
        public _id: string,
        public marca: string,
        public modelo: string,
        public disponibilidad: boolean,
        public image: string,
        public descripcion: string,
        public precio: number
    ) {}
}