/**
 * Definiciones de tipos para toda la aplicación
 * Centraliza los tipos compartidos entre diferentes componentes
 */

// Tipo para los testimonios de alumnos
export interface Testimonio {
  id: string;
  nombre: string;
  rol: string;
  texto: string;
  avatar?: string;
  permiso: string;
  fecha: string;
}

// Tipo para los servicios ofrecidos
export interface Servicio {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string;
  precio: number | string;
  caracteristicas: string[];
  tipoPermiso?: string;
}

// Tipo para información de contacto
export interface ContactoInfo {
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  telefono: string;
  email: string;
  horarios: {
    diasLaborables: string;
    sabados: string;
    domingos: string;
  };
}

// Tipo para formulario de contacto
export interface FormularioContacto {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje?: string;
  permiso?: string;
}

// Tipo para preguntas frecuentes
export interface FAQ {
  id: string;
  pregunta: string;
  respuesta: string;
  categoria?: string;
}