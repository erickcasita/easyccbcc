messenger.composeAction.onClicked.addListener(buttonClicked);


let contactscc = ['3d1dd86b-9021-4610-917b-edac43ad7192'];
let contactsbcc = ['1d0fbc44-792a-4e6f-b0a3-e30860be4cce','6ff50d97-8b14-4da2-8d28-ea2a07c729c5'];

let panelcc =  [];

async function buttonClicked(tab) {

    addContactToAddressLine(tab.id);
}



function validatecc (cc){
  bandera = false;
  let idcontact = panelcc.find(element => element === cc);
  if(idcontact == undefined){
      panelcc.push(cc);
      return bandera ;
  }
  return bandera = true;
}

async function addContactToAddressLine(tabId) {

  let panel = await messenger.compose.getComposeDetails(tabId);
  let outinfo;
  let contacdisplay;


  //Add contacts cc list to cc tab

  for (var cc in contactscc){
        
          if(!validatecc(contactscc[cc]))
          {
            outinfo = await messenger.contacts.get(contactscc[cc]);
            contacdisplay = outinfo.properties.DisplayName + " <"+outinfo.properties.PrimaryEmail+">";
            panel.cc.push(contacdisplay);
          }
      }


        // Add contacts bcc to bcc tab

        // for (var bcc in contactsbcc){
        //     outinfo = await messenger.contacts.get(contactsbcc[bcc]);
        //     contacdisplay = outinfo.properties.DisplayName + " <"+outinfo.properties.PrimaryEmail+">";
        //     panel.bcc.push(contacdisplay);
        // }
        await messenger.compose.setComposeDetails(tabId, panel);

}
