// secure-player.js - نظام تشغيل يوتيوب المطور والحماية لمنصة فيكتور بيولوجي

var player;

// تجهيز وتشغيل وسم اليوتيوب من خلال الـ API الرسمي
function onYouTubeIframeAPIReady() {
    player = new YT.Player('lecture-video', {
        events: {
            'onReady': onPlayerReady
        }
    });
}

// تحميل السكربت ديناميكياً لضمان استقرار التايم لاين
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onPlayerReady(event) {
    // المشغل جاهز الآن
}

// دالة تشغيل الفيديو عند الضغط على غلاف play.png
function startLocalVideo() {
    var poster = document.getElementById('poster');
    if (poster) {
        poster.classList.add('hidden-poster');
    }
    if (player && player.playVideo) {
        player.playVideo();
    }
}

// 1. التحكم بـ زر المسطرة (Spacebar) للتشغيل والإيقاف المؤقت للكمبيوتر
window.addEventListener('keydown', function(e) {
    if (e.code === 'Space' || e.keyCode === 32) {
        e.preventDefault(); // منع نزول الشاشة لأسفل
        
        var poster = document.getElementById('poster');
        if(poster && poster.classList.contains('hidden-poster') && player) {
            var state = player.getPlayerState();
            if (state === 1) { // 1 تعني يعمل حالياً
                player.pauseVideo();
            } else {
                player.playVideo();
            }
        } else {
            startLocalVideo();
        }
    }
});

// 2. النقر المزدوج (Double Click) لتكبير الإطار الخاص لملء الشاشة بالكامل
var container = document.getElementById('player-container');
if (container) {
    container.addEventListener('dblclick', function() {
        if (!document.fullscreenElement) {
            if (container.requestFullscreen) { container.requestFullscreen(); }
            else if (container.mozRequestFullScreen) { container.mozRequestFullScreen(); }
            else if (container.webkitRequestFullscreen) { container.webkitRequestFullscreen(); }
            else if (container.msRequestFullscreen) { container.msRequestFullscreen(); }
        } else {
            if (document.exitFullscreen) { document.exitFullscreen(); }
        }
    });
}

// ================== نظام الحماية الفولاذي المانع للفحص والنسخ ==================
document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
document.addEventListener('keydown', function(e) {
    if (e.keyCode === 123) { e.preventDefault(); return false; }
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.code === 'KeyI')) { e.preventDefault(); return false; }
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 74 || e.code === 'KeyJ')) { e.preventDefault(); return false; }
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 67 || e.code === 'KeyC')) { e.preventDefault(); return false; }
    if (e.ctrlKey && (e.keyCode === 85 || e.code === 'KeyU')) { e.preventDefault(); return false; }
});
