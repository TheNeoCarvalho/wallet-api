export class Transaction {
    constructor(
        public readonly id: string,
        public readonly fromWalletId: string,
        public readonly toWalletId: string,
        public readonly amount: number,
        public readonly createdAt: Date,
        public reverted: boolean = false
    ) { }
}
