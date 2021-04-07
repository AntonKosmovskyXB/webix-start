var small_film_set = [
	{ id:1, title:"The Shawshank Redemption", year:1994, votes:678790, rating:9.2, rank:1, category:"Thriller"},
	{ id:2, title:"The Godfather", year:1972, votes:511495, rating:9.2, rank:2, category:"Crime"},
	{ id:3, title:"The Godfather: Part II", year:1974, votes:319352, rating:9.0, rank:3, category:"Crime"},
	{ id:4, title:"The Good, the Bad and the Ugly", year:1966, votes:213030, rating:8.9, rank:4, category:"Western"},
	{ id:5, title:"Pulp fiction", year:1994, votes:533848, rating:8.9, rank:5, category:"Crime"},
	{ id:6, title:"12 Angry Men", year:1957, votes:164558, rating:8.9, rank:6, category:"Western"}
];

webix.ui({
  rows:[
    {
      view:"toolbar",
      id: "headerToolbar",
      css:"webix_dark",
      paddingX: 10,
      elements: [
        {view: "label", label:"My App", id:"myAppLabel"},
        {},
        {view:"button", type:"icon", icon:"wxi-user", label:"Profile", id:"profileButton", 
        css: "webix_transparent", width: 100}
      ]},
      {
        cols:[
          {
            view: "list",
            id: "appList",
            minWidth: 150,
            width: 220,
            scroll: false,
            select: true,
            css: "app-list",
            data:[
              {value:"Dashboard", id:"appDashboard"},
              {value:"Users", id:"appUsers"},
              {value:"Products", id:"appProducts"},
              {value:"Locations", id:"appLocations"},
            ]
          },
          { view:"resizer"},
          {
            view:"datatable",
            id:"filmsList",
            autoConfig: true,
            scroll:"y",
            data: small_film_set
          },
          {
            view: "form",
            id: "filmsSearchForm",
            width: 300,
            elements: [
              {template:"EDIT FILMS", type:"section"},
              {view:"text", label:"Title", id:"filmTitle"},
              {view:"text", label:"Year", id:"filmYear"},
              {view:"text", label:"Rating", id:"filmRating"},
              {view:"text", label:"Votes", id:"filmVotes"},
              {margin: 10, cols: [
                {view:"button", value:"Add new", css:"webix_primary", id:"addFilm"},
                {view:"button", value:"Clear", id:"clearTable"}
              ]},
              {}
            ]
          },
      ],
    },
    {
      template:"The software is provided by <a href='https://webix.com' target='_blank'>https://webix.com</a>. All rights reserved (c)", 
      id:"appFooter", 
      css:"app-footer", 
      height: 30
    },
  ]
});