/**
 * 一个简单的promise
 * @param {Function} fn 
 */
function Promise(fn){
    let that = this
    this.status=  'pending'
    this.result= undefined
    this.successQueues = [] //异步成功回调观察者队列
    this.failQueues = [] //异步失败回调观察者队列
 
    function reslove(res){
        this.status='fulfilled'
        result= res
        for(var i=0;i<that.successQueues.length;i++){
           let queue=that.successQueues[i]
           queue(res)
        }
    }
    function reject(res){
        this.status='rejected'
        result= res
        for(var i=0;i<that.failQueues.length;i++){
            let queue=that.failQueues[i]
            queue(res)
         }

    }
    fn(reslove,reject)
}

Promise.prototype.then=function(successFn,failFn){
        if(this.status=='fulfilled'){ //当状态为fulfilled,证明reslove已执行，直接执行成功回调
            successFn(result)
        }else if(this.status=='rejected'){ //当状态为fulfilled,证明reject已执行，直接执行失败回调
    
            failFn(result)
        }else{   //当状态还是pending则将成功失败回调加入队列保存起来，等待异步结果返回，再执行队列
    
            this.successQueues.push(successFn)
            this.failQueues.push(failFn)
        }
 
}

var p = new Promise((reslove,reject)=>{
    setTimeout(() => {
        reject(111)
        
    }, 1000);
    
})
p.then((e)=>{console.log(e)},(e)=>{console.log(22,e)})
