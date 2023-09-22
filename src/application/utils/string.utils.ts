export class StringUtils {
  public static capitalizeFirstLetter(value: string): string {
    value = value.toLocaleLowerCase()
    return value.replace(/^\w/, (c) => c.toUpperCase())
  }
}
