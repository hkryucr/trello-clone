const AWS = require('aws-sdk');
const keys = require('../../../config/keys');

const s3Bucket = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  region: keys.region
});

const fetchUrl = (background) => {
    const urlParams = {
      Bucket: keys.bucketName,
      Key: background.s3Key
    };
    return s3Bucket.getSignedUrl("getObject", urlParams);
}

exports.s3Bucket = s3Bucket;
exports.fetchUrl = fetchUrl;