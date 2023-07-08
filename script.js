function searchTeam() {
    const apiKey = "cf176cae008f280b141f55f5dab4019b9635f2f50c758a7acc6ed1edae995c04"; // Reemplaza con tu clave de API válida
    const teamInput = document.getElementById("team-input");
    const teamName = teamInput.value.trim();
  
    if (teamName === "") {
      console.log("Ingresa un nombre de equipo válido");
      return;
    }
  
    const url = `https://apiv2.allsportsapi.com/football/?&met=Teams&teamName=${teamName}&APIkey=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.result && data.result.length > 0) {
          const selectedTeam = data.result[0];
          const teamName = selectedTeam.team_name;
          const teamLogo = selectedTeam.team_logo;
          const players = selectedTeam.players;
  
          const teamInfoDiv = document.getElementById("team-info");
          teamInfoDiv.innerHTML = `
            <h2>Nombre del equipo: ${teamName}</h2>
            <img src="${teamLogo}" alt="Logo del equipo">
            <h3>Jugadores:</h3>
          `;
  
          players.forEach(player => {
            const playerName = player.player_name;
            const playerNumber = player.player_number;
  
            const playerInfo = document.createElement("p");
            playerInfo.innerHTML = `Jugador: ${playerName} - Número: ${playerNumber}`;
  
            teamInfoDiv.appendChild(playerInfo);
          });
        } else {
          console.log("Equipo no encontrado");
        }
      })
      .catch(error => {
        console.log("Error en la solicitud de la API:", error);
      });
  }