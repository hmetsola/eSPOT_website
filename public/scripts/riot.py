import subprocess
import urllib
import json
import time
import operator

#scoreboard icons: http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/items.png [champion, gold, items, minion, score, spells]

key = "RGAPI-c3e9bfe3-1ed6-453e-8e8a-797c2188b714"

summonerid = ""

curtains = "---------------------------------------------------------------"
print curtains
print "Espot.gg API-query"
print "Enter your account details."
print
"""
while True:
	try:
	    summoner = raw_input("Insert your summoner name:")
	    print "Regions: BR, EUNE, EUW, JP, KR, LAN, LAS, NA, OCE, TR, RU, PBE" 
	    region = raw_input("Insert your region:")
	    #summonerhaku = "https://na.api.pvp.net/api/lol/" + region + "/v1.4/summoner/by-name/" +summoner + "?api_key=" + key
	    #print summonerhaku
	    #output = subprocess.check_output("curl --request GET '%s' --include" %(summonerhaku), shell = True)
	    #print output
	    break
	except Exception:
	    print "Something went wrong."
"""
summoner = "daelrune"
region = "eune"

idsearch = "https://"+ region + ".api.pvp.net/api/lol/" + region + "/v1.4/summoner/by-name/" + summoner + "?api_key=" + key  #Summoner ID-haku

#ID Json-build
idgrep = urllib.urlopen(idsearch)
response = json.load(idgrep)

print
#Summoner-tarkastus
try:
    ID = response[summoner]['id']
except KeyError:
    print "Summoner doesn't exist."
    print "Logging out..."
    time.sleep(2)
    exit()

ID = str(ID)


masteryscore = "https://"+ region +".api.pvp.net/championmastery/location/EUN1/player/"+ ID + "/score?api_key=" + key #Mastery-haku
ranked = "https://"+ region + ".api.pvp.net/api/lol/" + region + "/v1.3/stats/by-summoner/" + ID + "/ranked?season=SEASON2016&api_key=" + key #Ranked Stats-haku
matchlist = "https://"+ region +".api.pvp.net/api/lol/"+ region +"/v2.2/matchlist/by-summoner/"+ ID +"?api_key=" + key #Matsihaku

#Mastery JSON
m_score = urllib.urlopen(masteryscore)
m_score = json.load(m_score)

#Ranked JSON lataus + Stats haut/variaabeliluonnit
rankedopen = urllib.urlopen(ranked)
rankedstats = json.load(rankedopen)

try:
    rankedstats = rankedstats['champions'][-1]['stats']
except Exception:
    print "No Ranked Statistics!"
    print "Logging out..."
    time.sleep(2)
    exit()

rankedstats_physicaldamage = rankedstats['totalPhysicalDamageDealt']
rankedstats_totalturretskilled = rankedstats['totalTurretsKilled']
rankedstats_totaldamagedealt = rankedstats['totalDamageDealt']
rankedstats_totalmagicdamagedealt = rankedstats['totalMagicDamageDealt']
rankedstats_totaldoublekills = rankedstats['totalDoubleKills']
rankedstats_totalpentakills = rankedstats['totalPentaKills']
if rankedstats_totalpentakills == 0: #ninja edit ;)
    rankedstats_totalpentakills = "0 :("
rankedstats_totaltriplekills = rankedstats['totalTripleKills']

matches = []

#Match History
matchhistory = urllib.urlopen(matchlist)
matchhistory = json.load(matchhistory)
m_history = matchhistory['matches']

#Season History
seasons = [li['season'] for li in  m_history]
season_keys = set(seasons)
season_activity = {}
for i in season_keys:
    season_values = seasons.count(i)
    season_activity[i] = season_values

#for k, v in season_activity.items():
#    print "Season:", k, "Games Played:", v

champions = [li['champion']  for li in m_history]


#Champion history
#id_to_champ = "https://global.api.pvp.net/api/lol/static-data/"+ region +"/v1.2/champion/51?api_key=" + key Hakuja ei voi tehda talla avaimella. Niita tulisi liikaa. Kannattaa tehda passiivinen lista champeista ja crossreffata id:ta sita vasten.
unique_champs = set(champions)
champ_dict = {}

for champion in unique_champs:
    champion_count = champions.count(champion)
    champ_dict[champion] = champion_count

sorted_champs = sorted(champ_dict.items(), key=operator.itemgetter(1), reverse=True)

#Hakujen Outputit
print "Summoner Name:", summoner
print "Region:", region
print "Summoner ID:", ID
print
print "Offensive Stats :"
print "Total Damage Dealt :", rankedstats_totaldamagedealt
print "Psysical Damage Dealt :", rankedstats_physicaldamage
print "Total Magic Damage Dealt :", rankedstats_totalmagicdamagedealt
print "Turrets Killed :", rankedstats_totalturretskilled
print "Double Kills :", rankedstats_totaldoublekills
print "Triple Kills :", rankedstats_totaltriplekills
print "Penta Kills :", rankedstats_totalpentakills
print
print "Champion Statistics:"
print "Champion Mastery Score:", m_score
print
print "Your Most Used Champions:"
for champion in sorted_champs:
    champion = "".join(str(champion))
    champion = champion.replace(",", ":")
    champion = champion.replace("(", "")
    champion = champion.replace(")", "")
    used = champion.split()[1]
    champion_id = champion.split()[0].replace(":","")
    if int(used) > 50:
         id_to_champ = "https://global.api.pvp.net/api/lol/static-data/"+ region +"/v1.2/champion/"+ champion_id +"?api_key=" + key
	 champs = urllib.urlopen(id_to_champ)
         champs = json.load(champs)
         name = champs['name']
         print name,":", used
print
print "Your Playing History in Games Played:"
for k, v in season_activity.items():
    print k,":", v	
