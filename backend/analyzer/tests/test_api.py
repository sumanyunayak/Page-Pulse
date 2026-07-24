from rest_framework.test import APITestCase
from rest_framework import status


class AnalyzeAPITests(APITestCase):

    def test_missing_url(self):
        response = self.client.post(
            "/api/analyze/",
            {},
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST
        )

    def test_invalid_url(self):
        response = self.client.post(
            "/api/analyze/",
            {
                "url": "invalid-url"
            },
            format="json"
        )

        self.assertIn(
            response.status_code,
            [
                status.HTTP_400_BAD_REQUEST,
                status.HTTP_502_BAD_GATEWAY
            ]
        )

    def test_valid_url(self):
        response = self.client.post(
            "/api/analyze/",
            {
                "url": "https://example.com"
            },
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK
        )

        self.assertIn("title", response.data)