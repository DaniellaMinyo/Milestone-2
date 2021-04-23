// Main idea came from https://www.youtube.com/watch?v=QrTCHHhoUQU and  was modified for the projects needs
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

    if(flips ===10) { //call function if all pair are found
        flip = 10;
        checkGameWon();
    }
}
//
function checkGameWon() {
    $("#gameWonText").text("You won in " + sec + "seconds!");
    $("#gameWonModal").modal("toggle");
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
    //initalized a variable
    let secs = 0;
    //update the time every one second
    ID = setInterval(() => {
        secs++
        //display time
        document.querySelector("#timer").innerHTML = secs + "s";
        sec = `${secs}`;
        //stop timer when all the pairs are found
        if(flip===10){
            clearInterval(ID);
    }
    }, 1000);
}

//shuffle the cards
function shuffle() {
    let images = document.querySelectorAll("img");
    //array of images
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
    //add images to document
    for (let i = 0; i<images.length; i++) {
        images[i].src = srcs[i]
    }

    // add alts to images
   for (i=1; i < 21; i++) {
        let j = 0;
        if (i<= 9){
            j = "0" + i.toString()
        }
        if (i === 10){
            j = i;
        }
        if (i > 10 && i < 20) {
            j = "0" +(i - 10).toString();
        }
        if (i===20) {
            j = i - 10;
        }
        // code from stackoverflow    
        jQuery(document).ready(function(){
            let imgs = "assets/images/card"+j+".jpg";
            jQuery("img").each(function() {
                if(jQuery(this).attr("src") == imgs)
                {
                    jQuery(this).attr("alt", "Card"+j);
                }
            });

        });
    }
}        