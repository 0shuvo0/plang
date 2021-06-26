const Lexer = require("./lexer.js")
const Parser = require("./parser.js")
const Interpreter = require("./interpreter")
const codes = `1 + 1 - 10 
`

function run(codes){
    const lexer = new Lexer(codes, "<stdin>")
    let { error, tokens } = lexer.run()
    if(error){
        console.log(error.msg())
        return
    }
    
    let parser = new Parser(tokens)
    let ast = parser.run()
    console.log(ast)

    let interpreter = new Interpreter()
    interpreter.visit(ast)
}

run(codes)