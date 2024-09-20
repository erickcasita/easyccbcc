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
  }
  if (panel.to.length >= 1 && panel.cc.length <= 0 && panel.bcc <= 0 || panel.cc.length>=1) {
    tmpcc = [];
    tmpbcc = [];
    panel.to.forEach((to) => {
      let banderacc = contactscc.find(function (cc) {
        return cc == to;
      });
      let banderabcc = contactsbcc.find(function (bcc) {
        return bcc == to;
      });
      if (banderacc) {
        tmpcc.push(banderacc);
      }
      if (banderabcc) {
        tmpbcc.push(banderabcc);
      }
    });
    //Añadir a panel cc
    if (tmpcc.length > 0) {
      contactscc.forEach((cc) => {
        let checkcc = tmpcc.find(function (ccpanel) {
          return ccpanel == cc;
        });
        if (checkcc == undefined) {
          panel.cc.push(cc);
        }
      });
    } else {
      contactscc.forEach((cc) => {
        let checkpanelcc = panel.cc.find(function(ccpanel){
            return ccpanel == cc;
        });
        if(checkpanelcc == undefined){
          panel.cc.push(cc);
        }
      });
    }
    //Añadir a panel bcc
    if (tmpbcc.length > 0) {
      contactsbcc.forEach((bcc) => {
        let checkbcc = tmpbcc.find(function (bccpanel) {
          return bccpanel == bcc;
        });
        if (checkbcc == undefined) {
          panel.bcc.push(bcc);
        }
      });
    } else {
      contactsbcc.forEach((bcc) => {
        panel.bcc.push(bcc);
      });
    }
  }
  await messenger.compose.setComposeDetails(tabId, panel);
}
