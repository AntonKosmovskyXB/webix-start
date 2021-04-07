webix.ui({
    rows:[
        {view:"toolbar",
        css:"webix_dark",
        id: "headerToolbar",
        elements: [
            {view: "label", label: "My app", id: "myAppLabel"},
            {},
            {view: "button", type: "icon", icon: "wxi-user", id: "profileButton", label: "Profile", 
            css: "webix_transparent", width: 100}
        ]},
        {cols:[
            {template: "List"},
            {template: "Datatable"},
            {template: "Form"}, 
        ]},
        {template: "footer"},
    ]
});
