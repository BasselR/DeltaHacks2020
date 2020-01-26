from bs4 import BeautifulSoup
import requests
import json

url = 'https://everydaypower.com/mental-health-quotes/'
response = requests.get(url ,timeout = 5)
content = BeautifulSoup(response.content, "html.parser")
quoteArr = []

data = []
for quote in content.findAll('p'):
    current = str(quote.text)

    if(current and current[0] >= '1' and current[0] <= '9'):
        try:
            data.append(current[current.index('“') : current.index('”')])
        except ValueError:
            continue

with open('quotes.json', 'w', encoding='utf8') as json_file:
    json.dump(data, json_file, ensure_ascii=False)