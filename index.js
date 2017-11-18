const async = require('async')
const request = require('request')
const fs = require('fs')
const cheerio = require('cheerio')
const urls = [
    {
        name: 'Taara',
        url: 'http://rov.wikia.com/wiki/Taara'
    },
    {
        name: 'Zuka',
        url: 'http://rov.wikia.com/wiki/Zuka'
    },
    {
        name: 'BondHome',
        url: 'https://www.kasemsanm.com/'
    }  
    
]
let i = 0

const queue = async.queue((task,callback) =>{
    request(task.url,(error,response,body) =>{
        $ = cheerio.load(body)
        const text = $('p').text()
        fs.writeFile(task.name+'.txt',text,(err) => {
            if(err){
                console.log(err)
                callback()
            }
            console.log('save')-
            callback()
        })
    })



    /*
    request(urls,(error,response,body) => {
        i = i + 1
        fs.writeFile('web'+i+'.html',body,(err) => {
            if(err){
                console.log(err)
                callback()
            }
            console.log('save')-
            callback()
        })
    })
    */
},1)

queue.drain = () =>{
    console.log('all process complete')
}

queue.push(urls)