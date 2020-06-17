import requests
from bs4 import BeautifulSoup
import json
from flask import Flask, request
from flask_cors import CORS
from settings import apikey

app = Flask(__name__)


def word_filter(magnet):
    magnet = magnet.replace(".", " ").replace(
        "[", " ").replace("]", " ").lower()
    arr = ["hindi", " sub", "sub ", "dub", " 3d",
           " dual", "spanish", "italian", "latin", "dual"]
    for item in arr:
        if(magnet.find(item) != -1):
            return False
    return True


@app.errorhandler(404)
def not_found(error):
    return '[]'


@app.route('/search=<movie>')
def search_movies(movie):
    try:
        data = requests.get(
            "http://www.omdbapi.com/?apikey="+apikey + "&s="+movie).json()
        data = list({item['imdbID']: item for item in data["Search"]}.values())
        data = sorted(data, key=lambda x: (
            int(x["Year"].split("–")[0])), reverse=True)
    except:
        data = []
    return json.dumps(data)


@app.route('/imdbID=<imdbID>')
def search_imdbID(imdbID):
    try:
        data = requests.get("http://www.omdbapi.com/?apikey=" +
                            apikey + "&i="+imdbID+"&plot=full").json()
    except:
        data = {}
    return data


@app.route('/movie=<movie>')
def search_pirateBay(movie):
    data = []
    url = "https://thepiratebay1.com/search/"+movie+"/1/99/200"
    url.replace(" ", "%20")
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')
    temp = {}
    sizes = soup.find_all("font", "detDesc")
    link = soup.find_all("div", "detName")
    for i in range(0, len(link)):
        temp = {"name": link[i].text[0:-2], "magnet": link[i].findNextSibling().get(
            "href"), "quality": "ok", "size": sizes[i].text.split(",")[1].replace("\xa0", "").replace(" Size ", "")}

        if (int(link[i].findParent().findNextSibling().text) < 3):
            temp["quality"] = "bad"
        if word_filter(temp["name"]) and float(temp["size"][:-3]) < 3.8:
            data.append(temp)
    return json.dumps(data)


if __name__ == '__main__':
    CORS(app)
    app.run(host="0.0.0.0")
