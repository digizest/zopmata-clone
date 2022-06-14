const catModel = require('../models/category.model')

//send data of category to database 
const sendCatData = (req , res)=>{
    let cat = req.body.catName;
    // let catStatus = req.body.status;
    let catCode = req.body.code;

    let dateCreated = req.body.date;

    let convertedDate = new Date( dateCreated )
    
    let doc = new catModel( { name :  cat  ,
    dateCreated : convertedDate , catCode : catCode
    });//insert , update
    // doc.save((err , data)=>{
    //     if(err)
    //     {
    //         return res.status(400).json({error : err , msg : "failed with adding"})
    //     }else{
    //         return res.status(201).json({result : data , msg : "successfully added"})
    //     }
    // })

    // doc.save().then((data)=>{
    //     console.log("then me");
    //     return res.send(data)
    // }).catch((err)=>{
    //     console.log("catch me");
    //     return res.send(err)})

    
    // doc.save().then((data)=>{
    //     console.log("then me");
    //     return res.send(data)
    // } ,
    // (err)=>{
    //     console.log("catch me");
    //     return res.send(err)}  )

    let resp = doc.save()

    resp.then((data)=>{
        console.log("then inside");
        return res.json({result : data , msg : "category added"})
    }).catch((err)=>{
        console.log("catch inside");
        if(err.code == 11000)
        {
            return res.send({ msg : "already exist category" , error : err})
            
        }
        return res.send({ msg : "something went wrong" , error : err})})

}

//get scategory list 
const getAll =  (req , res )=>{
    let page = req.query.pageNo - 1
    let limit = req.query.limit
    let skip= page * limit;
    catModel.find().limit( limit ).skip( skip ).then((data)=>{
        return res.status(200).json({total : data.length  , msg : "successfully got category" , result : data })
    })
    .catch(  (err)=>{          return res.status(400).json({error : err , msg : "failed to get category"})}
    )
}

//upate category name by id 
const updateCatName = (req , res , next )=>{
    let catId = req.params.id
    let catName = req.body.name
    let dataToUpdate = {  name : catName }
    //1 where , 2 set : what to update
        catModel.findOneAndUpdate(  { _id : catId } , dataToUpdate , (err , data)=>{
            if(err)
        {
            return res.status(400).json({error : err , msg : "Your request could not be processed. Please try again."})
        }else{
                return res.status(200).json({ msg : "Category has been updated successfully!"})
            // next()
           
        }
    })
} 

//update category status by id 
const updateCatStatus=  (req , res , next )=>{
    let catId = req.params.id
    let status = req.body.status
    let dataToUpdate = {  activated : status }
    //1 where , 2 set : what to update
        catModel.findOneAndUpdate(  { _id : catId } , dataToUpdate , (err , data)=>{
            if(err)
        {
            return res.status(400).json({error : err , msg : "Your request could not be processed. Please try again."})
        }else{
                return res.status(200).json({ msg : "Category status been updated successfully! as " + status })
            // next()
           
        }
    })
}

//delete category by id 
const deleteCatData =  (req , res )=>{
    let catId = req.params.id
        catModel.deleteOne({ _id: catId }  , (err , data)=>{
            if(err)
        {
            return res.status(400).json({error : err , msg : "failed to get category"})
        }else{
            // if(data)
            // {
                return res.status(200).json({result : data , msg : "successfully deleted category"})

            // }else{
            //     return res.status(404).json({ msg : "no category found assosiated woth the id"})
            // }
        }
    })
}

//get one category info by id 
const getCatInfo =   (req , res )=>{
    let id = req.params.id
    catModel.findById(id).then((data)=>{
        return res.status(200).json({total : data.length  , msg : "successfully got category" , result : data })
    })
    .catch(  (err)=>{          return res.status(400).json({error : err , msg : "failed to get category"})}
    )
}

//export all controller to other file 
module.exports = {sendCatData, getAll, getCatInfo, updateCatName, updateCatStatus, deleteCatData} 
