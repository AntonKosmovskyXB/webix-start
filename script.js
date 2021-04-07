webix.ui({
    rows:[
        {view:"toolbar",
        css:"webix_dark",
        id: "headerToolbar",
        elements: [
            {view: "label", label: "My app", id: "myAppLabel"},
            {},
            {view: "button", type: "icon", icon: "wxi-user", label: "Profile", id: "profileButton",
            css: "webix_transparent", width: 100}
        ]},
        {cols:[
            {template: "List"},
            {template: "Datatable"},
            {template: "Form"}, 
        ]},
        {template: "The software is provided by <a href='https://webix.com' target='_blank'>https://webix.com</a>. All rights reserved (c)", id: "appFooter", 
        css: "app-footer", height: 30},
    ]
});
