# CryptoLab — Cryptanalysis & Cipher Laboratory

![Version](https://img.shields.io/badge/version-1.0.0-38bdf8?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat-square&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-REST_API-000000?style=flat-square&logo=flask)

**CryptoLab** is a personal cryptanalysis tool built with Python and Flask. Originally developed to assist me in solving cryptography challenges on **Root-Me** as part of my self-taught cybersecurity journey, I structured it into a full web application to showcase in my portfolio.

---

## Features (V1.0)

* **Caesar Cipher Engine:** Encrypts (`+`) and decrypts (`-`) messages across all 26 shift keys while preserving case, spacing, and punctuation.
* **Automated Brute-Force Cryptanalysis:** Tests all 26 keys in milliseconds and ranks candidates automatically using a dual-scoring heuristic:
  * **Lexicon Matching:** Cross-references decrypted words against a 30,000-word French dictionary extracted from **Lexique 4.1**.
  * **Statistical Scoring:** Measures the deviation between the candidate text's letter distribution and standard French letter frequencies.
* **Visual Frequency Analysis:** Compares the analyzed message's letter distribution (`A–Z`) against standard French averages in real time.

---

## Project Structure

    CryptoLab/
    ├── app.py                   # Flask server & REST API endpoints
    ├── requirements.txt         # Project dependencies (Flask)
    ├── Cesar/
    │   ├── cipher_engine.py     # Core cryptographic logic, frequency analysis & brute force
    │   ├── test_cipher.py       # Unit tests (encryption, decryption & edge cases)
    │   └── french_words.txt     # 30,000-word French lexicon (source: Lexique 4.1)
    ├── templates/
    │   └── index.html           # Web laboratory interface
    └── static/
        ├── style.css            # Custom dark cyber theme
        └── app.js               # Frontend state management, API calls & frequency chart

---

## Roadmap

The goal is to expand CryptoLab into a comprehensive cryptanalysis toolkit for future CTF challenges:

* **V1.1:** Add an **English dictionary** and English letter frequency reference (with a FR / EN language selector) to support English ciphertext cryptanalysis.
* **V2.0:** **Vigenère Cipher** (key-length detection via Kasiski / Index of Coincidence) and **XOR Mask** (binary/hexadecimal analysis and repeating-key XOR cryptanalysis).
* **V3.0:** Automated solver for full **Monoalphabetic Substitution**.

---

## Methodology & Transparency

Built by **[@clarafritz](https://github.com/clarafritz)** as part of my self-directed cybersecurity learning. Building on two years of Python experience, this project was my first hands-on implementation using **Flask**:

* **Architecture & Backend (Python):** I designed and coded the entire cryptographic engine, statistical scoring algorithm, dictionary parsing, unit tests, and Flask REST API.
* **AI Assistance (Frontend & Documentation):** Generative AI was used to build the web interface (HTML/CSS/JS) and draft this README.

---

## Data Credits & Attribution

* **French Lexicon (`french_words.txt`):** Extracted from the **[Lexique 4.1](http://www.lexique.org/)** lexical database (Boris New & Christophe Pallier), licensed under Creative Commons Attribution-ShareAlike (**CC BY-SA 4.0**).
