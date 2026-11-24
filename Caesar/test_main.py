# test auto
import unittest 
from main import user_input , frequency_analysis , similarity_score , brute_force , word_recognition , load_dictionary

class TestCaesar(unittest.TestCase):
    # user input 
    def test_chiffrement_simple(self):
        result = user_input("abc", 2)
        self.assertEqual(result, "cde")

    def test_retour_alphabet(self):
        result = user_input("xyz", 3)
        self.assertEqual(result, "abc")

    def test_majuscules_ponctuation(self):
        result = user_input("Salut, Bob !", 12)
        self.assertEqual(result, "Emxgf, Nan !")

    def test_dechiffrement(self):
        result = user_input("cde", -2)
        self.assertEqual(result, "abc")

    # frequency analysis
    def test_frequences_valides(self):
        result = frequency_analysis("aab")
        self.assertEqual(result, {"A": 66.67, "B": 33.33})

    def test_frequences_sans_lettres(self):
        result = frequency_analysis("1234 !? @#")
        self.assertEqual(result, {})
        result = similarity_score("1234 !? @#")
        self.assertIsNone(result)

    # word recognition 
    def test_reconnaissance_mots(self):
        dictio = load_dictionary()
        result = word_recognition("Bonjour, le monde ! xyzabc", dictio)
        self.assertEqual(result, 3)

    # bruteforce 
    def test_brute_force_francais(self):
        message = "Bonjour, ceci est un message secret pour tester la cryptanalyse."
        key = 7
        chiffrement = user_input(message, key)
        attack = brute_force(chiffrement)
        first_elt = attack[0]
        self.assertEqual(first_elt["cle"], key)
        self.assertEqual(first_elt["message"], message)

    def test_brute_force_sans_lettres(self):
        test = brute_force("98765 !?")
        self.assertEqual(test, [])




