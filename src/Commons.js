var Contants = {
    BUS_FARE: 1.8,
    MAX_TUBE_FARE: 3.20,
    SHOULD_FAVOR_CUSTOMER: true,
    Station: {
        HOLBORN: 1,
        ALDGATE: 2,
        EARLSCOURT: 3,
        HAMMERSMITH: 4,
        ARSENAL: 5,
        WIMBLEDON: 6,
        NONE: 7,
    },

    StationZones: {
        1: [1],
        2: [1],
        3: [1,2],
        4: [2],
        5: [2],
        6: [3]
    }
}

module.exports = {Contants};