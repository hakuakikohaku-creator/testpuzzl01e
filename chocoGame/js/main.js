/* ============================================================
   main.js
   タイトル画面・難易度選択画面の遷移処理
   ChocoGame
   ============================================================ */

// タイトル画面の処理
document.addEventListener("DOMContentLoaded", () => {

    const startBtn = document.getElementById("start-btn");
    const rankBtn = document.getElementById("rank-btn");

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            window.location.href = "select.html";
        });
    }

    if (rankBtn) {
        rankBtn.addEventListener("click", () => {
            window.location.href = "ranking.html";
        });
    }

    // 難易度選択画面の処理
    const levelButtons = document.querySelectorAll("[data-level]");
    levelButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const level = btn.dataset.level;

            // 選んだ難易度を保存
            localStorage.setItem("choco_level", level);

            // パズル画面へ
            window.location.href = "puzzle.html";
        });
    });

    // 戻るボタン（select.html）
    const backTitle = document.getElementById("back-title");
    if (backTitle) {
        backTitle.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }
});
