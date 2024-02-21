class Player {
  constructor(name) {
    this.name = name;
    this.cards = [];
  }

  recieveCard(card) {
    this.cards.push(card);
  }

  discardCards(amount) {
    return amount > this.cards.length
      ? this.cards.splice(0, this.cards.length)
      : this.cards.splice(0, amount);
  }

  display() {
    console.log(`Player: ${this.name}`);
    if (this.cards.length > 0) {
      console.log(`Hand (${this.cards.length} cards):`);
      this.cards.forEach((card) => card.display());
      console.log(
        `Hand value:\n${this.cards.reduce(
          (accumilator, currentValue) =>
            accumilator + currentValue.numericValue(),
          0
        )}`
      );
      console.log("");
    }
  }
}

class Card {
  constructor(color, name, value) {
    this.color = color; // red, black
    this.name = name; //clubs (♣), diamonds (♦), hearts (♥), spades (♠)
    this.value = value; //A, K, Q, J, 10, 9, 8, 7, 6, 5, 4, 3, 2
  }

  numericValue() {
    switch (this.value) {
      case "J":
        return 11;
      case "Q":
        return 12;
      case "K":
        return 13;
      case "A":
        return 14;
      default:
        return this.value;
    }
  }

  display() {
    console.log(this.color, this.name, this.value);
  }
}

const generatePair = (value) => {
  const pair = [];
  switch (value) {
    case 1:
      pair.push(new Card("red", "♦", "A"));
      pair.push(new Card("black", "♣", "A"));
      pair.push(new Card("red", "♥", "A"));
      pair.push(new Card("black", "♠", "A"));
      break;
    case 11:
      pair.push(new Card("red", "♦", "J"));
      pair.push(new Card("black", "♣", "J"));
      pair.push(new Card("red", "♥", "J"));
      pair.push(new Card("black", "♠", "J"));
      break;
    case 12:
      pair.push(new Card("red", "♦", "Q"));
      pair.push(new Card("black", "♣", "Q"));
      pair.push(new Card("red", "♥", "Q"));
      pair.push(new Card("black", "♠", "Q"));
      break;
    case 13:
      pair.push(new Card("red", "♦", "K"));
      pair.push(new Card("black", "♣", "K"));
      pair.push(new Card("red", "♥", "K"));
      pair.push(new Card("black", "♠", "K"));
      break;
    default:
      pair.push(new Card("red", "♦", value));
      pair.push(new Card("black", "♣", value));
      pair.push(new Card("red", "♥", value));
      pair.push(new Card("black", "♠", value));
      break;
  }

  return pair;
};

const generateDeck = () => {
  const cards = [];
  for (let i = 1; i < 14; i++) {
    cards.push(...generatePair(i));
  }

  return cards;
};

class Deck {
  constructor() {
    this.cards = [...generateDeck()];
    this.discardedCards = [];
  }

  shuffle(shuffleTimes = 3) {
    for (let i = 0; i < shuffleTimes; i++) {
      this.cards.sort(() => Math.random() - 0.5);
    }
  }

  display() {
    console.log(`Current deck (${this.cards.length} cards):`);
    this.cards.forEach((card) => card.display());
    if (this.discardedCards.length > 0) {
      console.log(`Discarded cards (${this.discardedCards.length} cards):`);
      this.discardedCards.forEach((card) => card.display());
    }
    console.log("");
  }

  dealCards(players, amount = 1) {
    if (players.length * amount > this.cards.length) {
      console.error("ERROR: Not enough cards in deck to deal!\n");
      return;
    }

    for (let i = 0; i < amount; i++) {
      players.forEach((player) => player.recieveCard(this.cards.shift()));
    }
    console.log("");
  }

  recieveDiscardCards(cards) {
    this.discardedCards.push(...cards);
  }

  readdDiscardCards() {
    this.cards.push(...this.discardedCards);
    this.discardedCards = [];
  }
}

//#Del 1
//Skapa en datastruktur med en “normal/poker” kortlek med 52 kort, inga jokrar.
const deck = new Deck();
//Skriv ut kortleken i konsollen, varje kort ska innehålla sin färg, sitt namn och sitt värde
deck.display();
//Blanda kortleken
deck.shuffle();
//Skriv ut den blandade kortleken i konsollen.
deck.display();

//Game
const displayPlayers = (players) => {
  console.log("Current players:");
  players.forEach((player) => player.display());
};

//#Del 2
//Skapa två spelare “Slim” och “Luke”
const players = [new Player("Slim"), new Player("Luke")];
//Skriv ut spelarna i konsollen
displayPlayers(players);

//Dela ut 5 kort vardera till spelarna.
deck.dealCards(players, 5);
//Skriv ut kortleken (nu med 42 kort kvar)
deck.display();
//Och spelarna (nu med 5 kort var)
displayPlayers(players);

//#Del 3
//Låt spelarna lägga slänga 2 kort var i en kasthög
players.forEach((player) => deck.recieveDiscardCards(player.discardCards(2)));
//Låt spelarna dra 2 nya kort var ur kortleken.
deck.dealCards(players, 2);

//Skriv ut kortleken (nu med 38 kort kvar)
deck.display();
//Och spelarna (med 5 kort var)
displayPlayers(players);

//#Del 4
//Låt spelarna slänga alla sina kort i kasthögen.
players.forEach((player) =>
  deck.recieveDiscardCards(player.discardCards(player.cards.length))
);
//Flytta alla kort från kasthögen till kortleken.
deck.readdDiscardCards();
//Blanda kortleken igen
deck.shuffle();
//Och skriv ut den i konsollen.
deck.display();
