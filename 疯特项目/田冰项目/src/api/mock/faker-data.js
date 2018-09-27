/**
 * Created with fly.
 * User: z1163764648@qq.com
 * Date: 18-5-17
 * Time: 上午11:47
 *
 */

/* eslint-disable*/
module.exports = function() {
    var faker = require("faker");
    faker.locale = "zh_CN";
    var _ = require("lodash");
    var roomTypeName = faker.name.findName() + '房';
    var dateList = [];
    var dispatchCreatDateList = function(startTime) {
        let startDay = new Date(startTime.setDate(startTime.getDate() - 5)); // 将视图时间提前4天
        for (let i = 0; i < 30; i++) {
            startDay.setDate(startDay.getDate() + 1);// 循环得到当前昨天时间以后的时间
            let year = startDay.getFullYear();
            let mounth = addZero(startDay.getMonth() + 1); // 获取当前月份的日期，不足10补0
            let date = addZero(startDay.getDate()); // 获取当前几号，不足10补0
            let nodeShowDate = `${year}-${mounth}-${date}`;
            let Weekends = getThisWeekNum(nodeShowDate);
            let dateListObj = {date: nodeShowDate, week: `星期${Weekends}`};
            dateList.push(dateListObj);
        }
        startDay = new Date(startTime.setDate(startTime.getDate() + 5)); // 把提前的时间返还给开始时间 以保证时间不会一直累剑
        return dateList;
    };
    dispatchCreatDateList(new Date())
    return {
        HotelRoom: {
            code: '000000',
            content:
                _.times(3, function(n) {
                    return {
                        "roomTypeId": n,
                        "roomTypeName": roomTypeName + n,
                        "roomTypeShortName": "HJF",
                        "roomTypeSequence": n,
                        "roomTypeRemark": faker.name.findName() + '房',
                        "rooms":
                            _.times(Math.ceil(Math.random() * 10), function(n) {
                                return {
                                    "roomId": n + 1,
                                    "roomNo": '666',
                                    "roomDescription": faker.name.findName() + '房'
                                }
                            })
                    }
                }),
            message: "操作成功",

        },
        hotelRoomPrice: {
            code: '000000',
            content: _.times(2, function(n) {
                return {
                    "roomTypeId": n,
                    "roomTypeName": roomTypeName + n,
                    "realprices":
                        _.times(30, function(n) {
                            return {
                                "currDate": dateList[n].date,
                                "realPrice": Math.floor(Math.random() * (1500 - 100 + 1)) + 100,
                                "priceType": Math.floor(Math.random() * (3 - 1 + 1)) + 1
                            }

                        })
                }
            }),
            message: '操作成功'
        },
        hotelOrderInfo: {
            "code": '000000',
            "content": _.times(1, function(n) {
                return {
                    "orderId": n,
                    "contactName": "成哥哥",
                    "contactPhone": "15467893456",
                    "ofName": "上门客",
                    "totalAmount": 300.0,
                    "paidAmount": 100.0,
                    "deposit": 50.0,
                    "orderStatus": '3',
                    "createdDate": "2018-05-31",
                    "updatedDate": "2018-06-01 08:44:20",
                    "subs": [
                        {
                            "subId": 1,
                            "roomId": 1,
                            "checkInDate": "2018-06-03",
                            "checkOutDate": "2018-06-06",
                            "status": '3'
                        },
                        {
                            "subId": 1,
                            "roomId": 3,
                            "checkInDate": "2018-06-06",
                            "checkOutDate": "2018-06-11",
                            "status": '2'
                        },
                        {
                            "subId": 1,
                            "roomId": 5,
                            "checkInDate": "2018-06-06",
                            "checkOutDate": "2018-06-11",
                            "status": '0'
                        },
                        {
                            "subId": 1,
                            "roomId": 6,
                            "checkInDate": "2018-06-08",
                            "checkOutDate": "2018-06-11",
                            "status": '1'
                        },
                        {
                            "subId": 1,
                            "roomId": 1,
                            "checkInDate": "2018-06-23",
                            "checkOutDate": "2018-06-28",
                            "status": '0'
                        }
                    ]
                }
            }),
            'message': '操作成功'
        }
    }
}

function getThisWeekNum(thisTime) {
    let week = new Date(thisTime).getDay();
    let str = '';
    switch (week) {
        case 0 :
            str += "日";
            break;
        case 1 :
            str += "一";
            break;
        case 2 :
            str += "二";
            break;
        case 3 :
            str += "三";
            break;
        case 4 :
            str += "四";
            break;
        case 5 :
            str += "五";
            break;
        case 6 :
            str += "六";
            break;
    }
    return str;
}

function addZero(num) {
    return num < 10 ? `0${num}` : num
}
