/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Album, Artist, Extension, Song } from '../../ext/Extension';
import AlbumElem from '../../components/album/'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'

import sty from './artistdetail.module.css'

import ColorThief from 'colorthief'
import { connect } from 'react-redux';
import { setCurrentlyPlaying } from '../../redux/actions';

import Accordion from '../../components/accordion/'

const datum = {
    "v4/catalog/annotateObjects": [
        {
            "AL:125918": {
                "name": "En Concert",
                "sortableName": "En Concert",
                "releaseDate": "2009-10-26T00:00:00.000-07:00",
                "duration": 4607,
                "trackCount": 19,
                "isCompilation": false,
                "icon": {
                    "dominantColor": "212121",
                    "artId": "images/f4/60/ee/25/b1d54eeba3ef2fe27baf273f/",
                    "artUrl": "images/f4/60/ee/25/b1d54eeba3ef2fe27baf273f/_500W_500H.jpg"
                },
                "rightsInfo": {
                    "hasInteractive": true,
                    "hasOffline": false,
                    "hasNonInteractive": true,
                    "hasStatutory": true,
                    "hasRadioRights": true,
                    "expirationTime": 1616662749648
                },
                "tracks": [
                    "TR:1445193",
                    "TR:1445194",
                    "TR:1445195",
                    "TR:1445196",
                    "TR:1445197",
                    "TR:1445198",
                    "TR:1445199",
                    "TR:1445200",
                    "TR:1445201",
                    "TR:1445202",
                    "TR:1445203",
                    "TR:1445204",
                    "TR:1445205",
                    "TR:1445206",
                    "TR:1445207",
                    "TR:1445208",
                    "TR:1445209",
                    "TR:1445210",
                    "TR:1445211"
                ],
                "artistId": "AR:246591",
                "artistName": "Jack Johnson",
                "explicitness": "NONE",
                "shareableUrlPath": "/artist/jack-johnson/en-concert/ALJJrZ9ftXxjbpc",
                "modificationTime": 1597181228308,
                "slugPlusPandoraId": "/jack-johnson/en-concert/AL:125918",
                "hasRadio": true,
                "releaseType": "OriginalAlbum",
                "listenerReleaseType": "Album",
                "pandoraId": "AL:125918",
                "type": "AL",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.AlbumDTO"
            },
            "AL:1552382": {
                "name": "Jack Johnson And Friends: Sing-A-Longs And Lullabies For The Film Curious George",
                "sortableName": "Jack Johnson And Friends: Sing-A-Longs And Lullabies For The Film Curious George",
                "releaseDate": "2018-08-10T00:00:00.000-07:00",
                "duration": 2619,
                "trackCount": 14,
                "isCompilation": false,
                "icon": {
                    "dominantColor": "fcf000",
                    "artId": "images/public/int/7/9/3/4/00602567834397",
                    "artUrl": "images/public/int/7/9/3/4/00602567834397_500W_500H.jpg"
                },
                "rightsInfo": {
                    "hasInteractive": true,
                    "hasOffline": false,
                    "hasNonInteractive": true,
                    "hasStatutory": true,
                    "hasRadioRights": true,
                    "expirationTime": 1616662749648
                },
                "tracks": [
                    "TR:13647608",
                    "TR:13647612",
                    "TR:13647614",
                    "TR:13647615",
                    "TR:13647619",
                    "TR:13647610",
                    "TR:13647611",
                    "TR:13647617",
                    "TR:13647618",
                    "TR:13647620",
                    "TR:13647616",
                    "TR:13647609",
                    "TR:13647613",
                    "TR:13647607"
                ],
                "artistId": "AR:246591",
                "artistName": "Jack Johnson",
                "explicitness": "NONE",
                "shareableUrlPath": "/artist/jack-johnson/jack-johnson-and-friends-sing-a-longs-and-lullabies-for-the-film-curious-george/AL3qXmxlcPpjKjK",
                "modificationTime": 1586379331316,
                "slugPlusPandoraId": "/jack-johnson/jack-johnson-and-friends-sing-a-longs-and-lullabies-for-the-film-curious-george/AL:1552382",
                "hasRadio": true,
                "releaseType": "OriginalAlbum",
                "listenerReleaseType": "Album",
                "pandoraId": "AL:1552382",
                "type": "AL",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.AlbumDTO"
            },
            "AR:33942": {
                "name": "Ben Harper",
                "sortableName": "Ben Harper",
                "trackCount": 228,
                "albumCount": 38,
                "icon": {
                    "dominantColor": "212121",
                    "artId": "images/4b/f7/e5/e1/b2e44f98bdf3464e571816e3/",
                    "artUrl": "images/4b/f7/e5/e1/b2e44f98bdf3464e571816e3/_500W_500H.jpg"
                },
                "shareableUrlPath": "/artist/ben-harper/ARl7mjZpVZmq97c",
                "twitterHandle": "BenHarper",
                "hasRadio": true,
                "modificationTime": 1616648222007,
                "stationFactoryId": "SF:16722:33942",
                "slugPlusPandoraId": "/ben-harper/AR:33942",
                "collaboration": false,
                "primaryArtists": [],
                "variousArtist": false,
                "megastar": false,
                "hasTakeoverModes": false,
                "pandoraId": "AR:33942",
                "type": "AR",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.ArtistDTO"
            },
            "TR:230760": {
                "name": "Sitting, Waiting, Wishing",
                "sortableName": "Sitting, Waiting, Wishing",
                "duration": 184,
                "trackNumber": 6,
                "icon": {
                    "dominantColor": "fcd203",
                    "artId": "images/public/int/1/3/3/0/602498800331",
                    "artUrl": "images/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                },
                "rightsInfo": {
                    "hasInteractive": true,
                    "hasOffline": false,
                    "hasNonInteractive": true,
                    "hasStatutory": true,
                    "hasRadioRights": true,
                    "expirationTime": 1616662749646
                },
                "albumId": "AL:17219",
                "albumName": "In Between Dreams",
                "artistId": "AR:246591",
                "artistName": "Jack Johnson",
                "explicitness": "NONE",
                "shareableUrlPath": "/artist/jack-johnson/in-between-dreams/sitting-waiting-wishing/TRJczrPvxgvnV7w",
                "hasRadio": true,
                "modificationTime": 1616384335286,
                "slugPlusPandoraId": "/jack-johnson/in-between-dreams/sitting-waiting-wishing/TR:230760",
                "stationFactoryId": "SF:21586:230760",
                "isrc": "USMC60400026",
                "pandoraId": "TR:230760",
                "type": "TR",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.TrackDTO"
            },
            "AR:25519": {
                "name": "John Mayer",
                "sortableName": "John Mayer",
                "trackCount": 207,
                "albumCount": 33,
                "icon": {
                    "dominantColor": "243c6c",
                    "artId": "images/4a/ee/4b/d4/c5244509a1d8f8d8ece41f56/",
                    "artUrl": "images/4a/ee/4b/d4/c5244509a1d8f8d8ece41f56/_500W_500H.jpg"
                },
                "shareableUrlPath": "/artist/john-mayer/AR7gmvdgzgvbf6Z",
                "twitterHandle": "JohnMayer",
                "hasRadio": true,
                "modificationTime": 1616604893091,
                "stationFactoryId": "SF:16722:25519",
                "slugPlusPandoraId": "/john-mayer/AR:25519",
                "collaboration": false,
                "primaryArtists": [],
                "variousArtist": false,
                "megastar": false,
                "hasTakeoverModes": false,
                "pandoraId": "AR:25519",
                "type": "AR",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.ArtistDTO"
            },
            "AR:253934": {
                "name": "Eric Hutchinson",
                "sortableName": "Eric Hutchinson",
                "trackCount": 118,
                "albumCount": 34,
                "icon": {
                    "dominantColor": "694800",
                    "artId": "images/2d/da/c3/25/9372429ba871974299382c5f/",
                    "artUrl": "images/2d/da/c3/25/9372429ba871974299382c5f/_500W_500H.jpg"
                },
                "shareableUrlPath": "/artist/eric-hutchinson/ARhw2fv4jzhXn7q",
                "twitterHandle": "EricHutchinson",
                "hasRadio": true,
                "modificationTime": 1616623643476,
                "stationFactoryId": "SF:16722:253934",
                "slugPlusPandoraId": "/eric-hutchinson/AR:253934",
                "collaboration": false,
                "primaryArtists": [],
                "variousArtist": false,
                "megastar": false,
                "hasTakeoverModes": false,
                "pandoraId": "AR:253934",
                "type": "AR",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.ArtistDTO"
            },
            "TR:230752": {
                "name": "Banana Pancakes",
                "sortableName": "Banana Pancakes",
                "duration": 192,
                "trackNumber": 3,
                "icon": {
                    "dominantColor": "fcd203",
                    "artId": "images/public/int/1/3/3/0/602498800331",
                    "artUrl": "images/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                },
                "rightsInfo": {
                    "hasInteractive": true,
                    "hasOffline": false,
                    "hasNonInteractive": true,
                    "hasStatutory": true,
                    "hasRadioRights": true,
                    "expirationTime": 1616662749646
                },
                "albumId": "AL:17219",
                "albumName": "In Between Dreams",
                "artistId": "AR:246591",
                "artistName": "Jack Johnson",
                "explicitness": "NONE",
                "shareableUrlPath": "/artist/jack-johnson/in-between-dreams/banana-pancakes/TRVxqX6k3gq7Vt9",
                "hasRadio": true,
                "modificationTime": 1616488063509,
                "slugPlusPandoraId": "/jack-johnson/in-between-dreams/banana-pancakes/TR:230752",
                "stationFactoryId": "SF:21586:230752",
                "isrc": "USMC60400032",
                "pandoraId": "TR:230752",
                "type": "TR",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.TrackDTO"
            },
            "TR:230751": {
                "name": "Never Know",
                "sortableName": "Never Know",
                "duration": 213,
                "trackNumber": 2,
                "icon": {
                    "dominantColor": "fcd203",
                    "artId": "images/public/int/1/3/3/0/602498800331",
                    "artUrl": "images/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                },
                "rightsInfo": {
                    "hasInteractive": true,
                    "hasOffline": false,
                    "hasNonInteractive": true,
                    "hasStatutory": true,
                    "hasRadioRights": true,
                    "expirationTime": 1616662749646
                },
                "albumId": "AL:17219",
                "albumName": "In Between Dreams",
                "artistId": "AR:246591",
                "artistName": "Jack Johnson",
                "explicitness": "NONE",
                "shareableUrlPath": "/artist/jack-johnson/in-between-dreams/never-know/TRZkZ4lZnd3n959",
                "hasRadio": true,
                "modificationTime": 1616424031353,
                "slugPlusPandoraId": "/jack-johnson/in-between-dreams/never-know/TR:230751",
                "stationFactoryId": "SF:21586:230751",
                "isrc": "USMC60400028",
                "pandoraId": "TR:230751",
                "type": "TR",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.TrackDTO"
            },
            "TR:230773": {
                "name": "Do You Remember",
                "sortableName": "Do You Remember",
                "duration": 144,
                "trackNumber": 13,
                "icon": {
                    "dominantColor": "fcd203",
                    "artId": "images/public/int/1/3/3/0/602498800331",
                    "artUrl": "images/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                },
                "rightsInfo": {
                    "hasInteractive": true,
                    "hasOffline": false,
                    "hasNonInteractive": true,
                    "hasStatutory": true,
                    "hasRadioRights": true,
                    "expirationTime": 1616662749646
                },
                "albumId": "AL:17219",
                "albumName": "In Between Dreams",
                "artistId": "AR:246591",
                "artistName": "Jack Johnson",
                "explicitness": "NONE",
                "shareableUrlPath": "/artist/jack-johnson/in-between-dreams/do-you-remember/TR3gXwfhZ7bkbV4",
                "hasRadio": true,
                "modificationTime": 1616313340288,
                "slugPlusPandoraId": "/jack-johnson/in-between-dreams/do-you-remember/TR:230773",
                "stationFactoryId": "SF:21586:230773",
                "isrc": "USMC60400038",
                "pandoraId": "TR:230773",
                "type": "TR",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.TrackDTO"
            },
            "AL:207990": {
                "name": "From Here To Now To You",
                "sortableName": "From Here To Now To You",
                "releaseDate": "2013-09-17T00:00:00.000-07:00",
                "duration": 2480,
                "trackCount": 12,
                "isCompilation": false,
                "icon": {
                    "dominantColor": "1b4b93",
                    "artId": "images/public/int/3/6/2/5/602537455263",
                    "artUrl": "images/public/int/3/6/2/5/602537455263_500W_500H.jpg"
                },
                "rightsInfo": {
                    "hasInteractive": true,
                    "hasOffline": false,
                    "hasNonInteractive": true,
                    "hasStatutory": true,
                    "hasRadioRights": true,
                    "expirationTime": 1616662749648
                },
                "tracks": [
                    "TR:2315215",
                    "TR:2315216",
                    "TR:2315217",
                    "TR:2315218",
                    "TR:2315219",
                    "TR:2315220",
                    "TR:2315221",
                    "TR:2315222",
                    "TR:2315223",
                    "TR:2315224",
                    "TR:2315225",
                    "TR:2315226"
                ],
                "artistId": "AR:246591",
                "artistName": "Jack Johnson",
                "explicitness": "NONE",
                "shareableUrlPath": "/artist/jack-johnson/from-here-to-now-to-you/ALp5tXjwXZb94tP",
                "modificationTime": 1596217052927,
                "slugPlusPandoraId": "/jack-johnson/from-here-to-now-to-you/AL:207990",
                "hasRadio": true,
                "releaseType": "OriginalAlbum",
                "listenerReleaseType": "Album",
                "pandoraId": "AL:207990",
                "type": "AL",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.AlbumDTO"
            },
            "AR:54900": {
                "name": "Dave Matthews Band",
                "sortableName": "Dave Matthews Band",
                "trackCount": 940,
                "albumCount": 71,
                "icon": {
                    "dominantColor": "7b4e33",
                    "artId": "images/24/99/ce/3b/d04d4442ae7467b79564e7cf/",
                    "artUrl": "images/24/99/ce/3b/d04d4442ae7467b79564e7cf/_500W_500H.jpg"
                },
                "shareableUrlPath": "/artist/dave-matthews-band/ARmwfd3X52g5rjq",
                "twitterHandle": "davematthewsbnd",
                "hasRadio": true,
                "modificationTime": 1616607965840,
                "stationFactoryId": "SF:16722:54900",
                "slugPlusPandoraId": "/dave-matthews-band/AR:54900",
                "collaboration": false,
                "primaryArtists": [],
                "variousArtist": false,
                "megastar": false,
                "hasTakeoverModes": false,
                "pandoraId": "AR:54900",
                "type": "AR",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.ArtistDTO"
            },
            "TR:230753": {
                "name": "Good People",
                "sortableName": "Good People",
                "duration": 208,
                "trackNumber": 4,
                "icon": {
                    "dominantColor": "fcd203",
                    "artId": "images/public/int/1/3/3/0/602498800331",
                    "artUrl": "images/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                },
                "rightsInfo": {
                    "hasInteractive": true,
                    "hasOffline": false,
                    "hasNonInteractive": true,
                    "hasStatutory": true,
                    "hasRadioRights": true,
                    "expirationTime": 1616662749646
                },
                "albumId": "AL:17219",
                "albumName": "In Between Dreams",
                "artistId": "AR:246591",
                "artistName": "Jack Johnson",
                "explicitness": "NONE",
                "shareableUrlPath": "/artist/jack-johnson/in-between-dreams/good-people/TRrXzjw34lqXVf9",
                "hasRadio": true,
                "modificationTime": 1616553791768,
                "slugPlusPandoraId": "/jack-johnson/in-between-dreams/good-people/TR:230753",
                "stationFactoryId": "SF:21586:230753",
                "isrc": "USMC60400030",
                "pandoraId": "TR:230753",
                "type": "TR",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.TrackDTO"
            },
            "AL:706334": {
                "name": "Brushfire Fairytales (Remastered) (Bonus Version)",
                "sortableName": "Brushfire Fairytales (Remastered) (Bonus Version)",
                "releaseDate": "2011-04-12T00:00:00.000-07:00",
                "duration": 3287,
                "trackCount": 15,
                "isCompilation": false,
                "icon": {
                    "dominantColor": "0c3372",
                    "artId": "images/public/int/3/2/7/0/181229100723",
                    "artUrl": "images/public/int/3/2/7/0/181229100723_500W_500H.jpg"
                },
                "rightsInfo": {
                    "hasInteractive": true,
                    "hasOffline": false,
                    "hasNonInteractive": true,
                    "hasStatutory": true,
                    "hasRadioRights": true,
                    "expirationTime": 1616662749648
                },
                "tracks": [
                    "TR:6297957",
                    "TR:6297952",
                    "TR:6297961",
                    "TR:6297956",
                    "TR:6297959",
                    "TR:6297954",
                    "TR:6297960",
                    "TR:6297948",
                    "TR:6297950",
                    "TR:6297955",
                    "TR:6297953",
                    "TR:6297962",
                    "TR:6297958",
                    "TR:6297949",
                    "TR:6297951"
                ],
                "artistId": "AR:246591",
                "artistName": "Jack Johnson",
                "explicitness": "NONE",
                "shareableUrlPath": "/artist/jack-johnson/brushfire-fairytales-remastered-bonus-version/ALrv77fgwd7tmvJ",
                "modificationTime": 1586345135164,
                "slugPlusPandoraId": "/jack-johnson/brushfire-fairytales-remastered-bonus-version/AL:706334",
                "hasRadio": true,
                "releaseType": "Remastered",
                "listenerReleaseType": "Album",
                "pandoraId": "AL:706334",
                "type": "AL",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.AlbumDTO"
            },
            "TR:1067375": {
                "name": "If I Had Eyes",
                "sortableName": "If I Had Eyes",
                "duration": 239,
                "trackNumber": 6,
                "icon": {
                    "dominantColor": "7b332d",
                    "artId": "images/a0/16/e6/35/f16544289710c357f621e2e3/",
                    "artUrl": "images/a0/16/e6/35/f16544289710c357f621e2e3/_500W_500H.jpg"
                },
                "rightsInfo": {
                    "hasInteractive": true,
                    "hasOffline": false,
                    "hasNonInteractive": true,
                    "hasStatutory": true,
                    "hasRadioRights": true,
                    "expirationTime": 1616662749646
                },
                "albumId": "AL:92730",
                "albumName": "Sleep Through The Static",
                "artistId": "AR:246591",
                "artistName": "Jack Johnson",
                "explicitness": "NONE",
                "shareableUrlPath": "/artist/jack-johnson/sleep-through-the-static/if-i-had-eyes/TRp9pp3Kjvgnjvg",
                "hasRadio": true,
                "modificationTime": 1616491096450,
                "slugPlusPandoraId": "/jack-johnson/sleep-through-the-static/if-i-had-eyes/TR:1067375",
                "stationFactoryId": "SF:21586:1067375",
                "isrc": "USUM70763258",
                "pandoraId": "TR:1067375",
                "type": "TR",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.TrackDTO"
            },
            "AL:9946": {
                "name": "On And On",
                "sortableName": "On And On",
                "releaseDate": "2007-05-03T00:00:00.000-07:00",
                "duration": 2640,
                "trackCount": 16,
                "isCompilation": false,
                "icon": {
                    "dominantColor": "009987",
                    "artId": "images/public/int/1/2/2/1/044007501221",
                    "artUrl": "images/public/int/1/2/2/1/044007501221_500W_500H.jpg"
                },
                "rightsInfo": {
                    "hasInteractive": true,
                    "hasOffline": false,
                    "hasNonInteractive": true,
                    "hasStatutory": true,
                    "hasRadioRights": true,
                    "expirationTime": 1616662749648
                },
                "tracks": [
                    "TR:128421",
                    "TR:128422",
                    "TR:128423",
                    "TR:128424",
                    "TR:128425",
                    "TR:128426",
                    "TR:128427",
                    "TR:128428",
                    "TR:128429",
                    "TR:128430",
                    "TR:128431",
                    "TR:128432",
                    "TR:128433",
                    "TR:128434",
                    "TR:128435",
                    "TR:128436"
                ],
                "artistId": "AR:246591",
                "artistName": "Jack Johnson",
                "explicitness": "NONE",
                "shareableUrlPath": "/artist/jack-johnson/on-and-on/AL92vn4JtKdZp5c",
                "modificationTime": 1607635105222,
                "slugPlusPandoraId": "/jack-johnson/on-and-on/AL:9946",
                "hasRadio": true,
                "releaseType": "OriginalAlbum",
                "listenerReleaseType": "Album",
                "pandoraId": "AL:9946",
                "type": "AL",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.AlbumDTO"
            },
            "TR:13647608": {
                "name": "Upside Down",
                "sortableName": "Upside Down",
                "duration": 208,
                "trackNumber": 1,
                "icon": {
                    "dominantColor": "fcf000",
                    "artId": "images/public/int/7/9/3/4/00602567834397",
                    "artUrl": "images/public/int/7/9/3/4/00602567834397_500W_500H.jpg"
                },
                "rightsInfo": {
                    "hasInteractive": true,
                    "hasOffline": false,
                    "hasNonInteractive": true,
                    "hasStatutory": true,
                    "hasRadioRights": true,
                    "expirationTime": 1616662749646
                },
                "albumId": "AL:1552382",
                "albumName": "Jack Johnson And Friends: Sing-A-Longs And Lullabies For The Film Curious George",
                "artistId": "AR:246591",
                "artistName": "Jack Johnson",
                "explicitness": "NONE",
                "shareableUrlPath": "/artist/jack-johnson/jack-johnson-and-friends-sing-a-longs-and-lullabies-for-the-film-curious-george/upside-down/TR2qZhgk9fqjncZ",
                "hasRadio": true,
                "modificationTime": 1616479709965,
                "slugPlusPandoraId": "/jack-johnson/jack-johnson-and-friends-sing-a-longs-and-lullabies-for-the-film-curious-george/upside-down/TR:13647608",
                "stationFactoryId": "SF:21586:13647608",
                "isrc": "USUG10500591",
                "pandoraId": "TR:13647608",
                "type": "TR",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.TrackDTO"
            },
            "AR:48070": {
                "name": "Donavon Frankenreiter",
                "sortableName": "Donavon Frankenreiter",
                "trackCount": 137,
                "albumCount": 24,
                "icon": {
                    "dominantColor": "571800",
                    "artId": "images/ff/e0/08/33/b2d247d0ab5aaeb451581123/",
                    "artUrl": "images/ff/e0/08/33/b2d247d0ab5aaeb451581123/_500W_500H.jpg"
                },
                "shareableUrlPath": "/artist/donavon-frankenreiter/ARJnnp9hvbp44cV",
                "twitterHandle": "dfrankenreiter",
                "hasRadio": true,
                "modificationTime": 1616619110184,
                "stationFactoryId": "SF:16722:48070",
                "slugPlusPandoraId": "/donavon-frankenreiter/AR:48070",
                "collaboration": false,
                "primaryArtists": [],
                "variousArtist": false,
                "megastar": false,
                "hasTakeoverModes": false,
                "pandoraId": "AR:48070",
                "type": "AR",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.ArtistDTO"
            },
            "TR:230770": {
                "name": "Breakdown",
                "sortableName": "Breakdown",
                "duration": 213,
                "trackNumber": 11,
                "icon": {
                    "dominantColor": "fcd203",
                    "artId": "images/public/int/1/3/3/0/602498800331",
                    "artUrl": "images/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                },
                "rightsInfo": {
                    "hasInteractive": true,
                    "hasOffline": false,
                    "hasNonInteractive": true,
                    "hasStatutory": true,
                    "hasRadioRights": true,
                    "expirationTime": 1616662749646
                },
                "albumId": "AL:17219",
                "albumName": "In Between Dreams",
                "artistId": "AR:246591",
                "artistName": "Jack Johnson",
                "explicitness": "NONE",
                "shareableUrlPath": "/artist/jack-johnson/in-between-dreams/breakdown/TRpzKtldZZJcn49",
                "hasRadio": true,
                "modificationTime": 1616463700245,
                "slugPlusPandoraId": "/jack-johnson/in-between-dreams/breakdown/TR:230770",
                "stationFactoryId": "SF:21586:230770",
                "isrc": "USMC60400029",
                "pandoraId": "TR:230770",
                "type": "TR",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.TrackDTO"
            },
            "TR:128425": {
                "name": "Gone",
                "sortableName": "Gone",
                "duration": 130,
                "trackNumber": 5,
                "icon": {
                    "dominantColor": "009987",
                    "artId": "images/public/int/1/2/2/1/044007501221",
                    "artUrl": "images/public/int/1/2/2/1/044007501221_500W_500H.jpg"
                },
                "rightsInfo": {
                    "hasInteractive": true,
                    "hasOffline": false,
                    "hasNonInteractive": true,
                    "hasStatutory": true,
                    "hasRadioRights": true,
                    "expirationTime": 1616662749646
                },
                "albumId": "AL:9946",
                "albumName": "On And On",
                "artistId": "AR:246591",
                "artistName": "Jack Johnson",
                "explicitness": "NONE",
                "shareableUrlPath": "/artist/jack-johnson/on-and-on/gone/TRkbhcr2vKmlk7c",
                "hasRadio": true,
                "modificationTime": 1616330918533,
                "slugPlusPandoraId": "/jack-johnson/on-and-on/gone/TR:128425",
                "stationFactoryId": "SF:21586:128425",
                "isrc": "USMC60300003",
                "pandoraId": "TR:128425",
                "type": "TR",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.TrackDTO"
            },
            "TR:230750": {
                "name": "Better Together",
                "sortableName": "Better Together",
                "duration": 208,
                "trackNumber": 1,
                "icon": {
                    "dominantColor": "fcd203",
                    "artId": "images/public/int/1/3/3/0/602498800331",
                    "artUrl": "images/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                },
                "rightsInfo": {
                    "hasInteractive": true,
                    "hasOffline": false,
                    "hasNonInteractive": true,
                    "hasStatutory": true,
                    "hasRadioRights": true,
                    "expirationTime": 1616662749646
                },
                "albumId": "AL:17219",
                "albumName": "In Between Dreams",
                "artistId": "AR:246591",
                "artistName": "Jack Johnson",
                "explicitness": "NONE",
                "shareableUrlPath": "/artist/jack-johnson/in-between-dreams/better-together/TR45vqpJcPprtxg",
                "hasRadio": true,
                "modificationTime": 1616328674719,
                "slugPlusPandoraId": "/jack-johnson/in-between-dreams/better-together/TR:230750",
                "stationFactoryId": "SF:21586:230750",
                "isrc": "USMC60400027",
                "pandoraId": "TR:230750",
                "type": "TR",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.TrackDTO"
            },
            "AL:134363": {
                "name": "To The Sea",
                "sortableName": "To The Sea",
                "releaseDate": "2010-06-01T00:00:00.000-07:00",
                "duration": 2496,
                "trackCount": 13,
                "isCompilation": false,
                "icon": {
                    "dominantColor": "69d5d8",
                    "artId": "images/public/int/3/8/8/2/602527382883",
                    "artUrl": "images/public/int/3/8/8/2/602527382883_500W_500H.jpg"
                },
                "rightsInfo": {
                    "hasInteractive": true,
                    "hasOffline": false,
                    "hasNonInteractive": true,
                    "hasStatutory": true,
                    "hasRadioRights": true,
                    "expirationTime": 1616662749648
                },
                "tracks": [
                    "TR:1536056",
                    "TR:1536057",
                    "TR:1536058",
                    "TR:1536059",
                    "TR:1536060",
                    "TR:1536061",
                    "TR:1536062",
                    "TR:1536063",
                    "TR:1536064",
                    "TR:1536065",
                    "TR:1536066",
                    "TR:1536067",
                    "TR:1536068"
                ],
                "artistId": "AR:246591",
                "artistName": "Jack Johnson",
                "explicitness": "NONE",
                "shareableUrlPath": "/artist/jack-johnson/to-the-sea/ALx7wf3cgP5m6Pm",
                "modificationTime": 1596261654886,
                "slugPlusPandoraId": "/jack-johnson/to-the-sea/AL:134363",
                "hasRadio": true,
                "releaseType": "OriginalAlbum",
                "listenerReleaseType": "Album",
                "pandoraId": "AL:134363",
                "type": "AL",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.AlbumDTO"
            },
            "AL:171287": {
                "name": "Jack Johnson & Friends - Best Of Kokua Festival",
                "sortableName": "Jack Johnson & Friends - Best Of Kokua Festival",
                "releaseDate": "2012-04-17T00:00:00.000-07:00",
                "duration": 3269,
                "trackCount": 13,
                "isCompilation": true,
                "icon": {
                    "dominantColor": "c6a551",
                    "artId": "images/public/int/4/3/0/3/602527993034",
                    "artUrl": "images/public/int/4/3/0/3/602527993034_500W_500H.jpg"
                },
                "rightsInfo": {
                    "hasInteractive": true,
                    "hasOffline": false,
                    "hasNonInteractive": true,
                    "hasStatutory": true,
                    "hasRadioRights": true,
                    "expirationTime": 1616662749648
                },
                "tracks": [
                    "TR:1962244",
                    "TR:1962245",
                    "TR:1962246",
                    "TR:1962247",
                    "TR:1962248",
                    "TR:1962249",
                    "TR:1962250",
                    "TR:1962251",
                    "TR:1962252",
                    "TR:1962253",
                    "TR:1962254",
                    "TR:1962255",
                    "TR:1962256"
                ],
                "artistId": "AR:246591",
                "artistName": "Jack Johnson",
                "explicitness": "NONE",
                "shareableUrlPath": "/artist/jack-johnson/jack-johnson-and-friends-best-of-kokua-festival/ALpxP72pVX5dfPK",
                "modificationTime": 1608334024693,
                "slugPlusPandoraId": "/jack-johnson/jack-johnson-and-friends-best-of-kokua-festival/AL:171287",
                "hasRadio": true,
                "releaseType": "SingleArtistCompilation",
                "listenerReleaseType": "Album",
                "pandoraId": "AL:171287",
                "type": "AL",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.AlbumDTO"
            },
            "AR:171093": {
                "name": "Dave Matthews & Tim Reynolds",
                "sortableName": "Dave Matthews & Tim Reynolds",
                "trackCount": 100,
                "albumCount": 4,
                "icon": {
                    "dominantColor": "212121",
                    "artId": "images/66/a4/75/2e/8bed449abed5eeebabb79222/",
                    "artUrl": "images/66/a4/75/2e/8bed449abed5eeebabb79222/_500W_500H.jpg"
                },
                "shareableUrlPath": "/artist/dave-matthews-and-tim-reynolds/AR75XPtJpZ9V6p9",
                "hasRadio": true,
                "modificationTime": 1616349597148,
                "stationFactoryId": "SF:16722:171093",
                "slugPlusPandoraId": "/dave-matthews-and-tim-reynolds/AR:171093",
                "collaboration": true,
                "primaryArtists": [
                    "AR:27469",
                    "AR:171094"
                ],
                "variousArtist": false,
                "megastar": false,
                "hasTakeoverModes": false,
                "pandoraId": "AR:171093",
                "type": "AR",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.ArtistDTO"
            },
            "AL:17219": {
                "name": "In Between Dreams",
                "sortableName": "In Between Dreams",
                "releaseDate": "2005-03-01T00:00:00.000-08:00",
                "duration": 2461,
                "trackCount": 14,
                "isCompilation": false,
                "icon": {
                    "dominantColor": "fcd203",
                    "artId": "images/public/int/1/3/3/0/602498800331",
                    "artUrl": "images/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                },
                "rightsInfo": {
                    "hasInteractive": true,
                    "hasOffline": false,
                    "hasNonInteractive": true,
                    "hasStatutory": true,
                    "hasRadioRights": true,
                    "expirationTime": 1616662749648
                },
                "tracks": [
                    "TR:230750",
                    "TR:230751",
                    "TR:230752",
                    "TR:230753",
                    "TR:230758",
                    "TR:230760",
                    "TR:230762",
                    "TR:230764",
                    "TR:230766",
                    "TR:230768",
                    "TR:230770",
                    "TR:230772",
                    "TR:230773",
                    "TR:230774"
                ],
                "artistId": "AR:246591",
                "artistName": "Jack Johnson",
                "explicitness": "NONE",
                "shareableUrlPath": "/artist/jack-johnson/in-between-dreams/AL2bnf6v36rcpjK",
                "modificationTime": 1596216804289,
                "slugPlusPandoraId": "/jack-johnson/in-between-dreams/AL:17219",
                "hasRadio": true,
                "releaseType": "OriginalAlbum",
                "listenerReleaseType": "Album",
                "pandoraId": "AL:17219",
                "type": "AL",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.AlbumDTO"
            },
            "AR:246591": {
                "name": "Jack Johnson",
                "sortableName": "Jack Johnson",
                "trackCount": 176,
                "albumCount": 33,
                "icon": {
                    "dominantColor": "b75d03",
                    "artId": "images/08/c4/56/bd/c05545d69f247db1f0dc09c7/",
                    "artUrl": "images/08/c4/56/bd/c05545d69f247db1f0dc09c7/_500W_500H.jpg"
                },
                "shareableUrlPath": "/artist/jack-johnson/ARxkwzv9ztkvn5g",
                "twitterHandle": "jackjohnson",
                "hasRadio": true,
                "modificationTime": 1616613400395,
                "stationFactoryId": "SF:16722:246591",
                "slugPlusPandoraId": "/jack-johnson/AR:246591",
                "collaboration": false,
                "primaryArtists": [],
                "variousArtist": false,
                "megastar": false,
                "hasTakeoverModes": false,
                "pandoraId": "AR:246591",
                "type": "AR",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.ArtistDTO"
            },
            "AL:92730": {
                "name": "Sleep Through The Static",
                "sortableName": "Sleep Through The Static",
                "releaseDate": "2008-02-28T00:00:00.000-08:00",
                "duration": 3081,
                "trackCount": 14,
                "isCompilation": false,
                "icon": {
                    "dominantColor": "7b332d",
                    "artId": "images/a0/16/e6/35/f16544289710c357f621e2e3/",
                    "artUrl": "images/a0/16/e6/35/f16544289710c357f621e2e3/_500W_500H.jpg"
                },
                "rightsInfo": {
                    "hasInteractive": true,
                    "hasOffline": false,
                    "hasNonInteractive": true,
                    "hasStatutory": true,
                    "hasRadioRights": true,
                    "expirationTime": 1616662749648
                },
                "tracks": [
                    "TR:1067370",
                    "TR:1067371",
                    "TR:1067372",
                    "TR:1067373",
                    "TR:1067374",
                    "TR:1067375",
                    "TR:1067376",
                    "TR:1067377",
                    "TR:1067378",
                    "TR:1067379",
                    "TR:1067380",
                    "TR:1067381",
                    "TR:1067382",
                    "TR:1067383"
                ],
                "artistId": "AR:246591",
                "artistName": "Jack Johnson",
                "explicitness": "NONE",
                "shareableUrlPath": "/artist/jack-johnson/sleep-through-the-static/AL3Xf9ZXf6g2bzZ",
                "modificationTime": 1596213208192,
                "slugPlusPandoraId": "/jack-johnson/sleep-through-the-static/AL:92730",
                "hasRadio": true,
                "releaseType": "OriginalAlbum",
                "listenerReleaseType": "Album",
                "pandoraId": "AL:92730",
                "type": "AL",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.AlbumDTO"
            },
            "AL:7383712": {
                "name": "The Captain Is Drunk (Single)",
                "sortableName": "Captain Is Drunk (Single), The",
                "releaseDate": "2020-12-04T00:00:00.000-08:00",
                "duration": 187,
                "trackCount": 1,
                "isCompilation": false,
                "icon": {
                    "dominantColor": "4287bd",
                    "artId": "images/9c/dd/96/3b/88c14807aa3d6723502cb6a3/",
                    "artUrl": "images/9c/dd/96/3b/88c14807aa3d6723502cb6a3/_500W_500H.jpg"
                },
                "rightsInfo": {
                    "hasInteractive": true,
                    "hasOffline": false,
                    "hasNonInteractive": true,
                    "hasStatutory": true,
                    "hasRadioRights": true,
                    "expirationTime": 1616662749648
                },
                "tracks": [
                    "TR:38532225"
                ],
                "artistId": "AR:246591",
                "artistName": "Jack Johnson",
                "explicitness": "NONE",
                "shareableUrlPath": "/artist/jack-johnson/the-captain-is-drunk-single/AL2zZ9l2X3w7mV6",
                "modificationTime": 1607060571086,
                "slugPlusPandoraId": "/jack-johnson/the-captain-is-drunk-single/AL:7383712",
                "hasRadio": true,
                "releaseType": "Single",
                "listenerReleaseType": "Single",
                "pandoraId": "AL:7383712",
                "type": "AL",
                "scope": "core",
                "__type": "com.pandora.remoting.api.catalog.dto.AlbumDTO"
            }
        }
    ],
    "v4/catalog/getDetails": [
        {
            "annotations": {
                "AL:125918": {
                    "name": "En Concert",
                    "sortableName": "En Concert",
                    "releaseDate": "2009-10-26T00:00:00.000-07:00",
                    "duration": 4607,
                    "trackCount": 19,
                    "isCompilation": false,
                    "icon": {
                        "dominantColor": "212121",
                        "artId": "images/f4/60/ee/25/b1d54eeba3ef2fe27baf273f/",
                        "artUrl": "images/f4/60/ee/25/b1d54eeba3ef2fe27baf273f/_500W_500H.jpg"
                    },
                    "rightsInfo": {
                        "hasInteractive": true,
                        "hasOffline": false,
                        "hasNonInteractive": true,
                        "hasStatutory": true,
                        "hasRadioRights": true,
                        "expirationTime": 1616662749648
                    },
                    "tracks": [
                        "TR:1445193",
                        "TR:1445194",
                        "TR:1445195",
                        "TR:1445196",
                        "TR:1445197",
                        "TR:1445198",
                        "TR:1445199",
                        "TR:1445200",
                        "TR:1445201",
                        "TR:1445202",
                        "TR:1445203",
                        "TR:1445204",
                        "TR:1445205",
                        "TR:1445206",
                        "TR:1445207",
                        "TR:1445208",
                        "TR:1445209",
                        "TR:1445210",
                        "TR:1445211"
                    ],
                    "artistId": "AR:246591",
                    "artistName": "Jack Johnson",
                    "explicitness": "NONE",
                    "shareableUrlPath": "/artist/jack-johnson/en-concert/ALJJrZ9ftXxjbpc",
                    "modificationTime": 1597181228308,
                    "slugPlusPandoraId": "/jack-johnson/en-concert/AL:125918",
                    "hasRadio": true,
                    "releaseType": "OriginalAlbum",
                    "listenerReleaseType": "Album",
                    "pandoraId": "AL:125918",
                    "type": "AL",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.AlbumDTO"
                },
                "AL:1552382": {
                    "name": "Jack Johnson And Friends: Sing-A-Longs And Lullabies For The Film Curious George",
                    "sortableName": "Jack Johnson And Friends: Sing-A-Longs And Lullabies For The Film Curious George",
                    "releaseDate": "2018-08-10T00:00:00.000-07:00",
                    "duration": 2619,
                    "trackCount": 14,
                    "isCompilation": false,
                    "icon": {
                        "dominantColor": "fcf000",
                        "artId": "images/public/int/7/9/3/4/00602567834397",
                        "artUrl": "images/public/int/7/9/3/4/00602567834397_500W_500H.jpg"
                    },
                    "rightsInfo": {
                        "hasInteractive": true,
                        "hasOffline": false,
                        "hasNonInteractive": true,
                        "hasStatutory": true,
                        "hasRadioRights": true,
                        "expirationTime": 1616662749648
                    },
                    "tracks": [
                        "TR:13647608",
                        "TR:13647612",
                        "TR:13647614",
                        "TR:13647615",
                        "TR:13647619",
                        "TR:13647610",
                        "TR:13647611",
                        "TR:13647617",
                        "TR:13647618",
                        "TR:13647620",
                        "TR:13647616",
                        "TR:13647609",
                        "TR:13647613",
                        "TR:13647607"
                    ],
                    "artistId": "AR:246591",
                    "artistName": "Jack Johnson",
                    "explicitness": "NONE",
                    "shareableUrlPath": "/artist/jack-johnson/jack-johnson-and-friends-sing-a-longs-and-lullabies-for-the-film-curious-george/AL3qXmxlcPpjKjK",
                    "modificationTime": 1586379331316,
                    "slugPlusPandoraId": "/jack-johnson/jack-johnson-and-friends-sing-a-longs-and-lullabies-for-the-film-curious-george/AL:1552382",
                    "hasRadio": true,
                    "releaseType": "OriginalAlbum",
                    "listenerReleaseType": "Album",
                    "pandoraId": "AL:1552382",
                    "type": "AL",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.AlbumDTO"
                },
                "AR:33942": {
                    "name": "Ben Harper",
                    "sortableName": "Ben Harper",
                    "trackCount": 228,
                    "albumCount": 38,
                    "icon": {
                        "dominantColor": "212121",
                        "artId": "images/4b/f7/e5/e1/b2e44f98bdf3464e571816e3/",
                        "artUrl": "images/4b/f7/e5/e1/b2e44f98bdf3464e571816e3/_500W_500H.jpg"
                    },
                    "shareableUrlPath": "/artist/ben-harper/ARl7mjZpVZmq97c",
                    "twitterHandle": "BenHarper",
                    "hasRadio": true,
                    "modificationTime": 1616648222007,
                    "stationFactoryId": "SF:16722:33942",
                    "slugPlusPandoraId": "/ben-harper/AR:33942",
                    "collaboration": false,
                    "primaryArtists": [],
                    "variousArtist": false,
                    "megastar": false,
                    "hasTakeoverModes": false,
                    "pandoraId": "AR:33942",
                    "type": "AR",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.ArtistDTO"
                },
                "TR:230760": {
                    "name": "Sitting, Waiting, Wishing",
                    "sortableName": "Sitting, Waiting, Wishing",
                    "duration": 184,
                    "trackNumber": 6,
                    "icon": {
                        "dominantColor": "fcd203",
                        "artId": "images/public/int/1/3/3/0/602498800331",
                        "artUrl": "images/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                    },
                    "rightsInfo": {
                        "hasInteractive": true,
                        "hasOffline": false,
                        "hasNonInteractive": true,
                        "hasStatutory": true,
                        "hasRadioRights": true,
                        "expirationTime": 1616662749646
                    },
                    "albumId": "AL:17219",
                    "albumName": "In Between Dreams",
                    "artistId": "AR:246591",
                    "artistName": "Jack Johnson",
                    "explicitness": "NONE",
                    "shareableUrlPath": "/artist/jack-johnson/in-between-dreams/sitting-waiting-wishing/TRJczrPvxgvnV7w",
                    "hasRadio": true,
                    "modificationTime": 1616384335286,
                    "slugPlusPandoraId": "/jack-johnson/in-between-dreams/sitting-waiting-wishing/TR:230760",
                    "stationFactoryId": "SF:21586:230760",
                    "isrc": "USMC60400026",
                    "pandoraId": "TR:230760",
                    "type": "TR",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.TrackDTO"
                },
                "AR:25519": {
                    "name": "John Mayer",
                    "sortableName": "John Mayer",
                    "trackCount": 207,
                    "albumCount": 33,
                    "icon": {
                        "dominantColor": "243c6c",
                        "artId": "images/4a/ee/4b/d4/c5244509a1d8f8d8ece41f56/",
                        "artUrl": "images/4a/ee/4b/d4/c5244509a1d8f8d8ece41f56/_500W_500H.jpg"
                    },
                    "shareableUrlPath": "/artist/john-mayer/AR7gmvdgzgvbf6Z",
                    "twitterHandle": "JohnMayer",
                    "hasRadio": true,
                    "modificationTime": 1616604893091,
                    "stationFactoryId": "SF:16722:25519",
                    "slugPlusPandoraId": "/john-mayer/AR:25519",
                    "collaboration": false,
                    "primaryArtists": [],
                    "variousArtist": false,
                    "megastar": false,
                    "hasTakeoverModes": false,
                    "pandoraId": "AR:25519",
                    "type": "AR",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.ArtistDTO"
                },
                "AR:253934": {
                    "name": "Eric Hutchinson",
                    "sortableName": "Eric Hutchinson",
                    "trackCount": 118,
                    "albumCount": 34,
                    "icon": {
                        "dominantColor": "694800",
                        "artId": "images/2d/da/c3/25/9372429ba871974299382c5f/",
                        "artUrl": "images/2d/da/c3/25/9372429ba871974299382c5f/_500W_500H.jpg"
                    },
                    "shareableUrlPath": "/artist/eric-hutchinson/ARhw2fv4jzhXn7q",
                    "twitterHandle": "EricHutchinson",
                    "hasRadio": true,
                    "modificationTime": 1616623643476,
                    "stationFactoryId": "SF:16722:253934",
                    "slugPlusPandoraId": "/eric-hutchinson/AR:253934",
                    "collaboration": false,
                    "primaryArtists": [],
                    "variousArtist": false,
                    "megastar": false,
                    "hasTakeoverModes": false,
                    "pandoraId": "AR:253934",
                    "type": "AR",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.ArtistDTO"
                },
                "TR:230752": {
                    "name": "Banana Pancakes",
                    "sortableName": "Banana Pancakes",
                    "duration": 192,
                    "trackNumber": 3,
                    "icon": {
                        "dominantColor": "fcd203",
                        "artId": "images/public/int/1/3/3/0/602498800331",
                        "artUrl": "images/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                    },
                    "rightsInfo": {
                        "hasInteractive": true,
                        "hasOffline": false,
                        "hasNonInteractive": true,
                        "hasStatutory": true,
                        "hasRadioRights": true,
                        "expirationTime": 1616662749646
                    },
                    "albumId": "AL:17219",
                    "albumName": "In Between Dreams",
                    "artistId": "AR:246591",
                    "artistName": "Jack Johnson",
                    "explicitness": "NONE",
                    "shareableUrlPath": "/artist/jack-johnson/in-between-dreams/banana-pancakes/TRVxqX6k3gq7Vt9",
                    "hasRadio": true,
                    "modificationTime": 1616488063509,
                    "slugPlusPandoraId": "/jack-johnson/in-between-dreams/banana-pancakes/TR:230752",
                    "stationFactoryId": "SF:21586:230752",
                    "isrc": "USMC60400032",
                    "pandoraId": "TR:230752",
                    "type": "TR",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.TrackDTO"
                },
                "TR:230751": {
                    "name": "Never Know",
                    "sortableName": "Never Know",
                    "duration": 213,
                    "trackNumber": 2,
                    "icon": {
                        "dominantColor": "fcd203",
                        "artId": "images/public/int/1/3/3/0/602498800331",
                        "artUrl": "images/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                    },
                    "rightsInfo": {
                        "hasInteractive": true,
                        "hasOffline": false,
                        "hasNonInteractive": true,
                        "hasStatutory": true,
                        "hasRadioRights": true,
                        "expirationTime": 1616662749646
                    },
                    "albumId": "AL:17219",
                    "albumName": "In Between Dreams",
                    "artistId": "AR:246591",
                    "artistName": "Jack Johnson",
                    "explicitness": "NONE",
                    "shareableUrlPath": "/artist/jack-johnson/in-between-dreams/never-know/TRZkZ4lZnd3n959",
                    "hasRadio": true,
                    "modificationTime": 1616424031353,
                    "slugPlusPandoraId": "/jack-johnson/in-between-dreams/never-know/TR:230751",
                    "stationFactoryId": "SF:21586:230751",
                    "isrc": "USMC60400028",
                    "pandoraId": "TR:230751",
                    "type": "TR",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.TrackDTO"
                },
                "TR:230773": {
                    "name": "Do You Remember",
                    "sortableName": "Do You Remember",
                    "duration": 144,
                    "trackNumber": 13,
                    "icon": {
                        "dominantColor": "fcd203",
                        "artId": "images/public/int/1/3/3/0/602498800331",
                        "artUrl": "images/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                    },
                    "rightsInfo": {
                        "hasInteractive": true,
                        "hasOffline": false,
                        "hasNonInteractive": true,
                        "hasStatutory": true,
                        "hasRadioRights": true,
                        "expirationTime": 1616662749646
                    },
                    "albumId": "AL:17219",
                    "albumName": "In Between Dreams",
                    "artistId": "AR:246591",
                    "artistName": "Jack Johnson",
                    "explicitness": "NONE",
                    "shareableUrlPath": "/artist/jack-johnson/in-between-dreams/do-you-remember/TR3gXwfhZ7bkbV4",
                    "hasRadio": true,
                    "modificationTime": 1616313340288,
                    "slugPlusPandoraId": "/jack-johnson/in-between-dreams/do-you-remember/TR:230773",
                    "stationFactoryId": "SF:21586:230773",
                    "isrc": "USMC60400038",
                    "pandoraId": "TR:230773",
                    "type": "TR",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.TrackDTO"
                },
                "AL:207990": {
                    "name": "From Here To Now To You",
                    "sortableName": "From Here To Now To You",
                    "releaseDate": "2013-09-17T00:00:00.000-07:00",
                    "duration": 2480,
                    "trackCount": 12,
                    "isCompilation": false,
                    "icon": {
                        "dominantColor": "1b4b93",
                        "artId": "images/public/int/3/6/2/5/602537455263",
                        "artUrl": "images/public/int/3/6/2/5/602537455263_500W_500H.jpg"
                    },
                    "rightsInfo": {
                        "hasInteractive": true,
                        "hasOffline": false,
                        "hasNonInteractive": true,
                        "hasStatutory": true,
                        "hasRadioRights": true,
                        "expirationTime": 1616662749648
                    },
                    "tracks": [
                        "TR:2315215",
                        "TR:2315216",
                        "TR:2315217",
                        "TR:2315218",
                        "TR:2315219",
                        "TR:2315220",
                        "TR:2315221",
                        "TR:2315222",
                        "TR:2315223",
                        "TR:2315224",
                        "TR:2315225",
                        "TR:2315226"
                    ],
                    "artistId": "AR:246591",
                    "artistName": "Jack Johnson",
                    "explicitness": "NONE",
                    "shareableUrlPath": "/artist/jack-johnson/from-here-to-now-to-you/ALp5tXjwXZb94tP",
                    "modificationTime": 1596217052927,
                    "slugPlusPandoraId": "/jack-johnson/from-here-to-now-to-you/AL:207990",
                    "hasRadio": true,
                    "releaseType": "OriginalAlbum",
                    "listenerReleaseType": "Album",
                    "pandoraId": "AL:207990",
                    "type": "AL",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.AlbumDTO"
                },
                "AR:54900": {
                    "name": "Dave Matthews Band",
                    "sortableName": "Dave Matthews Band",
                    "trackCount": 940,
                    "albumCount": 71,
                    "icon": {
                        "dominantColor": "7b4e33",
                        "artId": "images/24/99/ce/3b/d04d4442ae7467b79564e7cf/",
                        "artUrl": "images/24/99/ce/3b/d04d4442ae7467b79564e7cf/_500W_500H.jpg"
                    },
                    "shareableUrlPath": "/artist/dave-matthews-band/ARmwfd3X52g5rjq",
                    "twitterHandle": "davematthewsbnd",
                    "hasRadio": true,
                    "modificationTime": 1616607965840,
                    "stationFactoryId": "SF:16722:54900",
                    "slugPlusPandoraId": "/dave-matthews-band/AR:54900",
                    "collaboration": false,
                    "primaryArtists": [],
                    "variousArtist": false,
                    "megastar": false,
                    "hasTakeoverModes": false,
                    "pandoraId": "AR:54900",
                    "type": "AR",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.ArtistDTO"
                },
                "TR:230753": {
                    "name": "Good People",
                    "sortableName": "Good People",
                    "duration": 208,
                    "trackNumber": 4,
                    "icon": {
                        "dominantColor": "fcd203",
                        "artId": "images/public/int/1/3/3/0/602498800331",
                        "artUrl": "images/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                    },
                    "rightsInfo": {
                        "hasInteractive": true,
                        "hasOffline": false,
                        "hasNonInteractive": true,
                        "hasStatutory": true,
                        "hasRadioRights": true,
                        "expirationTime": 1616662749646
                    },
                    "albumId": "AL:17219",
                    "albumName": "In Between Dreams",
                    "artistId": "AR:246591",
                    "artistName": "Jack Johnson",
                    "explicitness": "NONE",
                    "shareableUrlPath": "/artist/jack-johnson/in-between-dreams/good-people/TRrXzjw34lqXVf9",
                    "hasRadio": true,
                    "modificationTime": 1616553791768,
                    "slugPlusPandoraId": "/jack-johnson/in-between-dreams/good-people/TR:230753",
                    "stationFactoryId": "SF:21586:230753",
                    "isrc": "USMC60400030",
                    "pandoraId": "TR:230753",
                    "type": "TR",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.TrackDTO"
                },
                "AL:706334": {
                    "name": "Brushfire Fairytales (Remastered) (Bonus Version)",
                    "sortableName": "Brushfire Fairytales (Remastered) (Bonus Version)",
                    "releaseDate": "2011-04-12T00:00:00.000-07:00",
                    "duration": 3287,
                    "trackCount": 15,
                    "isCompilation": false,
                    "icon": {
                        "dominantColor": "0c3372",
                        "artId": "images/public/int/3/2/7/0/181229100723",
                        "artUrl": "images/public/int/3/2/7/0/181229100723_500W_500H.jpg"
                    },
                    "rightsInfo": {
                        "hasInteractive": true,
                        "hasOffline": false,
                        "hasNonInteractive": true,
                        "hasStatutory": true,
                        "hasRadioRights": true,
                        "expirationTime": 1616662749648
                    },
                    "tracks": [
                        "TR:6297957",
                        "TR:6297952",
                        "TR:6297961",
                        "TR:6297956",
                        "TR:6297959",
                        "TR:6297954",
                        "TR:6297960",
                        "TR:6297948",
                        "TR:6297950",
                        "TR:6297955",
                        "TR:6297953",
                        "TR:6297962",
                        "TR:6297958",
                        "TR:6297949",
                        "TR:6297951"
                    ],
                    "artistId": "AR:246591",
                    "artistName": "Jack Johnson",
                    "explicitness": "NONE",
                    "shareableUrlPath": "/artist/jack-johnson/brushfire-fairytales-remastered-bonus-version/ALrv77fgwd7tmvJ",
                    "modificationTime": 1586345135164,
                    "slugPlusPandoraId": "/jack-johnson/brushfire-fairytales-remastered-bonus-version/AL:706334",
                    "hasRadio": true,
                    "releaseType": "Remastered",
                    "listenerReleaseType": "Album",
                    "pandoraId": "AL:706334",
                    "type": "AL",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.AlbumDTO"
                },
                "TR:1067375": {
                    "name": "If I Had Eyes",
                    "sortableName": "If I Had Eyes",
                    "duration": 239,
                    "trackNumber": 6,
                    "icon": {
                        "dominantColor": "7b332d",
                        "artId": "images/a0/16/e6/35/f16544289710c357f621e2e3/",
                        "artUrl": "images/a0/16/e6/35/f16544289710c357f621e2e3/_500W_500H.jpg"
                    },
                    "rightsInfo": {
                        "hasInteractive": true,
                        "hasOffline": false,
                        "hasNonInteractive": true,
                        "hasStatutory": true,
                        "hasRadioRights": true,
                        "expirationTime": 1616662749646
                    },
                    "albumId": "AL:92730",
                    "albumName": "Sleep Through The Static",
                    "artistId": "AR:246591",
                    "artistName": "Jack Johnson",
                    "explicitness": "NONE",
                    "shareableUrlPath": "/artist/jack-johnson/sleep-through-the-static/if-i-had-eyes/TRp9pp3Kjvgnjvg",
                    "hasRadio": true,
                    "modificationTime": 1616491096450,
                    "slugPlusPandoraId": "/jack-johnson/sleep-through-the-static/if-i-had-eyes/TR:1067375",
                    "stationFactoryId": "SF:21586:1067375",
                    "isrc": "USUM70763258",
                    "pandoraId": "TR:1067375",
                    "type": "TR",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.TrackDTO"
                },
                "AL:9946": {
                    "name": "On And On",
                    "sortableName": "On And On",
                    "releaseDate": "2007-05-03T00:00:00.000-07:00",
                    "duration": 2640,
                    "trackCount": 16,
                    "isCompilation": false,
                    "icon": {
                        "dominantColor": "009987",
                        "artId": "images/public/int/1/2/2/1/044007501221",
                        "artUrl": "images/public/int/1/2/2/1/044007501221_500W_500H.jpg"
                    },
                    "rightsInfo": {
                        "hasInteractive": true,
                        "hasOffline": false,
                        "hasNonInteractive": true,
                        "hasStatutory": true,
                        "hasRadioRights": true,
                        "expirationTime": 1616662749648
                    },
                    "tracks": [
                        "TR:128421",
                        "TR:128422",
                        "TR:128423",
                        "TR:128424",
                        "TR:128425",
                        "TR:128426",
                        "TR:128427",
                        "TR:128428",
                        "TR:128429",
                        "TR:128430",
                        "TR:128431",
                        "TR:128432",
                        "TR:128433",
                        "TR:128434",
                        "TR:128435",
                        "TR:128436"
                    ],
                    "artistId": "AR:246591",
                    "artistName": "Jack Johnson",
                    "explicitness": "NONE",
                    "shareableUrlPath": "/artist/jack-johnson/on-and-on/AL92vn4JtKdZp5c",
                    "modificationTime": 1607635105222,
                    "slugPlusPandoraId": "/jack-johnson/on-and-on/AL:9946",
                    "hasRadio": true,
                    "releaseType": "OriginalAlbum",
                    "listenerReleaseType": "Album",
                    "pandoraId": "AL:9946",
                    "type": "AL",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.AlbumDTO"
                },
                "TR:13647608": {
                    "name": "Upside Down",
                    "sortableName": "Upside Down",
                    "duration": 208,
                    "trackNumber": 1,
                    "icon": {
                        "dominantColor": "fcf000",
                        "artId": "images/public/int/7/9/3/4/00602567834397",
                        "artUrl": "images/public/int/7/9/3/4/00602567834397_500W_500H.jpg"
                    },
                    "rightsInfo": {
                        "hasInteractive": true,
                        "hasOffline": false,
                        "hasNonInteractive": true,
                        "hasStatutory": true,
                        "hasRadioRights": true,
                        "expirationTime": 1616662749646
                    },
                    "albumId": "AL:1552382",
                    "albumName": "Jack Johnson And Friends: Sing-A-Longs And Lullabies For The Film Curious George",
                    "artistId": "AR:246591",
                    "artistName": "Jack Johnson",
                    "explicitness": "NONE",
                    "shareableUrlPath": "/artist/jack-johnson/jack-johnson-and-friends-sing-a-longs-and-lullabies-for-the-film-curious-george/upside-down/TR2qZhgk9fqjncZ",
                    "hasRadio": true,
                    "modificationTime": 1616479709965,
                    "slugPlusPandoraId": "/jack-johnson/jack-johnson-and-friends-sing-a-longs-and-lullabies-for-the-film-curious-george/upside-down/TR:13647608",
                    "stationFactoryId": "SF:21586:13647608",
                    "isrc": "USUG10500591",
                    "pandoraId": "TR:13647608",
                    "type": "TR",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.TrackDTO"
                },
                "AR:48070": {
                    "name": "Donavon Frankenreiter",
                    "sortableName": "Donavon Frankenreiter",
                    "trackCount": 137,
                    "albumCount": 24,
                    "icon": {
                        "dominantColor": "571800",
                        "artId": "images/ff/e0/08/33/b2d247d0ab5aaeb451581123/",
                        "artUrl": "images/ff/e0/08/33/b2d247d0ab5aaeb451581123/_500W_500H.jpg"
                    },
                    "shareableUrlPath": "/artist/donavon-frankenreiter/ARJnnp9hvbp44cV",
                    "twitterHandle": "dfrankenreiter",
                    "hasRadio": true,
                    "modificationTime": 1616619110184,
                    "stationFactoryId": "SF:16722:48070",
                    "slugPlusPandoraId": "/donavon-frankenreiter/AR:48070",
                    "collaboration": false,
                    "primaryArtists": [],
                    "variousArtist": false,
                    "megastar": false,
                    "hasTakeoverModes": false,
                    "pandoraId": "AR:48070",
                    "type": "AR",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.ArtistDTO"
                },
                "TR:230770": {
                    "name": "Breakdown",
                    "sortableName": "Breakdown",
                    "duration": 213,
                    "trackNumber": 11,
                    "icon": {
                        "dominantColor": "fcd203",
                        "artId": "images/public/int/1/3/3/0/602498800331",
                        "artUrl": "images/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                    },
                    "rightsInfo": {
                        "hasInteractive": true,
                        "hasOffline": false,
                        "hasNonInteractive": true,
                        "hasStatutory": true,
                        "hasRadioRights": true,
                        "expirationTime": 1616662749646
                    },
                    "albumId": "AL:17219",
                    "albumName": "In Between Dreams",
                    "artistId": "AR:246591",
                    "artistName": "Jack Johnson",
                    "explicitness": "NONE",
                    "shareableUrlPath": "/artist/jack-johnson/in-between-dreams/breakdown/TRpzKtldZZJcn49",
                    "hasRadio": true,
                    "modificationTime": 1616463700245,
                    "slugPlusPandoraId": "/jack-johnson/in-between-dreams/breakdown/TR:230770",
                    "stationFactoryId": "SF:21586:230770",
                    "isrc": "USMC60400029",
                    "pandoraId": "TR:230770",
                    "type": "TR",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.TrackDTO"
                },
                "TR:128425": {
                    "name": "Gone",
                    "sortableName": "Gone",
                    "duration": 130,
                    "trackNumber": 5,
                    "icon": {
                        "dominantColor": "009987",
                        "artId": "images/public/int/1/2/2/1/044007501221",
                        "artUrl": "images/public/int/1/2/2/1/044007501221_500W_500H.jpg"
                    },
                    "rightsInfo": {
                        "hasInteractive": true,
                        "hasOffline": false,
                        "hasNonInteractive": true,
                        "hasStatutory": true,
                        "hasRadioRights": true,
                        "expirationTime": 1616662749646
                    },
                    "albumId": "AL:9946",
                    "albumName": "On And On",
                    "artistId": "AR:246591",
                    "artistName": "Jack Johnson",
                    "explicitness": "NONE",
                    "shareableUrlPath": "/artist/jack-johnson/on-and-on/gone/TRkbhcr2vKmlk7c",
                    "hasRadio": true,
                    "modificationTime": 1616330918533,
                    "slugPlusPandoraId": "/jack-johnson/on-and-on/gone/TR:128425",
                    "stationFactoryId": "SF:21586:128425",
                    "isrc": "USMC60300003",
                    "pandoraId": "TR:128425",
                    "type": "TR",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.TrackDTO"
                },
                "TR:230750": {
                    "name": "Better Together",
                    "sortableName": "Better Together",
                    "duration": 208,
                    "trackNumber": 1,
                    "icon": {
                        "dominantColor": "fcd203",
                        "artId": "images/public/int/1/3/3/0/602498800331",
                        "artUrl": "images/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                    },
                    "rightsInfo": {
                        "hasInteractive": true,
                        "hasOffline": false,
                        "hasNonInteractive": true,
                        "hasStatutory": true,
                        "hasRadioRights": true,
                        "expirationTime": 1616662749646
                    },
                    "albumId": "AL:17219",
                    "albumName": "In Between Dreams",
                    "artistId": "AR:246591",
                    "artistName": "Jack Johnson",
                    "explicitness": "NONE",
                    "shareableUrlPath": "/artist/jack-johnson/in-between-dreams/better-together/TR45vqpJcPprtxg",
                    "hasRadio": true,
                    "modificationTime": 1616328674719,
                    "slugPlusPandoraId": "/jack-johnson/in-between-dreams/better-together/TR:230750",
                    "stationFactoryId": "SF:21586:230750",
                    "isrc": "USMC60400027",
                    "pandoraId": "TR:230750",
                    "type": "TR",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.TrackDTO"
                },
                "AL:134363": {
                    "name": "To The Sea",
                    "sortableName": "To The Sea",
                    "releaseDate": "2010-06-01T00:00:00.000-07:00",
                    "duration": 2496,
                    "trackCount": 13,
                    "isCompilation": false,
                    "icon": {
                        "dominantColor": "69d5d8",
                        "artId": "images/public/int/3/8/8/2/602527382883",
                        "artUrl": "images/public/int/3/8/8/2/602527382883_500W_500H.jpg"
                    },
                    "rightsInfo": {
                        "hasInteractive": true,
                        "hasOffline": false,
                        "hasNonInteractive": true,
                        "hasStatutory": true,
                        "hasRadioRights": true,
                        "expirationTime": 1616662749648
                    },
                    "tracks": [
                        "TR:1536056",
                        "TR:1536057",
                        "TR:1536058",
                        "TR:1536059",
                        "TR:1536060",
                        "TR:1536061",
                        "TR:1536062",
                        "TR:1536063",
                        "TR:1536064",
                        "TR:1536065",
                        "TR:1536066",
                        "TR:1536067",
                        "TR:1536068"
                    ],
                    "artistId": "AR:246591",
                    "artistName": "Jack Johnson",
                    "explicitness": "NONE",
                    "shareableUrlPath": "/artist/jack-johnson/to-the-sea/ALx7wf3cgP5m6Pm",
                    "modificationTime": 1596261654886,
                    "slugPlusPandoraId": "/jack-johnson/to-the-sea/AL:134363",
                    "hasRadio": true,
                    "releaseType": "OriginalAlbum",
                    "listenerReleaseType": "Album",
                    "pandoraId": "AL:134363",
                    "type": "AL",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.AlbumDTO"
                },
                "AL:171287": {
                    "name": "Jack Johnson & Friends - Best Of Kokua Festival",
                    "sortableName": "Jack Johnson & Friends - Best Of Kokua Festival",
                    "releaseDate": "2012-04-17T00:00:00.000-07:00",
                    "duration": 3269,
                    "trackCount": 13,
                    "isCompilation": true,
                    "icon": {
                        "dominantColor": "c6a551",
                        "artId": "images/public/int/4/3/0/3/602527993034",
                        "artUrl": "images/public/int/4/3/0/3/602527993034_500W_500H.jpg"
                    },
                    "rightsInfo": {
                        "hasInteractive": true,
                        "hasOffline": false,
                        "hasNonInteractive": true,
                        "hasStatutory": true,
                        "hasRadioRights": true,
                        "expirationTime": 1616662749648
                    },
                    "tracks": [
                        "TR:1962244",
                        "TR:1962245",
                        "TR:1962246",
                        "TR:1962247",
                        "TR:1962248",
                        "TR:1962249",
                        "TR:1962250",
                        "TR:1962251",
                        "TR:1962252",
                        "TR:1962253",
                        "TR:1962254",
                        "TR:1962255",
                        "TR:1962256"
                    ],
                    "artistId": "AR:246591",
                    "artistName": "Jack Johnson",
                    "explicitness": "NONE",
                    "shareableUrlPath": "/artist/jack-johnson/jack-johnson-and-friends-best-of-kokua-festival/ALpxP72pVX5dfPK",
                    "modificationTime": 1608334024693,
                    "slugPlusPandoraId": "/jack-johnson/jack-johnson-and-friends-best-of-kokua-festival/AL:171287",
                    "hasRadio": true,
                    "releaseType": "SingleArtistCompilation",
                    "listenerReleaseType": "Album",
                    "pandoraId": "AL:171287",
                    "type": "AL",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.AlbumDTO"
                },
                "AR:171093": {
                    "name": "Dave Matthews & Tim Reynolds",
                    "sortableName": "Dave Matthews & Tim Reynolds",
                    "trackCount": 100,
                    "albumCount": 4,
                    "icon": {
                        "dominantColor": "212121",
                        "artId": "images/66/a4/75/2e/8bed449abed5eeebabb79222/",
                        "artUrl": "images/66/a4/75/2e/8bed449abed5eeebabb79222/_500W_500H.jpg"
                    },
                    "shareableUrlPath": "/artist/dave-matthews-and-tim-reynolds/AR75XPtJpZ9V6p9",
                    "hasRadio": true,
                    "modificationTime": 1616349597148,
                    "stationFactoryId": "SF:16722:171093",
                    "slugPlusPandoraId": "/dave-matthews-and-tim-reynolds/AR:171093",
                    "collaboration": true,
                    "primaryArtists": [
                        "AR:27469",
                        "AR:171094"
                    ],
                    "variousArtist": false,
                    "megastar": false,
                    "hasTakeoverModes": false,
                    "pandoraId": "AR:171093",
                    "type": "AR",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.ArtistDTO"
                },
                "AL:17219": {
                    "name": "In Between Dreams",
                    "sortableName": "In Between Dreams",
                    "releaseDate": "2005-03-01T00:00:00.000-08:00",
                    "duration": 2461,
                    "trackCount": 14,
                    "isCompilation": false,
                    "icon": {
                        "dominantColor": "fcd203",
                        "artId": "images/public/int/1/3/3/0/602498800331",
                        "artUrl": "images/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                    },
                    "rightsInfo": {
                        "hasInteractive": true,
                        "hasOffline": false,
                        "hasNonInteractive": true,
                        "hasStatutory": true,
                        "hasRadioRights": true,
                        "expirationTime": 1616662749648
                    },
                    "tracks": [
                        "TR:230750",
                        "TR:230751",
                        "TR:230752",
                        "TR:230753",
                        "TR:230758",
                        "TR:230760",
                        "TR:230762",
                        "TR:230764",
                        "TR:230766",
                        "TR:230768",
                        "TR:230770",
                        "TR:230772",
                        "TR:230773",
                        "TR:230774"
                    ],
                    "artistId": "AR:246591",
                    "artistName": "Jack Johnson",
                    "explicitness": "NONE",
                    "shareableUrlPath": "/artist/jack-johnson/in-between-dreams/AL2bnf6v36rcpjK",
                    "modificationTime": 1596216804289,
                    "slugPlusPandoraId": "/jack-johnson/in-between-dreams/AL:17219",
                    "hasRadio": true,
                    "releaseType": "OriginalAlbum",
                    "listenerReleaseType": "Album",
                    "pandoraId": "AL:17219",
                    "type": "AL",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.AlbumDTO"
                },
                "AR:246591": {
                    "name": "Jack Johnson",
                    "sortableName": "Jack Johnson",
                    "trackCount": 176,
                    "albumCount": 33,
                    "icon": {
                        "dominantColor": "b75d03",
                        "artId": "images/08/c4/56/bd/c05545d69f247db1f0dc09c7/",
                        "artUrl": "images/08/c4/56/bd/c05545d69f247db1f0dc09c7/_500W_500H.jpg"
                    },
                    "shareableUrlPath": "/artist/jack-johnson/ARxkwzv9ztkvn5g",
                    "twitterHandle": "jackjohnson",
                    "hasRadio": true,
                    "modificationTime": 1616613400395,
                    "stationFactoryId": "SF:16722:246591",
                    "slugPlusPandoraId": "/jack-johnson/AR:246591",
                    "collaboration": false,
                    "primaryArtists": [],
                    "variousArtist": false,
                    "megastar": false,
                    "hasTakeoverModes": false,
                    "pandoraId": "AR:246591",
                    "type": "AR",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.ArtistDTO"
                },
                "AL:92730": {
                    "name": "Sleep Through The Static",
                    "sortableName": "Sleep Through The Static",
                    "releaseDate": "2008-02-28T00:00:00.000-08:00",
                    "duration": 3081,
                    "trackCount": 14,
                    "isCompilation": false,
                    "icon": {
                        "dominantColor": "7b332d",
                        "artId": "images/a0/16/e6/35/f16544289710c357f621e2e3/",
                        "artUrl": "images/a0/16/e6/35/f16544289710c357f621e2e3/_500W_500H.jpg"
                    },
                    "rightsInfo": {
                        "hasInteractive": true,
                        "hasOffline": false,
                        "hasNonInteractive": true,
                        "hasStatutory": true,
                        "hasRadioRights": true,
                        "expirationTime": 1616662749648
                    },
                    "tracks": [
                        "TR:1067370",
                        "TR:1067371",
                        "TR:1067372",
                        "TR:1067373",
                        "TR:1067374",
                        "TR:1067375",
                        "TR:1067376",
                        "TR:1067377",
                        "TR:1067378",
                        "TR:1067379",
                        "TR:1067380",
                        "TR:1067381",
                        "TR:1067382",
                        "TR:1067383"
                    ],
                    "artistId": "AR:246591",
                    "artistName": "Jack Johnson",
                    "explicitness": "NONE",
                    "shareableUrlPath": "/artist/jack-johnson/sleep-through-the-static/AL3Xf9ZXf6g2bzZ",
                    "modificationTime": 1596213208192,
                    "slugPlusPandoraId": "/jack-johnson/sleep-through-the-static/AL:92730",
                    "hasRadio": true,
                    "releaseType": "OriginalAlbum",
                    "listenerReleaseType": "Album",
                    "pandoraId": "AL:92730",
                    "type": "AL",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.AlbumDTO"
                },
                "AL:7383712": {
                    "name": "The Captain Is Drunk (Single)",
                    "sortableName": "Captain Is Drunk (Single), The",
                    "releaseDate": "2020-12-04T00:00:00.000-08:00",
                    "duration": 187,
                    "trackCount": 1,
                    "isCompilation": false,
                    "icon": {
                        "dominantColor": "4287bd",
                        "artId": "images/9c/dd/96/3b/88c14807aa3d6723502cb6a3/",
                        "artUrl": "images/9c/dd/96/3b/88c14807aa3d6723502cb6a3/_500W_500H.jpg"
                    },
                    "rightsInfo": {
                        "hasInteractive": true,
                        "hasOffline": false,
                        "hasNonInteractive": true,
                        "hasStatutory": true,
                        "hasRadioRights": true,
                        "expirationTime": 1616662749648
                    },
                    "tracks": [
                        "TR:38532225"
                    ],
                    "artistId": "AR:246591",
                    "artistName": "Jack Johnson",
                    "explicitness": "NONE",
                    "shareableUrlPath": "/artist/jack-johnson/the-captain-is-drunk-single/AL2zZ9l2X3w7mV6",
                    "modificationTime": 1607060571086,
                    "slugPlusPandoraId": "/jack-johnson/the-captain-is-drunk-single/AL:7383712",
                    "hasRadio": true,
                    "releaseType": "Single",
                    "listenerReleaseType": "Single",
                    "pandoraId": "AL:7383712",
                    "type": "AL",
                    "scope": "core",
                    "__type": "com.pandora.remoting.api.catalog.dto.AlbumDTO"
                }
            },
            "artistDetails": {
                "bio": "Before Jack Johnson became the 21st century kingpin of beachside pop/rock, he was a champion surfer on the professional circuit. The sport was second nature to the Hawaiian native, who began chasing waves as a toddler and, by the age of 17, had become an outstanding athlete on the Banzai Pipeline. However, Johnson was also testing other creative outlets — specifically film and music — and a serious surfing accident during his first professional competition convinced him to devote more time to those landlocked hobbies. After studying cinematography in college, he turned his full attention to music, writing breezy pop songs punctuated by an unassuming voice and a mellow, beach-bum demeanor. The combination proved to be particularly commercial, as Johnson<span class=\"push-single\"></span><span class=\"pull-single\">’</span>s first five major-label albums all climbed to platinum status.   While studying film at the University of California in Santa Barbara, Johnson partnered with friends Chris Malloy and Emmett Malloy to produced a surfing documentary entitled Thicker Than Water. Although the project spotlighted Johnson<span class=\"push-single\"></span><span class=\"pull-single\">’</span>s talent as a director, it also showcased his flair for songwriting, and the accompanying soundtrack featured several of his own tunes. Thicker Than Water was deemed 2000′s Video of the Year by Surfer magazine and paved the way for a second surf flick, The September Sessions. Meanwhile, Johnson began receiving similar notice for his songs, one of which was covered by <a data-pandora-id=\"AR:1140\" data-shareable-url=\"/artist/g-love-and-special-sauce/ARPmPn6hXXhKqmX\" href=\"pandorav4:/backstage/artist?pandoraId=AR:1140\">G. Love &amp; Special Sauce</a> on the band’s 1999 album, Philadelphonic. Shortly thereafter, Johnson<span class=\"push-single\"></span><span class=\"pull-single\">’</span>s demo material piqued the interest of J.P. Plunier, a French producer who had helped launch <a data-pandora-id=\"AR:33942\" data-shareable-url=\"/artist/ben-harper/ARl7mjZpVZmq97c\" href=\"pandorav4:/backstage/artist?pandoraId=AR:33942\">Ben Harper</a><span class=\"push-single\"></span><span class=\"pull-single\">’</span>s career several years prior.   With Plunier’s help, Johnson recorded and released <a data-pandora-id=\"AL:8778\" data-shareable-url=\"/artist/jack-johnson/brushfire-fairytales/AL9J4qJ4q5cwXm9\" href=\"pandorav4:/backstage/album?pandoraId=AL:8778\">Brushfire Fairytales</a> in 2001. The debut album featured a cameo by <a data-pandora-id=\"AR:33942\" data-shareable-url=\"/artist/ben-harper/ARl7mjZpVZmq97c\" href=\"pandorav4:/backstage/artist?pandoraId=AR:33942\">Ben Harper</a>, thus sparking a friendship between the two musicians. Moreover, its casually spun folk songs attracted an audience that stretched far beyond Johnson<span class=\"push-single\"></span><span class=\"pull-single\">’</span>s own surfing community, and <a data-pandora-id=\"AL:8778\" data-shareable-url=\"/artist/jack-johnson/brushfire-fairytales/AL9J4qJ4q5cwXm9\" href=\"pandorav4:/backstage/album?pandoraId=AL:8778\">Brushfire Fairytales</a> went platinum as a result. After touring throughout the early half of 2002, he returned to the studio and issued On and On one year later. Despite its musical similarity to <a data-pandora-id=\"AL:8778\" data-shareable-url=\"/artist/jack-johnson/brushfire-fairytales/AL9J4qJ4q5cwXm9\" href=\"pandorav4:/backstage/album?pandoraId=AL:8778\">Brushfire Fairytales</a>, On and On found Johnson delving into social commentary, resulting in a number of songs that paired worldly, insightful lyrics with a sunny surf vibe.   Jack Johnson toured heavily in support of his growing catalog, taking frequent breaks to surf and spend time with his family. When it came time to return to the studio, he resumed his partnership with Mario Caldato, Jr., the same producer who had helmed On and On, and decamped to Mango Trees Studio in Hawaii. In Between Dreams was released in 2005, sporting a mango tree on the album’s cover (in tribute to the studio) while offering a familiar mix of tropical songwriting and conscious commentary. The album peaked at number two, Johnson<span class=\"push-single\"></span><span class=\"pull-single\">’</span>s highest chart position to date in America, and sold more than two million copies stateside. Oddly enough, it was Johnson<span class=\"push-single\"></span><span class=\"pull-single\">’</span>s next project, the kids-oriented Sing-A-Longs and Lullabies for the Film Curious George, that finally sent him to the top of the charts. The soundtrack debuted at number one in February 2006, selling 149,000 copies during its first week and making Curious George the first animated film since Pocahontas to have a chart-topping soundtrack. Like the four albums before it, it climbed to platinum status.   Despite such continued success, however, Johnson was dealt a sharp blow in 2007, when his cousin Danny Riley succumbed to brain cancer. That death, coupled with the decision to record outside of Hawaii’s familiar environment, lent a moody ambience to Johnson<span class=\"push-single\"></span><span class=\"pull-single\">’</span>s next record, 2008′s Sleep Through the Static. Nonetheless, the bulk of the album retained a warm, sand-scrubbed feel, and Sleep Through the Static went platinum within five weeks. Johnson traveled throughout Europe that summer, playing some of his largest shows to date, and the resulting footage was captured for the 2009 CD/DVD release En Concert. Johnson released his fifth studio album, To the Sea, in June 2010. Covering a nine-year span, the Jack Johnson &amp; Friends: The Best of Kokua Festival compilation appeared in 2012 and featured performances from Johnson<span class=\"push-single\"></span><span class=\"pull-single\">’</span>s benefit concert for the nonprofit, environmental education organization the Kokua Hawaii Foundation. Johnson returned to his Mango Tree studio with Mario Caldato, Jr. — who produced his 2005 release In Between Dreams — to record his sixth studio album, From Here to Now to You. The album, which was released in September 2013, was preceded by the single<span class=\"push-double\"></span> <span class=\"pull-double\">“</span>I Got You.” A couple of live releases quickly followed — the vinyl-only Live at Third Man Records 6-15-2013 came out in November 2013 and an <span class=\"small-caps\">EP</span> called From Here to Now to You appeared in 2014 — and then he went quiet in 2015 and 2016. Johnson returned in early 2017 with the single<span class=\"push-double\"></span> <span class=\"pull-double\">“</span>Fragments,” the first taste of his seventh studio album, <a data-pandora-id=\"AL:1133377\" data-shareable-url=\"/artist/jack-johnson/all-the-light-above-it-too/ALkJzXlP49Zq4P9\" href=\"pandorav4:/backstage/album?pandoraId=AL:1133377\">All the Light Above It Too</a>, which appeared in September of that year. ~ Andrew Leahey",
                "similarArtists": [
                    "AR:48070",
                    "AR:25519",
                    "AR:54900",
                    "AR:253934",
                    "AR:33942",
                    "AR:171093"
                ],
                "latestRelease": "AL:7383712",
                "topTracks": [
                    "TR:230750",
                    "TR:230773",
                    "TR:230752",
                    "TR:230770",
                    "TR:230760",
                    "TR:230751",
                    "TR:230753",
                    "TR:128425",
                    "TR:1067375",
                    "TR:13647608"
                ],
                "topAlbums": [
                    "AL:17219",
                    "AL:9946",
                    "AL:171287",
                    "AL:92730",
                    "AL:706334",
                    "AL:125918",
                    "AL:207990",
                    "AL:134363"
                ],
                "albumCount": 24,
                "trackCount": 175,
                "artistPlayId": "AP:16722:246591",
                "artistTracksId": "AT:16722:246591",
                "twitterUrl": "https://twitter.com/intent/user?screen_name=jackjohnson",
                "stationListenerCount": 1744727,
                "modificationTime": 1616613400395,
                "heroImage": {
                    "dominantColor": "4287bd",
                    "artId": "images/9c/dd/96/3b/88c14807aa3d6723502cb6a3/",
                    "artUrl": "images/9c/dd/96/3b/88c14807aa3d6723502cb6a3/_500W_500H.jpg"
                },
                "focusTraits": [
                    {
                        "name": "rock",
                        "focusTraitSet": "AD_GENRE",
                        "focusTraitSetType": "MATCHING"
                    },
                    {
                        "name": "mild rhythmic syncopation",
                        "focusTraitSet": "EXPLANATION",
                        "focusTraitSetType": "MATCHING"
                    },
                    {
                        "name": "mellow rock instrumentation",
                        "focusTraitSet": "EXPLANATION",
                        "focusTraitSetType": "MATCHING"
                    },
                    {
                        "name": "major key tonality",
                        "focusTraitSet": "EXPLANATION",
                        "focusTraitSetType": "MATCHING"
                    },
                    {
                        "name": "folk influences",
                        "focusTraitSet": "EXPLANATION",
                        "focusTraitSetType": "MATCHING"
                    },
                    {
                        "name": "and many other similarities identified in the Music Genome Project",
                        "focusTraitSet": "EXPLANATION",
                        "focusTraitSetType": "MATCHING"
                    },
                    {
                        "name": "acoustic sonority",
                        "focusTraitSet": "EXPLANATION",
                        "focusTraitSetType": "MATCHING"
                    },
                    {
                        "name": "acoustic rhythm guitars",
                        "focusTraitSet": "EXPLANATION",
                        "focusTraitSetType": "MATCHING"
                    },
                    {
                        "name": "a subtle use of vocal harmony",
                        "focusTraitSet": "EXPLANATION",
                        "focusTraitSetType": "MATCHING"
                    },
                    {
                        "name": "Rock",
                        "focusTraitSet": "RADIO_GENRE",
                        "focusTraitSetType": "MATCHING"
                    },
                    {
                        "name": "F8466",
                        "focusTraitSet": "RADIO_FILTER",
                        "focusTraitSetType": "MATCHING"
                    },
                    {
                        "name": "F8443",
                        "focusTraitSet": "RADIO_FILTER",
                        "focusTraitSetType": "MATCHING"
                    },
                    {
                        "name": "F8424",
                        "focusTraitSet": "RADIO_FILTER",
                        "focusTraitSetType": "MATCHING"
                    }
                ],
                "collaborationArtists": [
                    "AR:4006877",
                    "AR:4006876",
                    "AR:4541252",
                    "AR:4006879",
                    "AR:4006878",
                    "AR:4006873",
                    "AR:4006874",
                    "AR:4006871",
                    "AR:4006870",
                    "AR:4441168",
                    "AR:372729",
                    "AR:4006881",
                    "AR:4006880",
                    "AR:2439995",
                    "AR:372730"
                ],
                "featuredBy": [],
                "largeHeaderImage": {},
                "pandoraId": "AR:246591",
                "type": "AR",
                "scope": "details"
            }
        }
    ],
    "v1/music/artist": [
        {
            "bio": "Before Jack Johnson became the 21st century kingpin of beachside pop/rock, he was a champion surfer on the professional circuit. The sport was second nature to the Hawaiian native, who began chasing waves as a toddler and, by the age of 17, had become an outstanding athlete on the Banzai Pipeline. However, Johnson was also testing other creative outlets&thinsp;&mdash;&thinsp;specifically film and music&thinsp;&mdash;&thinsp;and a serious surfing accident during his first professional competition convinced him to devote more time to those landlocked hobbies. After studying cinematography in college, he turned his full attention to music, writing breezy pop songs punctuated by an unassuming voice and a mellow, beach-bum demeanor. The combination proved to be particularly commercial, as Johnson<span class=\"push-single\"></span><span class=\"pull-single\">’</span>s first five major-label albums all climbed to platinum status.   While studying film at the University of California in Santa Barbara, Johnson partnered with friends Chris Malloy and Emmett Malloy to produced a surfing documentary entitled Thicker Than Water. Although the project spotlighted Johnson<span class=\"push-single\"></span><span class=\"pull-single\">’</span>s talent as a director, it also showcased his flair for songwriting, and the accompanying soundtrack featured several of his own tunes. Thicker Than Water was deemed 2000′s Video of the Year by Surfer magazine and paved the way for a second surf flick, The September Sessions. Meanwhile, Johnson began receiving similar notice for his songs, one of which was covered by <a href=\"/artist/g-love-special-sauce/ARPmPn6hXXhKqmX\">G. Love &amp; Special Sauce</a> on the band’s 1999 album, Philadelphonic. Shortly thereafter, Johnson<span class=\"push-single\"></span><span class=\"pull-single\">’</span>s demo material piqued the interest of J.P. Plunier, a French producer who had helped launch <a href=\"/artist/ben-harper/ARl7mjZpVZmq97c\">Ben Harper</a><span class=\"push-single\"></span><span class=\"pull-single\">’</span>s career several years prior.   With Plunier’s help, Johnson recorded and released <a href=\"/artist/jack-johnson/brushfire-fairytales/AL9J4qJ4q5cwXm9\">Brushfire Fairytales</a> in 2001. The debut album featured a cameo by <a href=\"/artist/ben-harper/ARl7mjZpVZmq97c\">Ben Harper</a>, thus sparking a friendship between the two musicians. Moreover, its casually spun folk songs attracted an audience that stretched far beyond Johnson<span class=\"push-single\"></span><span class=\"pull-single\">’</span>s own surfing community, and <a href=\"/artist/jack-johnson/brushfire-fairytales/AL9J4qJ4q5cwXm9\">Brushfire Fairytales</a> went platinum as a result. After touring throughout the early half of 2002, he returned to the studio and issued On and On one year later. Despite its musical similarity to <a href=\"/artist/jack-johnson/brushfire-fairytales/AL9J4qJ4q5cwXm9\">Brushfire Fairytales</a>, On and On found Johnson delving into social commentary, resulting in a number of songs that paired worldly, insightful lyrics with a sunny surf vibe.   Jack Johnson toured heavily in support of his growing catalog, taking frequent breaks to surf and spend time with his family. When it came time to return to the studio, he resumed his partnership with Mario Caldato, Jr., the same producer who had helmed On and On, and decamped to Mango Trees Studio in Hawaii. In Between Dreams was released in 2005, sporting a mango tree on the album’s cover (in tribute to the studio) while offering a familiar mix of tropical songwriting and conscious commentary. The album peaked at number two, Johnson<span class=\"push-single\"></span><span class=\"pull-single\">’</span>s highest chart position to date in America, and sold more than two million copies stateside. Oddly enough, it was Johnson<span class=\"push-single\"></span><span class=\"pull-single\">’</span>s next project, the kids-oriented Sing-A-Longs and Lullabies for the Film Curious George, that finally sent him to the top of the charts. The soundtrack debuted at number one in February 2006, selling 149,000 copies during its first week and making Curious George the first animated film since Pocahontas to have a chart-topping soundtrack. Like the four albums before it, it climbed to platinum status.   Despite such continued success, however, Johnson was dealt a sharp blow in 2007, when his cousin Danny Riley succumbed to brain cancer. That death, coupled with the decision to record outside of Hawaii’s familiar environment, lent a moody ambience to Johnson<span class=\"push-single\"></span><span class=\"pull-single\">’</span>s next record, 2008′s Sleep Through the Static. Nonetheless, the bulk of the album retained a warm, sand-scrubbed feel, and Sleep Through the Static went platinum within five weeks. Johnson traveled throughout Europe that summer, playing some of his largest shows to date, and the resulting footage was captured for the 2009 CD/DVD release En Concert. Johnson released his fifth studio album, To the Sea, in June 2010. Covering a nine-year span, the Jack Johnson &amp; Friends: The Best of Kokua Festival compilation appeared in 2012 and featured performances from Johnson<span class=\"push-single\"></span><span class=\"pull-single\">’</span>s benefit concert for the nonprofit, environmental education organization the Kokua Hawaii Foundation. Johnson returned to his Mango Tree studio with Mario Caldato, Jr.&thinsp;&mdash;&thinsp;who produced his 2005 release In Between Dreams&thinsp;&mdash;&thinsp;to record his sixth studio album, From Here to Now to You. The album, which was released in September 2013, was preceded by the single<span class=\"push-double\"></span> <span class=\"pull-double\">“</span>I Got You.” A couple of live releases quickly followed&thinsp;&mdash;&thinsp;the vinyl-only Live at Third Man Records 6-15-2013 came out in November 2013 and an <span class=\"small-caps\">EP</span> called From Here to Now to You appeared in 2014&thinsp;&mdash;&thinsp;and then he went quiet in 2015 and 2016. Johnson returned in early 2017 with the single<span class=\"push-double\"></span> <span class=\"pull-double\">“</span>Fragments,” the first taste of his seventh studio album, <a href=\"/artist/jack-johnson/all-light-above-it-too/ALkJzXlP49Zq4P9\">All the Light Above It Too</a>, which appeared in September of that year. ~ Andrew Leahey",
            "twitterHandle": "jackjohnson",
            "listenerCount": 15022759,
            "discography": [
                {
                    "musicId": "L1133377",
                    "pandoraId": "AL:1133377",
                    "seoToken": "jack-johnson/all-light-above-it-too/ALkJzXlP49Zq4P9",
                    "albumTitle": "All The Light Above It Too",
                    "art": [
                        {
                            "url": "https://mediaserver-cont-sv5-2-v4v6.pandora.com/images/public/int/7/9/3/1/00602557781397_90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/public/int/7/9/3/1/00602557781397_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-dc6-2-v4v6.pandora.com/images/public/int/7/9/3/1/00602557781397_130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/public/int/7/9/3/1/00602557781397_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/public/int/7/9/3/1/00602557781397_500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/public/int/7/9/3/1/00602557781397_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-5.p-cdn.us/images/public/int/7/9/3/1/00602557781397_640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/public/int/7/9/3/1/00602557781397_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/public/int/7/9/3/1/00602557781397_1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/public/int/7/9/3/1/00602557781397_500W_500H.jpg"
                        }
                    ],
                    "year": "2017"
                },
                {
                    "musicId": "L550773",
                    "pandoraId": "AL:550773",
                    "seoToken": "jack-johnson/seasick-dream-single/ALrxhrlplP6hP2m",
                    "albumTitle": "Seasick Dream (Single)",
                    "art": [
                        {
                            "url": "https://cont-2.p-cdn.us/images/public/int/9/9/4/4/800074499_90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/public/int/9/9/4/4/800074499_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-5.p-cdn.us/images/public/int/9/9/4/4/800074499_130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/public/int/9/9/4/4/800074499_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-dc6-2-v4v6.pandora.com/images/public/int/9/9/4/4/800074499_500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/public/int/9/9/4/4/800074499_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-dc6-2-v4v6.pandora.com/images/public/int/9/9/4/4/800074499_640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/public/int/9/9/4/4/800074499_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-1-v4v6.pandora.com/images/public/int/9/9/4/4/800074499_1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/public/int/9/9/4/4/800074499_500W_500H.jpg"
                        }
                    ],
                    "year": "2015"
                },
                {
                    "musicId": "L207990",
                    "pandoraId": "AL:207990",
                    "seoToken": "jack-johnson/from-here-to-now-to-you/ALp5tXjwXZb94tP",
                    "albumTitle": "From Here To Now To You",
                    "art": [
                        {
                            "url": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/public/int/3/6/2/5/602537455263_90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/public/int/3/6/2/5/602537455263_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/public/int/3/6/2/5/602537455263_130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/public/int/3/6/2/5/602537455263_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-2-v4v6.pandora.com/images/public/int/3/6/2/5/602537455263_500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/public/int/3/6/2/5/602537455263_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-dc6-2-v4v6.pandora.com/images/public/int/3/6/2/5/602537455263_640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/public/int/3/6/2/5/602537455263_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-4.p-cdn.us/images/public/int/3/6/2/5/602537455263_1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/public/int/3/6/2/5/602537455263_500W_500H.jpg"
                        }
                    ],
                    "year": "2013"
                },
                {
                    "musicId": "L229550",
                    "pandoraId": "AL:229550",
                    "seoToken": "jack-johnson/from-here-to-now-to-you-live/ALdhV4zrngJXJj9",
                    "albumTitle": "From Here To Now To You Live",
                    "art": [],
                    "year": "2013"
                },
                {
                    "musicId": "L134363",
                    "pandoraId": "AL:134363",
                    "seoToken": "jack-johnson/to-sea/ALx7wf3cgP5m6Pm",
                    "albumTitle": "To The Sea",
                    "art": [
                        {
                            "url": "https://cont-2.p-cdn.us/images/public/int/3/8/8/2/602527382883_90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/public/int/3/8/8/2/602527382883_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/public/int/3/8/8/2/602527382883_130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/public/int/3/8/8/2/602527382883_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-3.p-cdn.us/images/public/int/3/8/8/2/602527382883_500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/public/int/3/8/8/2/602527382883_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/public/int/3/8/8/2/602527382883_640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/public/int/3/8/8/2/602527382883_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-2.p-cdn.us/images/public/int/3/8/8/2/602527382883_1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/public/int/3/8/8/2/602527382883_500W_500H.jpg"
                        }
                    ],
                    "year": "2010"
                },
                {
                    "musicId": "L125918",
                    "pandoraId": "AL:125918",
                    "seoToken": "jack-johnson/en-concert/ALJJrZ9ftXxjbpc",
                    "albumTitle": "En Concert",
                    "art": [
                        {
                            "url": "https://cont-1.p-cdn.us/images/f4/60/ee/25/b1d54eeba3ef2fe27baf273f/90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/f4/60/ee/25/b1d54eeba3ef2fe27baf273f/90W_90H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/f4/60/ee/25/b1d54eeba3ef2fe27baf273f/130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/f4/60/ee/25/b1d54eeba3ef2fe27baf273f/130W_130H.jpg"
                        },
                        {
                            "url": "https://cont-5.p-cdn.us/images/f4/60/ee/25/b1d54eeba3ef2fe27baf273f/500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/f4/60/ee/25/b1d54eeba3ef2fe27baf273f/500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-2-v4v6.pandora.com/images/f4/60/ee/25/b1d54eeba3ef2fe27baf273f/640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/f4/60/ee/25/b1d54eeba3ef2fe27baf273f/640W_640H.jpg"
                        },
                        {
                            "url": "https://cont-3.p-cdn.us/images/f4/60/ee/25/b1d54eeba3ef2fe27baf273f/1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/f4/60/ee/25/b1d54eeba3ef2fe27baf273f/1080W_1080H.jpg"
                        }
                    ],
                    "year": "2009"
                },
                {
                    "musicId": "L781646",
                    "pandoraId": "AL:781646",
                    "seoToken": "jack-johnson/sleep-through-static-remixed/ALP9pq9t5x2qb76",
                    "albumTitle": "Sleep Through The Static: Remixed",
                    "art": [
                        {
                            "url": "https://mediaserver-cont-sv5-2-v4v6.pandora.com/images/public/int/6/7/5/6/00602517876576_90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/public/int/6/7/5/6/00602517876576_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-1.p-cdn.us/images/public/int/6/7/5/6/00602517876576_130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/public/int/6/7/5/6/00602517876576_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-dc6-1-v4v6.pandora.com/images/public/int/6/7/5/6/00602517876576_500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/public/int/6/7/5/6/00602517876576_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/public/int/6/7/5/6/00602517876576_640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/public/int/6/7/5/6/00602517876576_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/public/int/6/7/5/6/00602517876576_1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/public/int/6/7/5/6/00602517876576_500W_500H.jpg"
                        }
                    ],
                    "year": "2008"
                },
                {
                    "musicId": "L92730",
                    "pandoraId": "AL:92730",
                    "seoToken": "jack-johnson/sleep-through-static/AL3Xf9ZXf6g2bzZ",
                    "albumTitle": "Sleep Through The Static",
                    "art": [
                        {
                            "url": "https://cont-3.p-cdn.us/images/a0/16/e6/35/f16544289710c357f621e2e3/90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/a0/16/e6/35/f16544289710c357f621e2e3/90W_90H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-1-v4v6.pandora.com/images/a0/16/e6/35/f16544289710c357f621e2e3/130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/a0/16/e6/35/f16544289710c357f621e2e3/130W_130H.jpg"
                        },
                        {
                            "url": "https://cont-3.p-cdn.us/images/a0/16/e6/35/f16544289710c357f621e2e3/500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/a0/16/e6/35/f16544289710c357f621e2e3/500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/a0/16/e6/35/f16544289710c357f621e2e3/640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/a0/16/e6/35/f16544289710c357f621e2e3/640W_640H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-2-v4v6.pandora.com/images/a0/16/e6/35/f16544289710c357f621e2e3/1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/a0/16/e6/35/f16544289710c357f621e2e3/1080W_1080H.jpg"
                        }
                    ],
                    "year": "2008"
                },
                {
                    "musicId": "L133159",
                    "pandoraId": "AL:133159",
                    "seoToken": "jack-johnson/better-together-single-live/ALl37VXvcbJhz36",
                    "albumTitle": "Better Together (Single) (Live)",
                    "art": [],
                    "year": "2006"
                },
                {
                    "musicId": "L17219",
                    "pandoraId": "AL:17219",
                    "seoToken": "jack-johnson/in-between-dreams/AL2bnf6v36rcpjK",
                    "albumTitle": "In Between Dreams",
                    "art": [
                        {
                            "url": "https://cont-2.p-cdn.us/images/public/int/1/3/3/0/602498800331_90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-dc6-2-v4v6.pandora.com/images/public/int/1/3/3/0/602498800331_130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-2.p-cdn.us/images/public/int/1/3/3/0/602498800331_500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/public/int/1/3/3/0/602498800331_640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-2-v4v6.pandora.com/images/public/int/1/3/3/0/602498800331_1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/public/int/1/3/3/0/602498800331_500W_500H.jpg"
                        }
                    ],
                    "year": "2005"
                },
                {
                    "musicId": "L9946",
                    "pandoraId": "AL:9946",
                    "seoToken": "jack-johnson/on-on/AL92vn4JtKdZp5c",
                    "albumTitle": "On And On",
                    "art": [
                        {
                            "url": "https://cont-5.p-cdn.us/images/public/int/1/2/2/1/044007501221_90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/public/int/1/2/2/1/044007501221_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-4.p-cdn.us/images/public/int/1/2/2/1/044007501221_130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/public/int/1/2/2/1/044007501221_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-5.p-cdn.us/images/public/int/1/2/2/1/044007501221_500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/public/int/1/2/2/1/044007501221_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-dc6-2-v4v6.pandora.com/images/public/int/1/2/2/1/044007501221_640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/public/int/1/2/2/1/044007501221_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-2.p-cdn.us/images/public/int/1/2/2/1/044007501221_1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/public/int/1/2/2/1/044007501221_500W_500H.jpg"
                        }
                    ],
                    "year": "2003"
                },
                {
                    "musicId": "L706334",
                    "pandoraId": "AL:706334",
                    "seoToken": "jack-johnson/brushfire-fairytales-remastered-bonus-version/ALrv77fgwd7tmvJ",
                    "albumTitle": "Brushfire Fairytales (Remastered) (Bonus Version)",
                    "art": [
                        {
                            "url": "https://cont-3.p-cdn.us/images/public/int/3/2/7/0/181229100723_90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/public/int/3/2/7/0/181229100723_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont.p-cdn.us/images/public/int/3/2/7/0/181229100723_130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/public/int/3/2/7/0/181229100723_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/public/int/3/2/7/0/181229100723_500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/public/int/3/2/7/0/181229100723_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-2-v4v6.pandora.com/images/public/int/3/2/7/0/181229100723_640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/public/int/3/2/7/0/181229100723_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-1-v4v6.pandora.com/images/public/int/3/2/7/0/181229100723_1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/public/int/3/2/7/0/181229100723_500W_500H.jpg"
                        }
                    ],
                    "year": "2001"
                },
                {
                    "musicId": "L8778",
                    "pandoraId": "AL:8778",
                    "seoToken": "jack-johnson/brushfire-fairytales/AL9J4qJ4q5cwXm9",
                    "albumTitle": "Brushfire Fairytales",
                    "art": [
                        {
                            "url": "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/d7/00/e8/a3/f6f64f84aab0226bac2ae8ed/90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/d7/00/e8/a3/f6f64f84aab0226bac2ae8ed/90W_90H.jpg"
                        },
                        {
                            "url": "https://cont.p-cdn.us/images/d7/00/e8/a3/f6f64f84aab0226bac2ae8ed/130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/d7/00/e8/a3/f6f64f84aab0226bac2ae8ed/130W_130H.jpg"
                        },
                        {
                            "url": "https://cont.p-cdn.us/images/d7/00/e8/a3/f6f64f84aab0226bac2ae8ed/500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/d7/00/e8/a3/f6f64f84aab0226bac2ae8ed/500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-2-v4v6.pandora.com/images/d7/00/e8/a3/f6f64f84aab0226bac2ae8ed/640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/d7/00/e8/a3/f6f64f84aab0226bac2ae8ed/640W_640H.jpg"
                        },
                        {
                            "url": "https://cont-5.p-cdn.us/images/d7/00/e8/a3/f6f64f84aab0226bac2ae8ed/1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/d7/00/e8/a3/f6f64f84aab0226bac2ae8ed/1080W_1080H.jpg"
                        }
                    ],
                    "year": "2001"
                },
                {
                    "musicId": "L1131560",
                    "pandoraId": "AL:1131560",
                    "seoToken": "jack-johnson/pandora-sessions-single/ALkhXt3qKPdjmrJ",
                    "albumTitle": "Pandora Sessions (Single)",
                    "art": [
                        {
                            "url": "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/public/int/3/0/3/3/00602567013303_90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/public/int/3/0/3/3/00602567013303_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/public/int/3/0/3/3/00602567013303_130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/public/int/3/0/3/3/00602567013303_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-2-v4v6.pandora.com/images/public/int/3/0/3/3/00602567013303_500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/public/int/3/0/3/3/00602567013303_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-dc6-1-v4v6.pandora.com/images/public/int/3/0/3/3/00602567013303_640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/public/int/3/0/3/3/00602567013303_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/public/int/3/0/3/3/00602567013303_1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/public/int/3/0/3/3/00602567013303_500W_500H.jpg"
                        }
                    ],
                    "year": "1969"
                },
                {
                    "musicId": "L1305374",
                    "pandoraId": "AL:1305374",
                    "seoToken": "jack-johnson/willie-got-me-stoned-live-single/ALncd5Z7pzxqnlX",
                    "albumTitle": "Willie Got Me Stoned (Live) (Single)",
                    "art": [
                        {
                            "url": "https://cont-2.p-cdn.us/images/public/int/8/4/6/6/00602567646648_90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/public/int/8/4/6/6/00602567646648_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-3.p-cdn.us/images/public/int/8/4/6/6/00602567646648_130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/public/int/8/4/6/6/00602567646648_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-2.p-cdn.us/images/public/int/8/4/6/6/00602567646648_500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/public/int/8/4/6/6/00602567646648_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-3.p-cdn.us/images/public/int/8/4/6/6/00602567646648_640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/public/int/8/4/6/6/00602567646648_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/public/int/8/4/6/6/00602567646648_1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/public/int/8/4/6/6/00602567646648_500W_500H.jpg"
                        }
                    ],
                    "year": "1969"
                },
                {
                    "musicId": "L1481123",
                    "pandoraId": "AL:1481123",
                    "seoToken": "jack-johnson/to-sea-itunes-exclusive/ALkddq2zb7ddr4c",
                    "albumTitle": "To The Sea (iTunes Exclusive)",
                    "art": [
                        {
                            "url": "https://cont.p-cdn.us/images/public/int/0/2/0/8/00602527398020_90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/public/int/0/2/0/8/00602527398020_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-1.p-cdn.us/images/public/int/0/2/0/8/00602527398020_130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/public/int/0/2/0/8/00602527398020_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/public/int/0/2/0/8/00602527398020_500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/public/int/0/2/0/8/00602527398020_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-1.p-cdn.us/images/public/int/0/2/0/8/00602527398020_640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/public/int/0/2/0/8/00602527398020_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-2-v4v6.pandora.com/images/public/int/0/2/0/8/00602527398020_1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/public/int/0/2/0/8/00602527398020_500W_500H.jpg"
                        }
                    ],
                    "year": "1969"
                },
                {
                    "musicId": "L1552382",
                    "pandoraId": "AL:1552382",
                    "seoToken": "jack-johnson/jack-johnson-friends-sing-longs-lullabies-for-film-curious-george/AL3qXmxlcPpjKjK",
                    "albumTitle": "Jack Johnson And Friends: Sing-A-Longs And Lullabies For The Film Curious George",
                    "art": [
                        {
                            "url": "https://mediaserver-cont-dc6-2-v4v6.pandora.com/images/public/int/7/9/3/4/00602567834397_90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/public/int/7/9/3/4/00602567834397_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-1.p-cdn.us/images/public/int/7/9/3/4/00602567834397_130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/public/int/7/9/3/4/00602567834397_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-4.p-cdn.us/images/public/int/7/9/3/4/00602567834397_500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/public/int/7/9/3/4/00602567834397_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-dc6-1-v4v6.pandora.com/images/public/int/7/9/3/4/00602567834397_640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/public/int/7/9/3/4/00602567834397_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-4.p-cdn.us/images/public/int/7/9/3/4/00602567834397_1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/public/int/7/9/3/4/00602567834397_500W_500H.jpg"
                        }
                    ],
                    "year": "1969"
                },
                {
                    "musicId": "L2099160",
                    "pandoraId": "AL:2099160",
                    "seoToken": "jack-johnson/upside-down-single/ALxn3r4423X9Z5c",
                    "albumTitle": "Upside Down (Single)",
                    "art": [
                        {
                            "url": "https://cont-4.p-cdn.us/images/public/int/5/9/5/8/00602577028595_90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/public/int/5/9/5/8/00602577028595_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/public/int/5/9/5/8/00602577028595_130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/public/int/5/9/5/8/00602577028595_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-dc6-1-v4v6.pandora.com/images/public/int/5/9/5/8/00602577028595_500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/public/int/5/9/5/8/00602577028595_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-1-v4v6.pandora.com/images/public/int/5/9/5/8/00602577028595_640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/public/int/5/9/5/8/00602577028595_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-dc6-1-v4v6.pandora.com/images/public/int/5/9/5/8/00602577028595_1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/public/int/5/9/5/8/00602577028595_500W_500H.jpg"
                        }
                    ],
                    "year": "1969"
                },
                {
                    "musicId": "L3374424",
                    "pandoraId": "AL:3374424",
                    "seoToken": "jack-johnson/wasting-time-e-bundle-no3-single/ALcgPtJzkck9ZzX",
                    "albumTitle": "Wasting Time (e-Bundle No.3) (Single)",
                    "art": [
                        {
                            "url": "https://cont-4.p-cdn.us/images/public/int/5/7/6/0/00602498430675_90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/public/int/5/7/6/0/00602498430675_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-3.p-cdn.us/images/public/int/5/7/6/0/00602498430675_130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/public/int/5/7/6/0/00602498430675_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/public/int/5/7/6/0/00602498430675_500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/public/int/5/7/6/0/00602498430675_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-1.p-cdn.us/images/public/int/5/7/6/0/00602498430675_640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/public/int/5/7/6/0/00602498430675_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-1-v4v6.pandora.com/images/public/int/5/7/6/0/00602498430675_1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/public/int/5/7/6/0/00602498430675_500W_500H.jpg"
                        }
                    ],
                    "year": "1969"
                },
                {
                    "musicId": "L3855263",
                    "pandoraId": "AL:3855263",
                    "seoToken": "jack-johnson/new-axe-single/ALqzjpdfr756qVm",
                    "albumTitle": "New Axe (Single)",
                    "art": [
                        {
                            "url": "https://mediaserver-cont-sv5-1-v4v6.pandora.com/images/public/int/2/4/8/5/00602508445842_90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/public/int/2/4/8/5/00602508445842_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-2-v4v6.pandora.com/images/public/int/2/4/8/5/00602508445842_130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/public/int/2/4/8/5/00602508445842_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-1.p-cdn.us/images/public/int/2/4/8/5/00602508445842_500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/public/int/2/4/8/5/00602508445842_500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-5.p-cdn.us/images/public/int/2/4/8/5/00602508445842_640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/public/int/2/4/8/5/00602508445842_500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/public/int/2/4/8/5/00602508445842_1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/public/int/2/4/8/5/00602508445842_500W_500H.jpg"
                        }
                    ],
                    "year": "1969"
                },
                {
                    "musicId": "L5246749",
                    "pandoraId": "AL:5246749",
                    "seoToken": "jack-johnson-friends/sing-longs-lullabies-for-film-curious-george/ALp5czqZnjX3f2g",
                    "albumTitle": "Sing-A-Longs & Lullabies For The Film Curious George",
                    "art": [
                        {
                            "url": "https://cont-3.p-cdn.us/images/a3/04/cc/54/fe00448eaecc2dbcb2de5577/90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/a3/04/cc/54/fe00448eaecc2dbcb2de5577/90W_90H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-2-v4v6.pandora.com/images/a3/04/cc/54/fe00448eaecc2dbcb2de5577/130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/a3/04/cc/54/fe00448eaecc2dbcb2de5577/130W_130H.jpg"
                        },
                        {
                            "url": "https://cont-3.p-cdn.us/images/a3/04/cc/54/fe00448eaecc2dbcb2de5577/500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/a3/04/cc/54/fe00448eaecc2dbcb2de5577/500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-dc6-2-v4v6.pandora.com/images/a3/04/cc/54/fe00448eaecc2dbcb2de5577/640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/a3/04/cc/54/fe00448eaecc2dbcb2de5577/640W_640H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-1-v4v6.pandora.com/images/a3/04/cc/54/fe00448eaecc2dbcb2de5577/1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/a3/04/cc/54/fe00448eaecc2dbcb2de5577/1080W_1080H.jpg"
                        }
                    ],
                    "year": "1969"
                },
                {
                    "musicId": "L7383712",
                    "pandoraId": "AL:7383712",
                    "seoToken": "jack-johnson/captain-is-drunk-single/AL2zZ9l2X3w7mV6",
                    "albumTitle": "The Captain Is Drunk (Single)",
                    "art": [
                        {
                            "url": "https://mediaserver-cont-sv5-2-v4v6.pandora.com/images/9c/dd/96/3b/88c14807aa3d6723502cb6a3/90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/9c/dd/96/3b/88c14807aa3d6723502cb6a3/90W_90H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-dc6-2-v4v6.pandora.com/images/9c/dd/96/3b/88c14807aa3d6723502cb6a3/130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/9c/dd/96/3b/88c14807aa3d6723502cb6a3/130W_130H.jpg"
                        },
                        {
                            "url": "https://cont-1.p-cdn.us/images/9c/dd/96/3b/88c14807aa3d6723502cb6a3/500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/9c/dd/96/3b/88c14807aa3d6723502cb6a3/500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-2-v4v6.pandora.com/images/9c/dd/96/3b/88c14807aa3d6723502cb6a3/640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/9c/dd/96/3b/88c14807aa3d6723502cb6a3/640W_640H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/9c/dd/96/3b/88c14807aa3d6723502cb6a3/1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/9c/dd/96/3b/88c14807aa3d6723502cb6a3/1080W_1080H.jpg"
                        }
                    ],
                    "year": "1969"
                },
                {
                    "musicId": "L222311",
                    "pandoraId": "AL:222311",
                    "seoToken": "jack-johnson/itunes-festival-london-2013/ALk6j6q3frnwkPk",
                    "albumTitle": "ITunes Festival: London 2013",
                    "art": [],
                    "year": ""
                },
                {
                    "musicId": "L207186",
                    "pandoraId": "AL:207186",
                    "seoToken": "jack-johnson/radiate-single/ALktx7fwKgkt7nm",
                    "albumTitle": "Radiate (Single)",
                    "art": [],
                    "year": ""
                }
            ],
            "similar": [
                {
                    "musicId": "R309724",
                    "pandoraId": "AR:309724",
                    "name": "Jack Johnson (Children's)",
                    "art": [
                        {
                            "url": "https://mediaserver-cont-sv5-2-v4v6.pandora.com/images/d6/29/57/c7/a6304fb59cc0fdcc3f06538b/90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/d6/29/57/c7/a6304fb59cc0fdcc3f06538b/90W_90H.jpg"
                        },
                        {
                            "url": "https://cont-2.p-cdn.us/images/d6/29/57/c7/a6304fb59cc0fdcc3f06538b/130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/d6/29/57/c7/a6304fb59cc0fdcc3f06538b/130W_130H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/d6/29/57/c7/a6304fb59cc0fdcc3f06538b/500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/d6/29/57/c7/a6304fb59cc0fdcc3f06538b/500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-4.p-cdn.us/images/d6/29/57/c7/a6304fb59cc0fdcc3f06538b/640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/d6/29/57/c7/a6304fb59cc0fdcc3f06538b/640W_640H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-1-v4v6.pandora.com/images/d6/29/57/c7/a6304fb59cc0fdcc3f06538b/1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/d6/29/57/c7/a6304fb59cc0fdcc3f06538b/1080W_1080H.jpg"
                        }
                    ],
                    "seoToken": "jack-johnson-childrens/ARklwjx6Kc3657P",
                    "detailUrl": "https://www.pandora.com/artist/jack-johnson-childrens/ARklwjx6Kc3657P"
                },
                {
                    "musicId": "R62999",
                    "pandoraId": "AR:62999",
                    "name": "Jason Mraz",
                    "art": [
                        {
                            "url": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/4e/c9/33/40/d843462aa52b3c1b49fafeb8/90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/4e/c9/33/40/d843462aa52b3c1b49fafeb8/90W_90H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/4e/c9/33/40/d843462aa52b3c1b49fafeb8/130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/4e/c9/33/40/d843462aa52b3c1b49fafeb8/130W_130H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-2-v4v6.pandora.com/images/4e/c9/33/40/d843462aa52b3c1b49fafeb8/500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/4e/c9/33/40/d843462aa52b3c1b49fafeb8/500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/4e/c9/33/40/d843462aa52b3c1b49fafeb8/640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/4e/c9/33/40/d843462aa52b3c1b49fafeb8/640W_640H.jpg"
                        },
                        {
                            "url": "https://cont.p-cdn.us/images/4e/c9/33/40/d843462aa52b3c1b49fafeb8/1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/4e/c9/33/40/d843462aa52b3c1b49fafeb8/1080W_1080H.jpg"
                        }
                    ],
                    "seoToken": "jason-mraz/AR475ldxdZjgxK6",
                    "detailUrl": "https://www.pandora.com/artist/jason-mraz/AR475ldxdZjgxK6"
                },
                {
                    "musicId": "R48070",
                    "pandoraId": "AR:48070",
                    "name": "Donavon Frankenreiter",
                    "art": [
                        {
                            "url": "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/ff/e0/08/33/b2d247d0ab5aaeb451581123/90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/ff/e0/08/33/b2d247d0ab5aaeb451581123/90W_90H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/ff/e0/08/33/b2d247d0ab5aaeb451581123/130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/ff/e0/08/33/b2d247d0ab5aaeb451581123/130W_130H.jpg"
                        },
                        {
                            "url": "https://cont-3.p-cdn.us/images/ff/e0/08/33/b2d247d0ab5aaeb451581123/500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/ff/e0/08/33/b2d247d0ab5aaeb451581123/500W_500H.jpg"
                        },
                        {
                            "url": "https://cont.p-cdn.us/images/ff/e0/08/33/b2d247d0ab5aaeb451581123/640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/ff/e0/08/33/b2d247d0ab5aaeb451581123/640W_640H.jpg"
                        },
                        {
                            "url": "https://cont-1.p-cdn.us/images/ff/e0/08/33/b2d247d0ab5aaeb451581123/1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/ff/e0/08/33/b2d247d0ab5aaeb451581123/1080W_1080H.jpg"
                        }
                    ],
                    "seoToken": "donavon-frankenreiter/ARJnnp9hvbp44cV",
                    "detailUrl": "https://www.pandora.com/artist/donavon-frankenreiter/ARJnnp9hvbp44cV"
                },
                {
                    "musicId": "R160526",
                    "pandoraId": "AR:160526",
                    "name": "Donavon Frankenreiter, Jack Johnson & Zach Gill",
                    "art": [
                        {
                            "url": "https://mediaserver-cont-dc6-1-v4v6.pandora.com/images/ff/e0/08/33/b2d247d0ab5aaeb451581123/90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/ff/e0/08/33/b2d247d0ab5aaeb451581123/90W_90H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-2-v4v6.pandora.com/images/ff/e0/08/33/b2d247d0ab5aaeb451581123/130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/ff/e0/08/33/b2d247d0ab5aaeb451581123/130W_130H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/ff/e0/08/33/b2d247d0ab5aaeb451581123/500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/ff/e0/08/33/b2d247d0ab5aaeb451581123/500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-2-v4v6.pandora.com/images/ff/e0/08/33/b2d247d0ab5aaeb451581123/640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/ff/e0/08/33/b2d247d0ab5aaeb451581123/640W_640H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/ff/e0/08/33/b2d247d0ab5aaeb451581123/1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/ff/e0/08/33/b2d247d0ab5aaeb451581123/1080W_1080H.jpg"
                        }
                    ],
                    "seoToken": "donavon-frankenreiter-jack-johnson-zach-gill/AR35tgk95tK3nPw",
                    "detailUrl": "https://www.pandora.com/artist/donavon-frankenreiter-jack-johnson-zach-gill/AR35tgk95tK3nPw"
                },
                {
                    "musicId": "R25519",
                    "pandoraId": "AR:25519",
                    "name": "John Mayer",
                    "art": [
                        {
                            "url": "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/4a/ee/4b/d4/c5244509a1d8f8d8ece41f56/90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/4a/ee/4b/d4/c5244509a1d8f8d8ece41f56/90W_90H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-1-v4v6.pandora.com/images/4a/ee/4b/d4/c5244509a1d8f8d8ece41f56/130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/4a/ee/4b/d4/c5244509a1d8f8d8ece41f56/130W_130H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/4a/ee/4b/d4/c5244509a1d8f8d8ece41f56/500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/4a/ee/4b/d4/c5244509a1d8f8d8ece41f56/500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-1-v4v6.pandora.com/images/4a/ee/4b/d4/c5244509a1d8f8d8ece41f56/640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/4a/ee/4b/d4/c5244509a1d8f8d8ece41f56/640W_640H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-2-v4v6.pandora.com/images/4a/ee/4b/d4/c5244509a1d8f8d8ece41f56/1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/4a/ee/4b/d4/c5244509a1d8f8d8ece41f56/1080W_1080H.jpg"
                        }
                    ],
                    "seoToken": "john-mayer-artist/AR7gmvdgzgvbf6Z",
                    "detailUrl": "https://www.pandora.com/artist/john-mayer-artist/AR7gmvdgzgvbf6Z"
                },
                {
                    "musicId": "R406242",
                    "pandoraId": "AR:406242",
                    "name": "Chris Stapleton",
                    "art": [
                        {
                            "url": "https://mediaserver-cont-dc6-2-v4v6.pandora.com/images/4f/46/af/f3/c16849bf9c0b40b54ebeebfa/90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/4f/46/af/f3/c16849bf9c0b40b54ebeebfa/90W_90H.jpg"
                        },
                        {
                            "url": "https://cont-5.p-cdn.us/images/4f/46/af/f3/c16849bf9c0b40b54ebeebfa/130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/4f/46/af/f3/c16849bf9c0b40b54ebeebfa/130W_130H.jpg"
                        },
                        {
                            "url": "https://cont.p-cdn.us/images/4f/46/af/f3/c16849bf9c0b40b54ebeebfa/500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/4f/46/af/f3/c16849bf9c0b40b54ebeebfa/500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/4f/46/af/f3/c16849bf9c0b40b54ebeebfa/640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/4f/46/af/f3/c16849bf9c0b40b54ebeebfa/640W_640H.jpg"
                        },
                        {
                            "url": "https://cont-1.p-cdn.us/images/4f/46/af/f3/c16849bf9c0b40b54ebeebfa/1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/4f/46/af/f3/c16849bf9c0b40b54ebeebfa/1080W_1080H.jpg"
                        }
                    ],
                    "seoToken": "chris-stapleton/ARtc3cc53l9j7xX",
                    "detailUrl": "https://www.pandora.com/artist/chris-stapleton/ARtc3cc53l9j7xX"
                },
                {
                    "musicId": "R118423",
                    "pandoraId": "AR:118423",
                    "name": "Amos Lee",
                    "art": [
                        {
                            "url": "https://cont-1.p-cdn.us/images/4c/2c/a9/14/d3d04aad81446a61dcb6abb7/90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/4c/2c/a9/14/d3d04aad81446a61dcb6abb7/90W_90H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-dc6-1-v4v6.pandora.com/images/4c/2c/a9/14/d3d04aad81446a61dcb6abb7/130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/4c/2c/a9/14/d3d04aad81446a61dcb6abb7/130W_130H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/4c/2c/a9/14/d3d04aad81446a61dcb6abb7/500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/4c/2c/a9/14/d3d04aad81446a61dcb6abb7/500W_500H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-1-v4v6.pandora.com/images/4c/2c/a9/14/d3d04aad81446a61dcb6abb7/640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/4c/2c/a9/14/d3d04aad81446a61dcb6abb7/640W_640H.jpg"
                        },
                        {
                            "url": "https://cont-2.p-cdn.us/images/4c/2c/a9/14/d3d04aad81446a61dcb6abb7/1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/4c/2c/a9/14/d3d04aad81446a61dcb6abb7/1080W_1080H.jpg"
                        }
                    ],
                    "seoToken": "amos-lee/AR2Pql26x5lf3Kw",
                    "detailUrl": "https://www.pandora.com/artist/amos-lee/AR2Pql26x5lf3Kw"
                },
                {
                    "musicId": "R366965",
                    "pandoraId": "AR:366965",
                    "name": "The Lumineers",
                    "art": [
                        {
                            "url": "https://cont-3.p-cdn.us/images/cd/0d/59/f1/43f84f928c3b6273fd255cb0/90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/cd/0d/59/f1/43f84f928c3b6273fd255cb0/90W_90H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-1-v4v6.pandora.com/images/cd/0d/59/f1/43f84f928c3b6273fd255cb0/130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/cd/0d/59/f1/43f84f928c3b6273fd255cb0/130W_130H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/cd/0d/59/f1/43f84f928c3b6273fd255cb0/500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/cd/0d/59/f1/43f84f928c3b6273fd255cb0/500W_500H.jpg"
                        },
                        {
                            "url": "https://cont-5.p-cdn.us/images/cd/0d/59/f1/43f84f928c3b6273fd255cb0/640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/cd/0d/59/f1/43f84f928c3b6273fd255cb0/640W_640H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/cd/0d/59/f1/43f84f928c3b6273fd255cb0/1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/cd/0d/59/f1/43f84f928c3b6273fd255cb0/1080W_1080H.jpg"
                        }
                    ],
                    "seoToken": "lumineers/ARlXrPbhV96nnhZ",
                    "detailUrl": "https://www.pandora.com/artist/lumineers/ARlXrPbhV96nnhZ"
                },
                {
                    "musicId": "R174324",
                    "pandoraId": "AR:174324",
                    "name": "Bob Marley & The Wailers",
                    "art": [
                        {
                            "url": "https://cont-4.p-cdn.us/images/80/b1/a1/48/f5f942eeae71b3565e22cd02/90W_90H.jpg",
                            "size": 90,
                            "_originalArtPath": "/80/b1/a1/48/f5f942eeae71b3565e22cd02/90W_90H.jpg"
                        },
                        {
                            "url": "https://cont-3.p-cdn.us/images/80/b1/a1/48/f5f942eeae71b3565e22cd02/130W_130H.jpg",
                            "size": 130,
                            "_originalArtPath": "/80/b1/a1/48/f5f942eeae71b3565e22cd02/130W_130H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-dc6-2-v4v6.pandora.com/images/80/b1/a1/48/f5f942eeae71b3565e22cd02/500W_500H.jpg",
                            "size": 500,
                            "_originalArtPath": "/80/b1/a1/48/f5f942eeae71b3565e22cd02/500W_500H.jpg"
                        },
                        {
                            "url": "https://cont.p-cdn.us/images/80/b1/a1/48/f5f942eeae71b3565e22cd02/640W_640H.jpg",
                            "size": 640,
                            "_originalArtPath": "/80/b1/a1/48/f5f942eeae71b3565e22cd02/640W_640H.jpg"
                        },
                        {
                            "url": "https://mediaserver-cont-sv5-1-v4v6.pandora.com/images/80/b1/a1/48/f5f942eeae71b3565e22cd02/1080W_1080H.jpg",
                            "size": 1080,
                            "_originalArtPath": "/80/b1/a1/48/f5f942eeae71b3565e22cd02/1080W_1080H.jpg"
                        }
                    ],
                    "seoToken": "bob-marley-wailers/AR6b7pxK4kJnz9K",
                    "detailUrl": "https://www.pandora.com/artist/bob-marley-wailers/AR6b7pxK4kJnz9K"
                }
            ],
            "events": [],
            "musicId": "R246591",
            "pandoraId": "AR:246591",
            "name": "Jack Johnson",
            "art": [
                {
                    "url": "https://cont-4.p-cdn.us/images/08/c4/56/bd/c05545d69f247db1f0dc09c7/90W_90H.jpg",
                    "size": 90,
                    "_originalArtPath": "/08/c4/56/bd/c05545d69f247db1f0dc09c7/90W_90H.jpg"
                },
                {
                    "url": "https://mediaserver-cont-usc-mp1-1-v4v6.pandora.com/images/08/c4/56/bd/c05545d69f247db1f0dc09c7/130W_130H.jpg",
                    "size": 130,
                    "_originalArtPath": "/08/c4/56/bd/c05545d69f247db1f0dc09c7/130W_130H.jpg"
                },
                {
                    "url": "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/08/c4/56/bd/c05545d69f247db1f0dc09c7/500W_500H.jpg",
                    "size": 500,
                    "_originalArtPath": "/08/c4/56/bd/c05545d69f247db1f0dc09c7/500W_500H.jpg"
                },
                {
                    "url": "https://mediaserver-cont-usc-mp1-2-v4v6.pandora.com/images/08/c4/56/bd/c05545d69f247db1f0dc09c7/640W_640H.jpg",
                    "size": 640,
                    "_originalArtPath": "/08/c4/56/bd/c05545d69f247db1f0dc09c7/640W_640H.jpg"
                },
                {
                    "url": "https://cont-1.p-cdn.us/images/08/c4/56/bd/c05545d69f247db1f0dc09c7/1080W_1080H.jpg",
                    "size": 1080,
                    "_originalArtPath": "/08/c4/56/bd/c05545d69f247db1f0dc09c7/1080W_1080H.jpg"
                }
            ],
            "seoToken": "jack-johnson/ARxkwzv9ztkvn5g",
            "detailUrl": "https://www.pandora.com/artist/jack-johnson/ARxkwzv9ztkvn5g"
        }
    ]
}

// I'm lazy, so see here:
// https://stackoverflow.com/a/11486026/11726576
function fancyTimeFormat(duration)
{   
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

const colorThief = new ColorThief();
window.colorThief = colorThief;

function ArtistPage(props) {
	const [data, setData] = useState();
	const [triedLoad, setTriedLoad] = useState(false)
	const [doColorThief, setColorThief] = useState(true)
	const [failed, setFailed] = useState(false)

	const [imgRef] = useState(React.createRef()); 
	const [gradCol, setGradCol] = useState()

	const [items, setItems] = useState();

	if (props?.match?.params?.id && !triedLoad) {
		const idSegs = props.match.params.id.toString().split(':');
		switch(idSegs[0].toLowerCase()) {
			case "pandora":
				(async () => {
					let yeah = "AR:";
					if (isNaN(idSegs[1])) { 
						// seo token, not a pandora id (which are all numeric)
						// probably flimsy method but I'll handle the edge cases Later:tm:
						yeah = "";
					}

					/*
					let gamer = await fetch("https://pandora.com/artist/"+yeah+idSegs[1]);
					gamer = await gamer.text(); */
//					gamer = gamer.match(/.*storeData.*/gi)[0];
/*					gamer = gamer.substring(20, gamer.length-1);
					gamer = JSON.parse(gamer); */
					let gamer = datum;

					console.log(gamer);

					const artistDetails = gamer["v1/music/artist"][0];

					let icon = artistDetails.art;
					if (icon) {
						icon = icon[icon.length-1].url;
					} else {
						if (artistDetails.discography) {
							const rDisc = artistDetails.discography.slice(0);
							rDisc.reverse();
							rDisc.some((e) => {
								icon = e.art;
								return e.art !== undefined;
							})
							if (icon) {
								icon = icon[icon.length-1].url;
							} else {
								icon = "/defaultAvatar.png"
							}
						}
					}

					const newD = new Artist({
						name: artistDetails.name,
						icon: icon,
						id: props.match.params.id,
						discography: gamer["v1/music/artist"][0].discography.map((e) => {
							return new Album({
								id: 'pandora:' + e.pandoraId.split(':')[1],
								title: e.albumTitle,
								icon: (e.art && e.art.length>0 ? e.art[e.art.length-1].url : ''),
								sauce: new Extension({
									colors: {
										normal: '#342ac0',
										hover: '#1659a5'
									},
									icon: '/pandora.png'
								}),
							})
						}),
						sauce: new Extension({
							colors: {
								normal: '#342ac0',
								hover: '#1659a5'
							},
							icon: '/pandora.png'
						}),
						topTracks: gamer["v4/catalog/getDetails"][0].artistDetails.topTracks.map((e, i) => {
							e = gamer["v4/catalog/annotateObjects"][0][e];

							return new Song({
								num: i,
								title: e.name,
								album: new Album({
									id: 'pandora:' + e.albumId,
									title: e.albumName.replace(/\(single\)/gi, ''),
									icon: 'https://cont.p-cdn.us/' + e.icon.artUrl,
									sauce: new Extension({
										colors: {
											normal: '#342ac0',
											hover: '#1659a5'
										},
										icon: '/pandora.png'
									})
								}),
								length: fancyTimeFormat(e.duration),
								id: 'pandora:' + e.pandoraId.split(':')[1],
								sauce: new Extension({
									colors: {
										normal: '#342ac0',
										hover: '#1659a5'
									},
									icon: '/pandora.png'
								})
							})
						}),
						topAlbums: gamer["v4/catalog/getDetails"][0].artistDetails.topAlbums.map((e, i) => {
							e = gamer["v4/catalog/annotateObjects"][0][e];

							return new Album({
								id: 'pandora:' + e.pandoraId.split(':')[1],
								title: e.name,
								icon: e.icon.artUrl,
								sauce: new Extension({
									colors: {
										normal: '#342ac0',
										hover: '#1659a5'
									},
									icon: '/pandora.png'
								})
							})
						})
					})

					newD.topTracks = newD.topTracks.map(e => {
						e.artist = newD;
						e.album.artist = newD;
						return e;
					})

					newD.topAlbums = newD.topAlbums.map(e => {
						e.artist = newD;
						return e;
					})
					newD.discography = newD.discography.map(e => {
						e.artist = newD;
						return e;
					})
					setData(newD);
					setItems(newD.topTracks);
					setColorThief(true);
					setFailed(false); 
				})().catch((e) => {
					setFailed(true);
				});
				break;
			default:
				setFailed(true);
				break;
		}
		setTriedLoad(true)
	}


	useEffect(() => {
		if (imgRef.current && !gradCol && data) {
			if (imgRef.current.complete) {
				setGradCol(colorThief.getColor(imgRef.current));
			} else {
				imgRef.current.addEventListener('load', function() {
					setGradCol(colorThief.getColor(imgRef.current));
				});
			}
		}
		if (doColorThief) {
			setColorThief(false);
		}
	}, [data, imgRef, gradCol, doColorThief])

	if (failed) {
		return (<div className={sty.full}>
			<Helmet>
				<title>GenericPlayer</title>
			</Helmet>
			<div className={sty.notFoundBG} />
			<div className={sty.full2}>
				<h1>Sorry, we couldn't find that artist.</h1>
				<div className={sty.notFoundGroup}>
				<Link 
					to={'/search' + (props.failSearch?'/'+props.failSearch:'')}
					className={sty.greeny}
				>search for it</Link><Link
					to='/' 
					className={sty.greeny}
				>go home</Link>
				</div>
			</div>

		</div>)
	}
	if (!data || !items) {
		return (<>
			<div className={sty.head} style={{
				"--gradcol": "transparent"
			}}>
				<img className={sty.img} style={{
					opacity: 0
				}} src="" alt="" crossOrigin="anonymous"/>
				<div className={sty.align}>
					<span className={sty.type}>ARTIST</span>
					<span className={sty.albName}></span>
					<span className={sty.artName}></span>
				</div>
			</div>
			<div className={sty.actionBar} />
		</>)
	}

	let trs = [];
	items.forEach((e, i) => {
		trs.push(<tr className={sty.tr} key={i} onClick={() => {
			props.play(e)
		}}>
			<td className={sty.td}>
				<span className={sty.tdplay} />
				<span className={sty.tdnum}>{e.num}</span>
			</td>
			<td className={sty.td}>
				<div className={sty.tdGroup}>
					<span className={sty.sName}>{e.title}</span>
					<span className={sty.aName}>{e.artist.name}</span>
				</div>
			</td>
			<td className={sty.td}>{e.length}</td>
		</tr>)
	})

	let disc = [];
	data.discography.forEach((e, i) => {
		disc.push(<AlbumElem
			sauce={e}
			key={i}
		/>)
	});
	return (<>
		<Helmet>
			<title>{data.name + " - GenericPlayer"}</title>
		</Helmet>
		<div className={sty.head} style={{
			"--gradcol": (gradCol?`rgb(${gradCol[0]},${gradCol[1]},${gradCol[2]})`:`transparent`)
		}}>
			<img className={sty.img} src={data.icon} alt="" ref={imgRef} crossOrigin="anonymous"/>
			<div className={sty.align}>
				<span className={sty.type}>ARTIST</span>
				<span className={sty.albName}>{data.name}</span>
			</div>
		</div>
		<div className={sty.actionBar} />
		<div className={sty.padder}>
		<Accordion
			header="Top songs"
			openLevel={0.5}
		>
			<table className={sty.songs}>
				<tbody className={sty.tbody}>{trs}</tbody>
				{(data.len > items.length && <tfoot>
					<tr>
						<td className={sty.td} colSpan="3">
							<button className={sty.greeny} onClick={() => {
								data.getMoreItems(items.length).then((e) => {
									setItems(Array.prototype.concat(items, e))
								})
							}}>Show More</button>
						</td>
					</tr>
				</tfoot>)}
			</table>
		</Accordion>
		<Accordion
			header="Discography"
			openLevel={1}
			direction="horizontal"
		>{disc}</Accordion>
		</div>
	</>)
}


const cAPage = connect(
	(state) => ({
		failSearch: state.failSearch
	}),
	(dispatch) => ({
		play: song => {dispatch(setCurrentlyPlaying(song))}
	})
)(ArtistPage)

export default cAPage;