// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

// Create S3 service object
var ep = new AWS.Endpoint("http://<hostname>:<port>/<bucket_name>", "http");
s3 = new AWS.S3({apiVersion: '2006-03-01',endpoint:ep});


// ------- UPLOADING FILES TO S3  -------
var uploadParams = {Bucket: "<bucket_name>", Key: '', Body: ''};
var file = "test.txt";
var fs = require('fs');
var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
  console.log('File Error', err);
});
uploadParams.Body = fileStream;
var path = require('path');
uploadParams.Key = path.basename(file);


s3.upload (uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
  }
});
//------------------------------------------
// ------- LISTING OBJECTS IN S3  -------
var params = {
    Bucket: "<bucket_name>", 
   };

s3.listObjectsV2(params, function (err, data) {
    if(err)throw err;
    console.log(data);
  })
//------------------------------------------
// ------- OPENING OBJECTS IN S3  -------
s3.getObject( {Bucket: "<bucket_name>", Key: 'test.txt'}, function(err, data){
    console.log(data); 
    console.log(err); 
})

var params_openFiles = {
  Bucket: "<bucket_name>", 
  Key: "test.txt"
}
//-----------------------------------------
//------- CREATING FOLDERS IN S3  -------
var params_folder = { Bucket: '<bucket_name>', Key: 'folderInBucket/', ACL: 'public-read', Body:'body does not matter' };

s3.upload(params_folder, function (err, data) {
if (err) {
    console.log("Error creating the folder: ", err);
    } else {
    console.log("Successfully created a folder on S3");
    }
});
//-----------------------------------------
