//Global Variables
let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');


const botDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';

const beachDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';

const spaceDoorPath = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';

const closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";

let numClosedDoors = 3;

let openDoor1 = undefined;
let openDoor2 = undefined;
let openDoor3 = undefined;

let startButton = document.getElementById('start');

currentlyPlaying = true;

let currentScore = document.getElementById('current-streak');
let bestScore = document.getElementById('best-streak');

let currentStreak = 0;
let bestStreak = 0;

//chore ending game bot or not?
let isBot = (door) => {
    if (door.src === botDoorPath) {
        return true;
    } else {
        return false;
    }
}


//function to determin if door isclick (stop multiple door click exploitation)
let isClicked = (door) => {
    if (door.src === closedDoorPath) {
        return false;
    } else {
        return true;
    }
}

// function decrease numClosedDores & Checks Game winning condition
const playDoor = (door) => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver('win');
    } else if (isBot(door)) {
        gameOver();
    }
}

// function for generating randomly which door Bot hides behind
randomChoreDoorGenerator = () => {
    const choreDoor = Math.floor(Math.random() * numClosedDoors);
    if (choreDoor === 0) {
        openDoor1 = botDoorPath;
        openDoor2 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    } else if (choreDoor === 1) {
        openDoor1 = spaceDoorPath;
        openDoor2 = botDoorPath;
        openDoor3 = beachDoorPath;
    } else {
        openDoor1 = beachDoorPath;
        openDoor2 = spaceDoorPath;
        openDoor3 = botDoorPath;
    }
}

//Door Images On Click
doorImage1.onclick = () => {
    if (!isClicked(doorImage1) && currentlyPlaying) {
        doorImage1.src = openDoor1;
        playDoor(doorImage1);
    }
};

doorImage2.onclick = () => {
    if (!isClicked(doorImage2) && currentlyPlaying) {
        doorImage2.src = openDoor2;
        playDoor(doorImage2);
    }
};

doorImage3.onclick = () => {
    if (!isClicked(doorImage3) && currentlyPlaying) {
        doorImage3.src = openDoor3;
        playDoor(doorImage3);
    }
};

// start button refresh imagas reset values and counter
startButton.onclick = () => {
    if (!currentlyPlaying) {
        startRound()
    }
}

startRound = () => {
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    startButton.innerHTML = 'Good Luck';
    numClosedDoors = 3;
    currentlyPlaying = true;
    randomChoreDoorGenerator();
}

//function game over on numClosedDoors = 0
gameOver = (status) => {
    if (status === 'win') {
        startButton.innerHTML = 'You win! play again?';
        currentStreak++;
        currentScore.innerHTML = currentStreak;
        if (bestStreak <= currentStreak) {
            bestStreak = currentStreak;
            bestScore.innerHTML = bestStreak;
        }
    } else {
        startButton.innerHTML = 'Game over! Play again?';
        currentStreak = 0;
        currentScore.innerHTML = currentStreak;
    }
    currentlyPlaying = false;
}

startRound();