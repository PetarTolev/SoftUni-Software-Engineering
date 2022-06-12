declare global {
  interface StringConstructor {
    isNullOrEmpty(value: string | undefined | null): boolean;
  }
}
String.isNullOrEmpty = (value: string | undefined | null) =>
  value === undefined || value === null || value.length === 0;

export { };
