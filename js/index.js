const nameInput = document.getElementById("name-input");
const membersDiv = document.getElementById("members");
const inputButton = document.getElementById("input");
const dividedInput = document.getElementById("divided-input");
const drawButton = document.getElementById("draw");
const resultDiv = document.getElementById("result");

const members = [];

// 입력
inputButton.onclick = () => {
        const value = nameInput.value.trim();
        
    if (value !== "") {
        members.push(value);
        const listItem = document.createElement('div');
        listItem.classList.add('member');
        listItem.textContent = value;
        membersDiv.appendChild(listItem);
        nameInput.value = "";
    }
};

// 뽑기 
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

// 배열 섞기
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 팀 개수대로 나누기
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

// HTML 에 보여주기
function displayTeams(teams) {
    teams.forEach((team, index) => {
        const teamDiv = document.createElement("div");
        teamDiv.classList.add('team');
        teamDiv.textContent = `팀 ${index + 1}: ${team.join(", ")}`;
        resultDiv.appendChild(teamDiv);
    });
}