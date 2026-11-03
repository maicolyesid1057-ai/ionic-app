import { Libro } from "../libro/libro";

export interface Lista {
    id: string;
    nombre: string;
    descripcion?: string;
    portada?: string;
    cantidad: number;
    origen: 'local' | 'openLibrary'
    libros: Libro[]
}