let myLeads = []
const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")
const downloadBtn = document.getElementById("download-btn")


if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

tabBtn.addEventListener("click", function() {

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  myLeads.push(tabs[0].url)
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)    
  })
})

function render(leads) {
  let listItems = ""
  for (let i = 0; i < leads.length; i++) {
    listItems +=  `
    <li>
        <a target='_blank' href='${leads[i]}'> 
            ${leads[i]} 
        </a>
    </li>
    `
    //another methods to do this
    // const li = document.createElement("li")
    // li.textContent = myLeads[i]
    // ulEl.append(li)
  }
  ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
  localStorage.clear()
  myLeads = []
  render(myLeads)
  csv = []
})


inputBtn.addEventListener("click", function() {
  myLeads.push(inputEl.value)
  inputEl.value = ''
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)
})


downloadBtn.addEventListener("click", function() {
  let csv = myLeads  
  let hiddenElement = document.createElement('a')  
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)  
  hiddenElement.target = '_blank' 
  hiddenElement.download = 'linkkeeper.csv'  //name for the CSV file to be downloaded 
  hiddenElement.click()  
})