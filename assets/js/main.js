// Main idea came from codeTonight and modified for the projects needs
let cards = document.querySelectorAll(".card-inner");
let firstClick = false;
let counter = 0;
let cardPair = [];
let sec = 0;
let flip = 0;

cards.forEach((card) => {
    card.state = "unclicked"
});

shuffle()

for (let  i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", () => {
        //if first click is false
        if (!firstClick){time()}//call time function
        firstClick = true //time function called only ones
        
        if (cards[i].state == "unclicked") { //if the state is unclicked rotate the clicked card
            cards[i].style.transform = "rotateY(180deg)"
            cards[i].state = "clicked"
            counter++ //increment counter value
            cardPair.push(cards[i])
            check()//check same src property
        }

        else if (cards[i].state == "clicked") {
            cards[i].style.transform = "rotate(0deg)"
            cards[i].state = "unclicked"
            counter--
            cardPair = []
        }
    })
}

function check() {
    if (counter == 2) { //value of counter must be two
        if (cardPair[0].querySelector("img").src == cardPair[1].querySelector("img").src) {
            matched()
        } else {
            unmatched(cardPair[0], cardPair[1])
        }
    }
}

function matched() {
    cardPair[0].state = "blocked"
    cardPair[1].state = "blocked"
    counter = 0 //counter update
    cardPair = []
    let flips = document.querySelector("#flips").innerHTML //get value of prev flips 
    flips++ //icrement 
    document.querySelector("#flips").innerHTML = flips//update

}

function unmatched(x,y) {
    setTimeout(() => {
        x.style.transform = "rotateY(0deg)"
        y.style.transform = "rotateY(0deg)"
    }, 750);
    cardPair[0].state = "unclicked" //update to uncliked - hide image again
    cardPair[1].state = "unclicked" //update to uncliked - hide image again
    counter = 0
    cardPair = []
}

function time() {
    //initalized some variables
    let secs = 0;
    //update the time every one second
    ID = setInterval(() => {
        secs++
        //display time
        document.querySelector("#timer").innerHTML = secs + "s";
        sec = `${secs}`;

    }, 1000);
}

function shuffle() {
    let images = document.querySelectorAll("img");
    let srcs = ['assets/images/card01.jpg',
                'assets/images/card02.jpg',
                'assets/images/card03.jpg',
                'assets/images/card04.jpg',
                'assets/images/card05.jpg',
                'assets/images/card06.jpg',
                'assets/images/card07.jpg',
                'assets/images/card08.jpg',
                'assets/images/card09.jpg',
                'assets/images/card10.jpg',
                'assets/images/card01.jpg',
                'assets/images/card02.jpg',
                'assets/images/card03.jpg',
                'assets/images/card04.jpg',
                'assets/images/card05.jpg',
                'assets/images/card06.jpg',
                'assets/images/card07.jpg',
                'assets/images/card08.jpg',
                'assets/images/card09.jpg',
                'assets/images/card10.jpg'
                ]
    for (let i = srcs.length-1; i > 0; i--) {
        let j = Math.floor(Math.random() * i)
        let temp = srcs[i]
        srcs[i] = srcs[j]
        srcs[j] = temp
    }

    for (let i = 0; i<images.length; i++) {
        images[i].src = srcs[i]
    }
}        