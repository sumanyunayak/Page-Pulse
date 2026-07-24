import json

from requests.exceptions import RequestException
from rest_framework import status
from rest_framework.parsers import BaseParser, FormParser, JSONParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import URLSerializer
from .services.parser import analyze_page
from .services.validator import validate_url


class RawBodyParser(BaseParser):
    media_type = "*/*"
    renderer_class = None

    def parse(self, stream, media_type=None, parser_context=None):
        raw_body = stream.read().decode("utf-8").strip()

        if not raw_body:
            return {}

        try:
            parsed_body = json.loads(raw_body)
        except json.JSONDecodeError:
            return {"url": raw_body}

        if isinstance(parsed_body, dict):
            return parsed_body

        if isinstance(parsed_body, str):
            return {"url": parsed_body}

        return {"url": str(parsed_body)}


class AnalyzeURLView(APIView):
    parser_classes = [RawBodyParser, JSONParser, FormParser, MultiPartParser]

    def post(self, request):
        serializer = URLSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            url = validate_url(serializer.validated_data["url"])
            report = analyze_page(url)

            return Response(report)

        except ValueError as error:
            return Response(
                {"error": str(error)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        except RequestException:
            return Response(
                {"error": "Unable to fetch the webpage."},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        except Exception:
            return Response(
                {"error": "Something went wrong."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )