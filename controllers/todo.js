exports.getData=async (res,dbClient)=>{
    let database=dbClient.db('yaseen')
    let data=[]
    let d = await database.collection('todos').find()

    await d.forEach(element => {
        data.push(element)
    });
    res.render('home',{data})
}
exports.addTodo=async (req,res,dbClient)=>{    
    let {todo}=req.body
    let id=`${Date.now}`
    let database=dbClient.db('yaseen')
    await  database.collection('todos').insertOne({id:id,text:todo})
    res.redirect('/')
}


exports.deleteTodo=async (req,res,dbClient)=>{
    let id=req.params.id
    let database=dbClient.db('yaseen')
    await  database.collection('todos').deleteOne({id:id})
    res.redirect('/')
}