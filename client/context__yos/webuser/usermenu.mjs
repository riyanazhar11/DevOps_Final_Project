import {setActiveInSite} from "../activeingroup.mjs"
import {selectorFromAttr} from "../../frontutils.mjs" // (elm, attName, attValue)
import {getRoot as getSiteText} from "../sitecontent.mjs"
import {webuser} from "../webuser/webuser.mjs"
import {getTemplate} from '../layouts.mjs'

export async function userMenuView(hideUserMenu) { // mejor userMenuView
  const dashPath = getSiteText().getNextChild("dashboard")
  const userMenusTp = await getTemplate("usermenu")
  const menusContainer = selectorFromAttr(userMenusTp, "data-container")
  const closeButton = selectorFromAttr(menusContainer, "data-close")
  closeButton.addEventListener('click', hideUserMenu)
  const tpButton = selectorFromAttr(userMenusTp.querySelector("template").content, "data-container")

  const userInfoButton = tpButton.cloneNode(true)
  dashPath.getNextChild("btShowInfo").setContentView(userInfoButton)
  userInfoButton.addEventListener('click', async (ev)=>{
    ev.preventDefault()
    const {userInfoView} = await import("./userdata.mjs")
    document.getElementById("centralcontent").innerHTML=""
    document.getElementById("centralcontent").appendChild(await userInfoView(webuser))
    setActiveInSite(webuser)
  })
  menusContainer.appendChild(userInfoButton)

  const showordersButton = tpButton.cloneNode(true)
  dashPath.getNextChild("btShowOrd").setContentView(showordersButton)
  showordersButton.addEventListener('click', async (ev)=>{
    ev.preventDefault()
    const {orderListView} = await import("../shop/orderlist.mjs")
    document.getElementById("centralcontent").innerHTML=""
    document.getElementById("centralcontent").appendChild(await orderListView())
    setActiveInSite(webuser)
  })
  menusContainer.appendChild(showordersButton)
  
  const showaddressButton = tpButton.cloneNode(true)
  dashPath.getNextChild("btShowAdd").setContentView(showaddressButton)
  showaddressButton.addEventListener('click', async (ev)=>{
    ev.preventDefault()
    const {userAddressView} = await import("./userdata.mjs")
    document.getElementById("centralcontent").innerHTML=""
    document.getElementById("centralcontent").appendChild(await userAddressView(webuser))
    setActiveInSite(webuser)
  })
  menusContainer.appendChild(showaddressButton)
  
  const changePwdButton = tpButton.cloneNode(true)
  dashPath.getNextChild("btChangePwd").setContentView(changePwdButton)
  changePwdButton.addEventListener('click', async (ev)=>{
    ev.preventDefault()
    const {changePwdView} = await import("./changepwds.mjs")
    document.getElementById("centralcontent").innerHTML=""
    document.getElementById("centralcontent").appendChild(await changePwdView(webuser))
    setActiveInSite(webuser)
  })
  menusContainer.appendChild(changePwdButton)

  if (webuser.isSystemAdmin()) {
    const changePwdsButton = tpButton.cloneNode(true)
    dashPath.getNextChild("btChangePwd").setContentView(changePwdsButton)
    changePwdsButton.addEventListener('click', async (ev)=>{
      ev.preventDefault()
      const {changePwdsView} = await import("./changepwds.mjs")
      document.getElementById("centralcontent").innerHTML=""
      document.getElementById("centralcontent").appendChild(await changePwdsView())
      setActiveInSite(webuser)
    })
    menusContainer.appendChild(changePwdsButton)

    const expButton = tpButton.cloneNode(true)
    dashPath.getNextChild("expimp").getNextChild("butexp").setContentView(expButton)
    expButton.addEventListener('click', async (ev)=>{
      ev.preventDefault()
      const {exportView} = await import("../admin/export.mjs")
      document.getElementById("centralcontent").innerHTML=""
      document.getElementById("centralcontent").appendChild(await exportView())
      setActiveInSite(webuser)
    })
    menusContainer.appendChild(expButton)
  }

  const logOutButton = tpButton.cloneNode(true)
  dashPath.getNextChild("btLogOut").setContentView(logOutButton)
  logOutButton.addEventListener('click', async ()=>{
    await webuser.logout()
    hideUserMenu()
  })
  menusContainer.appendChild(logOutButton)

  return userMenusTp
}

/*
  // --------

  basicPath.getNextChild("btShowInfo").appendView(thisElement, 'stdbutton', {container:  buttonsTarget, component: "showuserinfo",  launcher: basicPath});
  basicPath.getNextChild("btShowOrd").appendView(thisElement, 'stdbutton', {container:  buttonsTarget, component: "showorders", launcher: basicPath.getNextChild("showOrd")});
  basicPath.getNextChild("btShowAdd").appendView(thisElement, 'stdbutton', {container:  buttonsTarget, component: "showaddress", launcher: basicPath});
  basicPath.getNextChild("btChangePwd").appendView(thisElement, 'stdbutton', {container:  buttonsTarget, component: "changepwd", launcher: basicPath.getNextChild("changepwd")});
  if (webuser.isWebAdmin()) {
    basicPath.getNextChild("extraEdition").appendView(thisElement, 'stdbutton', {container:  buttonsTarget, component: "extraedition"});
  }
  if (webuser.isWebAdmin() || webuser.isProductAdmin()) {
    basicPath.getNextChild("textEdit").appendView(thisElement, 'stdbutton', {container:  buttonsTarget, component: "texteditor", launcher: basicPath.getNextChild("textEdit")});
  }
  if (webuser.isSystemAdmin()) {
    basicPath.getNextChild("expimp").getNextChild("butexp").appendView(thisElement, 'stdbutton', {container:  buttonsTarget, component: "export",  launcher: basicPath.getNextChild("expimp")});
    basicPath.getNextChild("expimp").getNextChild("butimp").appendView(thisElement, 'stdbutton', {container:  buttonsTarget, component: "import",  launcher: basicPath.getNextChild("expimp")});
    const langPath=thisNode.parent.getChild("langbox");
    langPath.getNextChild("langboxtt").appendView(thisElement, 'stdbutton', {container:  buttonsTarget, component: "languages", launcher: langPath});
  }

//getSiteText().getNextChild("dashboard").setView(document.getElementById("dashmenu"), "usermenu")
*/

/*

      const {getActiveInGroup} = await import('./' + CLIENT_MODULES_PATH + 'activelauncher.mjs');
      const {default: config} = await import(pathJoin('./', CLIENT_CONFIG_PATH, 'main.mjs'));
      const {pageText} = await import(pathJoin('./', CLIENT_MODULES_PATH, 'pagescontent.mjs'));
      const {dispatchPopStateEvent} = await import(pathJoin('./', CLIENT_MODULES_PATH, 'navhistory.mjs'));
      const myTxtNode=thisNode.getNextChild("btLogOut").getRelationship("siteelementsdata").getChild();

      myTxtNode.writeProp(thisElement);
      thisElement.onclick=function(){
        document.getElementById("dashmenu").style.transform="translateY(-15px)";
        webuser.logout();
        if (localStorage.getItem("user_name")) localStorage.removeItem("user_name"); //stay logged => not anymore
        // removing log screen
        if (!getActiveInGroup('centralcontent')?.parent?.props.childTableName.match(/ItemCategories|PageElements/)) {
          if (config.initUrlSearch) {
            dispatchPopStateEvent(config.initUrlSearch);
            return;
          }
          const menusMother=pageText.getRelationship();
          if (menusMother.getChild()) {
            dispatchPopStateEvent('?menu=' + menusMother.getChild().props.id);
            return;
          }
          document.getElementById('centralcontent').innerHTML='';
        }
        // thisNode.parent.getChild("logform").appendView(document.body, "loginframe");
      }
      //adding the edition pencil
      if (webuser.isWebAdmin()) {
        const {visibleOnMouseOver}=await import('./' + CLIENT_MODULES_PATH + 'frontutils.mjs');
        visibleOnMouseOver(thisElement.parentElement.querySelector('[data-id=butedit]'), thisElement.parentElement);
        myTxtNode.appendView(thisElement.parentElement.querySelector('[data-id=butedit]'), "butedit", {editElement: thisElement});
      }
      */