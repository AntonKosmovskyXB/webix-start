const countriesList = [
	{ "id":1, "value":"Germany" },
	{ "id":2, "value":"USA" },
	{ "id":3, "value":"Canada" },
	{ "id":4, "value":"France" },
	{ "id":5, "value":"China" },
	{ "id":6, "value":"Russia" },
	{ "id":7, "value":"Italy" },
	{ "id":8, "value":"Spain" }
]

const categoriesCollection = new webix.DataCollection({
    url: "categories.js"
});

const usersCollection = new webix.DataCollection({
    url:"users.js"
}); 

webix.protoUI({
    name:"editlist"
}, webix.EditAbility, webix.ui.list);

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
    rows:[
        { 
            view:"segmented", id:"filmsYearFilter",
            options:[
                {id:1, value:"All"},
                {id:2, value:"Old"},
                {id:3, value:"Modern"},
                {id:4, value:"New"},
            ], 
            on:{
                onChange:function(){
                    $$("filmsDatatable").filterByAll();
                }
            }  
        }, 
        {
            view:"datatable",
            id:"filmsDatatable",
            hover: "row-hover",
            select: true,
            scheme:{
                $init:function(obj) {
                    obj.category = getRandomInt(1, 4);
                    const fixedVotesValue = obj.votes.replace(",", ".");
                    const fixedRatingValue = obj.rating.replace(",", ".");
                    obj.votes = fixedVotesValue;
                    obj.rating = fixedRatingValue;
                },
            },
            columns:[
                {id:"rank", header:"", css:"webix_ss_header", maxWidth: 40, sort: "int"},
                {id:"title", header:["Film title", {content:"textFilter"} ], fillspace: true, sort: "text"},
                {id:"category", header:["Category", {content:"selectFilter"} ], sort: "int", collection:categoriesCollection},
                {id:"rating", header:["Rating", {content:"textFilter"} ], sort: "int"},
                {id:"votes", header:["Votes", {content:"textFilter"} ], sort: "int"},
                {id:"year", header:"Year", sort: "int"},
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
        }
    ]
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
        {view:"richselect", label:"Category", name:"category", options:categoriesCollection},
        {margin: 10, cols: [
            {
                view:"button", 
                value:"Save", 
                css:"webix_primary", 
                click: saveForm
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

const adminView = {
    rows:[
        {
            view:"form",
            id:"categoriesForm",
            cols:[
                {
                    view:"text", 
                    name:"value", 
                    id:"categoryValue", 
                    validate:webix.rules.isNotEmpty, 
                },
                {view:"button", value:"Save", css:"webix_primary", click: saveCategory},
                {view:"button", value:"Delete", css:"webix_primary", click: deleteCategory},
                {view:"button", value:"Clear form", css:"webix_primary", click: clearCategoriesForm},
            ]
        },
        {
            view:"datatable",
            id: "adminDatatable",
            select: true,
            data: categoriesCollection,
            columns:[
                {header:"Category", id:"value", fillspace:true}
            ],
        }
    ]
}

const productsTree = {
    view:"treetable",
    select:true,
    fillspace: true,
    editable: true,
    url:"products.js",
    columns: [
        {id: "id", header:""},
        {id: "title", header:"Title", template:"{common.treetable()} #title#", fillspace:true, editor: "text"},
        {id: "price", header: "Price", editor:"text"}
    ],
    on: {
        onAfterLoad: function() {
            this.openAll();
        },
        onValidationError: function() {
            webix.message("Please, fill correct data");
        }
    },
    rules:{
        title: webix.rules.isNotEmpty,
        price: webix.rules.isNumber,
    },
    
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
                },
                {
                    view:"button", 
                    id: "addUsersButton",
                    label:"Add new", 
                    css:"webix_primary", 
                    width: 150,
                    click: addUser
                },
            ]
        },
        {
            view:"editlist",
            id:"usersList",
            editable:true,
			editor:"text",
			editValue:"name",
            select:true,
            maxHeight: 250,
            css:"users-list",
            data: usersCollection,
            template:"#name#, #age#, from #country# <span class='webix_icon wxi-close'></span>",
            scheme:{
                $init:function(obj) {
                    if (obj.age < 26) {
                        obj.$css = "highlight";
                    } 
                },
            },
            onClick:{
                "wxi-close": function(event, id){
                    webix.confirm({
                        text: "Do you want to remove this user?"
                    }).then(() => {
                        this.remove(id);
                    })
                }
            },
            rules:{
                name: webix.rules.isNotEmpty 
            },
            on:{
                onValidationError: function() {
                    webix.message("Name should not be empty");
                },
            },
        }
    ]
}

const usersChart = {
    view:"chart",
    id: "chart",
    type:"bar",
    value: "#name#",
    xAxis:{
        title: "Country",
        template: "#country#",
    },
    yAxis:{
        start: 0,
        end: 10,
        step: 2
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
        {id: "Admin", cols:[adminView]}
    ]
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
    ],
    
}); 



$$("categoriesForm").bind($$("adminDatatable"));
$$("filmsForm").bind($$("filmsDatatable"));

$$("adminDatatable").sync(categoriesCollection);
$$("usersList").sync(usersCollection);
$$("chart").sync(usersCollection);

$$("chart").sync($$("usersList"), function() {
    $$("chart").group({
        by: "country",
        map:{
            name:[ "name", "count" ]
        }
    });
});

function saveForm() {
    const validationResult = $$("filmsForm").validate();
    
    if (!validationResult) {
        return false;
    }
    
    $$("filmsForm").save();
    $$("filmsForm").clear();
    $$("filmsDatatable").unselectAll();
};

function clearForm() {
    const filmsForm = $$("filmsForm");
    webix.confirm({
        text: "Do you want to clear this form?"
    }).then(
        function() {
            filmsForm.clear();
            filmsForm.clearValidation();
            $$("filmsDatatable").unselectAll();  
        }
    )
};

function clearCategoriesForm() {
    const categoriesForm = $$("categoriesForm");
    webix.confirm({
        text: "Do you want to clear this form?"
    }).then(
        function() {
            categoriesForm.clear();
            categoriesForm.clearValidation();
            $$("adminDatatable").unselectAll();  
        }
    )
}

function addUser() {
    const countryId = getRandomInt(1,8);
    $$("usersList").add({
        name: $$("usersListFilterField").getValue(),
        age: getRandomInt(18, 70),
        country: countriesList[countryId].value
    })
};

function saveCategory() {
    const validationResult = $$("categoriesForm").validate();
    const currentResult = $$("categoriesForm").getValues();
    const selectedItem = $$("adminDatatable").getSelectedId();

    if (!validationResult) {
        webix.message("Please, enter the category");
        return false;
    }

    if (selectedItem) {
        categoriesCollection.updateItem(selectedItem, currentResult);
    } else {
        categoriesCollection.add(currentResult);
    }

    $$("categoriesForm").clear();
    $$("adminDatatable").unselectAll();
}

function deleteCategory() {
    const selectedItem = $$("adminDatatable").getSelectedId();
    if (!selectedItem) {
        return false;
    }

    webix.confirm({
        text: "Do you want to remove this category?"
    }).then(
        function() {
            categoriesCollection.remove(selectedItem)
            $$("adminDatatable").unselectAll();  
        }
    )
}

$$("filmsDatatable").registerFilter(
    $$("filmsYearFilter"),
    {columnId:"year", compare:function(value, filter, item) {
        if (filter == 1) return +value;
        if (filter == 2) return +value < 2000;
        if (filter == 3) return +value >= 2000;
        if (filter == 4) return +value == 2011; 
    }},
    {
        getValue:function(node){
            return node.getValue();
          },
        setValue:function(node, value){
            node.setValue(value);
        }
    }
)

$$("filmsDatatable").attachEvent("onAfterSelect", function(id) {
    const choosedFilm = this.getItem(id);
    $$("filmsForm").setValues(choosedFilm);
});

$$("menuList").attachEvent("onAfterSelect", function(id) {
    $$(id).show();
});

$$("usersListFilterField").attachEvent("onTimedKeyPress", function() {
    const filterFieldValue = this.getValue();
    $$("usersList").filter("#name#", filterFieldValue);
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}
