export const editYears = (str: string) => {
  const numbers = str.match(/\d/g)?.join('')
  return numbers ? numbers.slice(0,4) : ''
}

export const editBudget = (str: string) => {
  const numbers = str.match(/\d/g)?.join('')
  return numbers ? numbers : ''
}

export const editNumber = (str: string) => {
  const numbers = str.match(/\d/g)?.join('')
  if (!numbers || numbers.length < 1) return ''
  if (numbers.length > 1) {
    return numbers.slice(0,1) + '.' + numbers.slice(1)
  }
  return numbers
}