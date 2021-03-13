const upload = require("../middleware/upload");
const category=require('../model/category_model');
const paginator =require('../middleware/pagination');

const multipleUpload = async (req, res) => {
  var image_array=[];
  var data={};
  try {
    await upload(req, res);
    if(req.body.catName==undefined || req.body.catName==null || req.body.catName==""){
      return res.status(409).json({"message":"category name is required"});
    }
    await category.find({catName:req.body.catName}, (err, result, next) => {
      if(result.length>0) {
         res.status(409).json({"message":"category name must be unique"});
      }
      else{
        req.files.forEach(image => {
          image_array.push(image.path);
        });
            data=req.body;
            data.catImages=image_array;
        var myData = new category(data);
        myData.save(function(err, user) {
            if (err) {
                res.status(200).json();
            }
            else{
                // console.log(res);
                res.status(200).json(user);
            }
        });
      }
    });
    
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};
const getCategory = async (req, res) => {
  let page = req.query.page || 1;
    let perPage = req.query.perPage || 30;
    category.find({}, (err, result) => {
        if(err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json(paginator(result, page, perPage));  
        } 
    });
};
const getCategorywithID = async (req, res) => {
  let id = req.params.id;
    category.find({_id: id}, (err, result) => {
        if(err) {
            res.status(500).json({"msg": "can not find category with this id"});
        }
         else {
            res.status(200).json(result);  
        } 
    });
};
const delCategory = async (req, res) => {
  const id = req.params.id;
  category.deleteOne({_id: id}, (err) => {
      if(err) {
          res.status(200).json({error: err});
      }
      else{
          res.status(200).json({message: "category deleted"});
      }
  })
};
const updateCategory = async (req, res) => {
  const id = req.params.id;
  var image_array=[];
  var data={};
  try {
    await upload(req, res);
    console.log(req.body.catName);
    if(req.body.catName==""){
      return res.status(409).json({"message":"category name is required"});
    }
    await category.find({catName:req.body.catName}, (err, result, next) => {
      
      if(result.length>0 && result[0]._id!=id) {
         res.status(409).json({"message":"category name must be unique"});
      }
      else{
        if(req.files){
          req.files.forEach(image => { 
            image_array.push(image.path);
          });
        }
        data=req.body;
        if(image_array.length>0)
          data.catImages=image_array;
        
        category.updateOne(
          {_id: id },
          {
            $set:data
          },
          {
            new:true 
          }
        )
          .then(result => {
              res.status(200).json({"message":"category updated"});
          })
      }
    })
    
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
  
  
};
module.exports = {
  multipleUpload: multipleUpload,
  getCategory:getCategory,
  delCategory:delCategory,
  updateCategory:updateCategory,
  getCategorywithID:getCategorywithID
};