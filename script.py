import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta

def was_updated_recently(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        last_modified_tag = soup.find('meta', attrs={'http-equiv': 'last-modified'})
        if last_modified_tag:
            last_modified_date = datetime.strptime(last_modified_tag['content'], "%a, %d %b %Y %H:%M:%S GMT")
            if datetime.now() - last_modified_date <= timedelta(weeks=2):
                return True
        return False
    except Exception as e:
        print(f"Failed to check {url}: {e}")
        return False

def load_websites(file_path):
    with open(file_path, 'r') as file:
        return [line.strip() for line in file if line.strip()]

websites = load_websites('websites.txt')

updated_websites = [url for url in websites if was_updated_recently(url)]

print("Websites updated in the last two weeks:")
for site in updated_websites:
    print(site)
