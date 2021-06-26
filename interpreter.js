class Interpreter{
    visit(node){
        let fn_name = "visit_" + node.constructor.name;
        (fn_name in this) ? this[fn_name](node) : this.no_visit_method(fn_name)
    }

    visit_BinOpNode(node){
        console.log("visited BinOpNode")
        this.visit(node.left_node)
        this.visit(node.right_node)
    }

    visit_NumberNode(node){
        console.log("visited NumberNode")
    }

    visit_UnaryNode(node){
        console.log("visited UnaryNode")
        this.visit(node.node)
    }

    no_visit_method(fn_name){
        console.error("No method named " + fn_name)
    }
}

module.exports = Interpreter