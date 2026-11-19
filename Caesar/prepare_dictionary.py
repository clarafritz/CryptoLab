# Sert a créer le dictio a utiliser (main.py l'utilise)
from pathlib import Path
 
chemin = Path(__file__).parent/'Lexique4.1.tsv'
dictio = {}

with open(chemin, 'r', encoding='utf-8') as fichier: 
    ligne = fichier.readline() #permet de sauter premiere ligne : nom de la colonne

    for ligne in fichier:
        decoupage = ligne.split("\t")

        first_elt = decoupage[0]
        frequence = float(decoupage[9])

        if first_elt not in dictio: 
            dictio[first_elt] = frequence
        else: 
            if dictio[first_elt] < frequence: 
                dictio[first_elt] = frequence

    dictio_trie = sorted(dictio.items(), key= lambda item: item[1], reverse=True)
    top30k_tuples = dictio_trie[:30000]
    top30k_mots = []

    for mots in top30k_tuples:
        top30k_mots.append(mots[0])



#creation dictio french words 
chemin_sortie = Path(__file__).parent/'french_words.txt'

with open(chemin_sortie, 'w', encoding='utf-8') as french_words:
    for i in top30k_mots:
        french_words.write(i + "\n") 
    


 