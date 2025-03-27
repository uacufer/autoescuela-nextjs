"use client";

import React, { useState } from 'react';
import { enviarFormularioContacto } from '@/utils/api';
import { FormularioContacto } from '@/types';

/**
 * Componente de Formulario de Contacto
 * 
 * Formulario para que los usuarios soliciten información o se pongan en contacto
 * con la autoescuela. Incluye validación básica de campos y manejo de estados.
 * Se conecta con la API para enviar los datos.
 */
const ContactForm: React.FC = () => {
  // Estado inicial del formulario
  const [formData, setFormData] = useState<FormularioContacto>({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
    permiso: 'B'
  });

  // Estado para mensajes de error y éxito
  const [errors, setErrors] = useState<Partial<FormularioContacto>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  /**
   * Maneja los cambios en los campos del formulario
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Elimina el error del campo cuando el usuario comienza a escribir
    if (errors[name as keyof FormularioContacto]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    // Resetea mensaje de error de API si estaba presente
    if (apiError) {
      setApiError(null);
    }
  };

  /**
   * Valida los campos del formulario antes de enviar
   */
  const validateForm = (): boolean => {
    const newErrors: Partial<FormularioContacto> = {};
    
    // Validación de nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }
    
    // Validación de email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }
    
    // Validación opcional de teléfono si se proporciona
    if (formData.telefono && !/^\d{9}$/.test(formData.telefono)) {
      newErrors.telefono = 'El formato del teléfono no es válido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setApiError(null);
    
    try {
      const result = await enviarFormularioContacto(formData);
      
      if (result.success) {
        // Éxito
        setSubmitSuccess(true);
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          mensaje: '',
          permiso: 'B'
        });
        
        // Reset del estado de éxito después de 5 segundos
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        // Error
        setApiError(result.error || 'Error al enviar el formulario. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setApiError('Error al enviar el formulario. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {submitSuccess ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p className="font-medium">¡Mensaje enviado con éxito!</p>
          <p className="text-sm">Nos pondremos en contacto contigo lo antes posible.</p>
        </div>
      ) : null}
      
      {apiError ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p className="font-medium">Error</p>
          <p className="text-sm">{apiError}</p>
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Nombre */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre Completo *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.nombre ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Tu nombre completo"
          />
          {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
        </div>
        
        {/* Campo Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="tu.email@ejemplo.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        
        {/* Campo Teléfono */}
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.telefono ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="123456789"
          />
          {errors.telefono && <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>}
        </div>
        
        {/* Permiso de interés */}
        <div>
          <label htmlFor="permiso" className="block text-sm font-medium text-gray-700 mb-1">
            Permiso de interés
          </label>
          <select
            id="permiso"
            name="permiso"
            value={formData.permiso}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="B">Permiso B (Coche)</option>
            <option value="A">Permiso A (Moto)</option>
            <option value="C">Permiso C (Camión)</option>
            <option value="D">Permiso D (Autobús)</option>
            <option value="Otros">Otros permisos/servicios</option>
          </select>
        </div>
        
        {/* Campo Mensaje */}
        <div>
          <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="¿En qué podemos ayudarte?"
          ></textarea>
        </div>
        
        {/* Botón de envío */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;