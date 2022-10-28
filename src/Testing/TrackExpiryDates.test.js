import {CheckExp} from "../contexts/AuthContext";

describe ("Test the tracking of expiry dates" ,()=>{

   test('check different dates based of curr date', async () => {


    let currDate=new Date();
    let currYear=currDate.getFullYear();
    let currMonth=currDate.getMonth()+1;
    let currDay=currDate.getDate();

    //subtract 8 days - this will mean the product should be expired
    currDay-=7;

    expect(CheckExp(currDay,currYear,currMonth)).toBe(true);

    //undo the change
    currDay+=7;

    //check if expired when only 2 days has passed
    currDay-=2;
    expect(CheckExp(currDay,currYear,currMonth)).toBe(false); //product should not be expired

     //undo the change
     currDay+=2;

     //check if expired when only 0 days has passed
     expect(CheckExp(currDay,currYear,currMonth)).toBe(false); //product should not be expired

    //check if expired when only 8 days has passed
    currDay-=8;
    expect(CheckExp(currDay,currYear,currMonth)).toBe(true); //product should not be expired

   });

});