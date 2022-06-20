from django.test import TestCase
from media_ratings.parsers import IMDbMediaPageParser
    
    
class IMDbMediaPageParserTests(TestCase):
    def setUp(self):
        self.imdb_url = "https://www.imdb.com/title/tt9561862/?ref_=adv_li_tt"  # love, death and robots
        self.parser = IMDbMediaPageParser(self.imdb_url)

    def test_soup(self):
        self.assertIn(
            "A collection of animated short stories that span various genres including science fiction, fantasy, horror and comedy.", 
            str(self.parser.soup))

    def test_get_elem_1(self):
        self.parser.elem_class_1 = {"tag": "div",
                                    "class": "sc-7ab21ed2-2 kYEdvH"}

        self.assertIn("hero-rating-bar__aggregate-rating__score",
                    str(self.parser.get_elem_1()))
        
    def test_elem_class_1_not_assigned_error(self):
        self.parser.elem_class_1 = None
        with self.assertRaises(AttributeError):
            self.parser.get_elem_1()

    def test_get_elem_1_returns_none_when_elem_not_found(self):
        self.parser.elem_class_1 = {"tag": "div",
                                    "class": "non-existant-class"}
        self.assertIsNone(self.parser.get_elem_1())


    def test_get_value_1(self):
        self.parser.elem_class_1 = {"tag": "div",
                                    "class": "sc-7ab21ed2-2 kYEdvH"}

        self.assertEqual(self.parser.get_value_1(), "8.4/10")
    
    def test_get_value_1_returns_none_when_elem_not_found(self):
        self.parser.elem_class_1 = {"tag": "div",
                                    "class": "non-existant-class"}
        self.assertIsNone(self.parser.get_value_1())

    def test_get_elem_2(self):
        self.parser.elem_class_2 = {"tag": "a",
                                    "class": "sc-8c396aa2-1"}
        self.assertIn("2019–", str(self.parser.get_elem_2()))

    def test_elem_class_2_not_assigned_error(self):
        self.parser.elem_class_2 = None
        with self.assertRaises(AttributeError):
            self.parser.get_elem_2()
    
    def test_get_elem_2_returns_none_when_elem_not_found(self):
        self.parser.elem_class_2 = {"tag": "div",
                                    "class": "non-existant-class"}
        self.assertIsNone(self.parser.get_elem_2())

    def test_get_value_2(self):
        self.parser.elem_class_2 = {"tag": "a",
                                    "class": "sc-8c396aa2-1"}

        self.assertEqual(self.parser.get_value_2(), "2019–")
    
    def test_get_value_2_returns_none_when_elem_not_found(self):
        self.parser.elem_class_2 = {"tag": "div",
                                    "class": "non-existant-class"}
        self.assertIsNone(self.parser.get_value_2())