import api from './api.js'
import listener from './listener.js'

const id_liga = '2021'

const loadPage = (path = 'home') => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            let element = document.querySelector('#body-content')
            if(xhr.status == 200){
                element.innerHTML = xhr.responseText
                if(path === 'home'){
                    api.getStandings(id_liga)
                }
                if(path === 'bookmark'){
                    listener.getAllTeam()
                    window.deleteBookmarkTeam = listener.deleteBookmarkTeam
                }
                if(path === 'teams'){
                    api.getTeams(id_liga)
                    window.addBookmarkTeam = listener.addBookmarkTeam
                }
                if(path === 'about'){}
                
            }else if(xhr.status == 404){
                element.innerHTML = "<h5 class='center red-text'>Halaman Tidak Ditemukan</h5>"
            }else{
                element.innerHTML = "<h5 class='center red-text'>Halaman tidak dapat di akses</h5>"
            }
        }
    }
    xhr.open('GET',`/src/pages/${path}.html`,true)
    xhr.send()
}

export default loadPage