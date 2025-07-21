var model = require("../../model/admin/questionTypes");

module.exports.ListExamTypes =async(req,res)=>{
    try {
   
        let ExamTypeslist =await model.ListExamTypesQuery();
        if (ExamTypeslist.length>0){
            return res.send({
                message:"data retrived",
                list:ExamTypeslist,

            })
        }else{
         
            return res.send({
                result: false,
                message: "data not found",
        })
    }

        
    } catch (error) {
        return res.send({
            result:false,
            message:error.message,

        })
    }
}
module.exports.deleteExamTypes=async(req,res)=>{
     try {
        let{ext_id}=req.body || {}
        if(!ext_id){
           return res.send({
            result:false,
            message:"Exam Types id required"
           })  
        }
         let ExamTypeslist =await model.delteExamTypesquery(ext_id);
        if (ExamTypeslist.affectedRows>0){
            return res.send({
                result:true,
                message:"Exam Type deleted successfully"
            })
        }
        else{
            return res.send({
                result:false,
                message:"Exam Type details not found"
            })
        }
               

        
     } catch (error) {
        return res.send({
          result:false,
            message:error.message,
        
     })
    }


}