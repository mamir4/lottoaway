let wallet = 10; // Initial wallet amount
let oldWallet = wallet; // Store the initial wallet amount for animation
const wompAudio = new Audio('sounds/womp_womp.pm3');

function animateWallet(from, to, duration = 1000) {
    const element = document.getElementById('wallet');
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        if (elapsed < duration) {
        const progress = elapsed / duration;
        const currentValue = Math.floor(from + (to - from) * progress);
        element.textContent = currentValue;
        requestAnimationFrame(update);
        } else {
        element.textContent = to; // Ensure it ends exactly at 'to'
        }
    }

    requestAnimationFrame(update);
    }
            
function lottoDraw() {
    const draw = [];
    while (draw.length < 5) {
        const randomNumber = Math.floor(Math.random() * 50) + 1;
        if (!draw.includes(randomNumber)) {
            draw.push(randomNumber);
        }
    }
    return draw;
}

function lottoPick() {
    const playerPickList = [];
    for (let i = 1; i <= 5; i++) {
        const val = parseInt(document.getElementById('pick' + i).value);
        if (isNaN(val) || val < 1 || val > 50 || playerPickList.includes(val)) {
            alert(`Invalid input for pick ${i}. Please enter a number between 1 and 50 that hasn't been picked before.`);
            return null;
        }
        playerPickList.push(val);                    
    }
    return playerPickList;
}

function compareResults(playerPickList, draw) {
    let matches = 0;
    for (const num of draw) {
        if (playerPickList.includes(num)) {
            matches++;
        }
    }
    
    let moneyWon = 0;
    if (matches === 5) {
        moneyWon = 1000; // Jackpot
    } else if (matches === 4) {
        moneyWon = 100; // Four matches
    } else if (matches === 3) {
        moneyWon = 10; // Three matches
    } else if (matches === 2) {
        moneyWon = 2; // Two matches
    } else moneyWon = 0; // No matches

    return moneyWon
}

function playGame() {
    if (wallet < 2) {
        alert("You don't have enough money to play!");
        wompAudio.play();
        return;
    }

    const playerPickList = lottoPick();
    if (!playerPickList) return; // Exit if input was invalid
    
    wallet -= 2;
    animateWallet(oldWallet, wallet, 1000);


    const draw = lottoDraw();
    document.getElementById("draw").textContent = `Winning numbers: ${draw.join(', ')}`;
    triggerAnimation("draw");

    const winnings = compareResults(playerPickList, draw);
    wallet += winnings;
    animateWallet(oldWallet, wallet, 1000);


    document.getElementById("result").textContent = `You picked: ${playerPickList.join(', ')}`;
    triggerAnimation("result");
    document.getElementById("winnings").textContent = `You won: $${winnings}`;
    triggerAnimation("winnings");
    document.getElementById("wallet").textContent = wallet;

    if (wallet < 2) {
        alert("You don't have enough money to play again!");
        wompAudio.play();
    }
    if (winnings ===0) {
        wompAudio.play();

    for (let i = 1; i <= 5; i++) {
        document.getElementById('pick' + i).value = ''; // Clear input fields
    }
}

function quitGame() {
    alert("Thanks for playing! Please come again.");  
}

function triggerAnimation(id) {
    const el = document.getElementById(id);
    el.classList.remove("show");     // remove previous animation
    void el.offsetWidth;             // trick to force reflow
    el.classList.add("show");        // re-add animation
}

