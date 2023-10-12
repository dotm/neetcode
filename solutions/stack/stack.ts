class Stack<T> {
  _stack: T[] = []

  constructor() {
  }

  push(val: T): void {
    this._stack.push(val)
  }

  pop(): T | undefined {
    if(this._stack.length === 0){
      return undefined
    }
    return this._stack.pop()
  }

  top(): T | undefined {
    return this._stack[this._stack.length-1]
  }
}