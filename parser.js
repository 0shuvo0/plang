const { is } = require("./utils/utils.js")


const TT_INT = "INT"
const TT_FLOAT = "FLOAT"
const TT_PLUS = "PLUS"
const TT_MINUS = "MINUS"
const TT_MUL = "MUL"
const TT_DIV = "DIV"
const TT_LPAREN = "LPAREN"
const TT_RPAREN = "RPAREN"


class NumberNode{
    constructor(token){
        this.token = token
    }
}

class BinOpNode{
    constructor(left_node, op_tok, right_node){
        this.left_node -= left_node
        this.op_tok = op_tok
        this.right_node = right_node
    }
}

class Parser{
    constructor(tokens){
        this.tokens = tokens
        this.pos = -1
        this.current_token = null
    }

    factor(){
        let tok = this.current_token
        if(is(tok, [TT_INT, TT_FLOAT])){
            this.next()
            return new NumberNode(tok)
        }
    }

    bin_op(fn, toks){
        let left = fn()
        while(is(this.current_token.type, toks)){
            let op_tok = this.current_token
            this.next()
            let right = this.next()
            left = new BinOpNode(left, op_tok, right)
        }
        return left
    }

    term(){
        return this.bin_op(this.factor, [TT_MUL, TT_DIV])
    }

    expression(){
        return this.bin_op(this.term, [TT_PLUS, TT_MINUS])
    }

    next(){
        this.pos++
        this.current_token = this.tokens[pos] || null
    }

    run(){
        return this.expression()
    }
}

module.exports = Parser