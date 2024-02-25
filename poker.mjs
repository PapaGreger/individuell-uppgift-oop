import readline from "readline";

const readLine = async (query = "") => {
  const cin = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const userInput = await new Promise((resolve) =>
    cin.question(query, resolve)
  );

  cin.close();
  return userInput;
};

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

  discardCardAtIndex(index) {
    return this.cards.splice(index, 1);
  }

  handValue() {
    return this.cards.reduce(
      (accumilator, currentValue) => accumilator + currentValue.numericValue(),
      0
    );
  }

  display() {
    console.log(`Player: ${this.name}`);
    if (this.cards.length > 0) {
      console.log(`Hand (${this.cards.length} cards):`);
      this.cards.forEach((card) => card.display());
      console.log(`Hand value:\n${this.handValue()}`);
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
      pair.push(new Card("Red", "♦", "A"));
      pair.push(new Card("Black", "♣", "A"));
      pair.push(new Card("Red", "♥", "A"));
      pair.push(new Card("Black", "♠", "A"));
      break;
    case 11:
      pair.push(new Card("Red", "♦", "J"));
      pair.push(new Card("Black", "♣", "J"));
      pair.push(new Card("Red", "♥", "J"));
      pair.push(new Card("Black", "♠", "J"));
      break;
    case 12:
      pair.push(new Card("Red", "♦", "Q"));
      pair.push(new Card("Black", "♣", "Q"));
      pair.push(new Card("Red", "♥", "Q"));
      pair.push(new Card("Black", "♠", "Q"));
      break;
    case 13:
      pair.push(new Card("Red", "♦", "K"));
      pair.push(new Card("Black", "♣", "K"));
      pair.push(new Card("Red", "♥", "K"));
      pair.push(new Card("Black", "♠", "K"));
      break;
    default:
      pair.push(new Card("Red", "♦", value));
      pair.push(new Card("Black", "♣", value));
      pair.push(new Card("Red", "♥", value));
      pair.push(new Card("Black", "♠", value));
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

class Dealer {
  constructor() {
    this.deck = new Deck();
  }

  shuffle() {
    this.deck.shuffle();
  }

  deal(players, amount = 1) {
    this.deck.dealCards(players, amount);
  }

  recieveDiscardCards(cards) {
    this.deck.recieveDiscardCards(cards);
  }

  readdDiscardCards() {
    this.deck.readdDiscardCards();
  }
}

class Validate {
  static validateWinner(players) {
    let winners = [players[0]];
    for (let i = 1; i < players.length; i++) {
      if (players[i].handValue() > winners[0].handValue())
        winners = [players[i]];
      else if (players[i].handValue() == winners[0].handValue())
        winners.push(players[i]);
    }

    if (winners.length > 1) {
      console.log("Draw between:");
      winners.forEach((player) => {
        console.log(player.name);
      });
      console.log(`Both with a score of: ${winners[0].handValue()}\n`);
    } else {
      console.log(
        `The winner is: ${
          winners[0].name
        }\nWith a score of: ${winners[0].handValue()}\n`
      );
    }
  }
}

class Game {
  constructor() {
    this.players = [];
    this.dealer = new Dealer();
  }

  async addPlayers() {
    console.clear();
    let playerCount = NaN;
    do {
      playerCount = await readLine(
        "How many players are there? (Minimum 2)\n:"
      );

      if (isNaN(playerCount) || Number.parseInt(playerCount) < 2) {
        console.clear();
        console.log("\nInvalid input, must enter a number of 2 or above!\n");
        continue;
      }
    } while (isNaN(playerCount) || Number.parseInt(playerCount) < 2);

    for (let i = 0; i < playerCount; i++) {
      console.clear();
      let playerName = "";
      do {
        playerName = await readLine(
          `What is player ${i + 1}s name? (Minimum 1 character)\n:`
        );

        if (playerName.length < 1) {
          console.clear();
          console.log("\nInvalid input, must enter at least one character!\n");
          continue;
        }

        this.players.push(new Player(playerName));
      } while (playerName.length < 1);
    }
    console.clear();
  }

  async discardRound() {
    for (let i = 0; i < this.players.length; i++) {
      let discardsLeft = 2;
      let playerInput = NaN;
      const player = this.players[i];

      console.clear();
      do {
        console.log(
          `${player.name}, Select card to discard. ${discardsLeft} discards left!`
        );
        player.cards.forEach((card, index) => {
          console.log(`${index + 1}. ${card.color} ${card.name} ${card.value}`);
        });
        console.log("0. None");
        playerInput = await readLine();

        if (
          isNaN(playerInput) ||
          Number.parseInt(playerInput) > player.cards.length ||
          Number.parseInt(playerInput) < 0
        ) {
          console.clear();
          console.log(
            `\nInvalid input, must enter a number from 0 to ${player.cards.length}\n`
          );
          continue;
        }

        if (playerInput == 0) {
          discardsLeft = 0;
          continue;
        }

        this.dealer.recieveDiscardCards(
          player.discardCardAtIndex(playerInput - 1)
        );
        discardsLeft -= 1;
        console.clear();
      } while (discardsLeft > 0);
    }

    console.clear();
  }

  async startGame() {
    await this.addPlayers();

    //Set rounds
    let rounds = NaN;
    do {
      rounds = await readLine(
        `How many rounds whould you like to play? (Minimum 1)\n:`
      );

      if (isNaN(rounds) || rounds < 1) {
        console.clear();
        console.log(`\nInvalid input, must enter a number above 0\n`);
        continue;
      }
    } while (isNaN(rounds) || rounds < 1);

    //Game loop
    for (let i = 0; i < rounds; i++) {
      this.dealer.shuffle();
      this.dealer.deal(this.players, 5);

      await this.discardRound();
      this.players.forEach((player) =>
        this.dealer.deal([player], 5 - player.cards.length)
      );

      Validate.validateWinner(this.players);
      this.players.forEach((player) =>
        this.dealer.recieveDiscardCards(
          player.discardCards(player.cards.length)
        )
      );
      this.dealer.readdDiscardCards();

      console.log("Press Enter to continue!");
      await readLine();
    }
  }
}

const game = new Game();
await game.startGame();
