# Blockchain Data Structure Demo

## Features
* Websockets peers
* Non distributed mode.
* Distributed mode.

## Architecture
### Block Class
```
  class Block {
    index: number
    previousHash: string
    timestamp: number
    data: string | object
    hash: string
    calculateHash(): string
    isValid(previousBlock: Block): boolean
  }
```
### Blockchain Class
```
  class Blockchain {
    blockchain: Block[]
    isValid(): boolean
    conciliate(): Blockchain
    show(): void
  }
```
