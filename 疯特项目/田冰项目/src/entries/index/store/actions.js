/**
 * Created with fly.
 * User: z1163764648@qq.com
 * Date: 18-5-17
 * Time: 上午11:47
 *
 */
import {pageloadCheckNavigator, testResponseCode, addZero, getThisWeekNum} from 'common_libs/util.js'

export default {
    /**
     * 点击查看以前的时间
     * @param commit
     * @param startDay
     * @returns {*}
     */
    disptchMinusTheCurrentNeedToQueryTheStartTime({commit}, startDay) {
        let newStartDay = new Date(startDay.setDate(startDay.getDate() - 30)); // 每次点击减时间 减去30天
        return commit('MINUSTHECURRENTNEEDTOQUERYTHESTARTTIME', newStartDay)
    },
    /**
     * 根据开始时间和需要提前的时间 创建时间列表
     * @param startTime
     * @param frontDateNumber
     * @param commit
     * @return {*}
     */
    dispatchCreatDateList({commit}, startTime, frontDateNumber = 5) {
        let dateList = [];
        let startDay = new Date(startTime.setDate(startTime.getDate() - frontDateNumber)); // 将视图时间提前4天
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
        startDay = new Date(startTime.setDate(startTime.getDate() + frontDateNumber)); // 把提前的时间返还给开始时间 以保证时间不会一直累剑
        return commit('CREATDATELIST', dateList)
    },
    /**
     * 点击查看以后的时间
     * @param commit
     * @param startDay
     * @returns {*}
     */
    disptchAddTheCurrentNeedToQueryTheStartTime({commit}, startDay) {
        let newStartDay = new Date(startDay.setDate(startDay.getDate() + 30));// 每次点击减时间 加上30天
        return commit('ADDTHECURRENTNEEDTOQUERYTHESTARTTIME', newStartDay)
    },
    /**
     * 当直接修改时间时 ， 重新更新开始时间
     * @param commit
     * @param startDay
     * @returns {*}
     */
    disptchChangeTheCurrentNeedToQueryTheStartTime({commit}, startDay) {
        return commit('CHANGETHECURRENTNEEDTOQUERYTHESTARTTIME', new Date(startDay))
    },
    /**
     * 请求 房态房型以及房间列表
     * @param commit
     * @returns {*}
     */
    dispatchGetHotelRoomTypeInfoList({commit}) {
        // let param = param;
        try {
            return httpRequestor.get('http://localhost:3000/HotelRoom').then(result => {
                new Promise(resolve => {
                    return resolve(testResponseCode(result.code));
                }).then(resolve => {
                    let content = result.content;
                    let RoomNumber = 0;
                    for (let i = 0; i < content.length; i++) {
                        RoomNumber += content[i].rooms.length;
                    }
                    sessionStorage.setItem('roomNumber', RoomNumber);
                    return resolve ? commit('GETHOTELROOMTYPEINFOLIST', result) : false;
                })
            })
        } catch (e) {
            return pageloadCheckNavigator(e)
        }
    },
    dispatchUseHotelRoomTypeCreatRoom({commit, state}) {
        let hotelRoomTypeList = state.hotelStatus.hotelRoomTypeInfoList;
        let roomList = [];
        for (let i = 0; i < hotelRoomTypeList.length; i++) {
            let roomTypeId = hotelRoomTypeList[i].roomTypeId;
            let roomTypeName = hotelRoomTypeList[i].roomTypeName;
            for (let j = 0; j < hotelRoomTypeList[i].rooms.length; j++) {
                let roomId = hotelRoomTypeList[i].rooms[j].roomId;
                let roomNo = hotelRoomTypeList[i].rooms[j].roomNo;
                let roomDescription = hotelRoomTypeList[i].rooms[j].roomDescription;
                let roomObj = {
                    'id': i,
                    'roomTypeId': roomTypeId,
                    'roomTypeName': roomTypeName,
                    'roomId': roomId,
                    'roomNo': roomNo,
                    'roomDescription': roomDescription
                };
                roomList.push(roomObj);
            }
        }
        return commit('USEHOTELROOMTYPECREATROOM', roomList)
    },
    /**
     * 獲取所有房型房間的價格列表
     * @param commit
     * @returns {*}
     */
    dispatchGetHotelTypeAndRoomAllPrice({commit}) {
        try {
            return httpRequestor.get('http://localhost:3000/hotelRoomPrice').then(result => {
                new Promise(resolve => {
                    return resolve(testResponseCode(result.code));
                }).then(resolve => {
                    return resolve ? commit('GETHOTELTYPEANDROOMALLPRICE', result) : false;
                })
            })
        } catch (e) {
            return pageloadCheckNavigator(e)
        }
    },
    dispatchGetHotelAllOrdersInfo({commit}) {
        try {
            return httpRequestor.get('http://localhost:3000/hotelOrderInfo').then(result => {
                new Promise(resolve => {
                    return resolve(testResponseCode(result.code));
                }).then(resolve => {
                    return resolve ? commit('GETHOTELALLORDERSINFO', result) : false;
                })
            })
        } catch (e) {
            return pageloadCheckNavigator(e)
        }
    },
    dispatchGetHotelRoomBeOccupied({commit, state}) {
        let hotelOrderInfoList = state.hotelStatus.hotelOrderInfoList;
        let cantSelectList = [];
        for (let i = 0; i < hotelOrderInfoList.length; i++) {
            let cantSelectStartY = hotelOrderInfoList[i].vmviewNodeStartY;
            let cantSelectStartX = hotelOrderInfoList[i].vmviewNodeStartX;
            for (let j = 0; j < hotelOrderInfoList[i].vmOrderDate; j++) {
                let cantSelectObj = {cantSelectX: (cantSelectStartX + (80 * j)), cantSelectY: cantSelectStartY};
                cantSelectList.push(cantSelectObj)
            }
        }
        return commit('GETHOTELROOMBEOCCUPIED', cantSelectList)
    }
}

