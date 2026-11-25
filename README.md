# CryptoLab — Cryptanalysis & Cipher Laboratory

![Version](https://img.shields.io/badge/version-1.0.0-38bdf8?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat-square&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-REST_API-000000?style=flat-square&logo=flask)

**CryptoLab** is a cybersecurity learning project built for my portfolio. It is an interactive web laboratory designed to practice classical cryptography, automated cryptanalysis, and full-stack Python development with Flask.

---

## Features (V1.0)

* **Caesar Cipher Engine:** Encrypts (`+`) and decrypts (`-`) messages across all 26 shift keys while preserving case, spacing, and punctuation.
* **Automated Brute-Force Cryptanalysis:** Tests all 26 keys in milliseconds and ranks candidates using a dual-scoring heuristic:
  * **Lexicon Matching:** Checks decrypted words against a 30,000-word French dictionary (`Lexique 4.1`).
  * **Frequency Scoring:** Measures deviation between the candidate text's letter distribution and standard French letter frequencies.
* **Visual Frequency Analysis:** Compares the analyzed message's letter distribution (`A–Z`) against French language averages in real time.

---

## Project Structure

```text
CryptoLab/
├── app.py               # Flask server & REST API endpoints
├── cipher_engine.py     # Core cipher, frequency analysis & brute-force logic
├── test_cipher.py       # Unit tests for cipher & cryptanalysis edge cases
├── french_words.txt     # 30,000-word French lexicon
├── requirements.txt     # Project dependencies
├── templates/index.html # Web laboratory interface
└── static/              # Stylesheet (style.css) & frontend logic (app.js)
