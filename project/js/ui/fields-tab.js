//Generate or adapt the fields tab on start up and each time the settings are changed

var fields_tab = document.getElementById("fields-tab");

function generateOrUpdateFields() {
    //find the current number of fields and players per team
    let old_num_fields = 0;
    let old_num_players = 0;

    let fields = fields_tab.querySelectorAll(".field");
    console.log(fields);
    if (fields.length > 0) {
        old_num_fields = fields.length;
        let players = fields[0].querySelectorAll(".team1 span");
        if (fields != undefined && fields != null) {
           old_num_players = players.length;
        }
    }
    //find the new number of fields and players per team from the settings tab
    let new_num_fields = document.querySelector("#settings-tab #field-count-input").value;
    let new_num_players = document.querySelector("#settings-tab #team-size-input").value;
    
    console.log(old_num_fields);
    console.log(new_num_fields);
    console.log(old_num_players);
    console.log(new_num_players);
    //if the old one is smaller, add the new ones
    if (new_num_fields > old_num_fields) {
        for (let i = old_num_fields + 1; i <= new_num_fields; i++) {
            generateField(i);
        }
    }
    //otherwise remove the difference starting with the last one
    else if(old_num_fields > new_num_fields) {
        for (let i = old_num_fields; i > new_num_fields; i--) {
            removeField(i);
        }
    }
    if (new_num_players > old_num_players) {
        for (let i = old_num_players + 1; i <= new_num_players; i++) {
            generatePlayers(i);
        }
    }
    for (let i = old_num_players; i > new_num_players; i--) {
        removePlayers(fields, i);
    }
}

function generateField(field_number) {
    let field = document.createElement('div');
    field.classList.add('field');
    field.dataset.number = field_number;
    fields_tab.querySelector('#fields-container').append(field);
    let team1 = document.createElement('div');
    let team2 = document.createElement('div');
    team1.classList.add('team', 'team1');
    team2.classList.add('team', 'team2');
    let hrule = document.createElement('hr');
    field.append(team1);
    field.append(hrule);
    field.append(team2);
}

function removeField(field_number) {
    let field = document.querySelector('.field[data-number="'+field_number+'"]');
    field.remove();
}

function generatePlayers(player_number) {
    let fields = fields_tab.querySelectorAll('.field');
    for (let f of fields) {
        createPlayer(f, 1, player_number);
        createPlayer(f, 2, player_number);
    }
}

/**
 * 
 * @param {*} fields NodeList of all fields
 * @param {*} player_number 
 */
function removePlayers(fields, player_number) {
    for (let f of fields) {
        team1_player = f.querySelector('.team1 .player[data-number="'+player_number+'"]');
        team1_player.remove();
        team2_player = f.querySelector('.team2 .player[data-number="'+player_number+'"]');
        team2_player.remove();
    }
}

function createPlayer(field, team, number) {
    let player_element = document.createElement('span');
    player_element.classList.add('player');
    player_element.dataset.number = number;
    field.querySelector('.team'+team).append(player_element);
}

generateOrUpdateFields();
