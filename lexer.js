const { isIgnorable, isDigit } = require("./utils/utils.js")



const TT_INT = "INT"
const TT_FLOAT = "FLOAT"
const TT_PLUS = "PLUS"
const TT_MINUS = "MINUS"
const TT_MUL = "MUL"
const TT_DIV = "DIV"
const TT_LPAREN = "LPAREN"
const TT_RPAREN = "RPAREN"
const TT_EOF = "EOF"



class Token{
    constructor(type, value = null){
        this.type = type
        this.value = value
    }
}

class Error{
    constructor(error_name, details, ln, ch, file_name){
        this.error_name = error_name
        this.details = details
        this.ln = ln
        this.ch = ch
        this.file_name = file_name
    }

    msg(){
        return `${this.error_name}: ${this.details} at ${this.file_name} line ${this.ln}, character ${this.ch}`
    }
}

class Lexer{
    constructor(codes, file_name){
        this.codes = codes
        this.file_name = file_name
        this.pos = -1
        this.current_char = null
        this.ln = 1
        this.ch = 0

        this.next()
    }

    next(){
        this.pos++
        this.ch++
        this.current_char = this.codes[this.pos] || null
        if(this.current_char == "\n"){
            this.ln++
            this.ch = 1
        }
    }

    getNum(){
        let num = ""
        let dot = false

        while(this.current_char != null && isDigit(this.current_char)){
            if(this.current_char == "."){
                if(dot) break
                dot = true
                num += "."
            }else{
                num += this.current_char
            }
            this.next()
        }

        if(dot){
            return new Token(TT_FLOAT, parseFloat(num))
        }else{
            return new Token(TT_INT, parseInt(num))
        }
    }

    run(){
        let tokens = []
        let error = false
        while(this.current_char != null){
            let cc = this.current_char
            if(isIgnorable(cc)){
                this.next()
                continue
            }else if(isDigit(cc)){
                tokens.push(this.getNum())
            }else if(cc == "+"){
                tokens.push(new Token(TT_PLUS, cc))
                this.next()
            }else if(cc == "-"){
                tokens.push(new Token(TT_MINUS, cc))
                this.next()
            }else if(cc == "*"){
                tokens.push(new Token(TT_MUL, cc))
                this.next()
            }else if(cc == "/"){
                tokens.push(new Token(TT_DIV, cc))
                this.next()
            }else if(cc == "("){
                tokens.push(new Token(TT_LPAREN, cc))
                this.next()
            }else if(cc == ")"){
                tokens.push(new Token(TT_RPAREN, cc))
                this.next()
            }else{
                error = new Error("Illigal character error", "illigal character " + cc, this.ln, this.ch, this.file_name)
                break
            }
        }
        tokens.push(TT_EOF)
        return { tokens, error }
    }
}

module.exports = Lexer