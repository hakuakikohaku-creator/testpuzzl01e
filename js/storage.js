// --------------------------------------
// フラグを true で保存
// --------------------------------------
function setFlag(name) {
    localStorage.setItem(name, "true");
}

// --------------------------------------
// フラグを取得（true なら true を返す）
// --------------------------------------
function getFlag(name) {
    return localStorage.getItem(name) === "true";
}

// --------------------------------------
// フラグを削除
// --------------------------------------
function removeFlag(name) {
    localStorage.removeItem(name);
}

// --------------------------------------
// 全フラグを削除（必要なら使用）
// --------------------------------------
function clearAllFlags() {
    localStorage.removeItem("prologue_seen");
    localStorage.removeItem("stage1_clear");
    localStorage.removeItem("stage2_clear");
    localStorage.removeItem("stage3_clear");
    localStorage.removeItem("game_clear");
}
