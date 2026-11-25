const FRENCH_AVG_FREQ = {
    A: 8.15, B: 0.97, C: 3.15, D: 3.73, E: 17.39,
    F: 1.12, G: 0.97, H: 0.85, I: 7.31, J: 0.45,
    K: 0.02, L: 5.69, M: 2.87, N: 7.12, O: 5.28,
    P: 2.80, Q: 1.21, R: 6.64, S: 8.14, T: 7.22,
    U: 6.38, V: 1.64, W: 0.03, X: 0.41, Y: 0.28,
    Z: 0.15
};

let currentTab = "cipher";
let currentMode = "encrypt";

const tabBtns = document.querySelectorAll(".tab-btn");
const modeBtns = document.querySelectorAll(".mode-btn");
const messageInput = document.getElementById("message-input");
const shiftRange = document.getElementById("shift-range");
const shiftValue = document.getElementById("shift-value");
const runBtn = document.getElementById("run-btn");
const sampleBtn = document.getElementById("sample-btn");
const copyBtn = document.getElementById("copy-btn");
const errorMsg = document.getElementById("error-msg");

const cipherControls = document.getElementById("cipher-controls");
const cipherOutputView = document.getElementById("cipher-output-view");
const bruteforceOutputView = document.getElementById("bruteforce-output-view");
const cipherResultBox = document.getElementById("cipher-result-box");
const bruteforceList = document.getElementById("bruteforce-list");
const candidatesCount = document.getElementById("candidates-count");
const freqChart = document.getElementById("freq-chart");
const freqSummary = document.getElementById("freq-summary");

function renderFrequencyChart(measuredFreq = {}) {
    freqChart.innerHTML = "";
    const maxScale = 20;

    const entries = Object.entries(measuredFreq).sort((a, b) => b[1] - a[1]);
    if (entries.length > 0) {
        const top3 = entries
            .slice(0, 3)
            .map(([letter, pct]) => `${letter} (${pct.toFixed(1)}%)`)
            .join(", ");
        freqSummary.textContent = `Top letters in message: ${top3} • French reference: E (17.4%), A (8.2%), S (8.1%).`;
    } else {
        freqSummary.textContent = `French reference: most frequent letters are E (17.4%), A (8.2%), and S (8.1%).`;
    }

    Object.keys(FRENCH_AVG_FREQ).forEach((letter) => {
        const frVal = FRENCH_AVG_FREQ[letter];
        const msgVal = measuredFreq[letter] || 0;

        const frHeight = Math.min((frVal / maxScale) * 100, 100);
        const msgHeight = Math.min((msgVal / maxScale) * 100, 100);
        const labelVal = msgVal > 0 ? `${Math.round(msgVal)}%` : "";

        const col = document.createElement("div");
        col.className = "freq-col";
        col.title = `Letter ${letter} — Message: ${msgVal.toFixed(2)}% | French avg: ${frVal.toFixed(2)}%`;

        col.innerHTML = `
            <span class="bar-val">${labelVal}</span>
            <div class="bars-wrapper">
                <div class="bar bar-text" style="height: ${msgHeight}%"></div>
                <div class="bar bar-fr" style="height: ${frHeight}%"></div>
            </div>
            <span class="freq-letter">${letter}</span>
        `;
        freqChart.appendChild(col);
    });
}

tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        tabBtns.forEach((b) => {
            b.classList.remove("active");
            b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");

        currentTab = btn.dataset.tab;
        errorMsg.classList.add("hidden");

        if (currentTab === "cipher") {
            cipherControls.classList.remove("hidden");
            cipherOutputView.classList.remove("hidden");
            bruteforceOutputView.classList.add("hidden");
            updateRunButtonLabel();
        } else {
            cipherControls.classList.add("hidden");
            cipherOutputView.classList.add("hidden");
            bruteforceOutputView.classList.remove("hidden");
            runBtn.textContent = "Launch Brute Force Attack (26 keys)";
        }
    });
});

modeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        modeBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentMode = btn.dataset.mode;
        updateRunButtonLabel();
    });
});

function updateRunButtonLabel() {
    runBtn.textContent = currentMode === "encrypt"
        ? "Run Encryption"
        : "Run Decryption";
}

shiftRange.addEventListener("input", () => {
    shiftValue.textContent = shiftRange.value;
});

sampleBtn.addEventListener("click", () => {
    errorMsg.classList.add("hidden");
    if (currentTab === "cipher") {
        messageInput.value = "Bienvenue dans le laboratoire CryptoLab !";
        shiftRange.value = 3;
        shiftValue.textContent = "3";
    } else {
        messageInput.value = "Dwwdtxh gh qxlw suhyxh d plqxlw vxu oh vhuYhxu sulqflsdo.";
    }
});

copyBtn.addEventListener("click", () => {
    if (cipherResultBox.classList.contains("empty")) return;
    navigator.clipboard.writeText(cipherResultBox.textContent);
    const original = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = original), 1500);
});

runBtn.addEventListener("click", async () => {
    const message = messageInput.value.trim();
    errorMsg.classList.add("hidden");

    if (!message) {
        errorMsg.textContent = "Please enter a message before running the analysis.";
        errorMsg.classList.remove("hidden");
        return;
    }

    runBtn.disabled = true;

    try {
        if (currentTab === "cipher") {
            const response = await fetch("/api/caesar/cipher", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: message,
                    shift: parseInt(shiftRange.value, 10),
                    mode: currentMode
                })
            });
            const data = await response.json();

            cipherResultBox.textContent = data.result;
            cipherResultBox.classList.remove("empty");
            renderFrequencyChart(data.frequencies);
        } else {
            const response = await fetch("/api/caesar/bruteforce", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: message })
            });
            const data = await response.json();

            renderBruteforceResults(data.results);
            renderFrequencyChart(data.frequencies);
        }
    } catch (err) {
        errorMsg.textContent = "Communication error with the Flask backend.";
        errorMsg.classList.remove("hidden");
    } finally {
        runBtn.disabled = false;
    }
});

function renderBruteforceResults(results) {
    bruteforceList.innerHTML = "";
    candidatesCount.textContent = `${results.length} / 26 keys`;

    if (!results || results.length === 0) {
        bruteforceList.innerHTML = `<p class="placeholder-text">No valid alphabetic characters found to analyze.</p>`;
        return;
    }

    results.forEach((item, index) => {
        const isBest = index === 0;
        const card = document.createElement("div");
        card.className = `bf-item ${isBest ? "best-match" : ""}`;

        card.innerHTML = `
            <div class="bf-header">
                <span class="bf-key">Encryption key: +${item.cle} (shift: +${item.decalage})</span>
                <div class="bf-badges">
                    ${isBest ? `<span class="badge-best">Best Match</span>` : ""}
                    <span class="badge-stat">FR Words: ${item.reconnaissance}</span>
                    <span class="badge-stat">Score: ${item.frequence.toFixed(2)}</span>
                </div>
            </div>
            <div class="bf-text">${escapeHtml(item.message)}</div>
        `;
        bruteforceList.appendChild(card);
    });
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

renderFrequencyChart();