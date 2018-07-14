// Database URL
const dburl = 'users/user_list';
const posturl = 'users/add_user';

// Dom Elements
let playersBox = $('#playersBox');
let leader = $('#leader');
let addPlayerInput = $('#addPlayerInput');
let userlist = [];

// Functions to run on Doc ready
$(document).ready(function(){
    getUsers(appendUsers(userlist));
})

// Gets users from DB
const getUsers = function(){
    userlist = [];
    $.getJSON(dburl).done(data => {
        findLeader(data);
        appendUsers(data);
    });
}

// Add users to DB
const addPlayer = function(){
    $.ajax({
        url: posturl,
        type: 'POST',
        data: JSON.stringify({name: addPlayerInput.val()}),
        headers: {
            "Content-Type": 'application/json'
        },
        dataType: 'json',
        success: function (data) {
            console.info(data);
        }
    });
    location.reload();
}

// Deletes User in DB
const onDeleteUser = function(id){
    const deleteurl = `users/delete/${id}`;
    $.post(deleteurl);
    location.reload();
}

// Update Score
const onUpdateScore = function(id, score){
    let updateurl = `users/updatescore`;
    $.ajax({
        url: updateurl,
        type: 'POST',
        data: JSON.stringify({id: id, score: score}),
        headers: {
            "Content-Type": 'application/json'
        },
        dataType: 'json',
        success: function (data) {
            console.info(data);
        }
    });
    location.reload();
}

// Appends users to dom
const appendUsers = function(arr){
    arr.forEach(user => {
        playersBox.append(addCard(user._id, user.name, user.score));
    })
}

// HTML generation for append users function
const addCard = function(id, name, score){
    let innerhtml = `
    <div class="col-md-4 individual-userbox">
            <div class="card border-dark">
                <div class="card-header text-center"><strong>${name}</strong></div>
                <div class="card-body text-center">
                  <h6 class="card-subtitle text-muted">Score</h6>
                  <p class="card-text">${score}</p>
                  <div class='row'>
                    <div class='col-sm-12'>
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-danger" onclick='onUpdateScore("${id}", -1)'>-1</button>
                            <button class="btn btn-danger" onclick='onUpdateScore("${id}", -0.5)'>-0.5</button>
                            <button class="btn btn-info" onclick='onUpdateScore("${id}", 0.5)'>+0.5</button>
                            <button class="btn btn-info" onclick='onUpdateScore("${id}", 1)'>+1</button>
                        </div>
                    </div>
                    <div class='col-sm-12'>
                        <button class="btn btn-outline-danger btn-sm deleteUserButton" onclick='onDeleteUser("${id}")'>Delete <i class="fas fa-trash-alt"></i></button>
                    </div>
                  </div>
                </div>
              </div>
    `
    return innerhtml;
}

// Finds player with top score
const findLeader = function(arr){
    let max = 0;
    let foundLeader = '';
    for(let user of arr) {
        if(user.score > max){
            max = user.score;
            foundLeader = user.name;
        }
    };
    leader.text(foundLeader);
}

