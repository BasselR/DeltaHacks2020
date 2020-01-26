from bs4 import BeautifulSoup
import requests

url = 'https://everydaypower.com/mental-health-quotes/'
response = requests.get(url ,timeout = 5)
content = BeautifulSoup(response.content, "html.parser")
quoteArr = []

for quote in content.findAll('p', attrs={}):
    if (str(quote)[0] >= '1' and str(quote)[0] <= '9'):
        quoteArr.append(quote.text())


f = open('output.txt','w')

for quote in quoteArr:
    f.write(str(quote))

f.close()
    

