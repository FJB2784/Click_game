var count = 0; // クリック数
var flg = 1; // クリックの制御
var Timer; // ゲームのタイマー
var idm; //ユーザーのID
var user_point;　// ユーザーのポイント 
var rank; //ゲームの結果ランク
var point1; // 会得ポイント
var text1; // 結果
var text2 = [];// 結果テキスト
document.getElementById("gacha").style.display = "none";
document.getElementById("ck_button").style.display = "none";

function game_start() {
    console.log("start");
    document.getElementById("gacha").style.display = "none";
    count = 0;
    flg = 0;
    document.getElementById("ck_button").style.display = "block";
    setTimeout(stop, 5000);
}

function ck() {
    if (flg == 0) {
        count++;
        output();
    }
}

function stop() {
    console.log("stop");
    document.getElementById("ck_button").style.display = "none";
    flg = 1;
    judge();
}

function judge() {
    text1 = "あなたのクリック数は" + count + "回";
    text2 = [];
    if (count >= 80) {
        rank = "高〇名人";
        point1 = 300;
        text2.push('とてつもなく速いです！');
        text2.push('どれくらい早いかというともう伝説の高〇名人レベル');
        text2.push('なわけです！これなら16連打でスイカも割れます！');
    } else if (count >= 60) {
        rank = "ドラゴン";
        image = "img/dragon.png";
        point1 = 30;
        text2.push('そうとう速いです。どれぐらい速いかというと、もう');
        text2.push('龍とか伝説の生き物レベルなわけです。ブロード');
        text2.push('バンドの世界を思う存分に楽しんで下さい！');
    } else if (count >= 50) {
        rank = "クロヒョウ";
        image = "img/kurohyou.png";
        point1 = 15;
        text2.push('かなりの速さですね！イライラすることなくクール');
        text2.push('にネットを楽しめると思います。クロヒョウも余裕');
        text2.push('の腕組みポーズです。');
    } else if (count >= 40) {
        rank = "ウサギ";
        image = "img/rabbit.png";
        point1 = 12;
        text2.push('良い感じのスピードですよね。');
        text2.push('安定してこのくらいの速度が出ていればひとまず');
        text2.push('安心、ウサギは快調に飛ばしています。');
    } else if (count >= 30) {
        rank = "ニンゲン";
        image = "img/human.png";
        point1 = 10;
        text2.push('早めのクリックです。');
        text2.push('一般的な人が頑張るとこのくらいの速度');
        text2.push('でしょう。');
    } else if (count >= 20) {
        rank = "パンダ";
        image = "img/panda.png";
        point1 = 5;
        text2.push('少し早めのクリックです。');
        text2.push('アマゾンで笹を注文することぐらいなら');
        text2.push('難なくできる速さです。');
    } else if (count >= 10) {
        rank = "ハムスター";
        image = "img/hamster.png";
        point1 = 1;
        text2.push('そこそこのクリックです。');
        text2.push('ハムスターとメールするのには困らない');
        text2.push('でしょう。');
    } else if (count >= 0) {
        rank = "カメ";
        image = "img/kame.jpg";
        point1 = 0;
        text2.push('とても遅いです。');
        text2.push('情熱思想理念頭脳気品優雅さ勤勉さ');
        text2.push('そして何よりも速さが足りません。');
    } else {
        rank = "カメ";
        image = "img/kame.jpg";
        point1 = 0;
        text2.push('とても遅いです。');
        text2.push('情熱思想理念頭脳気品優雅さ勤勉さ');
        text2.push('そして何よりも速さが足りません。');
    }
    theCanvas = document.getElementById("cv");
    context = document.getElementById("cv").getContext("2d");
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);
    img2 = new Image();
    img2.onload = function onImageLoad() {
        context.drawImage(img2, 30, 60, 300, 400);
    }
    img2.src = "img/sky.jpg";
    img1 = new Image();
    img1.onload = function onImageLoad() {
        context.drawImage(img1, 30, 60, 300, 400);
    }
    img1.src = image;
    context.fillStyle = "rgb(0, 0, 200)";
    context.fillRect(30, 20, 300, 500);
    context.font = "italic 20px Arial";
    context.strokeStyle = "white";
    context.strokeText(rank + "級", 120, 45, );
    context.strokeStyle = "blue";
    context.font = "italic 15px Arial";
    context.strokeText(text2[0], 400, 80, );
    context.strokeText(text2[1], 400, 110, );
    context.strokeText(text2[2], 400, 140, );
}

function output() {
    theCanvas = document.getElementById("cv");
    context = document.getElementById("cv").getContext("2d");
    context.clearRect(0, 0, theCanvas.width, theCanvas.height);
    context.font = "italic 40px Arial";
    context.strokeStyle = "blue";
    context.strokeText("現在のクリック数:" + count, 100, 30, 150);
}

function db() {
    var database = firebase.database();
    var dataRef = database.ref('/' + idm);
    dataRef.once("value").then(function (snapshot) {
        user_point = snapshot.child("money").val();
        var updates = {};
        updates['/' + idm + '/money'] = user_point + point1 - 10;
        return firebase.database().ref().update(updates);
    });
}

// IDの読み込み
function printIDm() {
    var idm = getIDm();
    var database = firebase.database();
    var dataRef = database.ref('/' + idm);
    dataRef.once("value").then(function (snapshot) {
        document.getElementById("UserName").innerHTML = 'ユーザー名：' + snapshot.child("name").val();
        document.getElementById("Point").innerHTML = 'ポイント：' + snapshot.child("money").val();
        user_point = snapshot.child("money").val();
        if (user_point >= 10) { document.getElementById("gacha").style.display = "inline"; }
    });
    document.getElementById("gacha2").style.display = "none";
}

// テストID読み込み
function printIDmDummyWithoutServer() {
    var database = firebase.database();
    var seed = "1";
    idm = getIDmDummyWithoutServer(seed);
    var dataRef = database.ref('/' + idm);
    dataRef.once("value").then(function (snapshot) {
        document.getElementById("UserName").innerHTML = 'ユーザー名：' + snapshot.child("name").val();
        document.getElementById("Point").innerHTML = 'ポイント：' + snapshot.child("money").val();
        user_point = snapshot.child("money").val();
        if (user_point >= 10) { document.getElementById("gacha").style.display = "inline"; }
        console.log(idm)
    });
    document.getElementById("gacha2").style.display = "none";
}

// 画面更新
function reload() {
    var database = firebase.database();
    var dataRef = database.ref('/' + idm);
    dataRef.once("value").then(function (snapshot) {
        document.getElementById("UserName").innerHTML = 'ユーザー名：' + snapshot.child("name").val();
        document.getElementById("Point").innerHTML = 'ポイント：' + snapshot.child("money").val();
        user_point = snapshot.child("money").val();
        if (user_point >= 10) { document.getElementById("gacha").style.display = "inline"; }// ガチャボタンの表示
        document.getElementById("gacha").style.display = "inline";
        // tetes1 = snapshot.child("money").val();
        // tetes2 = snapshot.child("name").val();
        // console.log(tetes1);
        // console.log(tetes2);
    });
}

// ログアウト
function logout() {
    idm = null;
    if (idm == null) { document.getElementById("gacha").style.display = "none"; }
    document.getElementById("UserName").innerHTML = 'ユーザー名：' + 'ログインして';
    document.getElementById("Point").innerHTML = 'ポイント：' + 'ログインして';
    document.getElementById("gacha2").style.display = "inline";
}

// ファンクションキー無効
function check() {
    if (event.keyCode != 122 && event.keyCode >= 112 && event.keyCode <= 123) {
        event.keyCode = 0;
        return false;
    }
}
window.document.onkeydown = check;

