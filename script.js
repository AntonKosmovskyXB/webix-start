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
            hover: "row-hover",
            select: true,
            columns:[
                {id:"rank", header:"", css:"webix_ss_header", maxWidth: 40, sort: "int"},
                {id:"title", header:["Film title", {content:"textFilter"} ], headermenu: false, fillspace: true, sort: "text"},
                {id:"year", header:["Realised", {content:"textFilter"} ], sort: "int"},
                {id:"votes", header:["Votes", {content:"textFilter"} ], sort: "int"},
                {template:"<span class='webix_icon wxi-trash'></span>"},
            ],
            scroll:"y",
            url: "data.js",
            onClick:{
                "wxi-trash": function(event, id){
                    this.remove(id);
                }
              } 
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
                        click: addItem
                    },
                    {
                        view:"button", 
                        value:"Clear", 
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
        if (formData.id) {
            filmsDatatable.updateItem(formData.id, formData)
        } else {
            filmsDatatable.add(formData);
            webix.message("Form Successfully validated");  
        }   
    }
}

function clearForm() {
    const filmsForm = $$("filmsForm");
    webix.confirm({
        text: "Do you want to clear this form?"
    }).then(
        function() {
            filmsForm.clear();
            filmsForm.clearValidation();  
        }
    )
}

webix.ui({
    view:"popup",
    id: "profilePopup",
    width: 300,
    body: {
        view: "list",
        autoheight: true,
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

$$("filmsDatatable").attachEvent("onAfterSelect", function(id){
    const choosedFilm = $$("filmsDatatable").getItem(id);
    $$("filmsForm").setValues(choosedFilm);
});
