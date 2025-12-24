with open("./assets/stops.txt", "r", encoding="utf-8") as file:
  data = file.read()
  data = data.split("\n")
r = []
for line in data:
  if '"B"' in line or '"0"' in line or '"P"' in line:
    r.append(line)
final = "\n".join(r)
with open("./assets/stopsPrague.txt", "w", encoding="utf-8") as file:
  file.write(final)