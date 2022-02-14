export const counties = '/getCounties'
export const getStates = '/getStates'
export const allInfo = 'www.taxsaleresources.com/DHSearchHandler.ashx?UserID=12345&UserName=dhapi&Password=7jOsbudk[!&CountyOtc=All&BidProcedures=All&AuctionType=All&State=All&County=All&SaleStart=2022-2-1&SaleEnd=2022-4-30&PageSize=1000&PageIndex=1&orderby=startdate&order=asc'

export async function byStatePath(json){
    const path = 'https://www.taxsaleresources.com/DHSearchHandler.ashx?UserID=12345&UserName=dhapi&Password=7jOsbudk[!&CountyOtc=All&BidProcedures=All&AuctionType=All&State=All&County=All&SaleStart=2022-2-1&SaleEnd=2022-4-30&PageSize=1000&PageIndex=1&orderby=startdate&order=asc'
    return path
}


export var getJSON = function(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('get', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        var status = xhr.status;
        if (status == 200) {
          resolve(xhr.response);
        } else {
          reject(status);
        }
      };
      xhr.send();
    });
  };
  