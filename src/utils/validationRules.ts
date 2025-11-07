type ValidationRule<T = unknown> = (value: T) => string | boolean;

type StringValue = string | null | undefined;
type NumericValue = number | null | undefined;
type AnyValue = string | number | boolean | null | undefined;

export const validationRules = {

  required: ((value: AnyValue) => !!value || 'Campo requerido') as ValidationRule<AnyValue>,
  

  email: ((value: StringValue) => {
    if (!value) return true;
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value) || 'Email inválido';
  }) as ValidationRule<StringValue>,
  
  minLength: (min: number): ValidationRule<StringValue> => (value: StringValue) => {
    if (!value) return true;
    return value.length >= min || `Mínimo ${min} caracteres`;
  },
  
  maxLength: (max: number): ValidationRule<StringValue> => (value: StringValue) => {
    if (!value) return true;
    return value.length <= max || `Máximo ${max} caracteres`;
  },
  
  numeric: ((value: StringValue) => {
    if (!value) return true;
    return /^\d+$/.test(value) || 'Solo números';
  }) as ValidationRule<StringValue>,
  
  alphanumeric: ((value: StringValue) => {
    if (!value) return true;
    return /^[a-zA-Z0-9]+$/.test(value) || 'Solo letras y números';
  }) as ValidationRule<StringValue>,
  
  phone: ((value: StringValue) => {
    if (!value) return true;
    const pattern = /^[+]?[\d\s()-]+$/;
    return pattern.test(value) || 'Teléfono inválido';
  }) as ValidationRule<StringValue>,
  
  url: ((value: StringValue) => {
    if (!value) return true;
    const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return pattern.test(value) || 'URL inválida';
  }) as ValidationRule<StringValue>,
  
  // Reglas para números
  range: (min: number, max: number): ValidationRule<NumericValue> => (value: NumericValue) => {
    if (value === null || value === undefined) return true;
    return (value >= min && value <= max) || `Debe estar entre ${min} y ${max}`;
  },
  
  min: (min: number): ValidationRule<NumericValue> => (value: NumericValue) => {
    if (value === null || value === undefined) return true;
    return value >= min || `Debe ser mayor o igual a ${min}`;
  },
  
  max: (max: number): ValidationRule<NumericValue> => (value: NumericValue) => {
    if (value === null || value === undefined) return true;
    return value <= max || `Debe ser menor o igual a ${max}`;
  },
  
  // Regla genérica de comparación
  match: <T extends AnyValue>(fieldName: string, compareValue: T): ValidationRule<T> => 
    (value: T) => value === compareValue || `Debe coincidir con ${fieldName}`,
  
  // Reglas compuestas
  requiredEmail: [
    ((value: StringValue) => !!value || 'Email requerido') as ValidationRule<StringValue>,
    ((value: StringValue) => {
      if (!value) return 'Email requerido';
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value) || 'Email inválido';
    }) as ValidationRule<StringValue>
  ],
  
  requiredPassword: [
    ((value: StringValue) => !!value || 'Contraseña requerida') as ValidationRule<StringValue>,
    ((value: StringValue) => {
      if (!value) return 'Contraseña requerida';
      return value.length >= 6 || 'Mínimo 6 caracteres';
    }) as ValidationRule<StringValue>
  ],
  
  requiredNumeric: [
    ((value: NumericValue) => value !== null && value !== undefined || 'Campo requerido') as ValidationRule<NumericValue>,
    ((value: NumericValue) => {
      if (value === null || value === undefined) return 'Campo requerido';
      return !isNaN(value) || 'Debe ser un número válido';
    }) as ValidationRule<NumericValue>
  ],
};