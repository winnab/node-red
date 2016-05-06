module.exports = function(RED) {
    "use strict";

    function GitNode(n) {
        RED.nodes.createNode(this,n);
        this.branch = n.branch;
        this.uri = n.uri;
        var node = this;

        this.on("input",function(msg) {});
    }

    RED.nodes.registerType("git",GitNode);

    GitNode.prototype.close = function() {}

    RED.httpAdmin.post("/git/:id", RED.auth.needsPermission("git.write"), function(req,res) {
        var node = RED.nodes.getNode(req.params.id);
        if (node != null) {
            try {
                node.receive();
                res.sendStatus(200);
            } catch(err) {
                res.sendStatus(500);
                node.error(RED._("git.failed",{error:err.toString()}));
            }
        } else {
            res.sendStatus(404);
        }
    });
}
