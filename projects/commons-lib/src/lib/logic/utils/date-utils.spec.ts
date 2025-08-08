import { formatDate } from './date-utils';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es-CO');

describe('DateUtils', () => {
  describe('formatDate', () => {
    it('debería formatear una fecha ISO a formato dd/MM/yy', () => {
      const fechaISO = '2025-07-14T19:38:28.524Z';
      const resultado = formatDate(fechaISO, 'dd/MM/yy');
      expect(resultado).toBe('14/07/25');
    });

    it('debería formatear una fecha Date a formato dd/MM/yy', () => {
      const fecha = new Date('2025-07-14T19:38:28.524Z');
      const resultado = formatDate(fecha, 'dd/MM/yy');
      expect(resultado).toBe('14/07/25');
    });

    it('debería formatear una fecha a formato yyyy-MM-dd', () => {
      const fechaISO = '2025-07-14T19:38:28.524Z';
      const resultado = formatDate(fechaISO, 'yyyy-MM-dd');
      expect(resultado).toBe('2025-07-14');
    });

    it('debería formatear una fecha a formato MM/dd/yyyy', () => {
      const fechaISO = '2025-07-14T19:38:28.524Z';
      const resultado = formatDate(fechaISO, 'MM/dd/yyyy');
      expect(resultado).toBe('07/14/2025');
    });

    it('debería formatear una fecha a formato dd MMM yyyy', () => {
      const fechaISO = '2025-07-14T19:38:28.524Z';
      const resultado = formatDate(fechaISO, 'dd MMM yyyy');
      expect(resultado).toBe('14 jul 2025');
    });

    it('debería formatear una fecha a formato dd MMMM yyyy', () => {
      const fechaISO = '2025-07-14T19:38:28.524Z';
      const resultado = formatDate(fechaISO, 'dd MMMM yyyy');
      expect(resultado).toBe('14 julio 2025');
    });

    it('debería manejar fechas con diferentes meses', () => {
      const fechaEnero = '2025-01-15T19:38:28.524Z';
      const resultadoEnero = formatDate(fechaEnero, 'dd MMMM yyyy');
      expect(resultadoEnero).toBe('15 enero 2025');

      const fechaDiciembre = '2025-12-25T19:38:28.524Z';
      const resultadoDiciembre = formatDate(fechaDiciembre, 'dd MMMM yyyy');
      expect(resultadoDiciembre).toBe('25 diciembre 2025');
    });

    it('debería manejar fechas con diferentes años', () => {
      const fecha2024 = '2024-07-14T19:38:28.524Z';
      const resultado2024 = formatDate(fecha2024, 'dd/MM/yy');
      expect(resultado2024).toBe('14/07/24');

      const fecha2026 = '2026-07-14T19:38:28.524Z';
      const resultado2026 = formatDate(fecha2026, 'dd/MM/yy');
      expect(resultado2026).toBe('14/07/26');
    });

    it('debería manejar fechas con días de un solo dígito', () => {
      const fecha = '2025-07-05T19:38:28.524Z';
      const resultado = formatDate(fecha, 'dd/MM/yy');
      expect(resultado).toBe('05/07/25');
    });

    it('debería manejar fechas con meses de un solo dígito', () => {
      const fecha = '2025-03-14T19:38:28.524Z';
      const resultado = formatDate(fecha, 'dd/MM/yy');
      expect(resultado).toBe('14/03/25');
    });

    it('debería retornar string vacío para fecha inválida', () => {
      const fechaInvalida = 'fecha-invalida';
      const resultado = formatDate(fechaInvalida, 'dd/MM/yy');
      expect(resultado).toBe('');
    });

    it('debería manejar fecha null o undefined', () => {
      const resultadoNull = formatDate(null as any, 'dd/MM/yy');
      expect(resultadoNull).toBe('');

      const resultadoUndefined = formatDate(undefined as any, 'dd/MM/yy');
      expect(resultadoUndefined).toBe('');
    });

    it('debería formatear fecha con formato personalizado', () => {
      const fecha = '2025-07-14T19:38:28.524Z';
      const resultado = formatDate(fecha, 'EEEE, dd \'de\' MMMM \'de\' yyyy');
      expect(resultado).toBe('lunes, 14 de julio de 2025');
    });

    it('debería manejar diferentes zonas horarias', () => {
      const fechaUTC = '2025-07-14T19:38:28.524Z';
      const fechaLocal = '2025-07-14T19:38:28.524';
      
      const resultadoUTC = formatDate(fechaUTC, 'dd/MM/yy');
      const resultadoLocal = formatDate(fechaLocal, 'dd/MM/yy');
      
      expect(resultadoUTC).toBe('14/07/25');
      expect(resultadoLocal).toBe('14/07/25');
    });
  });
}); 