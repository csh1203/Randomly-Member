const nameInput = document.getElementById("name-input");
const membersDiv = document.getElementById("members");
const dividedInput = document.getElementById("divided-input");
const drawButton = document.getElementById("draw");
const resultDiv = document.getElementById("result");

const members = [];

nameInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && nameInput.value.trim() !== "") {
        members.push(nameInput.value.trim());
        nameInput.value = "";
        displayMembers();
    }
});

drawButton.addEventListener("click", function () {
    const count = parseInt(dividedInput.value);

    if (!isNaN(count) && count > 0 && count <= members.length) {
        resultDiv.innerHTML = "";
        const shuffledMembers = shuffleArray(members.slice());
        const teams = distributeMembers(shuffledMembers, count);
        displayTeams(teams);
    } else {
        alert("나눌 개수를 올바르게 입력하세요.");
    }
});

function displayMembers() {
    membersDiv.innerHTML = members.join(", ");
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function distributeMembers(members, count) {
    const teams = [];
    for (let i = 0; i < count; i++) {
        teams.push([]);
    }
    for (let i = 0; i < members.length; i++) {
        const teamIndex = i % count;
        teams[teamIndex].push(members[i]);
    }
    return teams;
}

function displayTeams(teams) {
    resultDiv.innerHTML = "";
    teams.forEach((team, index) => {
        const teamDiv = document.createElement("div");
        teamDiv.textContent = `팀 ${index + 1}: ${team.join(", ")}`;
        resultDiv.appendChild(teamDiv);
    });
    console.log(teams[0].length);
    resultDiv.style.gridTemplateRows = `${teams.length}`;
}