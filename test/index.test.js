const { Card } = require("../src/Card");
const { Journey } = require("../src/Journey");
const { Contants: Constants } = require("../src/Commons");

test('REQUIRED TEST', () => {
    let card = new Card();
    let initialBalance = 30.0;
    let expectedFare = 6.3;
    card.addBalance(initialBalance);
    let journey = new Journey();

    journey.startTubeJourneyFrom(Constants.Station.HOLBORN, card);
    journey.endTubeJouneyAtStation(Constants.Station.EARLSCOURT, card);

    journey.makeABusJourney(card);

    journey.startTubeJourneyFrom(Constants.Station.EARLSCOURT, card);
    journey.endTubeJouneyAtStation(Constants.Station.HAMMERSMITH, card);

    console.log("Card Balance: ", card.getCurrentBalance());

    expect(initialBalance - expectedFare).toBe(card.getCurrentBalance());
});

test('[SCENARIO - 1] Anywhere in Zone 1', () => {
    let card = new Card();
    let initialBalance = 30.0;
    let expectedFare = 2.50;
    card.addBalance(initialBalance);
    let journey = new Journey();
    journey.startTubeJourneyFrom(Constants.Station.HOLBORN, card);
    journey.endTubeJouneyAtStation(Constants.Station.ALDGATE, card);
    expect(initialBalance - expectedFare).toBe(card.getCurrentBalance());
});

test('[SCENARIO - 2] Any one zone outside zone 1', () => {
    let card = new Card();
    let initialBalance = 30.0;
    let expectedFare = 2.00;
    card.addBalance(initialBalance);
    let journey = new Journey();
    journey.startTubeJourneyFrom(Constants.Station.ARSENAL, card);
    journey.endTubeJouneyAtStation(Constants.Station.HAMMERSMITH, card);
    expect(initialBalance - expectedFare).toBe(card.getCurrentBalance());
});

test('[SCENARIO - 3] Any two zones including zone 1', () => {
    let card = new Card();
    let initialBalance = 30.0;
    let expectedFare = 3.00;
    card.addBalance(initialBalance);
    let journey = new Journey();
    journey.startTubeJourneyFrom(Constants.Station.HAMMERSMITH, card);
    journey.endTubeJouneyAtStation(Constants.Station.HOLBORN, card);
    expect(initialBalance - expectedFare).toBe(card.getCurrentBalance());
});

test('[SCENARIO - 4] Any two zones excluding zone 1', () => {
    let card = new Card();
    let initialBalance = 30.0;
    let expectedFare = 2.25;
    card.addBalance(initialBalance);
    let journey = new Journey();
    journey.startTubeJourneyFrom(Constants.Station.ARSENAL, card);
    journey.endTubeJouneyAtStation(Constants.Station.WIMBLEDON, card);
    expect(initialBalance - expectedFare).toBe(card.getCurrentBalance());
});

test('[SCENARIO - 5] More than two zones (3+)', () => {
    let card = new Card();
    let initialBalance = 30.0;
    let expectedFare = 3.20;
    card.addBalance(initialBalance);
    
    let journey = new Journey();
    journey.startTubeJourneyFrom(Constants.Station.WIMBLEDON, card);
    journey.endTubeJouneyAtStation(Constants.Station.ALDGATE, card);
    expect(initialBalance - expectedFare).toBe(card.getCurrentBalance());
});

test('[SCENARIO - 6] Favor Customer with Minimum Fare', () => {
    let card = new Card();
    let initialBalance = 30.0;
    let expectedFare = 2.50;
    card.addBalance(initialBalance);
    let journey = new Journey();
    journey.startTubeJourneyFrom(Constants.Station.HOLBORN, card);
    journey.endTubeJouneyAtStation(Constants.Station.EARLSCOURT, card);
    expect(initialBalance - expectedFare).toBe(card.getCurrentBalance());
});