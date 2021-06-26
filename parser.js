const { is } = require("./utils/utils.js")


const TT_INT = "INT"
const TT_FLOAT = "FLOAT"
const TT_PLUS = "PLUS"
const TT_MINUS = "MINUS"
const TT_MUL = "MUL"
const TT_DIV = "DIV"
const TT_LPAREN = "LPAREN"
const TT_RPAREN = "RPAREN"
const TT_EOF = "EOF"


class NumberNode{
    constructor(token){
        this.token = token
    }
}

class BinOpNode{
    constructor(left_node, op_tok, right_node){
        this.left_node = left_node
        this.op_tok = op_tok
        this.right_node = right_node
    }
}

class UnaryNode{
    constructor(op_tok, node){
        this.op_tok = op_tok
        this.node = node
    }
}

class Parser{
    constructor(tokens){
        this.tokens = tokens
        this.pos = -1
        this.current_token = null
        this.next()
    }

    factor(){
        let tok = this.current_token
        if(is(tok.type, [TT_PLUS, TT_MINUS])){
            let type = tok.type
            this.next()
            let node = this.factor()
            return new UnaryNode(type, node)
        }else if(is(tok.type, [TT_INT, TT_FLOAT])){
            this.next()
            return new NumberNode(tok)
        }else if(tok.type == TT_LPAREN){
            this.next()
            let exper = this.expression()
            this.next()
            return exper
        }
    }

    bin_op(ctx, fn, types){
        let left = ctx[fn]()
        while(ctx.current_token && is(ctx.current_token.type, types)){
            let op_tok = ctx.current_token
            ctx.next()
            let right = ctx.factor()
            left = new BinOpNode(left, op_tok, right)
        }
        return left
    }

    // term(){
    //     let left = this.factor()
    //     while(this.current_token && is(this.current_token.type, [TT_MUL, TT_DIV])){
    //         let op_tok = this.current_token
    //         this.next()
    //         let right = this.factor()
    //         left = new BinOpNode(left, op_tok, right)
    //     }
    //     return left
    // }

    // expression(){
    //     let left = this.term()
    //     while(this.current_token && is(this.current_token.type, [TT_PLUS, TT_MINUS])){
    //         let op_tok = this.current_token
    //         this.next()
    //         let right = this.factor()
    //         left = new BinOpNode(left, op_tok, right)
    //     }
    //     return left
    // }

    term(){
        return this.bin_op(this, "factor", [TT_MUL, TT_DIV])
    }

    expression(){
        return this.bin_op(this, "term", [TT_PLUS, TT_MINUS])
    }

    next(){
        this.pos++
        this.current_token = this.tokens[this.pos] || null
    }

    run(){
        return is(this.current_token.type, [TT_PLUS, TT_MINUS, TT_INT, TT_FLOAT, TT_LPAREN]) ? this.expression() : "Under construction"
    }
}

module.exports = Parser