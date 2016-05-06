module.exports = function(RED) {
    "use strict";

    function S3Node(n) {
        RED.nodes.createNode(this,n);
        this.bucket = n.bucket;
        this.access_key_id = n.access_key_id;
        this.endpoint = n.endpoint;
        this.regexp = n.regexp;
        this.region_name = n.region_name;
        this.secret_access_key = n.secret_access_key;

        var node = this;

        this.on("input",function(msg) {});
    }

    RED.nodes.registerType("s3",S3Node);

    S3Node.prototype.close = function() {}

    RED.httpAdmin.post("/s3/:id", RED.auth.needsPermission("s3.write"), function(req,res) {
        var node = RED.nodes.getNode(req.params.id);
        if (node != null) {
            try {
                node.receive();
                res.sendStatus(200);
            } catch(err) {
                res.sendStatus(500);
                node.error(RED._("s3.failed",{error:err.toString()}));
            }
        } else {
            res.sendStatus(404);
        }
    });
}
