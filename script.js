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
            	popup: "profilePopup",
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
        {view:"resizer"},
        {
            view:"datatable",
            id:"filmsDatatable",
            autoConfig: true,
            scroll:"y",
            data: small_film_set
        },
        {
            view:"form",
            id:"filmsForm",
            width: 350,
            elements: [
                {template:"edit films", type:"section"},
                {view:"text", label:"Title", name:"title", invalidMessage:"Field must be filled in"},
                {view:"text", label:"Year", name:"year", invalidMessage:"Enter year between 1970 and 2021"},
                {view:"text", label:"Rating", name:"rating", invalidMessage:"Field must be filled in and not equal 0"},
                {view:"text", label:"Votes", name:"votes", invalidMessage:"Enter number less than 100000"},
                {margin: 10, cols: [
                    {
                        view:"button", 
                        value:"Add new", 
                        css:"webix_primary", 
                        id:"addButton",
                        click: addItem
                    },
                    {
                        view:"button", 
                        value:"Clear", 
                        id:"clearButton",
                        click: clearForm
                    }
                ]},
                {}
            ],
            rules: {
                title: webix.rules.isNotEmpty,
                year: function(value) {
                    return (value >= 1970 && value <= 2021);
                },
                rating: function(value) {
                    return value > 0 && webix.rules.isNotEmpty;
                },
                votes: function(value) {
                    return value < 100000;
                }
            },
        },
    ],
};
	    
const footer = {
    template:"The software is provided by <a href='https://webix.com' target='_blank'>https://webix.com</a>. All rights reserved (c)", 
    css:"app-footer", 
    height: 30
};

function addItem() {
    const filmsForm = $$("filmsForm");
    const filmsDatatable = $$("filmsDatatable");
    const formData = filmsForm.getValues();
    const validationResult = filmsForm.validate();

    if (validationResult) {
        filmsDatatable.add(formData);
        webix.message("Form Successfully validated");  
    }
}

function clearForm() {
    const filmsForm = $$("filmsForm");
    webix.confirm({
        text: "Do you want to clear this form?"
    }).then(
        function(){
            filmsForm.clear();
            filmsForm.clearValidation();  
        }
    )
}

webix.ui({
    view:"popup",
    id: "profilePopup",
    width: 300, 
    height: 70,
    select: true,
    body: {
        view: "list",
        scroll: false,
        data: [
            {value: "Settings"},
            {value: "Log out"}
        ]
    } 
});

 webix.ui({
    rows: [
        header,
        main,
        footer,
    ]
 });
