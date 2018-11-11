/**
 * GoogleTrendsBackendController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    async googleTrendsBackend(req,res){
      console.log('GoogleTrendsBackend called')
      console.log('req.body', req.body)
      var {fiftyOverFifty, timelineObjLst} = await callTrendsAPI(req.body.inputStr)
      chartData = formatChartData(timelineObjLst, req.body.inputStr)
      res.send({chartData:chartData, fiftyOverFifty:fiftyOverFifty})
    },

    checkoutPaypal(req,res){
    console.log(req.body)
        var execute_payment_json = {
        "payer_id": req.body.data.payerID,  
        };
        const payment ={}
        payment.amount=req.body.data.amount
        const paymentID=req.body.data.paymentID
        res.ok()

    },
};


const googleTrends = require('google-trends-api')

//can optimize this by comining it with callTrendsAPI
function formatChartData(timelineObjLst,searchTerm){
    var chartData = [["Date", searchTerm]]
    for(i in timelineObjLst){
        let subArr = []
        let Obj = timelineObjLst[i]
        if (i%4===0){//can toy with this number for the best frequency of obales
          subArr.push(Obj.formattedAxisTime)
        }else{
          subArr.push('')
        }
        subArr.push(Obj.value)
        chartData.push(subArr)
    }

    return chartData
    // chartData : [
    //     ["Year", "Sales", "Expenses", "Profit"],
    //     ["0001", 1, 4, 2],
    //     ["0002", 1, 0, 0],
    //     ["0003", 0, 1, 0],
    //     ["0004", 1, 0, 0]
    //   ],
}

async function callTrendsAPI(inputStr){
  var today = new Date()
  var priorDate = new Date();
  priorDate.setDate(new Date().getDate() - 90)

  var options = {
      keyword: inputStr,
      startTime: today,
      endTime: priorDate,
      category: 18,
      geo: 'US',
      // resolution: 'COUNTRY',
    }
  try{
    var res = await googleTrends.interestOverTime(options)
    var obj = JSON.parse(res)
    timelineObjLst = obj.default.timelineData
    // var valLst = []
    // for (i in timelineObjLst){
    //   tObj = timelineObjLst[i]
    //   valLst.push(tObj.value[0])
    // }
    return {fiftyOverFifty:fiftyOverFifty(timelineObjLst), timelineObjLst:timelineObjLst}
  }
  catch(e){
    console.log('error getting trends (make sure wifi works)')
    return e
  }
}
/* checks to see if 50% of the days have a trend score above 50% */
function fiftyOverFifty (timelineObjLst){
  for (i in timelineObjLst){
    var numOver50 = 0
    var numPeriods = timelineObjLst.length
    tObj = timelineObjLst[i]
    var val = tObj.value[0]
    if (val>=50){
      numOver50 += 1
    }
  }
  return (numOver50>=numPeriods)
}
