# test auto
import unittest 
from main import user_input


class TestCaesar(unittest.TestCase):
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