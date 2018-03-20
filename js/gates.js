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

    if(this.type == IN) {
      this.inputLimit = 0;
    } else if(this.type == OUT) {
      this.inputLimit = 1;
    } else if(this.type == AND) {
      this.inputLimit = 2;
    } else if(this.type == OR) {
      this.inputLimit = 2;
    } else if(this.type == XOR) {
      this.inputLimit = 2;
    } else if(this.type == NOT) {
      this.inputLimit = 1;
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

      if(type == NOT)
        this.state = true;
      else
        this.state = false;

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
      this.state = true;
      for(var i = 0; i < inputs.length; i++)
        if(inputs[i].getState()) return true;
      this.state = false;
      return false;
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

    if(type == AND) {
      var expr = "";

      // first one
      if(inputs[0].type == IN || inputs[0].type == NOT) expr += inputs[0].constructBoolExpr();
      else expr += "(" + inputs[0].constructBoolExpr() + ")";

      // others
      for(var i = 1; i < inputs.length; i++) {
        if(inputs[i].type == IN || inputs[i].type == NOT) expr += "∧" + inputs[i].constructBoolExpr();
        else expr += "∧(" + inputs[i].constructBoolExpr() + ")";
      }

      return expr;
    }

    if(type == OR) {
      var expr = "";

      // first one
      if(inputs[0].type == IN || inputs[0].type == NOT) expr += inputs[0].constructBoolExpr();
      else expr += "(" + inputs[0].constructBoolExpr() + ")";

      // others
      for(var i = 1; i < inputs.length; i++) {
        if(inputs[i].type == IN || inputs[i].type == NOT) expr += "∨" + inputs[i].constructBoolExpr();
        else expr += "∨(" + inputs[i].constructBoolExpr() + ")";
      }

      return expr;
    }

    if(type == XOR) {
      var expr = "";

      // first one
      if(inputs[0].type == IN || inputs[0].type == NOT) expr += inputs[0].constructBoolExpr();
      else expr += "(" + inputs[0].constructBoolExpr() + ")";

      // others
      for(var i = 1; i < inputs.length; i++) {
        if(inputs[i].type == IN || inputs[i].type == NOT) expr += "⊕" + inputs[i].constructBoolExpr();
        else expr += "⊕(" + inputs[i].constructBoolExpr() + ")";
      }

      return expr;
    }

    if(type == NOT) {
      if(inputs[0].type == IN) return "¬" + inputs[0].constructBoolExpr();
      else return "¬(" + inputs[0].constructBoolExpr() + ")";
    }
  }
}
