import {checkValidData} from "../../../shared/datainput.mjs"
import {observerMixin} from "../../observermixin.mjs"
import {selectorFromAttr} from "../../frontutils.mjs" // (elm, attName, attValue)
import {getRoot as getSiteText} from "../sitecontent.mjs"
import {webuser} from "./webuser.mjs"
import {setNav, initialNavSearch} from "../navhistory.mjs"
import {getTemplate} from "../layouts.mjs"
import {userMenuView} from "./usermenu.mjs"
import {rmBoxView} from "../../rmbox.mjs"
import {Node} from '../nodes.mjs'
import {setActiveInSite, getActiveInSite} from '../activeingroup.mjs'

const searchParamsKeys = ["login"]

export async function setLogIcon(logContainer) {
  setLogLabel() // set log label text depending on webuser log status

  // We set a search params entrance for a login view
  const navObserverClass = observerMixin(Node)
  const navObserver = new navObserverClass()
  setNav(navObserver, "login", searchParamsKeys, logAction)
  initialNavSearch(navObserver, "login", searchParamsKeys, logAction)
  selectorFromAttr(logContainer, "data-log-icon-button").addEventListener("click", function(event){
    event.preventDefault()
    logAction()
  })
  webuser.attachObserver("log", navObserver)
  navObserver.setReaction("log", async ()=>{
    console.log(`logicon node id=${navObserver.props.id} said "webuser log ${webuser.props.id}"`)
    setLogLabel()
  })

  // Helpers

  function setLogLabel() {
    webuser.props.id ? getSiteText().getNextChild("logbox").getNextChild("logboxin").getNextChild("title").write(logContainer) : getSiteText().getNextChild("logbox").getNextChild("logboxout").getNextChild("title").write(logContainer)
  }
  async function logAction(){
    if (webuser.props.id) {
      showUserMenu()
      return
    }
    const loginFrame = selectorFromAttr(await getTemplate("loginframe"), "data-container")
    selectorFromAttr(loginFrame, "data-card-body").appendChild(await rmBoxView(getTemplate, await loginFormView(), loginFrame))
    document.body.appendChild(loginFrame)
  }
}
function showUserMenu() {
  document.getElementById("dashmenu").style.visibility = "visible"
  document.getElementById("dashmenu").style.transform = "translateY(15px)"
}
function hideUserMenu(){
  document.getElementById("dashmenu").style.transform = "translateY(-15px)"
  document.getElementById("dashmenu").style.visibility = "hidden"
}
export async function loginFormView(afterLogin) {
  const logContainer = selectorFromAttr(await getTemplate("loginform"), "data-container")
  const logformTxt = getSiteText().getNextChild("logform")
  logformTxt.getNextChild("userName").setContentView(selectorFromAttr(logContainer, "data-username data-label"))
  logformTxt.getNextChild("userName").write(selectorFromAttr(logContainer, "data-username"), undefined, "text", "placeholder")
  logformTxt.getNextChild("password").setContentView(selectorFromAttr(logContainer, "data-password data-label"))
  logformTxt.getNextChild("password").write(selectorFromAttr(logContainer, "data-password"), undefined, "text", "placeholder")
  logformTxt.getNextChild("rememberme").setContentView(selectorFromAttr(logContainer, "data-rememberme"))
  if (localStorage.getItem("user_name"))
    selectorFromAttr(logContainer, "data-rememberme data-checkbox").checked = true
  logformTxt.getNextChild("login").setContentView(selectorFromAttr(logContainer, "data-login-button"))
  logformTxt.getNextChild("userCharError").setContentView(selectorFromAttr(logContainer, "data-usercharerror"))
  logformTxt.getNextChild("pwdCharError").setContentView(selectorFromAttr(logContainer, "data-pwdcharerror"))
  logformTxt.getNextChild("loginOk").setContentView(selectorFromAttr(logContainer, "data-loginok"))
  logformTxt.getNextChild("userError").setContentView(selectorFromAttr(logContainer, "data-usererror"))
  logformTxt.getNextChild("pwdError").setContentView(selectorFromAttr(logContainer, "data-pwderror"))
  logformTxt.getNextChild("newuserbt").setContentView(selectorFromAttr(logContainer, "data-newuser"))
  selectorFromAttr(logContainer, "data-newuser data-btn").addEventListener("click", async (ev)=>{
    ev.preventDefault()
    const loginFrame = document.getElementById("login-card")
    selectorFromAttr(loginFrame, "data-card-body").innerHTML = ""
    selectorFromAttr(loginFrame, "data-card-body").appendChild(await rmBoxView(getTemplate, await newFormView(afterLogin), selectorFromAttr(loginFrame, "data-container")))
  })
  selectorFromAttr(logContainer, "data-form").addEventListener("submit", async function(event) {
    event.preventDefault()
    await loginFormSubm(this, afterLogin)
  })
  return logContainer
}

async function newFormView(afterLogin) {
  const logContainer = selectorFromAttr(await getTemplate("newform"), "data-container")
  const logformTxt = getSiteText().getNextChild("logform")
  logformTxt.getNextChild("userName").setContentView(selectorFromAttr(logContainer, "data-username data-label"))
  logformTxt.getNextChild("userName").write(selectorFromAttr(logContainer, "data-username"), undefined, "text", "placeholder")
  logformTxt.getNextChild("password").setContentView(selectorFromAttr(logContainer, "data-password data-label"))
  logformTxt.getNextChild("password").write(selectorFromAttr(logContainer, "data-password"), undefined, "text", "placeholder")
  getSiteText().getNextChild("dashboard").getNextChild("changepwd").getNextChild("repeatpwd").setContentView(selectorFromAttr(logContainer, "data-repeat-password data-label"))
  getSiteText().getNextChild("dashboard").getNextChild("changepwd").getNextChild("repeatpwd").write(selectorFromAttr(logContainer, "data-repeat-password"), undefined, "text", "placeholder")
  logformTxt.getNextChild("signUp").setContentView(selectorFromAttr(logContainer, "data-sign-up-button"))
  logformTxt.getNextChild("userCharError").setContentView(selectorFromAttr(logContainer, "data-usercharerror"))
  logformTxt.getNextChild("pwdCharError").setContentView(selectorFromAttr(logContainer, "data-pwdcharerror"))
  logformTxt.getNextChild("signedUp").setContentView(selectorFromAttr(logContainer, "data-signed-up-ok"))
  logformTxt.getNextChild("userError").setContentView(selectorFromAttr(logContainer, "data-userExistsError"))
  getSiteText().getNextChild("dashboard").getNextChild("changepwd").getNextChild("pwdDoubleError").setContentView(selectorFromAttr(logContainer, "data-pwdDoubleError"))
  selectorFromAttr(logContainer, "data-form").addEventListener("submit", async function(event) {
    event.preventDefault()
    await signUpFormSubm(this, afterLogin)
  })
  return logContainer
}

async function loginFormSubm(formElement, afterLogin) {
  try {
    checkValidData({user_name: formElement.elements.user_name.value, user_password: formElement.elements.user_password.value})
  }
  catch(err){
    if (err.cause!="human")
      throw err
    dataError(err, formElement)
    return
  }
  const storeChecked = formElement.elements.rememberme.checked
  const uname = formElement.elements.user_name.value
  const upass = formElement.elements.user_password.value
  webuser.login(uname, upass)
  .then(async ()=> {
    const logFormTxt = getSiteText().getNextChild("logform")
    document.createElement("alert-element").showMsg(logFormTxt.getNextChild("loginOk").getLangData().replace("${user_name}", uname), 3000)
    if (storeChecked) {
      localStorage.setItem("user_name", uname)
      localStorage.setItem("user_password", upass)
    }
    else {
      if (localStorage.getItem("user_name"))
        localStorage.removeItem("user_name")
    }
    // close login card
    const loginCard = document.getElementById("login-card")
    loginCard.parentElement.removeChild(loginCard)
    await loggedIn(afterLogin)
  })
  .catch(error => { //error is Error object
    if (formElement.elements[error.message])
      document.createElement("alert-element").showMsg(formElement.elements[error.message].value, 3000)
    else
      throw error
  })
}
async function signUpFormSubm(formElement, afterLogin) {
  try {
    checkValidData({user_name: formElement.elements.user_name.value, user_password: formElement.elements.user_password.value})
  }
  catch(err){
    if (err.cause!="human")
      throw err
    dataError(err, formElement)
    return
  }
  const logFormTxt = getSiteText().getNextChild("logform")
  // pwd and repaet pwd
  if (formElement.elements.user_password.value!=formElement.elements.repeat_password.value) {
    document.createElement("alert-element").showMsg(logFormTxt.getNextChild("pwdDoubleError").getLangData(), 3000)
    formElement.elements.user_password.focus()
    return
  }
  const uname = formElement.elements.user_name.value
  const upass = formElement.elements.user_password.value
  webuser.constructor.create(uname, upass)
  .then(userNode =>{
    webuser.login(uname, upass, userNode)
    .then( async ()=>{
      document.createElement("alert-element").showMsg(logFormTxt.getNextChild("signedUp").getLangData(), 3000)
      // close login card
      const loginCard = document.getElementById("login-card")
      loginCard.parentElement.removeChild(loginCard)
      await loggedIn(afterLogin)
    })
  })
  .catch(error=>{
    if (formElement.elements[error.message])
      document.createElement("alert-element").showMsg(formElement.elements[error.message].value, 3000)
    else
      throw error
  })
}

async function loggedIn(afterLogin){
  // Insert the menu
  document.getElementById("dashmenu").innerHTML = ""
  document.getElementById("dashmenu").appendChild(await userMenuView(hideUserMenu))
  // We load user information now, then it will be availble for later operations
  await webuser.getRelationship("usersdata").loadRequest("get my children")
  await webuser.getRelationship("addresses").loadRequest("get my children")
  if (webuser.isAdmin()) {
    async function blink(domElement){
      let isMouseOver = false, blinkTimes = 0, intervalId
      function innerBlink(){
        if (isMouseOver) {
          domElement.dispatchEvent(new Event("mouseout"))
          isMouseOver = false
          if (blinkTimes >= 2) {
            clearInterval(intervalId)
          }
        }
        else {
          domElement.dispatchEvent(new Event("mouseover"))
          isMouseOver = true
          ++blinkTimes
        }
      }
      innerBlink()
      intervalId = setInterval(innerBlink, 1 * 1000)
    }
    if (webuser.isProductAdmin()) {
      const {getRoot} = await import("../catalog/categories.mjs")
      for (const cat of getRoot().getMainBranch().children) {
        blink((cat.firstElement))
      }
    }
    if (webuser.isWebAdmin()) {
      const {getRoot} = await import("../pages/pages.mjs")
      for (const menu of getRoot().getMainBranch().children) {
        blink((menu.firstElement))
      }
      blink(selectorFromAttr(window.document.firstElementChild, "data-site-title"))
    }
  }
  if (afterLogin == "checkout") {
    const {toCheckOut} = await import("../shop/ckt.mjs")
    await toCheckOut()
  }
  else if (afterLogin == "dashboard")
    await loginDashboard()
  // *** Tenemos la situación de que después del login la pantalla en la vista principal queda igual.
  //Pero un login debería alterar la vista principal (admn buts), por lo que sería interesante introducir una forma de refrescar la pantalla principal despues del login, quizas a través del modulo activeinsite
  else {
    // Check for private information at central content
    // *** we should transfer this to the check out, so it should happended at check out better
    if (getActiveInSite()==webuser)
      loginDashboard()
  }
}
//*** por hacer
async function loggedOut(afterLogin){

}

async function loginDashboard(){
  showUserMenu()
  // It could be convenient not to change the user screen, just show the menus, check this posibility
  const {userInfoView} = await import("./userdata.mjs")
  //new getSiteText().constructor.nodeConstructor().setView(document.getElementById("centralcontent"), "showuserinfo")
  document.getElementById("centralcontent").innerHTML = ""
  document.getElementById("centralcontent").appendChild(await userInfoView())
}

function dataError(err, formElement) {
  const errorKey = JSON.parse(err.message).errorKey
  if (errorKey=="user_name")
    document.createElement("alert-element").showMsg(getSiteText().getNextChild("logform").getNextChild("userCharError").getLangData(), 3000)
  else if (errorKey=="user_password")
    document.createElement("alert-element").showMsg(getSiteText().getNextChild("logform").getNextChild("pwdCharError").getLangData(), 3000)
  if (formElement.elements[errorKey])
    formElement.elements[errorKey].focus()
}