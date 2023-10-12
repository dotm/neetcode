class MinStack {
  _stack: number[] = []
  _minStack: number[] = []

  constructor() {
  }

  push(val: number): void {
    this._stack.push(val)
    this._minStack.push(Math.min(val, this.getMin() ?? Infinity))
  }

  pop(): void {
    this._stack.pop()
    this._minStack.pop()
  }

  top(): number | undefined {
    return this._stack[this._stack.length-1]
  }

  getMin(): number | undefined {
    return this._minStack[this._minStack.length-1]
  }
}

/**
* Your MinStack object will be instantiated and called as such:
* var obj = new MinStack()
* obj.push(val)
* obj.pop()
* var param_3 = obj.top()
* var param_4 = obj.getMin()
*/