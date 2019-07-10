import json


units = json.loads(open('data/synergies.json').read())

allkeys = set()

for uname, payload in units.items():
    kset = set(payload.keys())
    allkeys = allkeys.union(kset)

print(allkeys)

for uname, payload in units.items():
    kset = set(payload.keys())
    allkeys = allkeys.intersection(kset)
print("==================")
print(allkeys)
