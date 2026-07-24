from django.test import SimpleTestCase
from analyzer.services.validator import validate_url


class ValidatorTests(SimpleTestCase):

    def test_valid_url(self):
        self.assertEqual(
            validate_url("https://google.com"),
            "https://google.com"
        )

    def test_url_without_scheme(self):
        self.assertEqual(
            validate_url("google.com"),
            "https://google.com"
        )

    def test_empty_url(self):
        with self.assertRaises(ValueError):
            validate_url("")