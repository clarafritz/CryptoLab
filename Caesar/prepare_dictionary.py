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

    print(len(dictio))
    print(dictio["bonjour"])
