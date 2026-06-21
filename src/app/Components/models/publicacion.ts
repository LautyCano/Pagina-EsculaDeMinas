export class Publicacion {
    id: number;
    titulo: string;
    descripcion: string;
    imagen: string;
    diasRestantes: number;
    tipo: string;
    estado: string;

    constructor(id: number, titulo: string, descripcion: string, imagen: string, diasRestantes: number, tipo: string, estado: string) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.diasRestantes = diasRestantes;
        this.tipo = tipo;
        this.estado = estado;
    }
}

export interface PublicacionResponse {
    publicaciones: Publicacion[];
    total: number;
}
