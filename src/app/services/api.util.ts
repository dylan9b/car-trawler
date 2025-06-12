import { CarModel } from "../car/_model/car.model";

export function sanitizeKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(sanitizeKeys) as CarModel;
  } else if (obj !== null && typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // Remove '@' prefix
        let newKey = key.startsWith('@') ? key.slice(1) : key;

        // Convert to camelCase (or just lowercase first letter)
        newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1);

        // Recurse
        newObj[newKey] = sanitizeKeys(obj[key]);
      }
    }
    return newObj;
  }
  return obj as CarModel;
}
