import { expect, it, test } from '@jest/globals';

function getCapitalizeFirstWord(name: string): string {
  if (name == null) {
    throw new Error('Failed to capitalize first word with null');
  }
  if (!name) {
    return name;
  }
  return name.split(' ').map(
    n => n.length > 1 ? (n.substring(0, 1).toUpperCase() + n.substring(1).toLowerCase()) : n
  ).join(' ');
}

// CHECKME:
test('1. test capitalize', () => {
  const result = getCapitalizeFirstWord('test capitalize');
  expect(result).toBe('Test Capitalize');
});

// CHECKME:
test('2. test empty string', () => {
  const result = getCapitalizeFirstWord('');
  expect(result).toBeUndefined;
});

// CHECKME:
test('3. test throw error', () => {
  expect(() => getCapitalizeFirstWord(null)).toThrow();
});
