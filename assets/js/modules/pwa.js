const registration = () => {
    if('serviceWorker' in navigator){
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('./service-worker.js')
                .then(() => console.log('Register Success'))
                .catch(() => console.log('Register Not Success'))
        })
    }else{
        console.log('Service Worker it is not supported!')
    }
}

const notification = () => {
    if('Notification' in window){
        Notification.requestPermission().then(result => {
            if(result === 'denied'){
                console.log('Notifikasi tidak diijinkan')
                return
            }else if (result === 'default'){
                console.log('Default - Dialog permintaan izin ditutup')
                return
            }
            navigator.serviceWorker.ready.then(() => {
            if('PushManager' in window){
                navigator.serviceWorker.getRegistration().then(reg => {
                    reg.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: 'BKv1XYiiJoWw7TUKw_cDsy4p36jhmkm-oWGS_vOwtMH97QFWZJwvpHIJljVSMtvcLx4F4kUr3GwGIBxxz0BvDYw'
                    }).then(sub => {
                        console.log('Berhasil Subscribe dengan endpoint', sub.endpoint)
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('p256dh')))))
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth')))))
                    }).catch(err => console.log('Gagal Subscribe : ',err))
                    })
                }
            });
        })
    }
}

export default {
    registration,
    notification
}