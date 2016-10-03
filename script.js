var offset = 10000;
var priceG = 0;
var price1 = 0;
var price2 = 0;
var details = '';
var details1 = '';
var details2 = '';

//offset =  _getRandomNumber(0, 50000);


//Get some random pids first
fetch('http://lad-api.net-a-porter.com/NAP/GB/60/'+offset+'/pids?visibility=visible').then (
  function(pidsResponse) {
    pidsResponse.json().then(function(pidData) {
      console.log(pidData);
      if(pidData.message === 'Offset out of range') {

      } else {

        var numID =  _getRandomNumber(0, 59);
        var numID2 = _getRandomNumber(0, 59);

        //Check that 2 items are different
        while (numID == numID2) {
          numID =  _getRandomNumber(0, 59);
          numID2 = _getRandomNumber(0, 59);
          console.log('duplicate');
        }

        //Product id
        var pid1 = pidData.pids[numID];
        var pid2 = pidData.pids[numID2];

        //Get the information for the pids
        _getInfo(pid1, 1).then(function() {
          price1 = _getPrice();
          details1 = _getProductDetails();

        });

        _getInfo(pid2, 2).then(() => {
          price2 = _getPrice();
          details2 = _getProductDetails();
        });

      }
    });
  }

)
document.getElementById('b1').onclick = () => {_buttonClick('b1')};
document.getElementById('b2').onclick = () => {_buttonClick('b2')};

function _setProductDetails (details) {
  this.details = details;

}
function _getProductDetails () {

  return this.details;
}

//Button function
function _buttonClick(button) {
  var priceTemp = 0;

  if (button === 'b2') {
    if (price1 < price2) {
      window.alert(`${price1} < ${price2} \nYou are correct \n"${details1}" is not more expensive than "${details2}"`);
    } else if (price1 > price2) {
      window.alert(`${price1} > ${price2} \nYou are wrong! \n"${details1}" is more expensive than "${details2}"`);
    } else {
      window.alert(`${price1} = ${price2} \nThey're both equal!`);
    }
  } else {
    if (price1 > price2) {
      window.alert(`${price1} > ${price2} \nYou are correct \n"${details1}" is more expensive than "${details2}"`);
    } else if (price1 < price2) {
      window.alert(`${price1} < ${price2} \nYou are wrong! \n"${details1}" is not more expensive than "${details2}"`);
    } else {
      window.alert(`${price1} = ${price2} \nThey're both equal!`);
    }
  }
  window.location.reload();
}


//Randomise number
function _getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//Get data
function _getInfo(item, number) {
    return fetch('http://lad-api.net-a-porter.com/NAP/GB/en/detail/'+item).then (
      function(pResponse) {
            return pResponse.json().then(function(pdData) {
            console.log(pdData);

            document.getElementById('product'+number+'Designer').innerHTML = pdData.brand.name;
            document.getElementById('short'+number).innerHTML = pdData.name;
            document.getElementById('long'+number).innerHTML = pdData.longDescription;
            var imageURL = 'http://cache.net-a-porter.com/images/products/'+item+'/'+item+'_in_dl.jpg';
            document.getElementById('pd'+number+'img').setAttribute('src',imageURL);
            //document.getElementById('b'+number).innerHTML = pdData.price.amount;
            _setPrice(pdData.price.amount);
            _setProductDetails(pdData.name);


          })

      }

    )
}

function _setPrice(price) {
  priceG = price;

}

function _getPrice() {
  return priceG;
}
