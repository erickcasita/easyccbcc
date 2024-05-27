messenger.composeAction.onClicked.addListener(buttonClicked);
//variables iniciales

let contactsall = ['Alberto Vargas Quino <soportesistemas@coronalostuxtlas.com.mx>','Ing. Rafael Fararoni Mortera <direcciongral@coronalostuxtlas.com.mx>','Diana Laura Vazquez Malaga <rh@coronalostuxtlas.com.mx>'];

let contactscc = ['Alberto Vargas Quino <soportesistemas@coronalostuxtlas.com.mx>'];
let contactsbcc = ['Ing. Rafael Fararoni Mortera <direcciongral@coronalostuxtlas.com.mx>','Diana Laura Vazquez Malaga <rh@coronalostuxtlas.com.mx>'];
let panelcc =  [];
let panelbcc =  [];
let panelto = [];
async function buttonClicked(tab) {
    addContactToAddressLine(tab.id);
    
}



function validatecontacs (cc, contacts){
  bandera = false;
  let contact = contacts.find(element => element === cc);
  if(contact == undefined){
      //panelcc.push(cc);
      return bandera ;
  }
  return bandera = true;
}


function validatebcc (bcc){
  bandera = false;
  let idcontact = panelbcc.find(element => element === bcc);
  if(idcontact == undefined){
      panelbcc.push(bcc);
      return bandera ;
  }
  return bandera = true;
}

function validateto(to){
  bandera = false;
  let idcontact = contactsall.find(element => element === to);
  if(idcontact == undefined){
      return bandera ;
  }
  return bandera = true;
}

async function addContactToAddressLine(tabId) 
{
  //obtenemos el panel
  let panel = await messenger.compose.getComposeDetails(tabId);
  console.log(panel.cc.length);
  console.log(panel.bcc.length);
  console.log(panel.to.length);

  if(panel.cc.length === 0 && panel.bcc.length === 0 && panel.to.length === 0){
    for (var cc in contactscc){
  
        panel.cc.push(contactscc[cc]);
    
  }

//Add contacts bcc to bcc tab

    for (var bcc in contactsbcc){

      
          panel.bcc.push(contactsbcc[bcc]);
    }
  }
  

  if(panel.to.length>=1 && panel.cc.length<=0 && panel.bcc<=0){
   
    console.log("holaa");
    contactscc.forEach(element => {
      if(!validatecontacs(element,panel.to)){
        panel.cc.push(element);
      }
    })

    contactsbcc.forEach(element => {
      if(!validatecontacs(element,panel.to)){
        panel.bcc.push(element);
      }
    })
    
  }

  if(panel.cc.length>=1 && panel.to.length<=0 && panel.bcc.length<=0){
    contactscc.forEach(element => {
      if(!validatecontacs(element,panel.cc)){
        panel.cc.push(element);
      }
    })

    contactsbcc.forEach(element => {
      if(!validatecontacs(element,panel.cc)){
        panel.bcc.push(element);
      }
    })
  }

  await messenger.compose.setComposeDetails(tabId, panel);
}