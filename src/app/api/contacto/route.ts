import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * API Route para manejar el envío del formulario de contacto
 * 
 * Esta API simula el procesamiento del formulario y envío de correos.
 * En un entorno real, aquí se conectaría con un servicio de email
 * o se almacenaría en una base de datos.
 */
export async function POST(request: NextRequest) {
  try {
    // Extraer los datos del cuerpo de la petición
    const formData = await request.json();
    
    // Validación básica de los datos
    if (!formData.nombre || !formData.email) {
      return NextResponse.json(
        { error: 'Los campos nombre y email son obligatorios' },
        { status: 400 }
      );
    }
    
    // Validación de formato de email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: 'El formato del email no es válido' },
        { status: 400 }
      );
    }
    
    // En un entorno real, aquí se procesaría el envío del email
    // o se almacenaría en una base de datos
    console.log('Formulario recibido:', formData);
    
    // Simular un retraso para emular procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Devolver respuesta exitosa
    return NextResponse.json({
      success: true,
      message: 'Formulario enviado correctamente'
    });
  } catch (error) {
    console.error('Error al procesar el formulario:', error);
    
    // Devolver error
    return NextResponse.json(
      { error: 'Error al procesar el formulario' },
      { status: 500 }
    );
  }
}