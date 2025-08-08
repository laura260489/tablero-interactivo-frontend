import { DatePipe } from '@angular/common';

/**
 * Utilidades para el manejo de fechas
 */

/**
 * Formatea una fecha usando DatePipe de Angular
 * @param date Fecha en formato ISO, objeto Date o string
 * @param format String de formato (ej: 'dd/MM/yy', 'yyyy-MM-dd', 'MM/dd/yyyy')
 * @returns Fecha formateada como string
 */
export const formatDate = (date: string | Date, format: string): string => {
  try {
    const datePipe = new DatePipe('es-CO');
    return datePipe.transform(date, format) || '';
  } catch (error) {
    return '';
  }
}; 