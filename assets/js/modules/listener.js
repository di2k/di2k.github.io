import database from './database.js'

const getAllTeam = () => {
    let teamsHTML = ''
    database.getTeam()
        .then(data => {
            if(data && data.length > 0) {
                data.forEach(team => {
                    teamsHTML +=
                        `
                        <section>
                            <div class="card ungu white-text">
                                <div class="row" style="padding:5px 20px 20px">
                                    <h5 class="white-text"><strong>${team.name}</strong></h5>
                                    <div class="col s12 l4 center">
                                        <img src="${team.logo}" alt="${team.name}" style="height:100px">
                                    </div>
                                    <div class="col s12 l6 offset-l1">
                                        ${team.venue} <br>
                                        <a href="${team.website}" target="_blank" class="website-action">${team.website}</a>
                                    </div>
                                        <a onclick="deleteBookmarkTeam(${team.id},'${team.name}')" class="right btn-floating btn waves-effect waves-light white"><i class="material-icons red-text">delete</i></a>
                                </div>
                            </div>
                        </section>
                        `
                })
            } else {
                teamsHTML +=`
                    <section>
                        <div class="card">
                            <div class="card-image">
                                <img src="/assets/img/a02.jpg">
                            </div>
                            <div class="container ungu-text">
                                <div class="row">
                                    <div class="center">
                                        <h6>There is no saved data</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                `
            }
            document.getElementById('progress').style.display = 'none'
            document.getElementById('bookmarkTeams').innerHTML = teamsHTML
        })
}

const pushNotification = msg => {
    const title = 'Notifikasi';
    const options = {
        body: msg,
        icon: '/assets/img/favicon-32.png'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(regis => {
            regis.showNotification(title, options);
        });
    }
}

const addBookmarkTeam = (id,logo,name,venue,website) => {
    database.addTeam({id,logo,name,venue,website})
    M.toast({html: `Berhasil Bookmark ${name}`});
    pushNotification(`Berhasil Bookmark ${name}`)
}

const deleteBookmarkTeam = (id,name) => {
    let imSure = confirm(`Menghapus ${name} dari Bookmark ?`)
    if(imSure){
        database.deleteTeam(id)
        getAllTeam()
        M.toast({html: `Berhasil Menghapus ${name}`})
        pushNotification(`Berhasil Menghapus ${name}`)
    }
}

export default {
    addBookmarkTeam,
    getAllTeam,
    deleteBookmarkTeam
}