const Lexer = require("./lexer.js")
const Parser = require("./parser.js")

const codes = `5.38 * 7378
`

function run(codes){
    const lexer = new Lexer(codes, "<stdin>")
    let { error, tokens } = lexer.run()
    if(error){
        console.log(error.msg())
        return
    }
    
    let parser = new Parser(tokens)

    console.log(parser.run())
}

run(codes)