import time
import requests
from bs4 import BeautifulSoup


def analyze_page(url: str):
    start_time = time.time()

    response = requests.get(
        url,
        timeout=10,
        headers={
            "User-Agent": (
                "Mozilla/5.0 "
                "(Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 "
                "(KHTML, like Gecko) "
                "Chrome/138.0 Safari/537.36"
            )
        },
    )

    response.raise_for_status()

    content_type = response.headers.get("Content-Type", "")

    if "text/html" not in content_type:
        raise ValueError("URL does not point to an HTML page.")

    soup = BeautifulSoup(response.text, "html.parser")

    title = soup.title.string.strip() if soup.title and soup.title.string else "No Title"

    meta = soup.find("meta", attrs={"name": "description"})

    meta_description = (
        meta.get("content").strip()
        if meta and meta.get("content")
        else "No Meta Description"
    )

    h1_count = len(soup.find_all("h1"))

    images = soup.find_all("img")

    missing_alt = sum(
        1 for img in images if not img.get("alt")
    )

    words = soup.get_text(separator=" ", strip=True).split()

    response_time = round((time.time() - start_time) * 1000)

    canonical = soup.find("link", rel="canonical")

    og_title = soup.find("meta", property="og:title")

    internal_links = 0
    external_links = 0

    from urllib.parse import urlparse

    base_domain = urlparse(url).netloc

    for link in soup.find_all("a", href=True):
        href = link["href"]

        if href.startswith("/"):
            internal_links += 1

        elif href.startswith("http"):
            if urlparse(href).netloc == base_domain:
                internal_links += 1
            else:
                external_links += 1

    return {
        "status": response.status_code,
        "response_time": response_time,
        "title": title,
        "meta_description": meta_description,
        "h1_count": h1_count,
        "missing_alt_images": missing_alt,
        "word_count": len(words),
        "canonical": "Present" if canonical else "Missing",
        "open_graph_title": "Present" if og_title else "Missing",
        "internal_links": internal_links,
        "external_links": external_links,
    }