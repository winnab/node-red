module.exports = function(RED) {
    "use strict";
    var util = require("util");
    var vm = require("vm");


    function JobNode(n) {
        RED.nodes.createNode(this,n);
        this.task_configuration = n.task_configuration;
        var node = this;
    }
    RED.nodes.registerType("job",JobNode);
}
