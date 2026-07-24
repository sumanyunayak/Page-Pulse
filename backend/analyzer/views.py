from requests.exceptions import RequestException
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import URLSerializer
from .services.parser import analyze_page
from .services.validator import validate_url


class AnalyzeURLView(APIView):
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