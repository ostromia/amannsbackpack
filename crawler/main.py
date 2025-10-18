import json
import pathlib
import time
from datetime import datetime

import requests
from bs4 import BeautifulSoup

# absolute path to directory containing main.py python script
CWD = pathlib.Path(__file__).resolve().parent

# absolute path to directory containing images of comsetics
COSMETICS_IMAGES_FOLDER = pathlib.Path(CWD).parent / "public" / "cosmetics"

# absolute path to json file containing cosmetics data
COSMETICS_JSON_FILE = pathlib.Path(CWD).parent / "src" / "assets" / "cosmetics.json"


def get_cosmetics_urls():
    """
    Place wiki URL for all cosmetics inside list_of_cosmetic_urls.txt
    """

    with open(CWD / "list_of_x_cosmetics_urls.txt", "r", encoding='utf-8') as file:
        list_of_x_cosmetics_urls = file.read().splitlines()

    with open(CWD / "list_of_cosmetic_urls.txt", "r", encoding='utf-8') as file:
        list_of_cosmetic_urls = file.read().splitlines()

    for url in list_of_x_cosmetics_urls:
        html = requests.get(url)
        soup = BeautifulSoup(html.text, 'html.parser')

        navbox_cosmetic_table = soup.find("table", class_="navbox cosmetic-table")
        navbox_list = navbox_cosmetic_table.tbody.tr.td.table.tbody.contents[-1].td

        for table in navbox_list.find_all("table", recursive=False):
            tr = table.tbody.tr.td.div.table.tbody.contents[-1].contents

            for td in tr:
                if td.a is not None:
                    cosmetic_url = "https://wiki.teamfortress.com" + td.a.get("href")

                    if cosmetic_url not in list_of_cosmetic_urls:
                        print(cosmetic_url)
                        list_of_cosmetic_urls.append(cosmetic_url)

    with open(CWD / "list_of_cosmetic_urls.txt", "w", encoding='utf-8') as file:
        file.write("\n".join(list_of_cosmetic_urls))

def append_cosmetics_urls():
    """
    Ensure all cosmetics possess object inside cosmetics.json
    """

    with open(CWD / "list_of_cosmetic_urls.txt", "r", encoding='utf-8') as file:
        list_of_cosmetic_urls = file.read().splitlines()

    with open(COSMETICS_JSON_FILE, "r", encoding='utf-8') as file:
        cosmetics = json.load(file)

    for i in list_of_cosmetic_urls:
        if i not in [i["url"] for i in cosmetics]:
            cosmetics.append({
                "name": "",
                "class": [],
                "update": [],
                "restriction": "",
                "url": i,
                "src": "",
                "date": "",
                "grade": "",
                "gradeColor": ""
            })

    with open(COSMETICS_JSON_FILE, "w", encoding='utf-8') as file:
        json.dump(cosmetics, file, indent=4)

def get_cosmetics_data():
    """
    update data for cosmetic objects in cosmetics.json
    e.g., for the Batter's Helmet the following object would be saved

    {
        "name": "Batter's Helmet",
        "class": [
            "Scout"
        ],
        "update": [
            "May 21, 2009 Patch",
            "Sniper vs. Spy Update"
        ],
        "restriction": "",
        "url": "https://wiki.teamfortress.com/wiki/Batter%27s_Helmet",
        "src": "https://wiki.teamfortress.com//w/images/thumb/e/e0/Backpack_Batter%27s_Helmet.png/90px-Backpack_Batter%27s_Helmet.png",
        "quality": [
            "qua_unique"
        ],
        "date": ""
    },
    """

    with open(COSMETICS_JSON_FILE, "r", encoding='utf-8') as file:
        cosmetics = json.load(file)

    for i in cosmetics:
        if i["name"] == "":
            print(i["url"])

            html = requests.get(i["url"])
            soup = BeautifulSoup(html.text, 'html.parser')

            # get name
            i["name"] = soup.find(id="firstHeading").text


            if i["url"] == "https://wiki.teamfortress.com/wiki/Something_Special_For_Someone_Special":
                i["class"] = ["All classes"]
            else:
                # get class
                anchors = soup.find(class_="infobox-label", string="Worn by:").find_next_sibling().find_all("a")
                i["class"] = [a.text.strip() for a in anchors]

            # get update
            anchors = soup.find(class_="infobox-label", string="Released:").find_next_sibling().find_all("a")
            i["update"] = [a.text.strip() for a in anchors]

            # get restriction
            span = soup.find(class_="att_negative", string="Holiday Restriction: Halloween / Full Moon")
            if span:
                i["restriction"] = span.text
            else:
                i["restriction"] = ""

            # get src
            subdirectory = soup.find(class_="tfwiki-backpack-item").find(class_="image").find("img").get("src")
            i["src"] = r"https://wiki.teamfortress.com/" + subdirectory

            # get quality
            i["quality"] = soup.find(class_="tfwiki-backpack-item").find_all(recursive=False)[1].find("p").find_all(recursive=False)[0].get("class")

            with open(COSMETICS_JSON_FILE, "w", encoding='utf-8') as file:
                json.dump(cosmetics, file, indent=4)

            time.sleep(1)

def update_cosmetics_data():
    with open(COSMETICS_JSON_FILE, "r", encoding='utf-8') as file:
        cosmetics = json.load(file)

    with open(CWD / "grades.json", "r", encoding='utf-8') as file:
        grades = json.load(file)

    for i in cosmetics:
        parts = i["update"][0].split(" ")
        i["date"] = f"{parts[1][:-1]} {parts[0]} {parts[2]}"

        if "quality" in i:
            if isinstance(i["quality"], list):
                quality = grades[i["quality"][0]]["name"]
                qualityColor = grades[i["quality"][0]]["color"]

                i["quality"] = quality
                i["qualityColor"] = qualityColor
            else:
                for j in grades.values():
                    if j.get("name") == i["quality"]:
                        i["qualityColor"] = j.get("color")

            i["grade"] = i.pop("quality")
            i["gradeColor"] = i.pop("qualityColor")

        if i["class"] == ["All classes"]:
            i["class"] = ["Scout", "Soldier", "Pyro", "Demoman", "Heavy", "Engineer", "Medic", "Sniper", "Spy"]

    sorted_cosmetics = sorted(
        cosmetics,
        key=lambda x: datetime.strptime(x["date"], "%d %B %Y"),
        reverse = True
    )

    with open(COSMETICS_JSON_FILE, "w", encoding='utf-8') as file:
        json.dump(sorted_cosmetics, file, indent=4)

def download_cosmetics_images():
    with open(COSMETICS_JSON_FILE, "r", encoding='utf-8') as file:
        cosmetics = json.load(file)

    for i in cosmetics:
        path = COSMETICS_IMAGES_FOLDER / f"{i["name"]}.png"

        if not path.exists():
            print(path)

            src = i["src"]

            response = requests.get(src)

            with open(path, 'wb') as file:
                file.write(response.content)


if __name__ == "__main__":
    # get_cosmetics_urls()
    # append_cosmetics_urls()
    # get_cosmetics_data()
    # update_cosmetics_data()
    download_cosmetics_images()
