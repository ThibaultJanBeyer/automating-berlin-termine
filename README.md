# automating-berlin-termine

Info: this description is in German because the tool concerns german gov. websites. Just use google translate if you don’t understand it.

- Automatisiert das finden von Terminen in den Berliner Behörden!  
- Sucht nach verfügbaren Terminen und schickt eine email wenn gefunden

Zum Benutzen auf der Konsole folgendes ausführen:

1. Terminal öffnen und Projekt installieren:

Im Terminal folgendes eingeben:

```
git clone https://github.com/ThibaultJanBeyer/automating-berlin-termine.git
```

dann

```
cd automating-berlin-termine/
```

dann

```
npm install
```

2. Die Configurationsdatei kopieren und bearbeiten:

während dessen, eine Kopie von `_config.js` erstellen und in `config.js` umbenennen. Dann `config.js` öffnen und felder entsprechend ausfüllen.  

3. Tool Starten

Wieder zurück im Terminal:

```
npm start -- WEBITEURL
```

bitte `WEBITEURL` mit der URL zum Terminkalender der gewünschten Veranstalltung ersetzen.  

Beispiel für den Standesamt termin:

```
npm start -- https://service.berlin.de/terminvereinbarung/termin/tag.php?termin=1&dienstleister=327795&anliegen[]=318961&herkunft=1
```

- Das Tool durchsucht die Seite nach einem Freien Termin.
- Findet es keinen clickt es auf "Versuchen Sie doch den nächsten Monat »." und startet die Suche erneut.
- Sobald es einen Termin findet **beendet sich das Tool von selbst** und schickt eine E-Mail an alle empfänger aus der config datei (wenn die mails und das password in `config.js` richtig eingetragen wurde).

- Tipp: nutzt ein Tool wie https://ifttt.com/ um automatisch SMS zu versenden falls ihr unterwegs seid!

- Tipp: To run it forever on your server you can use tools like [Forever](https://github.com/foreverjs/forever). Or try `setsid` on ubuntu like so: `setsid npm start -- URL`.

# Have Fun!

![console output](output.png)
