// secure-player.js - نظام التشغيل والحماية الفولاذي لمنصة فيكتور بيولوجي

var myVideo = document.getElementById("lecture-video");

// دالة تشغيل الفيديو عند الضغط على البوستر المخصص
function startLocalVideo() {
    var poster = document.getElementById('poster');
    if (poster) {
        poster.classList.add('hidden-poster');
    }
    if (myVideo) {
        myVideo.play();
    }
}

// 1. التحكم بـ زر المسطرة (Spacebar) للتشغيل والإيقاف المؤقت للكمبيوتر
window.addEventListener('keydown', function(e) {
    if (e.code === 'Space' || e.keyCode === 32) {
        e.preventDefault(); // منع نزول الشاشة لأسفل عند الضغط على المسطرة
        
        var poster = document.getElementById('poster');
        if(poster && poster.classList.contains('hidden-poster') && myVideo) {
            if (myVideo.paused) {
                myVideo.play();
            } else {
                myVideo.pause();
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

// ================== نظام الحماية الفولاذي لمنع الفحص والنسخ ==================

// أ. منع فتح القائمة عند الضغط على زر الفأرة الأيمن (Right-Click)
document.addEventListener('contextmenu', function(e) { 
    e.preventDefault(); 
});

// ب. منع اختصارات لوحة المفاتيح الخاصة بأدوات المطورين وكشف السورس كود
document.addEventListener('keydown', function(e) {
    // منع F12
    if (e.keyCode === 123) { 
        e.preventDefault(); 
        return false; 
    }
    // منع Ctrl + Shift + I (أدوات الفحص)
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.code === 'KeyI')) { 
        e.preventDefault(); 
        return false; 
    }
    // منع Ctrl + Shift + J (الكونسول)
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 74 || e.code === 'KeyJ')) { 
        e.preventDefault(); 
        return false; 
    }
    // منع Ctrl + Shift + C (العنصر المحدد)
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 67 || e.code === 'KeyC')) { 
        e.preventDefault(); 
        return false; 
    }
    // منع Ctrl + U (عرض السورس كود الأساسي للصفحة)
    if (e.ctrlKey && (e.keyCode === 85 || e.code === 'KeyU')) { 
        e.preventDefault(); 
        return false; 
    }
});
