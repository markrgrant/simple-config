

function configure(data, done) {
  
    var data = decorateData(data);

    var controller = root_controller(data, document.body, done);

    document.onkeydown = function(evt) {
        console.log("key pressed: " + evt.keyCode);
        switch(evt.keyCode) {
            case 32: controller.select(); break;
            case 38: controller.up(); break;
            case 40: controller.down(); break;
        } 
    }

    function decorateData(config) {
        config.map(function(conf) {conf["currentOptionIndex"] = 0});
        return config;
    }

    function config_controller(data, parent) {


        var model = config_model(data);

        var view = config_view(parent);

        view.update(data);

        return {

            up: function() {
                model.previous();
                view.update(model.get());  
            },

            down: function() {
                model.next();
                view.update(model.get());  
            },

            select: function() {
                model.select();
            }
        }
    }

    function root_controller(configs, parent_node, done) {

        var el, model, child_el, current_controller;

        if (configs.length === 0) {

            done({});

        } else {

            el = document.createElement('div');

            model = root_model(configs);

            child_el = document.createElement('div');

            parent_node.appendChild(el);

            el.appendChild(child_el);

            current_controller = config_controller(model.getNextCategory(), child_el);

        }

        function createResult(categories) {
            var result = {};
            for(var i = 0; i < categories.length; i++) {
                result[categories[i].name] = categories[i].options[categories[i].selectedOptionIndex];
            }  
            return result;
        }

        return {

            up: function() {
                current_controller.up();
            },

            down: function() {
                current_controller.down();
            },

            select: function() {
                current_controller.select();
                el.removeChild(child_el);
                if(model.hasNextCategory()) {
                    child_el = document.createElement('div');
                    el.appendChild(child_el);
                    current_controller = config_controller(model.getNextCategory(), child_el);
                } else {
                    parent_node.removeChild(el);
                    done(createResult(configs));
                }
            }
        }

    } 

    function config_model(data) {
      
        datacurrentOptionIndex = 0;
     
        return {

            next: function() {
                data.currentOptionIndex = (data.currentOptionIndex + 1) % data.options.length;  
            }, 

            previous: function() {
                data.currentOptionIndex = (data.currentOptionIndex + data.options.length - 1) % data.options.length;  
            },

            select: function() {
                data.selectedOptionIndex = data.currentOptionIndex;
            },

            get: function() {
                return data; 
            }

        }
    }

    // data = {
    //            application:<string>,
    //            categories:[
    //                {
    //                    name:<string>,
    //                    description:<string>,
    //                    options:[<primitive type>, <primitive type>, ...],
    //                    selectedOptionIndex:, 
    //                    currentOptionIndex:
    //                },
    //                ...
    //            ]
    //        } 
    function root_model(data) {

        var current = -1; 
     
        return {

            getNextCategory: function() {
                current++;
                var result = data[current]; 
                return result;
            },

            hasNextCategory: function() {
                return (current < data.length - 1);
            }

        }
    }

    function config_view(parent_el) {

        var container_node = document.createElement('div');
        container_node.classList.add('category');
        parent_el.appendChild(container_node);
        

        var title_node = document.createElement('div');
        title_node.classList.add('title');
        container_node.appendChild(title_node); 
        
        var options_nodes = [];

        function updateTitleNode(title) {
            title_node.innerHTML = title;
        }

        function updateOptionsNodes(data) {
            // clear options
            options_nodes.map(function(opt_node) {
                container_node.removeChild(opt_node);
            }); 
            // add updated options
            data.options.map(function(opt, i) {
                options_nodes[i] = document.createElement('div');
                options_nodes[i].classList.add('option');
                if(i === data.currentOptionIndex) {
                    options_nodes[i].classList.add("selected");
                } 
                options_nodes[i].innerHTML = opt;
                container_node.appendChild(options_nodes[i]);
            });
        }

        return {
            // data object must be of the form
            // {name:<string>,
            //  description: , 
            //  options: [<string>, <string>, ...],
            // }
            update: function(data) {

                updateTitleNode(data.description);

                updateOptionsNodes(data);

            }
        }
    }
}
