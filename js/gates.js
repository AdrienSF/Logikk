let IN     = "IN";
let OUT    = "OUT";
let AND    = "AND";
let OR     = "OR";
let XOR    = "XOR";
let NOT    = "NOT";

let COLOR_BROKEN = "#9900ff";
let COLOR_CORRECT = "#2196F3";

var hasUpdatedOutSuccessfully = false;

class Gate {
  // type may be IN, AND, OR, XOR, NOT
  constructor(type) {
    this.type = type;

    this.inputs = [];
    this.outputs = [];

    if(this.type == IN)
      this.state = false;

    // precedence top to bottom
    // IN
    // NOT
    // AND
    // OR, XOR

    if(this.type == IN) {
      this.inputLimit = 0;
      this.precedence = 100;
    } else if(this.type == OUT) {
      this.inputLimit = 1;
      this.precedence = -1;
    } else if(this.type == AND) {
      this.inputLimit = 2;
      this.precedence = 10;
    } else if(this.type == OR) {
      this.inputLimit = 2;
      this.precedence = 5;
    } else if(this.type == XOR) {
      this.inputLimit = 2;
      this.precedence = 5;
    } else if(this.type == NOT) {
      this.inputLimit = 1;
      this.precedence = 20;
    }
  }

  getStatePrecalculated() {
    // use this after running getState if nothing has changed
    // saves computing power and time
    return this.state;
  }

  getState() {
    var type = this.type;
    var inputs = this.inputs;
    var outputs = this.outputs;

    if(type == IN) {
      return this.state;
    }

    if(inputs.length != this.inputLimit) {
      hasUpdatedOutSuccessfully = false;

      if(type == NOT) this.state = true;
      else this.state = false;

      return this.state;
    }

    if(type == OUT) {
      return inputs[0].getState();
    }

    if(type == AND) {
      this.state = false;
      for(var i = 0; i < inputs.length; i++)
        if(!inputs[i].getState()) return false;
      this.state = true;
      return true;
    }

    if(type == OR) {
      var flag = false;

      // going thru all because of hasUpdatedOutSuccessfully
      for(var i = 0; i < inputs.length; i++)
        if(inputs[i].getState()) flag = true;

      this.state = flag;
      return flag;
    }

    if(type == XOR) {
      var count = 0;
      for(var i = 0; i < inputs.length; i++)
        if(inputs[i].getState()) count++;
      this.state = count == 1;
      return count == 1;
    }

    if(type == NOT) {
      this.state = !inputs[0].getState();
      return !inputs[0].getState();
    }
  }

  constructBoolExpr() {
    var type = this.type;
    var inputs = this.inputs;
    var outputs = this.outputs;

    if(type == IN) {
      return gateToHtml.get(this).firstChild.innerHTML;
    }

    if(inputs.length == 0) {
      return "err";
    }

    if(type == OUT) {
      return inputs[0].constructBoolExpr();
    }

    if(type == NOT) {
      if(inputs[0].precedence > this.precedence)
        return "¬" + inputs[0].constructBoolExpr();
      else
        return "¬(" + inputs[0].constructBoolExpr() + ")";
    }

    var connector = "";
    if(type == AND) connector = "∧";
    if(type == OR)  connector = "∨";
    if(type == XOR) connector = "⊕";

    var expr = "";

    for(var i = 0; i < inputs.length; i++) {
      if(inputs[i].precedence > this.precedence)
        expr += inputs[i].constructBoolExpr();
      else
        expr += "(" + inputs[i].constructBoolExpr() + ")";

      if(i != inputs.length - 1)
        expr += connector;
    }

    return expr;
  }
}
