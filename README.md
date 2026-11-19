
# CryptoLab

CryptoLab is a personal Python project focused on classical cryptography and cryptanalysis. It aims to explore how encryption algorithms work, why some of them are vulnerable, and how to analyze encrypted text programmatically.

The project is intended to grow into an application containing several cryptographic tools. **Version 1 focuses on the Caesar cipher** and currently runs in the terminal.

---

## Features

### Caesar cipher

- Encrypt and decrypt text using a shift key.
- Preserve letter case, spaces, and punctuation.
- Test all 26 possible shifts with a brute-force attack.
- Compare candidate plaintexts with French letter frequencies.
- Recognize French words using a dictionary.
- Rank candidate decryptions using word recognition and frequency analysis.

The ranking helps identify plausible plaintexts but does not guarantee the correct answer, particularly for short messages.

---

## Project structure

```text
CryptoLab/
├── Caesar/
│   ├── main.py
│   ├── prepare_dictionary.py
│   └── french_words.txt
├── .gitignore
└── README.md
```

- `Caesar/main.py`: Caesar cipher operations and brute-force analysis.
- `Caesar/prepare_dictionary.py`: one-time preparation of the French dictionary.
- `Caesar/french_words.txt`: 30,000 selected French word forms.

The original Lexique TSV dataset is excluded from version control.

---

## Installation and usage

**Requirement:** Python 3.

```bash
git clone https://github.com/clarafritz/CryptoLab.git
cd CryptoLab/Caesar
python main.py
```

Depending on your system, you may need to use `python3` or `py` instead of `python`.

---

## How it works

### Caesar cipher

The Caesar cipher shifts each letter by a fixed number of positions in the alphabet.

- Encryption: `E(x) = (x + k) % 26`
- Decryption: `D(x) = (x - k) % 26`

Here, `x` is the letter's position in the alphabet and `k` is the shift key.

### Brute-force cryptanalysis

Because the Caesar cipher has only 26 possible keys, the program can try every shift. It then ranks the resulting candidate plaintexts using two signals:

1. **Letter-frequency analysis:** compare the candidate's letter distribution with expected French frequencies.
2. **Word recognition:** count recognized words using a French dictionary.

The dictionary-based ranking is an aid to analysis, not proof that a candidate is correct.

---

## French dictionary

The `Caesar/french_words.txt` file contains **30,000 word forms** selected from the **Lexique 4.1** dataset.

The preparation script:

1. Reads the Lexique TSV file.
2. Extracts word forms and frequency values.
3. Keeps the highest frequency when a word occurs more than once.
4. Sorts the unique words by decreasing frequency.
5. Exports the first 30,000 words, one per line.

### Why 30,000 words?

This is an initial choice intended to balance vocabulary coverage, accidental word matches, and simplicity. A larger dictionary may recognize more valid words, but it may also introduce more false positives. The choice will be assessed during testing.

### Data source and license

The dictionary was adapted from **Lexique 4.1**, available at [Lexique.org](http://www.lexique.org/).

The source data is identified as licensed under **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)**. The generated `Caesar/french_words.txt` is shared under the same license.

- License text: https://creativecommons.org/licenses/by-sa/4.0/
- Changes made: word-form extraction, deduplication by maximum frequency, descending frequency sort, selection of 30,000 entries, and removal of frequency values from the exported file.
- The original TSV file is not redistributed in this repository.


**Attribution:** Lexique 4.1 — Boris New, Christophe Pallier, Gauvain Schalchli, Jessica Bourgin and Manuel Gimenes.

**Reference:** New, B., Pallier, C., Schalchli, G., Bourgin, J., & Gimenes, M. (2026). *Lexique 4: A major upgrade of the “Lexique” French lexical database*. Behavior Research Methods, 58(5), 140.

**Source:** https://www.lexique.org/

The dictionary has been adapted for CryptoLab as described above and is distributed under CC BY-SA 4.0. This license applies to the derived dictionary, not automatically to the Python source code.


---

## Technologies

- Python 3
- Git and GitHub
- Lexique 4.1 (French lexical data)

---

## Roadmap

### Version 1 — Caesar cipher

- [x] Encryption and decryption
- [x] Brute-force testing of 26 keys
- [x] French letter-frequency analysis
- [x] Dictionary-based word recognition
- [x] Generate a 30,000-word dictionary
- [ ] Test the ranking with the new dictionary
- [ ] Improve the command-line experience
- [ ] Add automated tests
- [ ] Finalize documentation and release V1

### Future development

- Web interface
- Additional classical ciphers
- Further cryptanalysis tools and visualizations

## Learning goals

This project is part of my Python and cybersecurity learning journey, including cryptanalysis practice on Root Me. It helps me develop skills in algorithm design, text processing, data preparation, debugging, version control, and technical documentation.

## Limitations

- Caesar encryption is not secure by modern standards.
- The ranking approach is designed primarily for French text.
- Short or unusual messages can produce unreliable rankings.
- Dictionary matching depends on word forms and text normalization.
- Version 1 is a command-line project; a web interface is planned for later.


---



## AI Disclosure

This README was written with the assistance of ChatGPT.

The project and all Python code are my own work. AI was only used to provide suggestions and advice for improvements.

