from urllib.parse import urlparse


def validate_url(url: str) -> str:
    """
    Validate and normalize a URL.

    Returns:
        Normalized URL

    Raises:
        ValueError if invalid.
    """

    url = url.strip()

    if not url:
        raise ValueError("URL cannot be empty.")

    if not url.startswith(("http://", "https://")):
        url = "https://" + url

    parsed = urlparse(url)

    if not parsed.scheme or not parsed.netloc:
        raise ValueError("Invalid URL.")

    return url