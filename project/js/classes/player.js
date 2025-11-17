class Player {
    constructor(name, level) {
        console.log("Creating player:", name, "Level:", level);
        this.name = name;
        this.level = typeof(level) == "number" ? level : parseInt(level);
        this.gamesPlayed = 0;
        this.priority = false;
    }
}