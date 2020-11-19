# GenericPlayer
a generic player extension.
allows for extensions (of the extension) that add more services.

## This is still a WIP, and doesn't actually function at all yet lol
### To-do:


#### Overall:
- Create pandora extension

#### Player pane:
 - ~~Controls~~ Working!
 - ~~Ratings~~ Works.
 - ~~Settings icon (see below)~~ Works, but links to an uncreated page.
 - ~~Album cover~~ Works. Need to create a default cover for when there is no working cover.
 - ~~Time slider~~ Works.
 - ~~Volume slider~~ Works.
 - ~~Sleep timer~~ Will not implement - probably no point to it.
 - Lyrics (In progress: getting a genius api key right now. Will probably only be for the big player tho)
 - ~~maybe maybe maybe airplay??? maybe? if that's even possible?~~ 
 Not possible currently
 - Queue view (?): Will implement in the big player.

#### Stations panel:
- Search: Not functional currently
- ~~Play~~ Functional.
- ~~Put last played song in station as cover~~ Works. Uses the pandora "last used cover" instead of keeping track itself.
- Grid mode
- ~~List mode~~ Works.

#### History panel:
- ~~Make buttons do stuff other than just look good~~ Done.
- ~~Grid mode~~ Done
- ~~List mode~~ Done
- ~~animation transitioning between the two~~ Done	

#### Options panel:
- actually exist: Is next in line on the to-do list.
- ~~plugins draglist (think iOS lists?)~~ Probaby will be a select as you can only have one plugin at a time.
- ~~add accounts? I'm going to have to think on this~~ Login will be per-extension.

# Credits
[pandora-api-docs](https://6xq.net/pandora-apidoc/) by [PromyLOPh](https://github.com/PromyLOPh)

kinda stole the encryption from [anesidora, because blowfish.js wasn't working](https://github.com/pvrs12/anesidora)