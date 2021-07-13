const { Contants } = require("./Commons");

class Journey {

    #startStationId = null
    #destinationId = null

    /**
     * @param Station startPoint 
     * @param Card card 
     */
    startTubeJourneyFrom(stationId, card) {
        this.#startStationId = stationId;
        return card.chargeFare(Contants.MAX_TUBE_FARE);
    }

    /** 
     * @param Station destination
     * @param Card card 
     * @returns number Total Charged Fare 
     */
    endTubeJouneyAtStation(stationId, card) {
        this.#destinationId = stationId;
        card.addBalance(Contants.MAX_TUBE_FARE);
        // Calcualte Fare
        let fare = Fare.calculateFareForJourney(this);
        card.chargeFare(fare);
        return fare;
    }

    /** 
     * @param Station destination
     * @param Card card
     * @returns boolean success / failure
     */
    makeABusJourney(card) {
        return card.chargeFare(Contants.BUS_FARE);
    }

    getStartStationId() {
        return this.#startStationId;
    }
    getDestinationStationId() {
        return this.#destinationId;
    }
}

class Fare {
    /** 
     * @param Journey journey
     * @returns number total chargable fare
     */
    static calculateFareForJourney(jouney) {
        let startStationZones = Contants.StationZones[jouney.getStartStationId()];
        let endStationZones = Contants.StationZones[jouney.getDestinationStationId()];

        var fare = null;
        if (startStationZones.length +  endStationZones.length > 2) {
            // either start or destination points comes under more than 1 zone.
            // Now calculating fares with different combinations.
            startStationZones.forEach(zone1 => {
                endStationZones.forEach(zone2 => {
                    let result = this.calculateFareForZones(zone1, zone2);
                    if (fare == null) {
                        fare = result
                    }
                    else if (Contants.SHOULD_FAVOR_CUSTOMER) {
                        fare = Math.min(fare, result);
                    }
                    else {
                        fare = Math.max(fare, result);
                    }
                });
            });

        }
        else {
            fare = this.calculateFareForZones(startStationZones[0], endStationZones[0]);
        }
        return fare;
    }

    static calculateFareForZones(zone1, zone2) {
        var fare = 0.0;
        // With-in same zone or two adjacent zones
        if (Math.abs(zone1 - zone2) <= 1) {
            // RULE 1 - Anywhere in Zone 1 £2.50
            if (zone1 == 1 && zone2 == 1) {
                fare = 2.50;
            }
            // RULE 2 - Any one zone outside zone 1 £2.00
            else if (![zone1, zone2].includes(1) && zone1 == zone2) {
                fare = 2.00;
            }
            // RULE 3 - Any two zones including zone 1 £3.00
            else if ([zone1, zone2].includes(1) && zone1 != zone2) {
                fare = 3.00;
            }
            // // RULE 4 - Any two zones excluding zone 1 £2.25
            else if (![zone1, zone2].includes(1) && zone1 != zone2) {
                fare = 2.25;
            }
        }
        else {
            // RULE 5 - More than two zones (3+) £3.20
            fare = 3.20;
        }
        return fare;
    }
}

module.exports = { Journey, Fare };