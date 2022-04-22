const AWS = require("aws-sdk");
const config = require("../../config");

exports.incidentTest = (req, res) => {
  res.json({
    message: "success test api",
  });
};

exports.getIncidents = (req, res) => {
  AWS.config.update(config.aws_remote_config);

  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: config.aws_table_name,
  };

  docClient.scan(params, function (err, data) {
    if (err) {
      console.log(err);
      res.json({
        success: false,
        message: err,
      });
    } else {
      const { Items } = data;
      res.json({
        success: true,
        incidents: Items,
      });
    }
  });
};

exports.uploadIncident = (req, res) => {
  const device_id = req.body.device_id;
  const s3url = req.body.s3_url;
  const notification = req.body.notification;

  AWS.config.update(config.aws_remote_config);

  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: config.aws_table_name,
    Item: {
      device_id: device_id,
      s3_url: s3url,
      notification: notification,
    },
  };

  console.log("PARAMS", params);

  docClient.put(params, function (err, data) {
    if (err) {
      console.log(err);
      res.json({
        message: "Failed to inserted item into table",
        success: false,
      });
    } else {
      console.log("SUCCESS");
      res.json({
        message: "Successfully inserted item into table",
        success: true,
      });
    }
  });
};
