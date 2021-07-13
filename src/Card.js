class Card {

    // Private Variables
    #balance = 0.0

    // Member Functions
    addBalance(amount) {
        this.#balance +=  Math.abs(amount);
    }

    getCurrentBalance() {
        return this.#balance;
    }

    canChargeTheFare(fare) {
        return this.#balance >= fare ? true : false;
    }

    chargeFare(fare) {
        if (this.canChargeTheFare(fare)) {
            this.#balance -= Math.abs(fare);
            return true;
        }
        return false;
    }
}
module.exports = { Card };