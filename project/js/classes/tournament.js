class Tournament {
    constructor() {
        this.players = [];
    }

    addPlayer(player) {
        this.players.push(player);
    }

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

    setCurrentPlayer(pName) {
        for (let p of this.players) {
            if(p.name === pName) {
                p.playedLast = true;
                p.gamesPlayed += 1;
            }
        }
    }

    resetCurrent() {
        for (let p of this.players) {
            p.playedLast = false;
        } 
    }	

    //Return a Playerpool where players that didnt play last round are added first
    getFairPlayerPool(size) {
        let firstPool = [...this.players];
        let secondPool = [];
        let resultingPool = [];
        //add fresh players first
        for (let p of firstPool) {
            if(p.playedLast === false) {
                resultingPool.push(p);
            }
            else {
                secondPool.push(p);
            }
        }
        //then fill up by random
        while(resultingPool.length <= size) {
            let i = getRandomInt(secondPool.length);
            resultingPool.push(secondPool[i]);
            secondPool.splice(i,1);
        }
        return resultingPool;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function calculateTeamAverage(players) {
    let sum = 0;
    for( let p of players) {
        sum += p.team;
    }
    return sum / players.length;
}



function generateTeams() {
    let numTeams = parseInt(document.getElementById('field-count-input').value) * 2;
    let teamSize = parseInt(document.getElementById('team-size-input').value);
    var teams = [];
    //refinement for many players here
    let playerPool = tournament.getFairPlayerPool(numTeams * teamSize);
    let avg = calculateTeamAverage(playerPool);
    var avgTeam = 0;
    console.log(playerPool);
    for(let i = 0; i < numTeams; i++) {
        let team = [];
        for (let j = 0; j < teamSize; j++) {
            let candidateIndex = playerPool.length > 0 ? getRandomInt(playerPool.length) : 0;
            if(playerPool[candidateIndex] == undefined){
                break;
            }
            team.push(playerPool[candidateIndex]);
            playerPool.splice(candidateIndex,1);
        }
        avgTeam += calculateTeamAverage(team);
        teams.push(team);
    }
    avgTeam = avgTeam / numTeams;
    fair = true;
    for(let i = 0; i < numTeams; i++) {
        //Comparison determines "Fairness"
        if(Math.abs(calculateTeamAverage(teams[i]) - avgTeam) > 0.6) {
           fair = false;
           break;
        }
    }
    if(fair === true) {
        setTeams(teams);
    }
    else {
        generateTeams();
    }

}

function setTeams(teams) {
    //clear 
    for (let pName of document.querySelectorAll('.volleyball-field span')) {
        pName.textContent = '';
    }
    tournament.resetCurrent();
    for (let i = 1; i <= teams.length; i++) {
        for(let j = 0; j < teams[i-1].length; j++) {
            field = i === 1 ? 1 : Math.round(i / 2);
            selector = "span[data-field='"+field+"'][data-team='"+i+"'][data-player='"+(j+1)+"']";
            document.querySelector(selector).textContent = teams[i-1][j].name;
            tournament.setCurrentPlayer(teams[i-1][j].name);
        }
    }
}

function testSetup() {
    for (let i = 1; i < 40; i++) {
        p = new Player('player'+i, i%8 + 1);
        tournament.addPlayer(p);
    }
}

window.addEventListener('beforeunload', function(e) {
    e.preventDefault(); 
    console.log(tournament.players);
    e.returnValue = ''; 
});