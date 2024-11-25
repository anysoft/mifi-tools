import{T as L}from"./index-296c76cc.js";import{d as W,n as V,a3 as B,t as $,M as j,r as s,b as F,o as _,c as A,e as a,j as l,w,i as P,f as N,g as K,B as H,h as m,K as f,S as q,_ as z}from"./index-4789ca0a.js";import{E as J}from"./el-message-box-ecaf3f80.js";const O={class:"form-container"},Q=W({name:"route",__name:"route",setup(X){const k=V(["1"]),T=V();let h=V(!0);const e=B({lan_ipaddr:"",lan_netmask:"",dhcpEnabled:"",dhcpStart:"",dhcpEnd:"",dhcpLease_hour:""});let v=V();$(()=>{j("cmd=lan_ipaddr%2Clan_netmask%2Cmac_address%2CdhcpEnabled%2CdhcpStart%2CdhcpEnd%2CdhcpLease_hour&multi_data=1").then(n=>{v.value=n,e.dhcpEnd=n.dhcpEnd,e.dhcpStart=n.dhcpStart,e.lan_ipaddr=n.lan_ipaddr,e.lan_netmask=n.lan_netmask,e.dhcpLease_hour=n.dhcpLease_hour,e.dhcpEnabled=n.dhcpEnabled=="1"?"启用":"关闭",h.value=!1})});const I=(n,t,r)=>{if(!t)return r(new Error("请输入正确的IP"));var o=/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;const d=t.split(".");for(var u=0;u<d.length;u++){const i=parseInt(d[u],10);if(i<0||i>255)return r(new Error("请输入正确的IP"))}if(!o.test(t))r(new Error("IP格式错误")),k.value=["1"];else return!0},U=B({lan_ipaddr:[{validator:I,trigger:"blur"}],dhcpStart:[{validator:I,trigger:"blur"}],dhcpEnd:[{validator:I,trigger:"blur"}],lan_netmask:[{validator:I,trigger:"blur"}]}),R=n=>{n&&(n.clearValidate(),n.validate(t=>{if(t){const r=e.dhcpEnabled=="启用"?"1":"0";if(e.lan_ipaddr==v.value.lan_ipaddr&&e.lan_netmask==v.value.lan_netmask&&r==v.value.dhcpEnabled&&e.dhcpStart==v.value.dhcpStart&&e.dhcpLease_hour==v.value.dhcpLease_hour){f("未修改内容",{type:"warning"});return}if(!G(e.dhcpStart,e.dhcpEnd)){f("开始ip不能大于结束ip",{type:"warning"});return}if(!M(e.lan_ipaddr,e.dhcpStart,e.dhcpEnd,e.lan_netmask)&&r=="1"){f("DHCP地址池不在你设置的IP段里面",{type:"warning"});return}let o;r=="0"?o={goformId:"DHCP_SETTING",lanIp:e.lan_ipaddr,lanNetmask:e.lan_netmask,lanDhcpType:"DISABLE",dhcp_reboot_flag:"1"}:o={goformId:"DHCP_SETTING",lanIp:e.lan_ipaddr,lanNetmask:e.lan_netmask,lanDhcpType:"SERVER",dhcpStart:e.dhcpStart,dhcpEnd:e.dhcpEnd,dhcpLease:e.dhcpLease_hour,dhcp_reboot_flag:"1"},J.confirm("该操作会重启设备，需要继续吗？",{confirmButtonText:"继续",cancelButtonText:"取消",type:"warning"}).then(()=>{h.value=!0,q(o).then(d=>{d.result=="success"?(h.value=!1,f("成功发送请求",{type:"success"})):(h.value=!1,f("操作失败",{type:"error"}))}).catch(d=>{h.value=!1,f("请求失败",{type:"error"})})}).catch(()=>{})}else return f("请检查表单内容",{type:"error"}),!1}))};function M(n,t,r,o){var d=n.split("."),u=t.split("."),i=r.split("."),D=o.split("."),g=E(d),C=E(u),c=E(i),b=E(D),S=C&b,x=c&b,y=g&b;return y>=S&&y<=x}function E(n){for(var t=0,r=0;r<4;r++)t=(t<<8)+parseInt(n[r],10);return t}function G(n,t){for(var r=n.split("."),o=t.split("."),d=0;d<4;d++){var u=parseInt(r[d],10),i=parseInt(o[d],10);if(u>i)return!1}return!0}return(n,t)=>{const r=s("el-input"),o=s("el-form-item"),d=s("el-radio"),u=s("el-radio-group"),i=s("el-button"),D=s("el-form"),g=s("el-card"),C=s("el-col"),c=s("el-collapse-item"),b=s("el-collapse"),S=s("el-row"),x=F("loading"),y=F("motion");return _(),A("div",null,[a(S,{gutter:24},{default:l(()=>[w((_(),P(C,{xs:24,sm:24,md:16,lg:16,xl:16,class:"mb-[5px]",initial:{opacity:0,y:100},enter:{opacity:1,y:0,transition:{delay:200}}},{default:l(()=>[w((_(),P(g,{shadow:"never"},{header:l(()=>[a(N(L),{className:"type-it1",values:["Wi-Fi 路由设置"],cursor:!1,speed:60})]),default:l(()=>[K("div",O,[a(D,{ref_key:"ruleFormRef",ref:T,model:e,rules:U,"status-icon":"","label-width":"120px",class:"demo-ruleForm","label-position":"left"},{default:l(()=>[a(o,{label:"IP地址",prop:"lan_ipaddr"},{default:l(()=>[a(r,{modelValue:e.lan_ipaddr,"onUpdate:modelValue":t[0]||(t[0]=p=>e.lan_ipaddr=p),type:"text",autocomplete:"off"},null,8,["modelValue"])]),_:1}),a(o,{label:"子网掩码",prop:"lan_netmask"},{default:l(()=>[a(r,{modelValue:e.lan_netmask,"onUpdate:modelValue":t[1]||(t[1]=p=>e.lan_netmask=p),type:"text",autocomplete:"off"},null,8,["modelValue"])]),_:1}),a(o,{label:"DHCP服务"},{default:l(()=>[a(u,{modelValue:e.dhcpEnabled,"onUpdate:modelValue":t[2]||(t[2]=p=>e.dhcpEnabled=p)},{default:l(()=>[a(d,{border:"",label:"启用"}),a(d,{border:"",label:"关闭"})]),_:1},8,["modelValue"])]),_:1}),e.dhcpEnabled=="启用"?(_(),P(o,{key:0,label:"DHCP IP池-开始",prop:"dhcpStart"},{default:l(()=>[a(r,{modelValue:e.dhcpStart,"onUpdate:modelValue":t[3]||(t[3]=p=>e.dhcpStart=p),type:"text",autocomplete:"off"},null,8,["modelValue"])]),_:1})):H("",!0),e.dhcpEnabled=="启用"?(_(),P(o,{key:1,label:"DHCP IP池-结束",prop:"dhcpEnd"},{default:l(()=>[a(r,{modelValue:e.dhcpEnd,"onUpdate:modelValue":t[4]||(t[4]=p=>e.dhcpEnd=p),type:"text",autocomplete:"off"},null,8,["modelValue"])]),_:1})):H("",!0),e.dhcpEnabled=="启用"?(_(),P(o,{key:2,label:"DHCP租期",prop:"dhcp_time"},{default:l(()=>[a(r,{modelValue:e.dhcpLease_hour,"onUpdate:modelValue":t[5]||(t[5]=p=>e.dhcpLease_hour=p),type:"number",autocomplete:"off"},{append:l(()=>[m(" 小时 ")]),_:1},8,["modelValue"])]),_:1})):H("",!0),a(o,{class:"form-buttons"},{default:l(()=>[a(i,{type:"primary",onClick:t[6]||(t[6]=p=>R(T.value))},{default:l(()=>[m("应用")]),_:1})]),_:1}),a(i,{style:{visibility:"hidden"}})]),_:1},8,["model","rules"])])]),_:1})),[[x,N(h)]])]),_:1})),[[y]]),w((_(),P(C,{xs:24,sm:24,md:8,lg:8,xl:8,class:"mb-[5px]",initial:{opacity:0,y:100},enter:{opacity:1,y:0,transition:{delay:200}}},{default:l(()=>[a(g,{shadow:"never"},{header:l(()=>[a(N(L),{className:"type-it2",values:["Wi-Fi 路由设置帮助"],cursor:!1,speed:60})]),default:l(()=>[a(b,{modelValue:k.value,"onUpdate:modelValue":t[7]||(t[7]=p=>k.value=p)},{default:l(()=>[a(c,{title:"IP 地址",name:"1"},{default:l(()=>[m(" 路由器局域网的IP地址，使用该IP地址可以通过浏览器管理设备。 ")]),_:1}),a(c,{title:"子网掩码",name:"2"},{default:l(()=>[m(" 对应 IP 地址的子网掩码 ")]),_:1}),a(c,{title:"DHCP服务启用",name:"3"},{default:l(()=>[m(" 如果开启DHCP（Dynamic Host Configuration Protocol，动态主机配置协议）服务，设备将会为所连接的客户端自动分配IP地址。 ")]),_:1}),a(c,{title:"DHCP服务关闭",name:"4"},{default:l(()=>[m(" 如果关闭DHCP服务，设备将不会为连接的客户端自动分配IP地址，客户端必须手动输入IP地址。 ")]),_:1}),a(c,{title:"DHCP IP 池",name:"5"},{default:l(()=>[m(" 起始IP地址和终止IP地址指定了DHCP服务器分配给接入设备的IP地址范围。这个范围之外的地址不能由DHCP服务器分配。 ")]),_:1}),a(c,{title:"DHCP 租期时间",name:"6"},{default:l(()=>[m(" 租期时间表示计算机获取IP地址后可以使用这个IP地址的期限，到达租期时间后，如果客户端需要继续使用这个地址，必须在到期前重新发起请求。只有当原来的客户端租期到期并且不再发起续租请求时，这个地址才能分配给其他客户端使用。 ")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})),[[y]])]),_:1})])}}});const te=z(Q,[["__scopeId","data-v-ed6ce6b1"]]);export{te as default};