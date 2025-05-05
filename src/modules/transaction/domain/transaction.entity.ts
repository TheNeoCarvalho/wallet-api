export class Transaction {
    constructor(
        public readonly id: string,
        public readonly walletId: string,
        public amount: number,
        public description: string,
        public readonly createdAt: Date,
        public isReverted: boolean = false,
    ) { }

    revert() {
        if (this.isReverted) {
            throw new Error('Transaction has already been reverted');
        }
        this.amount = -this.amount;
        this.description = `[REVERTED] ${this.description}`;
        this.isReverted = true;
    }
}
