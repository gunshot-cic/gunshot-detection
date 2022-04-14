const AWS = require("aws-sdk");
const config = require("../../config");

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

  docClient.put(params, function (err, data) {
    if (err) {
      console.log(err);
      res.json({
        success: false,
      });
    } else {
      res.json({
        success: true,
      });
    }
  });
};
