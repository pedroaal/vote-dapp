const modulo_10 = (ci, ci_len, coef) => {
  let ci_array = ci.toString().split('').map(item => Number(item)).splice(0, ci_len)
  const last = ci_array.pop()

  let coef_sum = 0;
  ci_array.forEach((item, index) => {
    let res = item * coef[index]
    if (res >= 10) res -= 9
    coef_sum += res
  })

  const nearest_ten = Math.ceil(coef_sum / 10) * 10;
  let res = nearest_ten - coef_sum;
  if (res == 10) {
    res = 0;
  }

  return (res == last);
}

const modulo_11 = (ci, ci_len, coef) => {
  let ci_array = ci.toString().split('').map(item => Number(item)).splice(0, ci_len)
  const last = ci_array.pop()

  let coef_sum = 0;
  ci_array.forEach((item, index) => {
    coef_sum += item * coef[index]
  })

  // const diff = Math.floor(coef_sum / 11)
  const residuo = coef_sum % 11
  const res = 11 - residuo

  return (res == last);
}

const validateCi = ci => {
  const regex = /^(\d{2})(\d)(\d{5,6})(\d)(00[1-9])?$/
  const match = ci.toString().match(regex) // match
  if (!match) {
    return false;
  }

  let ci_len = 0
  let coef = []
  const third = Number(match[2])
  console.log(third)
  switch (third) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      ci_len = 10;
      coef = [2, 1, 2, 1, 2, 1, 2, 1, 2];
      return modulo_10(ci, ci_len, coef);
    case 6:
      ci_len = 9;
      coef = [3, 2, 7, 6, 5, 4, 3, 2];
      return modulo_11(ci, ci_len, coef);
    case 9:
      ci_len = 10;
      coef = [4, 3, 2, 7, 6, 5, 4, 3, 2];
      return modulo_11(ci, ci_len, coef);
    default:
      return false;
  }

  return false
}

console.log(validateCi('1719953281'))
console.log(validateCi('1456719953281'))
console.log(validateCi('1790085783001'))

export default validateCi