/**
 * Utilidades para conexión con API
 * 
 * Contiene funciones helper para realizar peticiones HTTP 
 * a los endpoints de la aplicación
 */

import { FormularioContacto } from '@/types';

/**
 * Envía el formulario de contacto a la API
 * @param formData Datos del formulario de contacto
 * @returns Respuesta de la API
 */
export async function enviarFormularioContacto(formData: FormularioContacto) {
  try {
    const response = await fetch('/api/contacto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al enviar el formulario');
    }

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error en enviarFormularioContacto:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
}

/**
 * Función para obtener datos mockados (simulación) para desarrollo
 * @param endpoint Endpoint simulado
 * @returns Datos mockados correspondientes al endpoint
 */
export async function obtenerDatosMock(endpoint: string) {
  // Esta función se usaría para simular respuestas de API durante desarrollo
  switch (endpoint) {
    case 'testimonios':
      return {
        success: true,
        data: [
          {
            id: '1',
            nombre: 'María García',
            rol: 'Alumna',
            texto: 'Excelente experiencia. Aprobé a la primera gracias a los profesores.',
            permiso: 'B',
            fecha: '2023-10-15'
          },
          {
            id: '2',
            nombre: 'Carlos Rodríguez',
            rol: 'Alumno',
            texto: 'Las clases prácticas son muy completas. Recomendaría esta autoescuela sin duda.',
            permiso: 'A',
            fecha: '2023-11-20'
          },
        ]
      };
    
    case 'servicios':
      return {
        success: true,
        data: [
          {
            id: '1',
            titulo: 'Permiso B',
            descripcion: 'Formación completa para conducir turismos',
            icono: 'coche',
            precio: 650,
            caracteristicas: [
              'Manual teórico actualizado',
              'Clases teóricas presenciales',
              'Prácticas en ciudad y carretera'
            ],
            tipoPermiso: 'B'
          },
          {
            id: '2',
            titulo: 'Permiso A',
            descripcion: 'Aprende a conducir motocicletas con seguridad',
            icono: 'moto',
            precio: 500,
            caracteristicas: [
              'Equipamiento incluido',
              'Prácticas en circuito cerrado',
              'Técnicas de conducción segura'
            ],
            tipoPermiso: 'A'
          }
        ]
      };
    
    default:
      return {
        success: false,
        error: 'Endpoint no encontrado'
      };
  }
}