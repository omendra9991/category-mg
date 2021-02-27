const upload = require("../middleware/upload");
const category=require('../model/category_model');
const paginator =require('../middleware/pagination');

const multipleUpload = async (req, res) => {
  var image_array=[];
  var data={};
  try {
    await upload(req, res);
    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }
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
            res.status(200).json({error: err});
        } else {
            res.status(200).json(paginator(result, page, perPage));  
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
    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }
    req.files.forEach(image => { 
      image_array.push(image.path);
    });
        data=req.body;
        data.catImages=image_array;
    var myData = new category(data);
    category.findOneAndUpdate(
      { _id: id },
      {
      $set: {
          catName: myData.catName,
          pageTitle:myData.pageTitle,
          categoryTitle:myData.categoryTitle,
          metaDescription:myData.metaDescription,
          catImages:myData.catImages,
          shortDescription:myData.shortDescription,
          longDescription:myData.longDescription,
          available:myData.available,
          seoURL:myData.seoURL,
          startDate:myData.startDate,
          endDate:myData.endDate
      }
      },
      {
      upsert: true
      }
  )
      .then(result => {
          res.status(200).json(result);
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
  updateCategory:updateCategory
};