//Tab navigation
const tab_menu_items = document.querySelectorAll(".tab-selector");

tab_menu_items.forEach((element) => {
    element.addEventListener('click', () => {
        console.log('clicked')
        switch_tab(element.getAttribute('target'));
    })
});

function switch_tab(next_tab_id) {
    console.log('Called switch_tab with target ' + next_tab_id);
    let tab_elements = document.querySelectorAll('.tab');

    for (let current_tab of tab_elements) {
        if (current_tab.id === next_tab_id) {
            current_tab.classList.add('active');
        }
        else {
            current_tab.classList.remove('active');
        }
    }

    for (let tab_navigation of tab_menu_items) {
        tab_navigation.classList.remove('active');
        if (tab_navigation.getAttribute('target') === next_tab_id) {
            tab_navigation.classList.add('active');
        }
    }
}

//Init classes and accessors
const tournament = new Tournament();
var nameField = document.getElementById('player-name-iniput');
var teamField = document.getElementById('player-level-input');
var playerList = document.getElementById('playerList');
document.getElementById("generate-teams-btn").onclick = function() {tournament.generateTeams();};
//Root path constant
const root_dir = window.location.pathname.replace(/[^\\\/]*$/, '');


console.log('basic functions loaded');