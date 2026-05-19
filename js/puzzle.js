/* ============================================================
   puzzle.js
   パズル本体処理（画像分割・操作・クリア判定）
   ChocoGame
   ============================================================ */

const PUZZLE_COUNT = 3;

const level = localStorage.getItem("choco_level") || "easy";
let gridSize = 3;

if (level === "normal") gridSize = 4;
if (level === "hard") gridSize = 5;

function getRandomPuzzleImage() {
    const num = Math.floor(Math.random() * PUZZLE_COUNT) + 1;
    const fileNum = String(num).padStart(2, "0");
    return `img/puzzle/puzzle${fileNum}.jpg`;
}

const canvas = document.getElementById("puzzle-canvas");
const ctx = canvas.getContext("2d");

let img = new Image();
let resizedImageCanvas = null; // ★ リサイズ後の画像を保持
let tiles = [];
let tileSize = 0;

const errorBox = document.getElementById("error-box");
const retryBtn = document.getElementById("retry-btn");
const errorBackBtn = document.getElementById("error-back-btn");

retryBtn.addEventListener("click", () => location.reload());
errorBackBtn.addEventListener("click", () => (window.location.href = "index.html"));

/* ------------------------------------------------------------
   画像読み込み
------------------------------------------------------------ */
const puzzleImagePath = getRandomPuzzleImage();
img.src = puzzleImagePath;

// サムネイルに反映
document.getElementById("puzzle-preview").src = puzzleImagePath;

img.onload = () => {
    resizeImageToPuzzleSize();
    initPuzzle();
};

img.onerror = () => {
    canvas.style.display = "none";
    document.getElementById("puzzle-buttons").style.display = "none";
    errorBox.style.display = "block";
};

/* ------------------------------------------------------------
   ★ 画像をパズル枠サイズにリサイズする
------------------------------------------------------------ */
function resizeImageToPuzzleSize() {
    const size = Math.min(window.innerWidth * 0.95, 460);

    // オフスクリーン canvas を作成
    const off = document.createElement("canvas");
    off.width = size;
    off.height = size;

    const offCtx = off.getContext("2d");

    // 画像を正方形にトリミングして縮小
    const minSide = Math.min(img.width, img.height);
    const sx = (img.width - minSide) / 2;
    const sy = (img.height - minSide) / 2;

    offCtx.drawImage(
        img,
        sx, sy, minSide, minSide, // 元画像の中央を正方形で切り抜き
        0, 0, size, size          // パズル枠に合わせて縮小
    );

    resizedImageCanvas = off;
}

/* ------------------------------------------------------------
   パズル初期化
------------------------------------------------------------ */
function initPuzzle() {
    const size = Math.min(window.innerWidth * 0.95, 460);

    canvas.width = size;
    canvas.height = size;

    tileSize = size / gridSize;

    tiles = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
        tiles.push(i);
    }

    tiles.sort(() => Math.random() - 0.5);

    drawPuzzle();
}

/* ------------------------------------------------------------
   パズル描画
------------------------------------------------------------ */
function drawPuzzle() {
    const imgSrc = resizedImageCanvas; // ★ リサイズ済み画像を使用

    for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];

        const sx = (tile % gridSize) * tileSize;
        const sy = Math.floor(tile / gridSize) * tileSize;

        const dx = (i % gridSize) * tileSize;
        const dy = Math.floor(i / gridSize) * tileSize;

        if (tile === tiles.length - 1) {
            ctx.fillStyle = "#fff";
            ctx.fillRect(dx, dy, tileSize, tileSize);
        } else {
            ctx.drawImage(
                imgSrc,
                sx, sy, tileSize, tileSize,
                dx, dy, tileSize, tileSize
            );
        }

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.strokeRect(dx, dy, tileSize, tileSize);
    }
}

/* ------------------------------------------------------------
   タップ操作
------------------------------------------------------------ */
canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / tileSize);
    const row = Math.floor(y / tileSize);
    const index = row * gridSize + col;

    swapTile(index);
    drawPuzzle();
    checkClear();
});

/* ------------------------------------------------------------
   タイル入れ替え
------------------------------------------------------------ */
function swapTile(index) {
    const emptyIndex = tiles.indexOf(tiles.length - 1);

    const validMoves = [
        emptyIndex - 1,
        emptyIndex + 1,
        emptyIndex - gridSize,
        emptyIndex + gridSize
    ];

    if (validMoves.includes(index)) {
        const temp = tiles[index];
        tiles[index] = tiles[emptyIndex];
        tiles[emptyIndex] = temp;
    }
}

/* ------------------------------------------------------------
   クリア判定
------------------------------------------------------------ */
function checkClear() {
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i] !== i) return;
    }

    alert("クリア！");
    saveRanking(level);
    window.location.href = "ranking.html";
}

/* ------------------------------------------------------------
   ボタン類
------------------------------------------------------------ */
document.getElementById("reset-btn").addEventListener("click", () => {
    initPuzzle();
});

document.getElementById("back-btn").addEventListener("click", () => {
    window.location.href = "select.html";
});

document.getElementById("download-btn").addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "puzzle.png";
    link.click();
});

/* ------------------------------------------------------------
   ランキング保存
------------------------------------------------------------ */
function saveRanking(level) {
    const key = `choco_rank_${level}`;
    const now = new Date().toLocaleString();

    let list = JSON.parse(localStorage.getItem(key) || "[]");
    list.push(now);

    localStorage.setItem(key, JSON.stringify(list));
}
