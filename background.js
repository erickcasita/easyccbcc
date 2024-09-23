messenger.composeAction.onClicked.addListener(buttonClicked);
//variables iniciales
let contactscc = [
  "Alberto Vargas Quino <soportesistemas@coronalostuxtlas.com.mx>",
];
let contactsbcc = [
  '"Ing. Rafael Fararoni Mortera" <direcciongral@coronalostuxtlas.com.mx>',
  "Diana Laura Vazquez Malaga <rh@coronalostuxtlas.com.mx>",
];
async function buttonClicked(tab) {
  addContactToAddressLine(tab.id);
}

async function addContactToAddressLine(tabId) {
  //obtenemos el panel
  let panel = await messenger.compose.getComposeDetails(tabId);
  //si no hay remitente, copia y copia oculta
  if (
    panel.cc.length === 0 &&
    panel.bcc.length === 0 &&
    panel.to.length === 0
  ) {
    for (var cc in contactscc) {
      panel.cc.push(contactscc[cc]);
    }
    //Add contacts bcc to bcc tab
    for (var bcc in contactsbcc) {
      panel.bcc.push(contactsbcc[bcc]);
    }
  }else{
    emails = panel.to.concat(panel.cc,panel.bcc);
    contactscc.forEach((cc) => {
      let checkcc = emails.find(function (panel) {
        return panel == cc;
      });
      if (checkcc == undefined) {
          panel.cc.push(cc);
      }
    });
    contactsbcc.forEach((bcc) => {
      let checkbcc = emails.find(function (panel) {
        return panel == bcc;
      });
      if (checkbcc == undefined) {
          panel.bcc.push(bcc);
      }
    });
  }
  await messenger.compose.setComposeDetails(tabId, panel);
}
