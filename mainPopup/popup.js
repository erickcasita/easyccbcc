// Below is what we'll log to the console.

//let tabs = await messenger.tabs.query({ active: true, currentWindow: true });
//let message = await messenger.messageDisplay.getDisplayedMessage(tabs[0].id);

document.getElementById('composeButton').addEventListener('click', function() {
    messenger.composeAction.onClicked.addListener((tab) => {

      messenger.compose.beginNew();
      console.log("Hola!!");
    });
  });