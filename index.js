let myLeads = [];
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');
const saveTabBtn = document.getElementById('savetab-btn');

const dataLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

//simulate the current open tab
// const tabs = [{ url: 'www.github.com' }];

if (dataLocalStorage) {
  //render to clients
  myLeads = dataLocalStorage;
  renderLeads(myLeads);
}

inputBtn.addEventListener('click', function () {
  myLeads.push(inputEl.value);
  inputEl.value = '';
  localStorage.setItem('myLeads', JSON.stringify(myLeads));
  renderLeads(myLeads);
});

deleteBtn.addEventListener('dblclick', function () {
  localStorage.clear();
  myLeads = [];
  renderLeads(myLeads);
});

saveTabBtn.addEventListener('click', function () {
    //save current tab in chrome
    //if tabs active in currentWindow, exec function with param(tabs)
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          myLeads.push(tabs[0].url);
          localStorage.setItem('myLeads', JSON.stringify(myLeads));
          renderLeads(myLeads);
    })
});

function renderLeads(leads) {
  let listItems = '';
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}
