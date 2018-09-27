/**
 * Created with fly.
 * User: z1163764648@qq.com
 * Date: 18-5-17
 * Time: 下午12:19
 *
 */
import {timeStampTransformation} from 'common_libs/util.js'
import {uniq as _uniq} from 'lodash'
import $ from 'jquery'

export default {
    MINUSTHECURRENTNEEDTOQUERYTHESTARTTIME(state, newStartDay) {
        return state.hotelStatus.dateAndTimePicker.theCurrentNeedToQueryTheStartTime = new Date(newStartDay);
    },
    CREATDATELIST(state, dateList) {
        return state.hotelStatus.dateAndTimePicker.dateList = dateList;
    },
    ADDTHECURRENTNEEDTOQUERYTHESTARTTIME(state, newStartDay) {
        return state.hotelStatus.dateAndTimePicker.theCurrentNeedToQueryTheStartTime = new Date(newStartDay);
    },
    CHANGETHECURRENTNEEDTOQUERYTHESTARTTIME(state, newStartDay) {
        return state.hotelStatus.dateAndTimePicker.theCurrentNeedToQueryTheStartTime = new Date(newStartDay);
    },
    GETHOTELROOMTYPEINFOLIST(state, result) {
        return state.hotelStatus.hotelRoomTypeInfoList = result.content;
    },
    USEHOTELROOMTYPECREATROOM(state, roomList) {
        return state.hotelStatus.hotelRoomList = roomList
    },
    GETHOTELTYPEANDROOMALLPRICE(state, result) {
        return state.hotelStatus.hotelRoomPriceList = result.content;
    },
    GETHOTELALLORDERSINFO(state, result) {
        let hotelOrderList = result.content;
        let orderDetaile = $('.chronologicalOrderUl .OrderDetaile');
        let hotelRoomList = $('.hotelRoomTypeInfoContainer .roomNumber');
        let lastOrderList = [];
        for (let i = 0; i < hotelOrderList.length; i++) {
            let contactUerName = hotelOrderList[i].contactName;
            let userResource = hotelOrderList[i].ofName;
            let ordertotalPrice = Number(hotelOrderList[i].totalAmount);
            let orderpaidPrice = Number(hotelOrderList[i].paidAmount);
            let orderId = hotelOrderList[i].orderId;
            // let orderStatus = hotelOrderList[i].orderStatus;
            let subsList = hotelOrderList[i].subs;
            for (let c = 0; c < subsList.length; c++) {
                let viewNodeObj = {};
                let viewNodeLeft = '5px';
                let viewNodeTop = '5px';
                let viewNodeStartX = 0;
                let viewNodeStartY = 0;
                let roomId = subsList[c].roomId;
                let thisOrderCheckInDate = subsList[c].checkInDate;
                let thisOrderCheckOutDate = subsList[c].checkOutDate;
                let stringCheckOutDate = timeStampTransformation(thisOrderCheckOutDate, 'date');
                let stringCheckInDate = timeStampTransformation(thisOrderCheckInDate, 'date');
                let thisOrderDate = stringCheckOutDate - stringCheckInDate;
                let viewNodeWidth = (thisOrderDate * 80) - 10 + 'px';
                let thisOrderStatus = subsList[c].status;
                let stringorderDetaile = timeStampTransformation($(orderDetaile[0]).attr('date'), 'date');
                let timeDifference = stringorderDetaile - stringCheckInDate;
                timeDifference > 0 ? viewNodeWidth = (((thisOrderDate * 80) - 10) - (timeDifference) * 80) + 'px' : false;
                timeDifference > 0 ? thisOrderDate -= timeDifference : false;
                for (let j = 0; j < orderDetaile.length; j++) {
                    if (thisOrderCheckInDate === $(orderDetaile[j]).attr('date')) {
                        viewNodeLeft = Number($(orderDetaile[j]).attr('viewX')) + 5 + 'px';
                        viewNodeStartX = parseFloat($(orderDetaile[j]).attr('viewX'));
                    }
                }
                for (let j = 0; j < hotelRoomList.length; j++) {
                    if (roomId === Number($(hotelRoomList[j]).attr('roomid'))) {
                        viewNodeTop = Number($(hotelRoomList[j]).attr('viewy')) + 5 + 'px';
                        viewNodeStartY = parseFloat($(hotelRoomList[j]).attr('viewy'));
                    }
                }
                viewNodeObj.orderId = orderId;
                viewNodeObj.vmLeft = viewNodeLeft;
                viewNodeObj.vmviewNodeStartX = viewNodeStartX;
                viewNodeObj.vmviewNodeStartY = viewNodeStartY;
                viewNodeObj.vmTop = viewNodeTop;
                viewNodeObj.vmWidth = viewNodeWidth;
                viewNodeObj.vmUserName = contactUerName;
                viewNodeObj.vmUserResource = userResource;
                viewNodeObj.vmCheckInDate = thisOrderCheckInDate.substr(5, 5);
                viewNodeObj.vmCheckOutDate = thisOrderCheckOutDate.substr(5, 5);
                viewNodeObj.vmOrderDate = thisOrderDate;
                viewNodeObj.vmOrderStatus = thisOrderStatus;
                viewNodeObj.vmOrderCzStatus = thisOrderStatus === '0' ?
                    '預' : thisOrderStatus === '1' ?
                        '住' : thisOrderStatus === '2' ?
                            '退' : thisOrderStatus === '3' ?
                                '补' : false;
                viewNodeObj.vmTotalPrice = ordertotalPrice;
                viewNodeObj.vmReservePrice = ordertotalPrice - orderpaidPrice;
                setTimeout(()=>{
                    lastOrderList.push(viewNodeObj);
                },50)

            }
        }
        return state.hotelStatus.hotelOrderInfoList = lastOrderList;
    },
    GETHOTELROOMBEOCCUPIED(state, result) {
        return state.hotelStatus.HotelRoomBeOccupiedList = result;
    }
}
