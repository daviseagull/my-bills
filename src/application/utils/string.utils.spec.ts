import { StringUtils } from './string.utils'

describe('String utils tests', () => {
  it('Should return capitalize word', () => {
    const value = 'VALUE'

    const result = StringUtils.capitalizeFirstLetter(value)

    expect(result).toBe('Value')
  })
})
