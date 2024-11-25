import{an as A,p as f,aV as X,am as Z,l as q,a7 as T,a8 as v,m,s as J,as as K,n as L,d as B,ap as x,aW as ee,aX as w,aY as te,Y as ne,u as oe,aZ as ue,E as ae,aT as E,a_ as le,ae as re,a$ as se,o as R,c as D,g as $}from"./index-4789ca0a.js";import{u as fe}from"./app-803627bb.js";function ie(){const{$storage:t,$config:e}=A(),o=()=>{X().multiTagsCache&&(!t.tags||t.tags.length===0)&&(t.tags=Z),t.layout||(t.layout={layout:(e==null?void 0:e.Layout)??"vertical",theme:(e==null?void 0:e.Theme)??"default",darkMode:(e==null?void 0:e.DarkMode)??!1,sidebarStatus:(e==null?void 0:e.SidebarStatus)??!0,epThemeColor:(e==null?void 0:e.EpThemeColor)??"#409EFF"}),t.configure||(t.configure={grey:(e==null?void 0:e.Grey)??!1,weak:(e==null?void 0:e.Weak)??!1,hideTabs:(e==null?void 0:e.HideTabs)??!1,showLogo:(e==null?void 0:e.ShowLogo)??!0,showModel:(e==null?void 0:e.ShowModel)??"smart",multiTagsCache:(e==null?void 0:e.MultiTagsCache)??!1})},n=f(()=>t==null?void 0:t.layout.layout),u=f(()=>t.layout);return{layout:n,layoutTheme:u,initStorage:o}}const de=q({id:"pure-epTheme",state:()=>{var t,e;return{epThemeColor:((t=T().getItem(`${v()}layout`))==null?void 0:t.epThemeColor)??m().EpThemeColor,epTheme:((e=T().getItem(`${v()}layout`))==null?void 0:e.theme)??m().Theme}},getters:{getEpThemeColor(t){return t.epThemeColor},fill(t){return t.epTheme==="light"?"#409eff":t.epTheme==="yellow"?"#d25f00":"#fff"}},actions:{setEpThemeColor(t){const e=T().getItem(`${v()}layout`);this.epTheme=e==null?void 0:e.theme,this.epThemeColor=t,e&&(e.epThemeColor=t,T().setItem(`${v()}layout`,e))}}});function k(){return de(J)}const S={outputDir:"",defaultScopeName:"",includeStyleWithColors:[],extract:!0,themeLinkTagId:"theme-link-tag",themeLinkTagInjectTo:"head",removeCssScopeName:!1,customThemeCssFileName:null,arbitraryMode:!1,defaultPrimaryColor:"",customThemeOutputPath:"D:/DevSpace/WebstormProjects/node_modules/.pnpm/@pureadmin+theme@3.1.0/node_modules/@pureadmin/theme/setCustomTheme.js",styleTagId:"custom-theme-tagid",InjectDefaultStyleTagToHtml:!0,hueDiffControls:{low:0,high:0},multipleScopeVars:[{scopeName:"layout-theme-default",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #001529 !default;
        $menuHover: #4091f7 !default;
        $subMenuBg: #0f0303 !default;
        $subMenuActiveBg: #4091f7 !default;
        $menuText: rgb(254 254 254 / 65%) !default;
        $sidebarLogo: #002140 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #4091f7 !default;
      `},{scopeName:"layout-theme-light",varsContent:`
        $subMenuActiveText: #409eff !default;
        $menuBg: #fff !default;
        $menuHover: #e0ebf6 !default;
        $subMenuBg: #fff !default;
        $subMenuActiveBg: #e0ebf6 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #fff !default;
        $menuTitleHover: #000 !default;
        $menuActiveBefore: #4091f7 !default;
      `},{scopeName:"layout-theme-dusk",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #2a0608 !default;
        $menuHover: #e13c39 !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #e13c39 !default;
        $menuText: rgb(254 254 254 / 65.1%) !default;
        $sidebarLogo: #42090c !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #e13c39 !default;
      `},{scopeName:"layout-theme-volcano",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #2b0e05 !default;
        $menuHover: #e85f33 !default;
        $subMenuBg: #0f0603 !default;
        $subMenuActiveBg: #e85f33 !default;
        $menuText: rgb(254 254 254 / 65%) !default;
        $sidebarLogo: #441708 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #e85f33 !default;
      `},{scopeName:"layout-theme-yellow",varsContent:`
        $subMenuActiveText: #d25f00 !default;
        $menuBg: #2b2503 !default;
        $menuHover: #f6da4d !default;
        $subMenuBg: #0f0603 !default;
        $subMenuActiveBg: #f6da4d !default;
        $menuText: rgb(254 254 254 / 65%) !default;
        $sidebarLogo: #443b05 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #f6da4d !default;
      `},{scopeName:"layout-theme-mingQing",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #032121 !default;
        $menuHover: #59bfc1 !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #59bfc1 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #053434 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #59bfc1 !default;
      `},{scopeName:"layout-theme-auroraGreen",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #0b1e15 !default;
        $menuHover: #60ac80 !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #60ac80 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #112f21 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #60ac80 !default;
      `},{scopeName:"layout-theme-pink",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #28081a !default;
        $menuHover: #d84493 !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #d84493 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #3f0d29 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #d84493 !default;
      `},{scopeName:"layout-theme-saucePurple",varsContent:`
        $subMenuActiveText: #fff !default;
        $menuBg: #130824 !default;
        $menuHover: #693ac9 !default;
        $subMenuBg: #000 !default;
        $subMenuActiveBg: #693ac9 !default;
        $menuText: #7a80b4 !default;
        $sidebarLogo: #1f0c38 !default;
        $menuTitleHover: #fff !default;
        $menuActiveBefore: #693ac9 !default;
      `}]},ce="./",me="assets";function O(t){let e=t.replace("#","").match(/../g);for(let o=0;o<3;o++)e[o]=parseInt(e[o],16);return e}function j(t,e,o){let n=[t.toString(16),e.toString(16),o.toString(16)];for(let u=0;u<3;u++)n[u].length==1&&(n[u]=`0${n[u]}`);return`#${n.join("")}`}function he(t,e){let o=O(t);for(let n=0;n<3;n++)o[n]=Math.floor(o[n]*(1-e));return j(o[0],o[1],o[2])}function ge(t,e){let o=O(t);for(let n=0;n<3;n++)o[n]=Math.floor((255-o[n])*e+o[n]);return j(o[0],o[1],o[2])}function _(t){return`(^${t}\\s+|\\s+${t}\\s+|\\s+${t}$|^${t}$)`}function N({scopeName:t,multipleScopeVars:e}){const o=Array.isArray(e)&&e.length?e:S.multipleScopeVars;let n=document.documentElement.className;new RegExp(_(t)).test(n)||(o.forEach(u=>{n=n.replace(new RegExp(_(u.scopeName),"g"),` ${t} `)}),document.documentElement.className=n.replace(/(^\s+|\s+$)/g,""))}function P({id:t,href:e}){const o=document.createElement("link");return o.rel="stylesheet",o.href=e,o.id=t,o}function pe(t){const e={scopeName:"theme-default",customLinkHref:s=>s,...t},o=e.themeLinkTagId||S.themeLinkTagId;let n=document.getElementById(o);const u=e.customLinkHref(`${ce.replace(/\/$/,"")}${`/${me}/${e.scopeName}.css`.replace(/\/+(?=\/)/g,"")}`);if(n){n.id=`${o}_old`;const s=P({id:o,href:u});n.nextSibling?n.parentNode.insertBefore(s,n.nextSibling):n.parentNode.appendChild(s),s.onload=()=>{setTimeout(()=>{n.parentNode.removeChild(n),n=null},60),N(e)};return}n=P({id:o,href:u}),N(e),document[(e.themeLinkTagInjectTo||S.themeLinkTagInjectTo||"").replace("-prepend","")].appendChild(n)}K();function Le(){var i;const{layoutTheme:t,layout:e}=ie(),o=L([{color:"#1b2a47",themeColor:"default"},{color:"#ffffff",themeColor:"light"},{color:"#f5222d",themeColor:"dusk"},{color:"#fa541c",themeColor:"volcano"},{color:"#fadb14",themeColor:"yellow"},{color:"#13c2c2",themeColor:"mingQing"},{color:"#52c41a",themeColor:"auroraGreen"},{color:"#eb2f96",themeColor:"pink"},{color:"#722ed1",themeColor:"saucePurple"}]),{$storage:n}=A(),u=L((i=n==null?void 0:n.layout)==null?void 0:i.darkMode),s=document.documentElement;function c(r=m().Theme??"default"){var l,d;if(t.value.theme=r,pe({scopeName:`layout-theme-${r}`}),n.layout={layout:e.value,theme:r,darkMode:u.value,sidebarStatus:(l=n.layout)==null?void 0:l.sidebarStatus,epThemeColor:(d=n.layout)==null?void 0:d.epThemeColor},r==="default"||r==="light")h(m().EpThemeColor);else{const y=o.value.find(C=>C.themeColor===r);h(y.color)}}function g(r,l,d){document.documentElement.style.setProperty(`--el-color-primary-${r}-${l}`,u.value?he(d,l/10):ge(d,l/10))}const h=r=>{k().setEpThemeColor(r),document.documentElement.style.setProperty("--el-color-primary",r);for(let l=1;l<=2;l++)g("dark",l,r);for(let l=1;l<=9;l++)g("light",l,r)};function b(){k().epTheme==="light"&&u.value?c("default"):c(k().epTheme),u.value?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}return{body:s,dataTheme:u,layoutTheme:t,themeColors:o,dataThemeChange:b,setEpThemeColor:h,setLayoutThemeColor:c}}function we(t,e){const o=/^IF-/;if(o.test(t)){const n=t.split(o)[1],u=n.slice(0,n.indexOf(" ")==-1?n.length:n.indexOf(" ")),s=n.slice(n.indexOf(" ")+1,n.length);return B({name:"FontIcon",render(){return x(ee,{icon:u,iconType:s,...e})}})}else return typeof t=="function"||typeof(t==null?void 0:t.render)=="function"?t:typeof t=="object"?B({name:"OfflineIcon",render(){return x(w,{icon:t,...e})}}):B({name:"Icon",render(){const n=t&&t.includes(":")?te:w;return x(n,{icon:t,...e})}})}function Te(t){return{all:t=t||new Map,on:function(e,o){var n=t.get(e);n?n.push(o):t.set(e,[o])},off:function(e,o){var n=t.get(e);n&&(o?n.splice(n.indexOf(o)>>>0,1):t.set(e,[]))},emit:function(e,o){var n=t.get(e);n&&n.slice().map(function(u){u(o)}),(n=t.get("*"))&&n.slice().map(function(u){u(e,o)})}}}const z=Te(),ve="当前路由配置不正确，请检查配置";function Ee(){var H;const t=ne(),e=fe(),o=oe().options.routes,{wholeMenus:n}=ue(ae()),u=((H=m())==null?void 0:H.TooltipEffect)??"light",s=f(()=>({width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",overflow:"hidden"})),c=f(()=>{var a;return(a=E())==null?void 0:a.username}),g=f(()=>c.value?{marginRight:"10px"}:""),h=f(()=>!e.getSidebarStatus),b=f(()=>e.getDevice),{$storage:i,$config:r}=A(),l=f(()=>{var a;return(a=i==null?void 0:i.layout)==null?void 0:a.layout}),d=f(()=>r.Title);function y(a){const p=m().Title;p?document.title=`${a.title} | ${p}`:document.title=a.title}function C(){E().logOut()}function F(){var a;le.push((a=re())==null?void 0:a.path)}function V(){z.emit("openPanel")}function W(){e.toggleSideBar()}function G(a){a==null||a.handleResize()}function Y(a){var I;if(!a.children)return console.error(ve);const p=/^http(s?):\/\//,M=(I=a.children[0])==null?void 0:I.path;return p.test(M)?a.path+"/"+M:M}function Q(a){n.value.length===0||U(a)||z.emit("changLayoutRoute",a)}function U(a){return se.includes(a)}return{route:t,title:d,device:b,layout:l,logout:C,routers:o,$storage:i,backTopMenu:F,onPanel:V,getDivStyle:s,changeTitle:y,toggleSideBar:W,menuSelect:Q,handleResize:G,resolvePath:Y,isCollapse:h,pureApp:e,username:c,avatarsStyle:g,tooltipEffect:u}}const $e={xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24"},be=$("path",{fill:"none",d:"M0 0h24v24H0z"},null,-1),ye=$("path",{d:"M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85 1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"},null,-1),Ce=[be,ye];function Me(t,e){return R(),D("svg",$e,Ce)}const _e={render:Me},Be={xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24"},xe=$("path",{fill:"none",d:"M0 0h24v24H0z"},null,-1),ke=$("path",{d:"M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z"},null,-1),Se=[xe,ke];function Ae(t,e){return R(),D("svg",Be,Se)}const Ne={render:Ae};export{we as a,Ee as b,Le as c,_e as d,z as e,Ne as f,ie as g,pe as t,k as u};
