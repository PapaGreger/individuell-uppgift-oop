# Individuell uppgift - OOP

Alex Hansen

## Use

Allt körs i konsolen med node.

## VG-fråga

### Styrkor

- I color.js tyckte jag det var passande att skriva en helper funktion (hexConvert) för hex komponenterna vilket jag även kunde återanvända för min hex alpha funktion. Detta gjorde koden mer läsbar samt återanvänder en och samma funktion.
- I poker.mjs blev många av Dealers funktioner facade funktioner till Deck vilket håller Decks tillhörande funktionalitet inom sin klass medans OOP logiken av att interagera med Dealer behålls.
- Även för att hålla funktionalitet inom respektive klass och för att hålla main flödet renare försökte jag skriva lämpliga funktioner som till exempel dealCards så att de tar emot arrayer som i detta exempel är players så att det inte behöver skapas en loop i main flödet.

### Brister

- I slutändan blev det lite rörigt i poker.mjs filen och den skulle kunna dra nytta av en refactor för bättre läsbarhet samt att återanvända mer kod, mm.
- En återkommande liknande del av kod i poker.mjs som jag skulle kunnat bryta ut till en funktion är while looparna där användaren ger input.
- Jag följde uppgiften del för del utan att läsa igenom allt en gång och skulle kunnat strukturera allt mycket bättre från första början om jag hade gjort det och bara behövt en mindre refaktorering om någon alls.
