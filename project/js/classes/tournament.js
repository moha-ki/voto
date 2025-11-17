class Tournament {
    constructor() {
        this.players = [];
        this.pool = [];
    }

    getTeamSize() {
        return document.getElementById('team-size-input').value;
    }

    getFieldCount() {
        return document.getElementById('field-count-input').value;
    }

    getFairness() {
        return document.getElementById('fairness-input').value;
    }

    addPlayer(player) {
        this.players.push(player);
    }

    /**
     * @param {*} pName | Name of the player to be removed
     */
    removePlayer(pName) {
        var newPlayerArray = [];
        for (let p of this.players) {
            if(p.name !== pName) {
                newPlayerArray.push(p)
            }
        }
        this.players = newPlayerArray;
        refreshPlayerList();
    }

    /**
     * @returns The lowest number of games any player has played
     */
    findLeastPlayed() {
        let minGames = Infinity;
        for (let p of this.players) {
            //if p is already in the pool, skip
            if (this.pool.includes(p)) {
                continue;
            }
            if (p.gamesPlayed == 0) {
                return 0;
            }
            if (p.gamesPlayed < minGames) {
                minGames = p.gamesPlayed;
            }
        }
        return minGames;
    }

    /**
     * Generate a player pool based on players' games played and priority status
     */
    generatePlayerPool() {
        //reset pool
        this.pool = [];
        // determine the number of possible players in the pool
        const poolSize = this.getTeamSize() * this.getFieldCount() * 2;
        //add players with priority first
        for (let p of this.players) {
            if (p.priority) {
                this.pool.push(p);
            }
        }
        //going from lowest games played to higher, fill the pool
        while (this.pool.length < poolSize) {
            let lowestPlayed = this.findLeastPlayed();
            let candidates = [];
            //find all players with the current lowest games played
            for (let p of this.players) {
                if (p.gamesPlayed == lowestPlayed && !this.pool.includes(p)) {
                    candidates.push(p);
                }
            }
            // if all candidates fit into the pool, add them all
            if (candidates.length + this.pool.length <= poolSize) {
                for (let c of candidates) {
                    this.pool.push(c);
                }
            }
            // else randomly select players to fill the remaining spots 
            else {
                while (this.pool.length < poolSize && candidates.length > 0) {
                    let randIndex = Math.floor(Math.random() * candidates.length);
                    this.pool.push(candidates[randIndex]);
                    candidates.splice(randIndex, 1);
                }
            }
        }
    }

    /**
     * Increment the games played count for all players in the pool and reset their priority status
     */
    playGames() {
        console.log("Playing games for players in pool:", this.pool);
        for (let p of this.pool) {
            p.gamesPlayed += 1;
            p.priority = false;
        }
        refreshPlayerList();
    }

    generateTeams(newPool = true) {
        if(newPool) {
            this.generatePlayerPool();
        }
        const poolCopy = [...this.pool];    
        const numTeams = this.getFieldCount() * 2;
        const teamSize = this.getTeamSize();
        let teams = [];
        //spread players randomly across teams
        for (let i = 0; i < numTeams; i++) {
            for (let j = 0; j < teamSize; j++) {
                let poolIndex = Math.floor(Math.random() * poolCopy.length);
                if (!teams[i]) {
                    teams[i] = [];
                }
                teams[i].push(poolCopy[poolIndex]);
                poolCopy.splice(poolIndex, 1);
            }
        }
        //check if teams are fair
        for (let i = 0; i < numTeams - 2; i += 2) {
            let levelA = 0;
            let levelB = 0;
            for (let p of teams[i]) {
                levelA += p.level;
            }
            for (let p of teams[i + 1]) {
                levelB += p.level;
            }
            //check if the difference in levels is too large - if so, restart team generation
            if (Math.abs(levelA-levelB) > this.getFairness()) {
                return this.generateTeams(false);
            }
        }
        this.displayTeams(teams);
    }

    displayTeams(teams) {
        for (let i = 0; i < teams.length; i++) {
            let side = i % 2 == 0 ? '.team1' : '.team2';
            let fieldNum = Math.floor(i / 2) + 1;
            console.log('.field[data-number="' + fieldNum + '"]' + side)
            let teamDiv = document.querySelector('.field[data-number="' + fieldNum + '"] ' + side);
            for (let j = 0; j < teams[i].length; j++) {
                let playerSpan = teamDiv.querySelector('.player[data-number="' + (j + 1) + '"]');
                playerSpan.textContent = teams[i][j].name;
            }
        }
    }
}
function testSetup() {
    for (let i = 1; i < 40; i++) {
        p = new Player('player'+i, i%8 + 1);
        tournament.addPlayer(p);
    }
    refreshPlayerList();
}

window.addEventListener('beforeunload', function(e) {
    e.preventDefault(); 
    console.log(tournament.players);
    e.returnValue = ''; 
});