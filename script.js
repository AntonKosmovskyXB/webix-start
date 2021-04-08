const small_film_set = [
	{ title:"The Shawshank Redemption", year:1994, votes:678790, rating:9.2, rank:1, category:"Thriller"},
	{ title:"The Godfather", year:1972, votes:511495, rating:9.2, rank:2, category:"Crime"},
	{ title:"The Godfather: Part II", year:1974, votes:319352, rating:9.0, rank:3, category:"Crime"},
	{ title:"The Good, the Bad and the Ugly", year:1966, votes:213030, rating:8.9, rank:4, category:"Western"},
	{ title:"Pulp fiction", year:1994, votes:533848, rating:8.9, rank:5, category:"Crime"},
	{ title:"12 Angry Men", year:1957, votes:164558, rating:8.9, rank:6, category:"Western"}
];

const header = {
    view:"toolbar",
    css:"webix_dark",
    paddingX: 10,
    elements: [
      {view:"label", label:"My App"},
      {},
      {
	view:"button", 
	type:"icon", 
	icon:"wxi-user", 
	label:"Profile", 
        css: "webix_transparent", 
	width: 100
      }
   ]
};
	      
const main = {
    cols:[
        {
            view:"list",
            minWidth: 150,
            width: 220,
            scroll: false,
            select: true,
            css:"app-list",
            data:[
              {value:"Dashboard"},
              {value:"Users"},
              {value:"Products"},
              {value:"Locations"},
            ]
          },
          { view:"resizer"},
          {
            view:"datatable",
            autoConfig: true,
            scroll:"y",
            data: small_film_set
          },
          {
            view:"form",
            width: 300,
            elements: [
              {template:"edit films", type:"section"},
              {view:"text", label:"Title"},
              {view:"text", label:"Year"},
              {view:"text", label:"Rating"},
              {view:"text", label:"Votes"},
              {margin: 10, cols: [
                {view:"button", value:"Add new", css:"webix_primary"},
                {view:"button", value:"Clear"}
              ]},
              {}
          ]
       },
    ],
};
	    
const footer = {
    template:"The software is provided by <a href='https://webix.com' target='_blank'>https://webix.com</a>. All rights reserved (c)", 
    css:"app-footer", 
    height: 30
};

 webix.ui({
     rows: [
         header,
         main,
         footer
     ]
 });
