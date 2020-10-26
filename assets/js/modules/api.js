const base_url = 'https://api.football-data.org'
const api_token = '00e7c80e38ef4d28a2c4d31aa7138d91'

let status = res => {
    if(res.status !== 200){
        console.log(`Error : ${res.status}`)
        return Promise.reject(new Error(res.statusText()))
    }else{
        return Promise.resolve(res)
    }
}

let fetchApi = (url) => {
    return fetch(url, {
        headers: {
            "X-Auth-Token": api_token,
        },
    });
};

const getStandings = leagueID => {
    if('caches' in window){
        caches.match(`${base_url}/v2/competitions/${leagueID}/standings`)
        .then(res => {
            if(res){
                res.json().then(data => {
                    getStandingHTML(data)
                }).catch(err => console.log(err))
            }
        })
    }
    fetchApi(`${base_url}/v2/competitions/${leagueID}/standings`)
    .then(status)
    .then(res => res.json())
    .then(data => {
        getStandingHTML(data)
    })
    .catch(err => console.log(err))
}

const getTeams = leagueID => {
    if('caches' in window){
        caches.match(`${base_url}/v2/competitions/${leagueID}/teams`)
            .then(res => {
                if(res){
                    res.json()
                        .then(data => {
                            getTeamHTML(data)
                        })
                }
            })
        
    }
    fetchApi(`${base_url}/v2/competitions/${leagueID}/teams`)
    .then(status)
    .then(res => res.json())
    .then(data => {
        getTeamHTML(data)
    })
    .catch(err => console.log(err))
}

function getStandingHTML(data) {
    let standingsHTML = ''
    data = data.standings[0].table

    data.forEach(dataTeam => {
        let urlTeamImage = dataTeam.team.crestUrl
        urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
        standingsHTML +=
            `
            <tr>
                <td>${dataTeam.position}</td>
                <td><img src="${urlTeamImage}" alt="${dataTeam.team.name}" class="responsive-img" width="30"  onError="this.onerror=null;this.src='/assets/img/img404.png';"></td>
                <td>${dataTeam.team.name}</td>
                <td>${dataTeam.playedGames}</td>
                <td>${dataTeam.won}</td>
                <td>${dataTeam.draw}</td>
                <td>${dataTeam.lost}</td>
                <td><b>${dataTeam.points}</b></td>
            </tr>
            `
    })
    document.getElementById('progress').style.display = 'none'
    document.getElementById('standings').innerHTML = standingsHTML
}

function getTeamHTML(data){
    let teamsHTML = ''
    data = data.teams
    data.forEach(team => {
        let urlTeamImage = team.crestUrl
        if (urlTeamImage == null || urlTeamImage == "") {
            urlTeamImage = "/assets/img/img404.png";
        } else {
            urlTeamImage = urlTeamImage.replace(/^http:\/\//i, "https://");
        }
        teamsHTML +=
            `
            <section>
                <div class="card ungu white-text">
                    <div class="row" style="padding:5px 20px 20px 20px">
                        <h5 class="white-text"><strong>${team.name}</strong></h5>
                        <div class="col s12 l4 center">
                            <img src="${urlTeamImage}" alt="${team.name}" style="height:100px">
                        </div>
                        <div class="col s12 l6 offset-l1">
                            <span>${team.venue}</span><br>
                            <a href="${team.website}" target="_blank" class="website-action">${team.website}</a>
                        </div>
                            <a onclick="addBookmarkTeam(${team.id},'${urlTeamImage}','${team.name}','${team.venue}','${team.website}')"  class="right btn-floating btn waves-effect waves-light white"><i class="material-icons green-text">bookmark</i></a>
                    </div>
                </div>
            </section>
            `
    })
    document.getElementById('progress').style.display = 'none'
    document.getElementById('teams').innerHTML = teamsHTML
}

export default {
    getStandings,
    getTeams
}
