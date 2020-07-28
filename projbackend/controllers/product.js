const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req,res,next,id) =>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err || !product){
            return res.status(400).json({
                error: `No product found for id ${productId}`
            })
        }
        req.product = product;
        next();
    })
};

exports.createProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error : "Problem with image"
            })
        }

        //destructure the fields
        const {price,name,description,category,stock} = fields;

        if(!name || !description || !price || !category || !stock
        ){
            return res.status(400).json({
                error: "Please include all fields"
            });
        }

        //TODO restrictions on field
        let product = new Product(fields);

        ///handle file here
        if(file.photo){    
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "File size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        //save to DB
        product.save((err,product)=>{
            if(err){
                res.status(400).json({
                    error: "Saving product in DB failed"
                })
            }
            res.json(product);
        })
    })
};

exports.getProduct = (req,res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};

exports.photo = (req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

exports.removeProduct = (req,res) => {
    let product = req.product;
    product.remove((err,product)=>{
        if(err){
            return res.status(400).json({
                error : "Unable to delete product"
            })
        }
        return res.json(product);
    })
};


exports.updateProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error : "Problem with image"
            })
        }

        //updatation of product
        let product = req.product;
        product = _.extend(product,fields)

        ///handle file here
        if(file.photo){    
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "File size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        //save to DB
        product.save((err,product)=>{
            if(err){
                res.status(400).json({
                    error: "Updation of product in DB failed"
                })
            }
            res.json(product);
        })
    })
};

exports.getAllProducts = (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"; 
    //LISTING PRODUCTS
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err || !products){
            return res.status(400).json({
                error : "NO PRODUCTS FOUND"
            })
        }
        res.json(products)
    })
};

exports.getAllUniqueCategories = (req,res)=>{
    Product.distinct("category",{},(err,categories)=>{
        if(err){
            return res.status(400).json({
                error : "No Categories Found"
            })
        }
        res.json(categories);
    })
}



exports.updateStock = (req,res,next) => {
    let myOperations = req.body.order.products.map(item => {
        return {
            updateOne: {
                filter: {_id : item._id},
                update: {$inc : {stock: -item.count ,sold: +item.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {} ,(err,products)=>{
        if(err){
            return res.status(400).json({
                error: "Bulk Operations failed"
            })
        }
        next();
    })
};


