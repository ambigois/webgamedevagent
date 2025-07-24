// Wordle Game Implementation
class WordleGame {
    constructor() {
        this.WORD_LENGTH = 5;
        this.MAX_GUESSES = 6;
        this.currentRow = 0;
        this.currentCol = 0;
        this.gameOver = false;
        this.currentWord = '';
        this.guesses = [];
        
        // Word list - common 5-letter words
        this.wordList = [
            'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN',
            'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIEN', 'ALIGN', 'ALIKE', 'ALIVE',
            'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMONG', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE',
            'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARRAY', 'ASIDE', 'ASSET', 'AUDIO', 'AUDIT', 'AVOID',
            'AWAKE', 'AWARD', 'AWARE', 'BADLY', 'BASIC', 'BEACH', 'BEGAN', 'BEGIN', 'BEING', 'BELOW',
            'BENCH', 'BILLY', 'BIRTH', 'BLACK', 'BLAME', 'BLANK', 'BLIND', 'BLOCK', 'BLOOD', 'BOARD',
            'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BREAD', 'BREAK', 'BREED', 'BRIEF', 'BRING',
            'BROAD', 'BROKE', 'BROWN', 'BUILD', 'BUILT', 'BUYER', 'CABLE', 'CALIF', 'CARRY', 'CATCH',
            'CAUSE', 'CHAIN', 'CHAIR', 'CHAOS', 'CHARM', 'CHART', 'CHASE', 'CHEAP', 'CHECK', 'CHEST',
            'CHIEF', 'CHILD', 'CHINA', 'CHOSE', 'CIVIL', 'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLICK',
            'CLIMB', 'CLOCK', 'CLOSE', 'CLOUD', 'COACH', 'COAST', 'COULD', 'COUNT', 'COURT', 'COVER',
            'CRAFT', 'CRASH', 'CRAZY', 'CREAM', 'CRIME', 'CROSS', 'CROWD', 'CROWN', 'CRUDE', 'CURVE',
            'CYCLE', 'DAILY', 'DANCE', 'DATED', 'DEALT', 'DEATH', 'DEBUT', 'DELAY', 'DEPTH', 'DOING',
            'DOUBT', 'DOZEN', 'DRAFT', 'DRAMA', 'DRANK', 'DREAM', 'DRESS', 'DRILL', 'DRINK', 'DRIVE',
            'DROVE', 'DYING', 'EAGER', 'EARLY', 'EARTH', 'EIGHT', 'ELITE', 'EMPTY', 'ENEMY', 'ENJOY',
            'ENTER', 'ENTRY', 'EQUAL', 'ERROR', 'EVENT', 'EVERY', 'EXACT', 'EXIST', 'EXTRA', 'FAITH',
            'FALSE', 'FAULT', 'FIBER', 'FIELD', 'FIFTH', 'FIFTY', 'FIGHT', 'FINAL', 'FIRST', 'FIXED',
            'FLASH', 'FLEET', 'FLOOR', 'FLUID', 'FOCUS', 'FORCE', 'FORTH', 'FORTY', 'FORUM', 'FOUND',
            'FRAME', 'FRANK', 'FRAUD', 'FRESH', 'FRONT', 'FRUIT', 'FULLY', 'FUNNY', 'GIANT', 'GIVEN',
            'GLASS', 'GLOBE', 'GOING', 'GRACE', 'GRADE', 'GRAND', 'GRANT', 'GRASS', 'GRAVE', 'GREAT',
            'GREEN', 'GROSS', 'GROUP', 'GROWN', 'GUARD', 'GUESS', 'GUEST', 'GUIDE', 'HAPPY', 'HARRY',
            'HEART', 'HEAVY', 'HENCE', 'HENRY', 'HORSE', 'HOTEL', 'HOUSE', 'HUMAN', 'IDEAL', 'IMAGE',
            'INDEX', 'INNER', 'INPUT', 'ISSUE', 'JAPAN', 'JIMMY', 'JOINT', 'JONES', 'JUDGE', 'KNOWN',
            'LABEL', 'LARGE', 'LASER', 'LATER', 'LAUGH', 'LAYER', 'LEARN', 'LEASE', 'LEAST', 'LEAVE',
            'LEGAL', 'LEVEL', 'LEWIS', 'LIGHT', 'LIMIT', 'LINKS', 'LIVES', 'LOCAL', 'LOOSE', 'LOWER',
            'LUCKY', 'LUNCH', 'LYING', 'MAGIC', 'MAJOR', 'MAKER', 'MARCH', 'MARIA', 'MATCH', 'MAYBE',
            'MAYOR', 'MEANT', 'MEDIA', 'METAL', 'MIGHT', 'MINOR', 'MINUS', 'MIXED', 'MODEL', 'MONEY',
            'MONTH', 'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH', 'MOVED', 'MOVIE', 'MUSIC', 'NEEDS',
            'NEVER', 'NEWLY', 'NIGHT', 'NOISE', 'NORTH', 'NOTED', 'NOVEL', 'NURSE', 'OCCUR', 'OCEAN',
            'OFFER', 'OFTEN', 'ORDER', 'OTHER', 'OUGHT', 'PAINT', 'PANEL', 'PAPER', 'PARTY', 'PEACE',
            'PETER', 'PHASE', 'PHONE', 'PHOTO', 'PIANO', 'PIECE', 'PILOT', 'PITCH', 'PLACE', 'PLAIN',
            'PLANE', 'PLANT', 'PLATE', 'POINT', 'POUND', 'POWER', 'PRESS', 'PRICE', 'PRIDE', 'PRIME',
            'PRINT', 'PRIOR', 'PRIZE', 'PROOF', 'PROUD', 'PROVE', 'QUEEN', 'QUICK', 'QUIET', 'QUITE',
            'RADIO', 'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH', 'READY', 'REALM', 'REBEL', 'REFER',
            'RELAX', 'REPAY', 'REPLY', 'RIGHT', 'RIGID', 'RIVAL', 'RIVER', 'ROBIN', 'ROGER', 'ROMAN',
            'ROUGH', 'ROUND', 'ROUTE', 'ROYAL', 'RURAL', 'SCALE', 'SCENE', 'SCOPE', 'SCORE', 'SENSE',
            'SERVE', 'SEVEN', 'SHALL', 'SHAPE', 'SHARE', 'SHARP', 'SHEET', 'SHELF', 'SHELL', 'SHIFT',
            'SHINE', 'SHIRT', 'SHOCK', 'SHOOT', 'SHORT', 'SHOWN', 'SIDES', 'SIGHT', 'SIGN', 'SILLY',
            'SINCE', 'SIXTH', 'SIXTY', 'SIZED', 'SKILL', 'SLEEP', 'SLIDE', 'SMALL', 'SMART', 'SMILE',
            'SMITH', 'SMOKE', 'SOLID', 'SOLVE', 'SORRY', 'SOUND', 'SOUTH', 'SPACE', 'SPARE', 'SPEAK',
            'SPEED', 'SPEND', 'SPENT', 'SPLIT', 'SPOKE', 'SPORT', 'STAFF', 'STAGE', 'STAKE', 'STAND',
            'START', 'STATE', 'STEAM', 'STEEL', 'STEEP', 'STEER', 'STERN', 'STICK', 'STILL', 'STOCK',
            'STONE', 'STOOD', 'STORE', 'STORM', 'STORY', 'STRIP', 'STUCK', 'STUDY', 'STUFF', 'STYLE',
            'SUGAR', 'SUITE', 'SUPER', 'SWEET', 'TABLE', 'TAKEN', 'TASTE', 'TAXES', 'TEACH', 'TEENS',
            'TEETH', 'TEMPO', 'TERMS', 'TEXAS', 'THANK', 'THEFT', 'THEIR', 'THEME', 'THERE', 'THESE',
            'THICK', 'THING', 'THINK', 'THIRD', 'THOSE', 'THREE', 'THREW', 'THROW', 'THUMB', 'TIGHT',
            'TIMES', 'TIRED', 'TITLE', 'TODAY', 'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH', 'TOWER', 'TRACK',
            'TRADE', 'TRAIN', 'TREAT', 'TREND', 'TRIAL', 'TRIBE', 'TRICK', 'TRIED', 'TRIES', 'TRUCK',
            'TRULY', 'TRUNK', 'TRUST', 'TRUTH', 'TWICE', 'TWIST', 'TYLER', 'TYPES', 'ULTRA', 'UNCLE',
            'UNDUE', 'UNION', 'UNITY', 'UNTIL', 'UPPER', 'UPSET', 'URBAN', 'USAGE', 'USUAL', 'VALID',
            'VALUE', 'VIDEO', 'VIRUS', 'VISIT', 'VITAL', 'VOCAL', 'VOICE', 'WASTE', 'WATCH', 'WATER',
            'WHEEL', 'WHERE', 'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WHOSE', 'WOMAN', 'WOMEN', 'WORLD',
            'WORRY', 'WORSE', 'WORST', 'WORTH', 'WOULD', 'WRITE', 'WRONG', 'WROTE', 'YIELD', 'YOUNG',
            'YOUTH'
        ];
        
        this.validWords = new Set(this.wordList);
        this.selectRandomWord();
        this.initializeGame();
    }
    
    selectRandomWord() {
        const randomIndex = Math.floor(Math.random() * this.wordList.length);
        this.currentWord = this.wordList[randomIndex];
        console.log('Answer:', this.currentWord); // For testing - remove in production
    }
    
    initializeGame() {
        this.createGrid();
        this.createKeyboard();
        this.attachEventListeners();
    }
    
    createGrid() {
        const gridContainer = document.querySelector('.grid-container');
        gridContainer.innerHTML = '';
        
        for (let row = 0; row < this.MAX_GUESSES; row++) {
            const rowElement = document.createElement('div');
            rowElement.classList.add('grid-row');
            
            for (let col = 0; col < this.WORD_LENGTH; col++) {
                const tile = document.createElement('div');
                tile.classList.add('tile');
                tile.setAttribute('data-row', row);
                tile.setAttribute('data-col', col);
                rowElement.appendChild(tile);
            }
            
            gridContainer.appendChild(rowElement);
        }
    }
    
    createKeyboard() {
        const keyboardContainer = document.querySelector('.keyboard-container');
        keyboardContainer.innerHTML = '';
        
        const keyboardRows = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
        ];
        
        keyboardRows.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('keyboard-row');
            
            row.forEach(key => {
                const keyElement = document.createElement('button');
                keyElement.classList.add('key');
                keyElement.setAttribute('data-key', key);
                
                if (key === 'ENTER' || key === 'BACKSPACE') {
                    keyElement.classList.add('wide');
                }
                
                if (key === 'BACKSPACE') {
                    keyElement.innerHTML = '⌫';
                } else {
                    keyElement.textContent = key;
                }
                
                keyElement.addEventListener('click', () => this.handleKeyPress(key));
                rowElement.appendChild(keyElement);
            });
            
            keyboardContainer.appendChild(rowElement);
        });
    }
    
    attachEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (this.gameOver) return;
            
            const key = e.key.toUpperCase();
            
            if (key === 'ENTER') {
                this.handleKeyPress('ENTER');
            } else if (key === 'BACKSPACE') {
                this.handleKeyPress('BACKSPACE');
            } else if (key.match(/[A-Z]/) && key.length === 1) {
                this.handleKeyPress(key);
            }
        });
        
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.resetGame();
        });
    }
    
    handleKeyPress(key) {
        if (this.gameOver) return;
        
        if (key === 'ENTER') {
            this.submitGuess();
        } else if (key === 'BACKSPACE') {
            this.deleteLetter();
        } else if (this.currentCol < this.WORD_LENGTH) {
            this.addLetter(key);
        }
    }
    
    addLetter(letter) {
        if (this.currentCol < this.WORD_LENGTH) {
            const tile = document.querySelector(`[data-row="${this.currentRow}"][data-col="${this.currentCol}"]`);
            tile.textContent = letter;
            tile.classList.add('filled');
            this.currentCol++;
        }
    }
    
    deleteLetter() {
        if (this.currentCol > 0) {
            this.currentCol--;
            const tile = document.querySelector(`[data-row="${this.currentRow}"][data-col="${this.currentCol}"]`);
            tile.textContent = '';
            tile.classList.remove('filled');
        }
    }
    
    submitGuess() {
        if (this.currentCol !== this.WORD_LENGTH) {
            this.showMessage('Not enough letters');
            return;
        }
        
        const guess = this.getCurrentGuess();
        
        if (!this.validWords.has(guess)) {
            this.showMessage('Not in word list');
            return;
        }
        
        this.guesses.push(guess);
        this.evaluateGuess(guess);
        this.updateKeyboard(guess);
        
        if (guess === this.currentWord) {
            this.gameOver = true;
            setTimeout(() => {
                this.showGameOverModal(true, this.currentRow + 1);
            }, 1500);
        } else if (this.currentRow === this.MAX_GUESSES - 1) {
            this.gameOver = true;
            setTimeout(() => {
                this.showGameOverModal(false, 0);
            }, 1500);
        } else {
            this.currentRow++;
            this.currentCol = 0;
        }
    }
    
    getCurrentGuess() {
        let guess = '';
        for (let col = 0; col < this.WORD_LENGTH; col++) {
            const tile = document.querySelector(`[data-row="${this.currentRow}"][data-col="${col}"]`);
            guess += tile.textContent;
        }
        return guess;
    }
    
    evaluateGuess(guess) {
        const targetLetters = [...this.currentWord];
        const guessLetters = [...guess];
        const result = new Array(this.WORD_LENGTH).fill('absent');
        
        // First pass: check for correct letters
        for (let i = 0; i < this.WORD_LENGTH; i++) {
            if (guessLetters[i] === targetLetters[i]) {
                result[i] = 'correct';
                targetLetters[i] = null;
                guessLetters[i] = null;
            }
        }
        
        // Second pass: check for present letters
        for (let i = 0; i < this.WORD_LENGTH; i++) {
            if (guessLetters[i] !== null) {
                const targetIndex = targetLetters.indexOf(guessLetters[i]);
                if (targetIndex !== -1) {
                    result[i] = 'present';
                    targetLetters[targetIndex] = null;
                }
            }
        }
        
        // Apply results with animation
        for (let i = 0; i < this.WORD_LENGTH; i++) {
            const tile = document.querySelector(`[data-row="${this.currentRow}"][data-col="${i}"]`);
            setTimeout(() => {
                tile.classList.add('flip', result[i]);
            }, i * 100);
        }
    }
    
    updateKeyboard(guess) {
        const targetLetters = [...this.currentWord];
        const guessLetters = [...guess];
        const letterStates = {};
        
        // Determine letter states
        for (let i = 0; i < this.WORD_LENGTH; i++) {
            const letter = guessLetters[i];
            if (letter === targetLetters[i]) {
                letterStates[letter] = 'correct';
            } else if (this.currentWord.includes(letter) && letterStates[letter] !== 'correct') {
                letterStates[letter] = 'present';
            } else if (!letterStates[letter]) {
                letterStates[letter] = 'absent';
            }
        }
        
        // Update keyboard
        Object.keys(letterStates).forEach(letter => {
            const key = document.querySelector(`[data-key="${letter}"]`);
            if (key) {
                key.classList.remove('correct', 'present', 'absent');
                key.classList.add(letterStates[letter]);
            }
        });
    }
    
    showMessage(message) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = message;
        messageElement.classList.add('show');
        
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 2000);
    }
    
    showGameOverModal(won, guesses) {
        const modal = document.getElementById('gameModal');
        const title = document.getElementById('modalTitle');
        const message = document.getElementById('modalMessage');
        
        if (won) {
            title.textContent = 'Congratulations!';
            const guessText = guesses === 1 ? 'guess' : 'guesses';
            message.textContent = `You guessed the word in ${guesses} ${guessText}!`;
        } else {
            title.textContent = 'Game Over';
            message.textContent = `The word was: ${this.currentWord}`;
        }
        
        modal.style.display = 'block';
    }
    
    resetGame() {
        this.currentRow = 0;
        this.currentCol = 0;
        this.gameOver = false;
        this.guesses = [];
        this.selectRandomWord();
        
        // Reset grid
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            tile.textContent = '';
            tile.classList.remove('filled', 'correct', 'present', 'absent', 'flip');
        });
        
        // Reset keyboard
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            key.classList.remove('correct', 'present', 'absent');
        });
        
        // Hide modal
        document.getElementById('gameModal').style.display = 'none';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new WordleGame();
});