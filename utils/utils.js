const ignorable = [" ", "\t", "\n"]
const digit = ".0123456789".split("")

//takes two arguement val:value, arr:array, returns true if val is present in arr
const is = (val, arr) => arr.indexOf(val) > -1

const isIgnorable = ch => is(ch, ignorable)

const isDigit = ch => is(ch, digit)

module.exports = {
    is,
    isIgnorable,
    isDigit
}