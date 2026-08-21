import {
  replaceInstanceof,
  replaceExpressionMethods,
  replaceObjects,
  replaceObjectProperties,
} from '../utils'

export const report = () => 'Converts Funcion methods to JavaScript'

export const methods = new Map<string, string>([
  ['aplicar', 'apply'],
  ['enlazar', 'bind'],
  ['llamar', 'call'],
  ['aCadena', 'toString']
])

export const properties = new Map<string, string>([
  ['argumentos', 'arguments'],
  ['llamador', 'caller'],
  ['nombreMostrado', 'displayName'],
  ['longitud', 'length'],
  ['nombre', 'name']
])

export const objects = new Map<string, string>([['Funcion', 'Function']])

export function replace() {
  return {
    ...replaceInstanceof({
      from: 'Funcion',
      to: 'Function',
    }),
    ...replaceExpressionMethods({
      methods,
    }),
    ...replaceObjectProperties({
      properties,
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
