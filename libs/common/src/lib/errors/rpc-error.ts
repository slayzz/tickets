export class RpcError implements Error {
  constructor(public message: string, public name: string = 'RpcError') {}
}
