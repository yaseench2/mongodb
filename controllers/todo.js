exports.getData=async (res,dbClient)=>{
    let database=dbClient.db('yaseen')
    let data=[]
    let d = await database.collection('todos').find()

    await d.forEach(element => {
        data.push(element)
    });
    console.log('hi')
    res.render('home',{data})
}