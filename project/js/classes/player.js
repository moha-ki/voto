class Player {
    constructor(name, level) {
        this.name = name;
        this.level = parseInt(level);
        this.gamesPlayed = 0;
        this.playedLast = false;
    }
}