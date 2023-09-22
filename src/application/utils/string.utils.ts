export class StringUtils {
  public static capitalizeFirstLetter(str: string): string {
    return str.replace(/^\w/, (c) => c.toUpperCase())
  }
}
