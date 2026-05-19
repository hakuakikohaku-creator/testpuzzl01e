/* ============================================================
   ranking.js
   ランキング表示（ローカルストレージ）
   ChocoGame
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const rankingList = document.getElementById("ranking-list");

    const levels = ["easy", "normal", "hard"];
    const levelNames = {
        easy: "やさしい",
        normal: "ふつう",
        hard: "むずかしい"
    };

    levels.forEach(level => {
        const key = `choco_rank_${level}`;
        const data = JSON.parse(localStorage.getItem(key) || "[]");

        const title = document.createElement("h2");
        title.textContent = `【${levelNames[level]}】`;
        rankingList.appendChild(title);

        if (data.length === 0) {
            const li = document.createElement("li");
            li.textContent = "記録なし";
            rankingList.appendChild(li);
        } else {
            data.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                rankingList.appendChild(li);
            });
        }
    });

    // タイトルへ戻る
    const backBtn = document.getElementById("back-title");
    backBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });
});
