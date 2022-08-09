let canvas;
let catURL = 'https:catfact.ninja/fact';
let usURL = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population';
let userURL = 'https://randomuser.me/api/';
let bitcoinURL = 'https://api.coindesk.com/v1/bpi/currentprice.json' ;
let dogURL = 'https://dog.ceo/api/breeds/image/random' ;

let responseData = null;
let catFact = null;
let usPopulation = null;
let randomUser = null ;
let bitcoinPrice = null ;
let dogImage = null ;
let imageData = null ;
let img = null ;

function setup() {
    frameRate(60);

    catFactButton = createButton('Get Cat Fact');
    catFactButton.mousePressed(getCatFact);
    
    usPopulationButton = createButton('Get US Population');
    usPopulationButton.mousePressed(getUSPopulation);

    randomUserButton = createButton('Get Random User');
    randomUserButton.mousePressed(getRandomUser);

    bitcoinPriceButton = createButton('Get Bitcoin Price'); 
    bitcoinPriceButton.mousePressed(getBitcoinPrice);

    dogImageButton = createButton('Get Dog Image');
    dogImageButton.mousePressed(getDogImage);


    
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
}

function getCatFact() {
    fetch(catURL)
        .then(response => response.json())
        .then(data => { responseData = 'Cat Fact: "' + data.fact + '"' });
}

function getUSPopulation() {
    let message = "United States Population\r\n";
    fetch(usURL)
        .then(response => response.json())
        .then(data => {
            data.data.forEach(element => {
                message += 'Year: ' + element.Year + ' - Population: ' + element.Population + "\r\n";
            });
            responseData = message
        });
}

function getRandomUser() {
    let message = "Random User\r\n"
    fetch(userURL)
        .then(response => response.json())
        .then(data => { 
            data.results.forEach(user => {
                message += 'USER NAME: '+ user.name.first + ' ' + user.name.last + "\r\n";
                message += 'GENDER: ' + user.gender + "\r\n";
                message += 'DESCRIPTION: ' + user.description;
            });
            responseData = message
        });
}

function getBitcoinPrice() {
    let message = "Bitcoin Price\r\n"
    fetch(bitcoinURL)
        .then(response => response.json())
        .then(data => { 
            
            message += data.bpi.USD.rate;
            responseData = message;
        });     
}

function getDogImage() {
    let message = "Dog Image\r\n"
    fetch(dogURL)
        .then(response => response.json())
        .then(data => {
            img = null;
            responseData = null; 
            imageData = data.message;
        })
}

function draw() {
    background(1);
    newCursor();

    if(responseData != null){
        textSize(20);
        textWrap(WORD);
        text(responseData, 50, 50, 500)
    }else if (imageData != null){
        img = createImg(imageData);
        image(img, 0, 0);
    }
}

function mouseClicked(){

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor() {
    noStroke();
    fill(255);
    ellipse(pmouseX, pmouseY, 10, 10);
}

