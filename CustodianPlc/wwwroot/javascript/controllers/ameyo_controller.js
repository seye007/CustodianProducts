// function performClick(){
//   var obj = {};
//   obj.campaignId = 3; //document.getElementById('3').value;
//   obj.nodeflowId = 2; //document.getElementById('2').value; 
//   obj.name = document.getElementById('name').value;
//   obj.email=document.getElementById('email').value;
//   obj.phone= document.getElementById('phone').value;
//   var additionalParams = document.getElementById('additionalParams').value;
//   obj.additionalParams = additionalParams;
//   enableChat(obj);
//  }

var campaignId = '3';
var nodeflowId = '2';
var ameyoUrl = 'https://custodiancm.outcess.com:8443';
var queueId = '1';
var ameyo_script = document.createElement('script');
ameyo_script.onload = function() {
        try {
            initializeChat(campaignId, nodeflowId,ameyoUrl,queueId);
        } catch (err) {
            console.error( err);
        }
    };
ameyo_script.src = ameyoUrl+"/ameyochatjs/ameyo-emerge-chat.js";
document.getElementsByTagName('head')[0].appendChild(ameyo_script);
