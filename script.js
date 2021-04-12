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
	      
const menuList = { 
    view:"list",
    id:"menuList",
    minWidth: 150,
    width: 220,
    scroll: false,
    select: true,
    css:"app-list",
    data:["Dashboard", "Users", "Products", "Admin"]
};

const resizer = {
    view:"resizer"
};
        
const datatable = {
    view:"datatable",
    id:"filmsDatatable",
    hover: "row-hover",
    select: true,
    columns:[
        {id:"rank", header:"", css:"webix_ss_header", maxWidth: 40, sort: "int"},
        {id:"title", header:["Film title", {content:"textFilter"} ], fillspace: true, sort: "text"},
        {id:"year", header:["Realised", {content:"textFilter"} ], sort: "int"},
        {id:"votes", header:["Votes", {content:"textFilter"} ], sort: "int"},
        {template:"<span class='webix_icon wxi-trash'></span>"},
    ],
    scroll:"y",
    url: "data.js",
    onClick:{
        "wxi-trash": function(event, id){
            webix.confirm({
                text: "Do you want to remove this film?"
            }).then(() => {
                    this.remove(id);
                    $$("filmsForm").clear();
                })
        }
    } 
};

const form =  {
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
                value:"Save", 
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
};

const productsTree = {
    view:"treetable",
    select:true,
    fillspace: true,
    url:"products.js",
    columns: [
        {id: "id", header:""},
        {id: "title", header:"Title", template:"{common.treetable()} #title#", fillspace:true},
        {id: "price", header: "Price"}
    ],
    on: {
        onAfterLoad: function() {
            this.openAll();
        }
    }
}

const usersList = {
    rows:[
        {
            cols:[
                {
                    view:"toolbar",
                    rows:[
                      {view:"text", id:"usersListFilterField"}
                    ]
                },
                {
                    view:"button", 
                    label:"Sort asc", 
                    css:"webix_primary", 
                    width: 150,
                    click: function() {
                        $$("usersList").sort("#name#", "asc");
                    }
            },
                {
                    view:"button", 
                    label:"Sort desc", 
                    css:"webix_primary", 
                    width: 150,
                    click: function() {
                        $$("usersList").sort("#name#", "desc");
                    }
                }
            ]
        },
        {
            view:"list",
            id:"usersList",
            select:true,
            maxHeight: 250,
            css:"users-list",
            url:"users.js",
            template:"#name# from #country# <span class='webix_icon wxi-close'></span>",
            onClick:{
                "wxi-close": function(event, id){
                    webix.confirm({
                        text: "Do you want to remove this user?"
                    }).then(() => {
                        this.remove(id);
                    })
                }
            }
        }
    ]
}

const usersChart = {
    view:"chart",
    type:"bar",
    value:"#age#",
    url: "users.js",
    xAxis:{
        title: "Age",
        template: "#age#",
    },
};
  
const footer = {
    template:"The software is provided by <a href='https://webix.com' target='_blank'>https://webix.com</a>. All rights reserved (c)", 
    css:"app-footer", 
    height: 30
};

const multiview = {
    view: "multiview",
    cells: [
        {id: "Dashboard", cols: [datatable, form]},
        {id: "Users", rows:[usersList, usersChart]},
        {id: "Products", cols:[productsTree]},
        {id: "Admin", template:"Admin"}
    ]
}

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
            filmsForm.clear();  
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
        {
            cols:[
                menuList,
                resizer,
                multiview
            ],
        },
        footer,
    ]
}); 

$$("filmsDatatable").attachEvent("onAfterSelect", function(id){
    const choosedFilm = this.getItem(id);
    $$("filmsForm").setValues(choosedFilm);
});

$$("menuList").attachEvent("onAfterSelect", function(id){
    if ($$(id)) {
        $$(id).show();
    }
});

$$("usersListFilterField").attachEvent("onTimedKeyPress", function() {
    const filterFieldValue = this.getValue();
    $$("usersList").filter("#name#", filterFieldValue);
});
