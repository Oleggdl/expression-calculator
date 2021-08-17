function eval() {
    // Do not use eval!!!
    return;
}

// function expressionCalculator(expr) {

// }
function expressionCalculator(str) {
    let a = true
    let res
    for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
    str = str.replace(' ', '')
    }
    }
    let open = 0
    let close = 0
    for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') open++
    if (str[i] === ')') close++
    }
    if (close!==open) throw "ExpressionError: Brackets must be paired"
    console.log(str)
    while (a) {
    let b = true
    for (let i = 0; i < str.length; i++)
    if (str[i] === '-' && (str[i - 1] === '+' || str[i - 1] === '-' || str[i - 1] === '*' || str[i - 1] === '/' || i === 0)) {
    res = digit(str, i, '-')
    str = str.replace(res, '(' + res + ')')
    }
    if (b)
    for (let i = 0; i < str.length - 2; i++)
    if (str[i] === '(') {
    let t = false
    if (str[i + 1] === '-') {
    let k = i + 2
    while (str[k] !== ')' && k < str.length) {
    if (str[k] === '+' || str[k] === '-' || str[k] === '/' || str[k] === '*') t = true
    k++
    }
    }
    else t = true
    if (t) {
    b = false
    res = skobki(str, i + 1)
    str = str.replace('(' + res + ')', expressionCalculator(res+'a'))
    break
    }
    }
    
    if (b)
    for (let i = 0; i < str.length; i++) {
    if (str[i] === '*') {
    b = false
    res = digit(str, i - 1, '*')
    str = str.replace(res, result(res, '*'))
    console.log(str)
    break
    }
    if (str[i] === '/') {
    b = false
    res = digit(str, i - 1, '/')
    res2= result(res, '/')
    if (res2!=='Error') str = str.replace(res, res2)
    else throw "TypeError: Division by zero."
    console.log(str)
    break
    }
    }
    if (b)
    for (let i = 0; i < str.length; i++) {
    if (str[i] === '+') {
    b = false
    res = digit(str, i - 1, '+')
    str = str.replace(res, result(res, '+'))
    console.log(str)
    break
    }
    if (str[i] === '-') {
    if (str[i - 1] === '(') {
    if (i - 1 === 0) {
    let k = i
    while (str[k] !== ')' && k < str.length) k++
    if (k === str.length - 1) {
    str = str.replace('(', '')
    str = str.replace(')', '')
    return Number(parseFloat(str, 10).toFixed(4))
    }
    else continue
    }
    else continue
    }
    b = false
    res = digit(str, i - 1, '-')
    str = str.replace(res, result(res, '-'))
    console.log(str)
    break
    }
    }
    if (b) a = false
    }
    if (str[str.length-1]!=='a') {
    console.log(str)
    return Number(parseFloat(str,10).toFixed(4))
    }
    else {
    console.log('ne idiot')
    str=str.replace('a','')
    return str
    }
    }
    
    function digit(str, k, op) {
    let dig = ''
    let i = 0
    while (str[k - 1] !== '+' && str[k - 1] !== '*' && str[k - 1] !== '/' && k > 0) {
    if (str[k - 1] === '-' && k > 1)
    if (str[k - 2] !== '(') break
    k--
    }
    while ((str[k] !== '+' && str[k] !== '*' && str[k] !== '/' && k < str.length) || str[k] === op) {
    if (str[k] === '-' && i > 0 && str[k - 1] !== '(') break
    if (str[k] === op && str[k - 1] !== '(') i++
    if (i < 2) dig += str[k]
    k++
    }
    console.log(dig)
    return dig
    }
    
    function result(str2, op) {
    let first = ''
    let second = ''
    let b = true
    for (let i = 0; i < str2.length; i++) {
    if (str2[i] !== '(' && str2[i] !== ')') {
    if (!b) second += str2[i]
    if (str2[i] === op && i > 0 && str2[i - 1] !== '(') b = false
    else
    if (b) first += str2[i]
    }
    }
    console.log('first')
    console.log(first)
    console.log('second')
    console.log(second)
    let res
    if (op === '+') res = parseFloat(first, 10) + parseFloat(second, 10)
    if (op === '-') res = parseFloat(first, 10) - parseFloat(second, 10)
    if (op === '*') res = parseFloat(first, 10) * parseFloat(second, 10)
    if (op === '/') {
    if (second !== '0') res = parseFloat(first, 10) / parseFloat(second, 10)
    else return 'Error'
    }
    if (res>=0) {
    if (str2[str2.length-1]==='a') return res+'a'
    else return res
    }
    else
    if (str2[str2.length-1]==='a') return '('+res+')a'
    else return '('+res+')'
    }
    
    function skobki(str, k) {
    let dig = ''
    let len = -1
    let open = 1
    let close = 0
    for (let i = k; i < str.length; i++) {
    if (str[i] === '(') open++
    if (str[i] === ')') close++
    if (close === open) {
    len = i
    break
    }
    }
    for (let i = k; i < len; i++) dig += str[i]
    console.log('skobki')
    return dig
    }





module.exports = {
    expressionCalculator
}