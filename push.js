var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BKv1XYiiJoWw7TUKw_cDsy4p36jhmkm-oWGS_vOwtMH97QFWZJwvpHIJljVSMtvcLx4F4kUr3GwGIBxxz0BvDYw",
    "privateKey": "zU0RSJV0FA3GdrSfpEJz2y9U71MLuaW_YNFrU-n-PUo"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cORk8thRJfI:APA91bHfFF2XUmyo1Lx4pws7pxKAUiHXk9Zw-aE4Jv6yRPNDahJ0AlolEr8bLnlmjIMnC2PKo07pO8F2aWyJbE4EibcnPEWYKEp9Ce6m1zZBYoTSGL8-oQEEfQ0FdmapKestr235QOOq",
    "keys": {
        "p256dh": "MeJ4DNht1kKKrM2bhp0qlXR/oyo1cbZ4fAqo7ED3WASbn2qlBH5wdYv8EAO9e3Aihkka+A5yeh7913B3Nq9AlU=",
        "auth": "b6RL8Asg/fQssCWRAL2qiQ=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '563541054721',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);