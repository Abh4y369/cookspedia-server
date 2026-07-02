const feedbacks=require('../Models/feedbackModel')

exports.addFeedback=async(req,res)=>{
    try{
        const {name,email,feedback}=req.body
        const existingFeedback=await feedbacks.findOne({email})
        if(existingFeedback){
            res.status(400).json("Already Added a feedback!")
        }
        else{
            const newFeedback=new feedbacks({
                name,email,feedback
            })
            await newFeedback.save()
            res.status(200).json(newFeedback)
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.allFeedbacks=async(req,res)=>{
    try{
        const feedbackList=await feedbacks.find()
        res.status(200).json(feedbackList)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.deleteFeedbackById=async(req,res)=>{
    try{
        const {fid}=req.params
        const deleteFeedback=await feedbacks.findByIdAndDelete(fid)
        res.status(200).json(deleteFeedback)

    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}