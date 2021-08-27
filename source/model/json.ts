type JsonPrimitive = string | number | boolean | null;
interface iJsonMap extends Record<string, JsonPrimitive | iJsonArray | iJsonMap> {}
interface iJsonArray extends Array<JsonPrimitive | iJsonArray | iJsonMap> {}
type Json = JsonPrimitive | iJsonMap | iJsonArray;

export { iJsonMap, iJsonArray, Json, JsonPrimitive };
