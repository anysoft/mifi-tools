define("service", "underscore jquery set CryptoJS".split(" "), function (cg, cO, aF, bv) {
    function bb(c9, c8) {
        if (cg.isArray(c9)) {
            for (var da = 0; da < c9.length; da++) {
                cZ(c9[da])
            }
        } else {
            cZ(c9)
        }
        cP(c8)
    }

    function m(c9, c8) {
        if (cg.isArray(c9)) {
            for (var da = 0; da < c9.length; da++) {
                bp(c9[da])
            }
        } else {
            bp(c9)
        }
        B(c8)
    }

    function aP() {
        return a0({}).get_user_mac_addr
    }

    function bU(c8, db) {
        return by(arguments, {}, c9, da, null, false);

        function c9(dc, dd) {
            return {
                multi_data: 1,
                cmd: "DDNS_Enable,DDNS_Mode,DDNSProvider,DDNSAccount,DDNSPassword,DDNS,DDNS_Hash_Value"
            }
        }

        function da(dc) {
            if (dc) {
                return {
                    DDNS_Enable: dc.DDNS_Enable,
                    DDNS_Mode: dc.DDNS_Mode,
                    DDNSProvider: dc.DDNSProvider,
                    DDNSAccount: dc.DDNSAccount,
                    DDNSPassword: dc.DDNSPassword,
                    DDNS: dc.DDNS,
                    DDNS_Hash_Value: dc.DDNS_Hash_Value
                }
            } else {
                return V
            }
        }
    }

    function aQ() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = cO.extend({}, da);
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function cj() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "modem_main_state,puknumber,pinnumber,blc_wan_mode,blc_wan_auto_mode,psw_fail_num_str,login_lock_time,psw_changed";
            dc.multi_data = 1;
            return dc
        }

        function c9(da) {
            if (da) {
                if (da.blc_wan_mode == "AUTO") {
                    da.blc_wan_mode = da.blc_wan_auto_mode ? da.blc_wan_auto_mode : "AUTO_PPP"
                } else {
                    da.blc_wan_mode = da.blc_wan_mode ? da.blc_wan_mode : "PPP"
                }
                da.psw_fail_num_str = da.psw_fail_num_str == "" ? aF.MAX_LOGIN_COUNT : da.psw_fail_num_str;
                da.login_lock_time = da.login_lock_time == "" ? "300" : da.login_lock_time;
                return da
            } else {
                return V
            }
        }
    }

    function aM() {
        return by(arguments, {}, c8, c9, {errorType: "badPassword"}, true);

        function c8(da, db) {
            var dc = {goformId: "LOGIN", password: aF.PASSWORD_ENCODE ? Base64.encode(da.password) : da.password};
            return dc
        }

        function c9(da) {
            if (da && (da.result == "0" || da.result == "4")) {
                bu.isLoggedIn = true;
                return {result: true}
            } else {
                var db = {};
                switch (da.result) {
                    case"1":
                        db = {errorType: "Login Fail"};
                        break;
                    case"2":
                        db = {errorType: "duplicateUser"};
                        break;
                    case"3":
                        db = {errorType: "badPassword"};
                        break;
                    default:
                        db = {errorType: "Login Fail"};
                        break
                }
                bu.isLoggedIn = false;
                return cO.extend(V, db)
            }
        }
    }

    function bM() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "current_Password,admin_Password,root_Password";
            dc.multi_data = 1;
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {};
                da.CurrentPasswd = db.current_Password;
                da.AdminPasswd = db.admin_Password;
                da.RootPasswd = db.root_Password;
                return da
            } else {
                return V
            }
        }
    }

    function bd() {
        if (bu.isLoggedIn != undefined) {
            return by(arguments, {status: bu.isLoggedIn ? "loggedIn" : "loggedOut"})
        } else {
            var da = {};
            if (!aF.HAS_LOGIN) {
                da.status = "loggedIn";
                da.errorType = "no_login";
                bu.isLoggedIn = true
            }
            return by(arguments, da, c8, c9, null, false)
        }

        function c8(db, dc) {
            var dd = {};
            dd.cmd = "loginfo";
            dd.multi_data = 1;
            return dd
        }

        function c9(dc) {
            if (dc && dc.loginfo || dc.loginfo == "") {
                var db = {};
                switch (dc.loginfo) {
                    case"ok":
                        bu.isLoggedIn = true;
                        db.status = "loggedIn";
                        break;
                    default:
                        bu.isLoggedIn = false;
                        db.status = "loggedOut";
                        break
                }
                return db
            } else {
                bu.isLoggedIn = undefined;
                return cO.extend(V, {errorType: "LoginStatusError"})
            }
        }
    }

    function I() {
        return by(arguments, {}, c8, c9, {}, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "ENTER_PIN";
            dc.PinNumber = da.PinNumber;
            return dc
        }

        function c9(da) {
            if (da && da.result === "success") {
                return {result: true}
            } else {
                return {result: false}
            }
        }
    }

    function S() {
        return by(arguments, {}, c8, c9, {}, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "ENTER_PUK";
            dc.PUKNumber = da.PUKNumber;
            dc.PinNumber = da.PinNumber;
            return dc
        }

        function c9(da) {
            if (da && da.result === "success") {
                return {result: true}
            } else {
                return {result: false}
            }
        }
    }

    function cp() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "get_support_band";
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {};
                da = db;
                return da
            } else {
                return V
            }
        }
    }

    function N() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "set_band_list";
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {};
                da = db;
                return da
            } else {
                return V
            }
        }
    }

    function cu() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da) {
            var db = cO.extend({goformId: "GOFORM_SET_BAND"}, da);
            return db
        }

        function c9(da) {
            if (da && da.result == "success") {
                return da
            } else {
                return V
            }
        }
    }

    function cx() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "ttl_value";
            dc.multi_data = 1;
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {};
                da.ttlValue = db.ttl_value;
                return da
            } else {
                return V
            }
        }
    }

    function br() {
        return by(arguments, {}, c8, c9, {}, true);

        function c8(da) {
            var db = {};
            db.goformId = "TTL_VALUE_SET";
            db.webttl_value = da;
            return db
        }

        function c9(da) {
            if (da && da.result === "success") {
                return {result: true}
            } else {
                return {result: false}
            }
        }
    }

    function bI() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "GET_RESIDE_BAND";
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {reside_band: db.result};
                return da
            } else {
                return V
            }
        }
    }

    function e() {
        if (bu.isLoggedIn === undefined) {
            var c8 = bd();
            return {
                networkType: bu.networkType,
                signalImg: bu.signalImg,
                networkOperator: bu.networkOperator,
                spn_b1_flag: bu.spn_b1_flag,
                spn_name_data: bu.spn_name_data,
                spn_b2_flag: bu.spn_b2_flag,
                connectStatus: bu.connectStatus,
                rj45ConnectStatus: bu.rj45ConnectStatus,
                ssid1AttachedNum: bu.ssid1AttachedNum,
                ssid2AttachedNum: bu.ssid2AttachedNum,
                wirelessDeviceNum: bu.ssid1AttachedNum + bu.ssid2AttachedNum,
                roamingStatus: bu.roamingStatus,
                wifiStatus: bu.wifiStatus,
                simStatus: bu.simStatus,
                pinStatus: bu.pinStatus,
                batteryStatus: bu.batteryStatus,
                batteryShow: bu.batteryShow,
                batteryLevel: bu.batteryLevel,
                batteryPers: bu.batteryPers,
                batteryTime: bu.batteryTime,
                ssid: bu.ssid,
                authMode: bu.authMode,
                data_counter: bu.data_counter,
                isLoggedIn: c8.status == "loggedIn",
                newSmsReceived: bu.newSmsReceived,
                smsReportReceived: bu.smsReportReceived,
                smsUnreadCount: bu.smsUnreadCount,
                limitVolumeEnable: bu.limitVolumeEnable,
                limitVolumeType: bu.limitVolumeType,
                limitVolumePercent: bu.limitVolumePercent,
                limitVolumeSize: bu.limitVolumeSize,
                connectWifiProfile: bu.connectWifiProfile,
                connectWifiSSID: bu.connectWifiSSID,
                connectWifiStatus: bu.connectWifiStatus,
                multi_ssid_enable: bu.multi_ssid_enable,
                roamMode: bu.roamMode,
                blc_wan_mode: bu.blc_wan_mode,
                current_upgrade_state: bu.current_upgrade_state,
                is_mandatory: bu.is_mandatory,
                new_version_state: bu.new_version_state,
                allowRoamingUpdate: bu.allowRoamingUpdate,
                ap_station_enable: bu.ap_station_enable,
                ap_station_mode: bu.ap_station_mode,
                dialMode: bu.dialMode,
                fota_package_already_download: bu.fota_package_already_download,
                ethWanMode: bu.ethWanMode,
                fota_user_selector: bu.fota_user_selector,
                defaultWanName: bu.defaultWanName
            }
        }
        return {
            networkType: bu.networkType,
            signalImg: bu.signalImg,
            networkOperator: bu.networkOperator,
            spn_b1_flag: bu.spn_b1_flag,
            spn_name_data: bu.spn_name_data,
            spn_b2_flag: bu.spn_b2_flag,
            connectStatus: bu.connectStatus,
            rj45ConnectStatus: bu.rj45ConnectStatus,
            ssid1AttachedNum: bu.ssid1AttachedNum,
            ssid2AttachedNum: bu.ssid2AttachedNum,
            wirelessDeviceNum: bu.ssid1AttachedNum + bu.ssid2AttachedNum,
            roamingStatus: bu.roamingStatus,
            wifiStatus: bu.wifiStatus,
            simStatus: bu.simStatus,
            pinStatus: bu.pinStatus,
            batteryStatus: bu.batteryStatus,
            batteryShow: bu.batteryShow,
            batteryLevel: bu.batteryLevel,
            batteryPers: bu.batteryPers,
            batteryTime: bu.batteryTime,
            ssid: bu.ssid,
            authMode: bu.authMode,
            data_counter: bu.data_counter,
            isLoggedIn: bu.isLoggedIn,
            newSmsReceived: bu.newSmsReceived,
            smsReportReceived: bu.smsReportReceived,
            smsUnreadCount: bu.smsUnreadCount,
            limitVolumeEnable: bu.limitVolumeEnable,
            limitVolumeType: bu.limitVolumeType,
            limitVolumePercent: bu.limitVolumePercent,
            limitVolumeSize: bu.limitVolumeSize,
            connectWifiProfile: bu.connectWifiProfile,
            connectWifiSSID: bu.connectWifiSSID,
            connectWifiStatus: bu.connectWifiStatus,
            multi_ssid_enable: bu.multi_ssid_enable,
            blc_wan_mode: bu.blc_wan_mode,
            roamMode: bu.roamMode,
            current_upgrade_state: bu.current_upgrade_state,
            is_mandatory: bu.is_mandatory,
            new_version_state: bu.new_version_state,
            allowRoamingUpdate: bu.allowRoamingUpdate,
            ap_station_enable: bu.ap_station_enable,
            ap_station_mode: bu.ap_station_mode,
            dialMode: bu.dialMode,
            fota_package_already_download: bu.fota_package_already_download,
            ethWanMode: bu.ethWanMode,
            fota_user_selector: bu.fota_user_selector,
            defaultWanName: bu.defaultWanName
        }
    }

    function bx() {
        var c9 = bu.limitVolumeType == "1";
        var c8 = {
            data_counter: bu.data_counter,
            connectStatus: bu.connectStatus,
            rj45ConnectStatus: bu.rj45ConnectStatus,
            limitVolumeEnable: bu.limitVolumeEnable,
            limitVolumeType: bu.limitVolumeType,
            limitVolumePercent: bu.limitVolumePercent,
            networkType: bu.networkType
        };
        if (c9) {
            c8.limitDataMonth = bu.limitVolumeSize;
            c8.limitTimeMonth = 0
        } else {
            c8.limitTimeMonth = bu.limitVolumeSize;
            c8.limitDataMonth = 0
        }
        c8.blc_wan_mode = bu.blc_wan_mode;
        return c8
    }

    function D() {
        bu.newSmsReceived = false
    }

    function b3() {
        bu.smsReportReceived = false
    }

    function b() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "sms_capacity_info";
            return dc
        }

        function c9(da) {
            return {
                nvTotal: parseInt(da.sms_nv_total, 10),
                nvUsed: parseInt(da.sms_nv_rev_total, 10) + parseInt(da.sms_nv_send_total, 10) + parseInt(da.sms_nv_draftbox_total, 10),
                simTotal: parseInt(da.sms_sim_total, 10),
                simUsed: parseInt(da.sms_sim_rev_total, 10) + parseInt(da.sms_sim_send_total, 10) + parseInt(da.sms_sim_draftbox_total, 10),
                nvReceive: parseInt(da.sms_nv_rev_total, 10),
                nvSend: parseInt(da.sms_nv_send_total, 10),
                nvDraft: parseInt(da.sms_nv_draftbox_total, 10),
                simReceive: parseInt(da.sms_sim_rev_total, 10),
                simSend: parseInt(da.sms_sim_send_total, 10),
                simDraft: parseInt(da.sms_sim_draftbox_total, 10)
            }
        }
    }

    function a7() {
        var dc = arguments[1];
        var db = 0;
        return by(arguments, {}, c8, da, null, true);

        function c8(dd, de) {
            var df = {};
            df.notCallback = true;
            df.goformId = "CONNECT_NETWORK";
            return df
        }

        function da(dd) {
            if (dd.result == "success") {
                db = new Date().getTime();
                cP(c9)
            } else {
                dc({result: false})
            }
        }

        function c9(dd) {
            if (dd.ppp_status == "ppp_connecting") {
                bu.connectStatus = "ppp_connecting"
            } else {
                if (dd.ppp_status == "ppp_connected") {
                    B(c9);
                    bu.connectStatus = "ppp_connected";
                    dc({result: true, status: bu.connectStatus})
                } else {
                    if (new Date().getTime() - db < 10000) {
                        bu.connectStatus = "ppp_connecting"
                    } else {
                        B(c9);
                        dc({result: false})
                    }
                }
            }
        }
    }

    function P() {
        var dc = arguments[1];
        var db = 0;
        return by(arguments, {}, c9, da, null, true);

        function c9(dd, de) {
            var df = {};
            df.notCallback = true;
            df.goformId = "DISCONNECT_NETWORK";
            return df
        }

        function da(dd) {
            if (dd.result == "success") {
                db = new Date().getTime();
                cP(c8)
            } else {
                dc({result: false})
            }
        }

        function c8(dd) {
            if (dd.ppp_status == "ppp_disconnecting") {
                bu.connectStatus = "ppp_disconnecting"
            } else {
                if (dd.ppp_status == "ppp_disconnected") {
                    B(c8);
                    bu.connectStatus = "ppp_disconnected";
                    dc({result: true, status: bu.connectStatus})
                } else {
                    if (new Date().getTime() - db < 10000) {
                        bu.connectStatus = "ppp_disconnecting"
                    } else {
                        B(c8);
                        dc({result: false})
                    }
                }
            }
        }
    }

    function l() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "APN_configtmp0,APN_configtmp1,APN_configtmp2,APN_configtmp3,APN_configtmp4,APN_configtmp5,APN_configtmp6,APN_configtmp7,APN_configtmp8,APN_configtmp9,APN_configtmp10,APN_configtmp11,APN_configtmp12,APN_configtmp13,APN_configtmp14,APN_configtmp15,APN_configtmp16,APN_configtmp17,APN_configtmp18,APN_configtmp19,ipv6_APN_configtmp0,ipv6_APN_configtmp1,ipv6_APN_configtmp2,ipv6_APN_configtmp3,ipv6_APN_configtmp4,ipv6_APN_configtmp5,ipv6_APN_configtmp6,ipv6_APN_configtmp7,ipv6_APN_configtmp8,ipv6_APN_configtmp9,ipv6_APN_configtmp10,ipv6_APN_configtmp11,ipv6_APN_configtmp12,ipv6_APN_configtmp13,ipv6_APN_configtmp14,ipv6_APN_configtmp15,ipv6_APN_configtmp16,ipv6_APN_configtmp17,ipv6_APN_configtmp18,ipv6_APN_configtmp19,m_profile_name,profile_name,wan_dial,pdp_type,pdp_select,index,Current_index,apn_auto_config,ipv6_apn_auto_config,apn_mode,wan_apn,ppp_auth_mode,ppp_username,ppp_passtmp,ipv6_wan_apn,ipv6_pdp_type,ipv6_ppp_auth_mode,ipv6_ppp_username,ipv6_ppp_passtmp,apn_num_preset";
            dc.multi_data = 1;
            return dc
        }

        function c9(da) {
            if (da) {
                return {
                    APNs: da.APN_configtmp0 + "||" + da.APN_configtmp1 + "||" + da.APN_configtmp2 + "||" + da.APN_configtmp3 + "||" + da.APN_configtmp4 + "||" + da.APN_configtmp5 + "||" + da.APN_configtmp6 + "||" + da.APN_configtmp7 + "||" + da.APN_configtmp8 + "||" + da.APN_configtmp9 + "||" + da.APN_configtmp10 + "||" + da.APN_configtmp11 + "||" + da.APN_configtmp12 + "||" + da.APN_configtmp13 + "||" + da.APN_configtmp14 + "||" + da.APN_configtmp15 + "||" + da.APN_configtmp16 + "||" + da.APN_configtmp17 + "||" + da.APN_configtmp18 + "||" + da.APN_configtmp19,
                    ipv6APNs: da.ipv6_APN_configtmp0 + "||" + da.ipv6_APN_configtmp1 + "||" + da.ipv6_APN_configtmp2 + "||" + da.ipv6_APN_configtmp3 + "||" + da.ipv6_APN_configtmp4 + "||" + da.ipv6_APN_configtmp5 + "||" + da.ipv6_APN_configtmp6 + "||" + da.ipv6_APN_configtmp7 + "||" + da.ipv6_APN_configtmp8 + "||" + da.ipv6_APN_configtmp9 + "||" + da.ipv6_APN_configtmp10 + "||" + da.ipv6_APN_configtmp11 + "||" + da.ipv6_APN_configtmp12 + "||" + da.ipv6_APN_configtmp13 + "||" + da.ipv6_APN_configtmp14 + "||" + da.ipv6_APN_configtmp15 + "||" + da.ipv6_APN_configtmp16 + "||" + da.ipv6_APN_configtmp17 + "||" + da.ipv6_APN_configtmp18 + "||" + da.ipv6_APN_configtmp19,
                    apnMode: da.apn_mode,
                    profileName: da.m_profile_name || da.profile_name,
                    wanDial: da.wan_dial,
                    pdpType: da.pdp_type == "IP" ? "IP" : da.ipv6_pdp_type,
                    pdpSelect: da.pdp_select,
                    index: da.index,
                    currIndex: da.Current_index,
                    autoApns: da.apn_auto_config,
                    autoApnsV6: da.ipv6_apn_auto_config,
                    wanApn: da.wan_apn,
                    authMode: da.ppp_auth_mode.toLowerCase(),
                    username: da.ppp_username,
                    password: da.ppp_passtmp,
                    dnsMode: "",
                    dns1: "",
                    dns2: "",
                    wanApnV6: da.ipv6_wan_apn,
                    authModeV6: da.ipv6_ppp_auth_mode.toLowerCase(),
                    usernameV6: da.ipv6_ppp_username,
                    passwordV6: da.ipv6_ppp_passtmp,
                    dnsModeV6: "",
                    dns1V6: "",
                    dns2V6: "",
                    apnNumPreset: da.apn_num_preset
                }
            } else {
                return {result: false}
            }
        }
    }

    function ax() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {apn_action: "delete", apn_mode: "manual", index: da.index};
            dc.goformId = "APN_PROC_EX";
            return dc
        }

        function c9(da) {
            if (da.result == "success") {
                return {result: true}
            } else {
                return {result: false}
            }
        }
    }

    function bw() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, dc) {
            var db = {goformId: "APN_PROC_EX", apn_mode: da.apnMode};
            if (da.apnMode == "manual") {
                db.apn_action = "set_default";
                db.set_default_flag = "1";
                db.pdp_type = da.pdpType;
                db.index = da.index
            }
            return db
        }

        function c9(da) {
            if (da.result == "success") {
                return {result: true}
            } else {
                return {result: false}
            }
        }
    }

    function bo() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {
                goformId: "APN_PROC_EX",
                apn_action: "save",
                apn_mode: "manual",
                profile_name: da.profileName,
                wan_dial: "*99#",
                pdp_type: da.pdpType,
                pdp_select: "auto",
                index: da.index
            };
            if (da.pdpType == "IP") {
                cO.extend(dc, {
                    wan_apn: da.wanApn,
                    ppp_auth_mode: da.authMode,
                    ppp_username: da.username,
                    ppp_passtmp: da.password
                })
            } else {
                if (da.pdpType == "IPv6") {
                    cO.extend(dc, {
                        ipv6_wan_apn: da.wanApnV6,
                        ipv6_ppp_auth_mode: da.authModeV6,
                        ipv6_ppp_username: da.usernameV6,
                        ipv6_ppp_passtmp: da.passwordV6
                    })
                } else {
                    cO.extend(dc, {
                        wan_apn: da.wanApn,
                        ppp_auth_mode: da.authMode,
                        ppp_username: da.username,
                        ppp_passtmp: da.password,
                        dns_mode: da.dnsMode,
                        prefer_dns_manual: da.dns1,
                        standby_dns_manual: da.dns2,
                        ipv6_wan_apn: da.wanApnV6,
                        ipv6_ppp_auth_mode: da.authModeV6,
                        ipv6_ppp_username: da.usernameV6,
                        ipv6_ppp_passtmp: da.passwordV6
                    })
                }
            }
            return dc
        }

        function c9(da) {
            if (da.result == "success") {
                return {result: true}
            } else {
                return {result: false}
            }
        }
    }

    var cV = ["modem_main_state", "pin_status", "blc_wan_mode", "blc_wan_auto_mode", "loginfo", "fota_new_version_state", "fota_current_upgrade_state", "fota_upgrade_selector", "network_provider", "is_mandatory", "sta_count", "m_sta_count"];
    var au = ["signalbar", "network_type", "sub_network_type", "ppp_status", "rj45_state", "EX_SSID1", "sta_ip_status", "EX_wifi_profile", "m_ssid_enable", "wifi_cur_state", "SSID1", "simcard_roam", "lan_ipaddr", "battery_charging", "cstm_webui_battery", "battery_vol_percent", "battery_pers", "spn_name_data", "spn_b1_flag", "spn_b2_flag", "realtime_tx_bytes", "realtime_rx_bytes", "realtime_time", "realtime_tx_thrpt", "realtime_rx_thrpt", "monthly_rx_bytes", "monthly_tx_bytes", "traffic_alined_delta", "monthly_time", "date_month", "data_volume_limit_switch", "data_volume_limit_size", "data_volume_alert_percent", "data_volume_limit_unit", "roam_setting_option", "upg_roam_switch", "fota_package_already_download", "ssid", "dial_mode", "ethwan_mode", "default_wan_name"];
    if (aF.HAS_SMS) {
        cO.merge(au, ["sms_received_flag", "sts_received_flag", "sms_unread_num"])
    }
    var aR = [];
    var bL = [bn];

    function aS() {
        if (!cN) {
            setTimeout(function () {
                aS()
            }, 1000);
            return
        }
        var c8 = ct();
        c4(c8, function (c9) {
            for (var da = 0; da < bL.length; da++) {
                if (typeof bL[da] === "function") {
                    bL[da](c9)
                }
            }
            cO.merge(bL, aR);
            aR = [];
            setTimeout(function () {
                aS()
            }, 1000)
        }, function () {
            cJ();
            setTimeout(function () {
                aS()
            }, 1000)
        }, false)
    }

    function ct() {
        var c8 = {multi_data: 1};
        if (window.location.hash && window.location.hash != "#entry" && bu.isLoggedIn) {
            if (aF.HAS_SMS) {
                c8.sms_received_flag_flag = 0;
                c8.sts_received_flag_flag = 0
            }
            if (au.length > 0 && cg.indexOf(cV, au[0]) == -1) {
                cO.each(au, function (c9, da) {
                    cV.push(da)
                })
            }
        } else {
            if (au.length > 0 && cg.indexOf(cV, au[0]) != -1) {
                cV = cg.without(cV, au)
            }
        }
        c8.cmd = cV.join(",");
        return c8
    }

    function cP(c8) {
        if (cg.indexOf(aR, c8) == -1) {
            aR.push(c8)
        }
    }

    function B(c8) {
        bL = cg.without(bL, c8);
        if (bL.length == 0) {
            bL.push(bn)
        }
        return aR
    }

    function cZ(c8) {
        if (cg.indexOf(cV, c8) == -1) {
            cV.push(c8)
        }
    }

    function bp(c8) {
        cV = cg.without(cV, c8);
        return cV
    }

    function bn(c9) {
        bu.defaultWanName = c9.default_wan_name;
        bu.signalImg = typeof c9.signalbar == "undefined" ? "0" : c9.signalbar;
        bu.networkType = c9.sub_network_type ? c9.sub_network_type : (c9.network_type ? c9.network_type : "");
        if (bu.networkType.toLowerCase().indexOf("limited_service") != -1 || bu.networkType.toLowerCase().indexOf("limited service") != -1) {
            bu.networkType = "limited_service"
        } else {
            if (bu.networkType.toLowerCase().indexOf("no_service") != -1 || bu.networkType.toLowerCase().indexOf("no service") != -1) {
                bu.networkType = "no_service"
            }
        }
        bu.networkOperator = c9.network_provider ? c9.network_provider : "";
        bu.spn_b1_flag = c9.spn_b1_flag;
        bu.spn_b2_flag = c9.spn_b2_flag;
        bu.spn_name_data = c9.spn_name_data;
        bu.connectStatus = typeof c9.ppp_status == "undefined" ? "ppp_disconnected" : c9.ppp_status;
        bu.rj45ConnectStatus = (typeof c9.rj45_state == "undefined" || c9.rj45_state == "") ? "dead" : c9.rj45_state;
        bu.ethWanMode = c9.ethwan_mode;
        bu.ssid1AttachedNum = c9.sta_count == "" ? 0 : parseInt(c9.sta_count, 10);
        bu.ssid2AttachedNum = c9.m_sta_count == "" ? 0 : parseInt(c9.m_sta_count, 10);
        bu.roamingStatus = aC(bu.networkType, c9.modem_main_state, c9.simcard_roam);
        bu.wifiStatus = c9.wifi_cur_state == "1";
        bu.simStatus = c9.modem_main_state;
        bu.pinStatus = c9.pin_status;
        var da = 3 * 60 * 60;
        var c8 = (c9.battery_vol_percent && c9.battery_vol_percent.length > 0) ? c9.battery_vol_percent : 100;
        bu.batteryPers = c9.battery_pers;
        var db = Math.round(da * (1 - c8 / 100));
        bu.batteryStatus = (typeof c9.battery_charging == "undefined") ? "0" : c9.battery_charging;
        bu.batteryShow = c9.cstm_webui_battery;
        bu.batteryLevel = c8;
        bu.batteryTime = db.toString();
        bu.data_counter = {
            uploadRate: c9.realtime_tx_thrpt == "" ? 0 : c9.realtime_tx_thrpt,
            downloadRate: c9.realtime_rx_thrpt == "" ? 0 : c9.realtime_rx_thrpt,
            currentSent: c9.realtime_tx_bytes == "" ? 0 : c9.realtime_tx_bytes,
            currentReceived: c9.realtime_rx_bytes == "" ? 0 : c9.realtime_rx_bytes,
            currentConnectedTime: c9.realtime_time == "" ? 0 : c9.realtime_time,
            monthlySent: c9.monthly_tx_bytes == "" ? 0 : c9.monthly_tx_bytes,
            monthlyReceived: c9.monthly_rx_bytes == "" ? 0 : c9.monthly_rx_bytes,
            traffic_alined_delta: c9.traffic_alined_delta == "" ? 0 : c9.traffic_alined_delta,
            monthlyConnectedTime: c9.monthly_time == "" ? 0 : c9.monthly_time,
            month: c9.date_month == "" ? 1 : c9.date_month
        };
        bu.ssid = c9.SSID1;
        bu.authMode = c9.AuthMode;
        bu.isLoggedIn = aF.HAS_LOGIN ? c9.loginfo == "ok" : true;
        if (aF.HAS_SMS) {
            if (!bu.newSmsReceived) {
                bu.newSmsReceived = c9.sms_received_flag > 0
            }
            if (!bu.smsReportReceived) {
                bu.smsReportReceived = c9.sts_received_flag > 0
            }
            if (typeof c9.sms_dev_unread_num != "undefined") {
                bu.smsUnreadCount = aF.SMS_UNREAD_NUM_INCLUDE_SIM ? parseInt(c9.sms_dev_unread_num | 0, 10) + parseInt(c9.sms_sim_unread_num | 0, 10) : parseInt(c9.sms_dev_unread_num | 0, 10)
            } else {
                bu.smsUnreadCount = parseInt(c9.sms_unread_num | 0, 10)
            }
        }
        if (c9.data_volume_limit_switch == "1") {
            bu.limitVolumeEnable = true;
            bu.limitVolumeType = c9.data_volume_limit_unit == "data" ? "1" : "0";
            bu.limitVolumePercent = c9.data_volume_alert_percent;
            if (c9.data_volume_limit_unit == "data") {
                var dc = c9.data_volume_limit_size.split("_");
                bu.limitVolumeSize = dc[0] * dc[1] * 1024 * 1024
            } else {
                bu.limitVolumeSize = c9.data_volume_limit_size * 60 * 60
            }
        } else {
            bu.limitVolumeEnable = false;
            bu.limitVolumeType = "1";
            bu.limitVolumePercent = "100";
            bu.limitVolumeSize = "0"
        }
        bu.connectWifiProfile = c9.EX_wifi_profile;
        bu.connectWifiSSID = c9.EX_SSID1;
        bu.connectWifiStatus = c9.sta_ip_status;
        bu.multi_ssid_enable = c9.m_ssid_enable;
        bu.roamMode = c9.roam_setting_option;
        if (c9.blc_wan_mode == "AUTO") {
            bu.blc_wan_mode = c9.blc_wan_auto_mode ? c9.blc_wan_auto_mode : "AUTO_PPP"
        } else {
            bu.blc_wan_mode = c9.blc_wan_mode ? c9.blc_wan_mode : "PPP"
        }
        bu.new_version_state = c9.fota_new_version_state == "has_critical" || c9.fota_new_version_state == "has_optional" || c9.fota_new_version_state == "already_has_pkg";
        bu.current_upgrade_state = c9.fota_current_upgrade_state;
        if (bu.current_upgrade_state == "verify_failed") {
            bu.current_upgrade_state = "upgrade_pack_error"
        }
        bu.fota_user_selector = c9.fota_upgrade_selector;
        bu.is_mandatory = c9.is_mandatory == "1" || c9.fota_new_version_state == "has_critical";
        bu.allowRoamingUpdate = c9.upg_roam_switch;
        bu.dialMode = c9.dial_mode;
        bu.fota_package_already_download = c9.fota_package_already_download
    }

    function cJ() {
        bu.batteryStatus = "0"
    }

    function aC(c9, c8, da) {
        if (("" == cO.trim(c9)) || "no_service" == c9.toLowerCase() || "limited_service" == c9.toLowerCase() || "modem_sim_undetected" == c8 || "modem_waitpin" == c8 || "modem_waitpuk" == c8) {
            return false
        }
        if ("Internal" == da || "International" == da) {
            return true
        } else {
            return false
        }
    }

    cO(document).ready(function () {
        setTimeout(function () {
            aS()
        }, 0)
    });

    function bm(c9, c8, db, dd) {
        if ((typeof (c9) !== "string") || (c9 === "") || (typeof (c8) !== "number") || (isNaN(c8))) {
            if (typeof (dd) === "function") {
                dd(false);
                return
            }
        }
        var dc = -1;
        if (c8 === 0) {
            dc = 0
        } else {
            if (c8 === 2) {
                dc = 2
            } else {
                if (c8 == 7) {
                    dc = 7
                } else {
                    dc = -1
                }
            }
        }
        if (-1 === dc) {
            if (typeof (dd) === "function") {
                dd(false);
                return
            }
        }
        var da;
        if (db.toString() == "NaN") {
            da = ""
        } else {
            da = db
        }
        c4({goformId: "SET_NETWORK", NetworkNumber: c9, Rat: c8, nSubrat: da}, function (dg) {
            if (dg && dg.result == "success") {
                var df;
                var de = 0;
                var dh = setInterval(function () {
                    var di = cs({cmd: "m_netselect_result"}, false);
                    if (!di) {
                        dd(false);
                        return
                    }
                    if (di.m_netselect_result == "manual_success") {
                        df = "1";
                        window.clearInterval(dh);
                        dd(true)
                    } else {
                        if (di.m_netselect_result == "manual_fail") {
                            df = "0";
                            window.clearInterval(dh);
                            dd(false)
                        } else {
                            if (de < 120) {
                                de++
                            } else {
                                window.clearInterval(dh);
                                dd(false)
                            }
                        }
                    }
                }, 1000)
            } else {
                dd(false)
            }
        }, function (de) {
            dd(false)
        }, true)
    }

    function cG() {
        var db = arguments[1];
        return by(arguments, {}, c9, da, null, true);

        function c9(dc, dd) {
            var de = {};
            de.notCallback = true;
            de.goformId = "PBM_CONTACT_ADD";
            de.location = dc.location;
            de.name = encodeMessage(dc.name);
            de.mobilephone_num = dc.mobile_phone_number;
            if (de.location == 1) {
                de.add_index_pc = dc.index;
                de.homephone_num = dc.home_phone_number;
                de.officephone_num = dc.office_phone_number;
                de.email = encodeMessage(dc.mail);
                de.groupchoose = dc.group;
                if (!de.groupchoose) {
                    de.groupchoose = "common"
                }
            } else {
                de.edit_index = dc.index
            }
            if (dc.delId != undefined) {
                de.delId = dc.delId
            }
            return de
        }

        function da(dc) {
            if (dc && dc.result == "success") {
                bb("pbm_write_flag", c8)
            } else {
                db(dc)
            }
        }

        function c8(dc) {
            aY(dc, db, c8)
        }
    }

    function aY(c8, da, c9) {
        if (c8.pbm_write_flag == "0") {
            m("pbm_write_flag", c9);
            da({result: "success"})
        } else {
            if (c8.pbm_write_flag == "6" || c8.pbm_write_flag == "7" || c8.pbm_write_flag == "8" || c8.pbm_write_flag == "9" || c8.pbm_write_flag == "10" || c8.pbm_write_flag == "11" || c8.pbm_write_flag == "14") {
                m("pbm_write_flag", c9);
                da({result: "fail"})
            } else {
            }
        }
    }

    function bl() {
        var db = arguments[1];
        return by(arguments, {}, c9, da, null, true);

        function c9(dc, dd) {
            var de = {};
            de.notCallback = true;
            de.goformId = "PBM_CONTACT_DEL";
            de.del_option = "delete_num";
            de.delete_id = dc.indexs.join(",");
            return de
        }

        function da(dc) {
            if (dc && dc.result == "success") {
                bb("pbm_write_flag", c8)
            } else {
                db(dc)
            }
        }

        function c8(dc) {
            aY(dc, db, c8)
        }
    }

    function aT() {
        var db = arguments[1];
        return by(arguments, {}, c8, da, null, true);

        function c8(dc, dd) {
            var de = {};
            de.notCallback = true;
            de.goformId = "PBM_CONTACT_DEL";
            de.del_option = "delete_all";
            de.del_all_location = dc.location;
            return de
        }

        function da(dc) {
            if (dc && dc.result == "success") {
                bb("pbm_write_flag", c9)
            } else {
                db(dc)
            }
        }

        function c9(dc) {
            aY(dc, db, c9)
        }
    }

    function Z() {
        var db = arguments[1];
        return by(arguments, {}, c9, da, null, true);

        function c9(dc, dd) {
            var de = {};
            de.notCallback = true;
            de.goformId = "PBM_CONTACT_DEL";
            de.del_option = "delete_all_by_group";
            de.del_all_location = 3;
            de.del_group = dc.group;
            return de
        }

        function da(dc) {
            if (dc && dc.result == "success") {
                bb("pbm_write_flag", c8)
            } else {
                db(dc)
            }
        }

        function c8(dc) {
            aY(dc, db, c8)
        }
    }

    function af() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "SET_CONNECTION_MODE";
            dc.ConnectionMode = da.connectionMode;
            dc.roam_setting_option = da.isAllowedRoaming;
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                callback(da)
            }
        }
    }

    function J() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "ConnectionMode";
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {};
                da.connectionMode = db.connectionMode;
                da.isAllowedRoaming = db.autoConnectWhenRoaming;
                return da
            } else {
                return V
            }
        }
    }

    function a(db, c8) {
        if (db[0].data_per_page == 0) {
            return {pbm_data: []}
        }
        return by(db, {}, c9, da, null, false);

        function c9(dc, dd) {
            var de = {};
            de.mem_store = c8;
            if (c8 == 2) {
                de.cmd = "pbm_data_total"
            } else {
                de.cmd = "pbm_data_info"
            }
            de.page = dc.page;
            de.data_per_page = dc.data_per_page;
            de.orderBy = dc.orderBy;
            de.isAsc = dc.isAsc;
            return de
        }

        function da(dc) {
            if (dc && dc.pbm_data) {
                var dd = [];
                cO.each(dc.pbm_data, function (de) {
                    dd.push({
                        pbm_id: dc.pbm_data[de].pbm_id,
                        pbm_location: dc.pbm_data[de].pbm_location,
                        pbm_number: dc.pbm_data[de].pbm_number,
                        pbm_anr: dc.pbm_data[de].pbm_anr,
                        pbm_anr1: dc.pbm_data[de].pbm_anr1,
                        pbm_group: dc.pbm_data[de].pbm_group,
                        pbm_name: decodeMessage(dc.pbm_data[de].pbm_name),
                        pbm_email: decodeMessage(dc.pbm_data[de].pbm_email)
                    })
                });
                return {pbm_data: dd}
            } else {
                return V
            }
        }
    }

    function bW() {
        if (arguments[0].data_per_page == 0) {
            return {pbm_data: []}
        }
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "pbm_data_total";
            dc.mem_store = 3;
            dc.pbm_group = da.group;
            dc.page = da.page;
            dc.data_per_page = da.data_per_page;
            dc.orderBy = da.orderBy;
            dc.isAsc = da.isAsc;
            return dc
        }

        function c9(da) {
            if (da && da.pbm_data) {
                var db = [];
                cO.each(da.pbm_data, function (dc) {
                    db.push({
                        pbm_id: da.pbm_data[dc].pbm_id,
                        pbm_location: da.pbm_data[dc].pbm_location,
                        pbm_number: da.pbm_data[dc].pbm_number,
                        pbm_anr: da.pbm_data[dc].pbm_anr,
                        pbm_anr1: da.pbm_data[dc].pbm_anr1,
                        pbm_group: da.pbm_data[dc].pbm_group,
                        pbm_name: decodeMessage(da.pbm_data[dc].pbm_name),
                        pbm_email: decodeMessage(da.pbm_data[dc].pbm_email)
                    })
                });
                return {pbm_data: db}
            } else {
                return V
            }
        }
    }

    function c2() {
        return a(arguments, 1)
    }

    function cH() {
        return a(arguments, 0)
    }

    function R() {
        return a(arguments, 2)
    }

    function ch() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "pbm_init_flag";
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function ce(db, da) {
        return by(db, {}, c8, c9, null, false);

        function c8(dc, dd) {
            var de = {};
            de.cmd = "pbm_capacity_info";
            if (da) {
                de.pbm_location = "pbm_sim"
            } else {
                de.pbm_location = "pbm_native"
            }
            return de
        }

        function c9(dc) {
            if (dc) {
                return dc
            } else {
                return V
            }
        }
    }

    function bR() {
        var c8 = ce(arguments, true);
        return {
            simPbmTotalCapacity: parseInt(c8.pbm_sim_max_record_num),
            simPbmUsedCapacity: parseInt(c8.pbm_sim_used_record_num),
            simType: c8.pbm_sim_type,
            maxNameLen: parseInt(c8.pbm_sim_max_name_len),
            maxNumberLen: parseInt(c8.pbm_sim_max_number_len) > 40 ? 40 : parseInt(c8.pbm_sim_max_number_len)
        }
    }

    function ag() {
        var c8 = ce(arguments, false);
        return {
            pcPbmTotalCapacity: parseInt(c8.pbm_dev_max_record_num),
            pcPbmUsedCapacity: parseInt(c8.pbm_dev_used_record_num)
        }
    }

    function bC() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {cmd: "lan_station_list"};
            return dc
        }

        function c9(da) {
            var dd = [];
            var de = da.lan_station_list || da.station_list;
            for (var dc = 0; de && dc < de.length; dc++) {
                var df = {};
                df.macAddress = de[dc].mac_addr;
                var db = de[dc].hostname;
                df.hostName = db == "" ? cO.i18n.prop("unknown") : (db == "--") ? cO.i18n.prop("unknown") : db;
                df.ipAddress = de[dc].ip_addr;
                dd.push(df)
            }
            return {attachedDevices: dd}
        }
    }

    function bq() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {cmd: "station_list"};
            return dc
        }

        function c9(da) {
            var dd = [];
            var de = da.station_list;
            for (var dc = 0; de && dc < de.length; dc++) {
                var df = {};
                df.macAddress = de[dc].mac_addr;
                var db = de[dc].hostname;
                df.hostName = db == "" ? cO.i18n.prop("unknown") : (db == "--") ? cO.i18n.prop("unknown") : db;
                df.ipAddress = de[dc].ip_addr;
                dd.push(df)
            }
            return {attachedDevices: dd}
        }
    }

    function k() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "SET_WEB_LANGUAGE";
            dc.Language = da.Language;
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function z() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "Language";
            dc.multi_data = 1;
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {};
                da.Language = (db && db.Language) ? db.Language : "en";
                return da
            } else {
                return V
            }
        }
    }

    function bG() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "SET_BEARER_PREFERENCE";
            dc.BearerPreference = da.strBearerPreference;
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function aD(da) {
        cO.post("/goform/goform_set_cmd_process", {goformId: "SCAN_NETWORK"}, function (db) {
            if (db.result == "success") {
                c8()
            } else {
                da(false, [])
            }
        }, "json").error(function () {
            da(false, [])
        });

        function c8() {
            cO.getJSON("/goform/goform_get_cmd_process", {
                cmd: "m_netselect_status",
                _: new Date().getTime()
            }, function (db) {
                if (db.m_netselect_status == "manual_selecting") {
                    setTimeout(c8, 1000)
                } else {
                    cO.getJSON("/goform/goform_get_cmd_process", {
                        cmd: "m_netselect_contents",
                        _: new Date().getTime()
                    }, function (dc) {
                        if (trim(dc.m_netselect_contents) != "") {
                            c9(dc.m_netselect_contents)
                        } else {
                            da(false, [])
                        }
                    }).error(function () {
                        da(false, [])
                    })
                }
            }).error(function () {
                da(false, [])
            })
        }

        function c9(db) {
            var df = /([^,;]*),([^,]*),([^,]*),([^,]*),([^,;]*)/g;
            var dg = [];
            var dh;
            var de = db.split(";");
            var dc = "";
            for (i = 0; i < de.length; i++) {
                var dd = de[i].split(",").length;
                if (dd == 4) {
                    dc += de[i] + ",NON;"
                } else {
                    dc += de[i] + ";"
                }
            }
            while (dh = df.exec(dc)) {
                if (dh != null) {
                    dg.push({
                        strShortName: dh[2].replace(/\"/g, ""),
                        strNumeric: dh[3].replace(/\D/g, ""),
                        nRat: parseInt(dh[4], 10),
                        nState: parseInt(dh[1], 10),
                        SubAct: parseInt(dh[5], 10)
                    })
                }
            }
            da(true, dg)
        }
    }

    function Q() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "current_network_mode,m_netselect_save,net_select_mode,m_netselect_contents,net_select,ppp_status,modem_main_state";
            dc.multi_data = 1;
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {};
                da.current_network_mode = db.current_network_mode;
                da.net_select_mode = db.net_select_mode;
                da.m_netselect_save = db.m_netselect_save;
                da.m_netselect_contents = db.m_netselect_contents;
                da.net_select = db.net_select;
                da.ppp_status = db.ppp_status;
                da.modem_main_state = db.modem_main_state;
                return da
            } else {
                return V
            }
        }
    }

    function aJ() {
        return by(arguments, {}, c8, c9, {}, false);

        function c8(da, db) {
            var dc = {
                cmd: "sms_data_total",
                page: da.page,
                data_per_page: aF.SMS_DATABASE_SORT_SUPPORT ? da.smsCount : 500,
                mem_store: da.nMessageStoreType,
                tags: da.tags,
                order_by: da.orderBy
            };
            return dc
        }

        function c9(da) {
            if (da && da.messages && da.messages.length > 0) {
                return {messages: cK(da.messages)}
            } else {
                return {messages: []}
            }
        }
    }

    function cK(da, df) {
        var dg = [];
        for (var db = 0; db < da.length; db++) {
            if (!aF.SHOW_UN_COMPLETE_CONCAT_SMS && typeof da[db].received_all_concat_sms != "undefined" && da[db].received_all_concat_sms == "0") {
                continue
            }
            var dd = {};
            dd.id = da[db].id;
            dd.number = da[db].number;
            dd.content = df ? da[db].content : aV(da[db].content);
            dd.time = transTime("20" + da[db].date);
            dd.isNew = da[db].tag == "1";
            dd.groupId = da[db].draft_group_id;
            dd.tag = da[db].tag;
            dd.receivedAll = da[db].received_all_concat_sms == "1";
            dg.push(dd)
        }
        if (!aF.SMS_DATABASE_SORT_SUPPORT) {
            var c8 = [];
            var dc = [];
            for (var db = dg.length; db--;) {
                var c9 = dg[db];
                var de = cO.inArray(c9.id, c8);
                if (de == -1) {
                    c8.push(c9.id);
                    dc.push(c9)
                } else {
                    if (c9.content.length > dc[de].content.length) {
                        dc[de] = c9
                    }
                }
            }
            return cg.sortBy(dc, function (dh) {
                return 0 - dh.id
            })
        } else {
            return dg
        }
    }

    function aV(c8) {
        return decodeMessage(escapeMessage(c8))
    }

    function aX() {
        var db = arguments[1];
        var c9 = arguments[2] ? arguments[2] : db;
        return by(arguments, {}, c8, da, null, true);

        function c8(dc, dd) {
            var de = {
                goformId: "SEND_SMS",
                notCallback: true,
                Number: dc.number,
                sms_time: getCurrentTimeString(),
                MessageBody: escapeMessage(encodeMessage(dc.message)),
                ID: dc.id,
                encode_type: getEncodeType(dc.message).encodeType
            };
            return de
        }

        function da(dc) {
            if (!dc) {
                c9(cO.extend(V, {errorType: "sendFail", errorText: "send_fail_try_again"}));
                return
            }
            if (dc.result == "success") {
                setTimeout(function () {
                    cL({smsCmd: 4, errorType: "sendFail", errorText: "send_fail_try_again"}, db, c9)
                }, 1000)
            } else {
                c9(cO.extend(V, {errorType: "sendFail", errorText: "send_fail_try_again"}))
            }
        }
    }

    function aG() {
        var db = arguments[1];
        var c9 = arguments[2] ? arguments[2] : db;
        return by(arguments, {}, c8, da, null, true);

        function c8(dc, dd) {
            var de = {
                notCallback: true,
                goformId: "SAVE_SMS",
                SMSMessage: escapeMessage(encodeMessage(dc.message)),
                SMSNumber: dc.numbers.join(";") + ";",
                Index: dc.index,
                encode_type: getEncodeType(dc.message).encodeType,
                sms_time: dc.currentTimeString,
                draft_group_id: dc.groupId
            };
            return de
        }

        function da(dc) {
            if (!dc) {
                c9(cO.extend(V, {errorType: "saveFail", errorText: "save_fail"}));
                return
            }
            if (dc.result == "success") {
                cL({smsCmd: 5, errorType: "saveFail", errorText: "save_fail"}, db, c9)
            } else {
                c9(cO.extend(V, {errorType: "saveFail", errorText: "save_fail"}))
            }
        }
    }

    function bV() {
        var dc = arguments[1];
        var da = arguments[2] ? arguments[2] : dc;
        return by(arguments, {}, c9, db, null, true);

        function c9(dd, de) {
            var df = {goformId: "ALL_DELETE_SMS", notCallback: true, which_cgi: dd.location};
            return df
        }

        function db(dd) {
            if (!dd) {
                da(cO.extend(V, {errorType: "deleteFail", errorText: "delete_fail_try_again"}));
                return
            }
            if (dd.result == "success") {
                bb("sms_cmd_status_info", c8)
            } else {
                da(cO.extend(V, {errorType: "deleteFail", errorText: "delete_fail_try_again"}))
            }
        }

        function c8(de) {
            var dd = de.sms_cmd_status_info;
            if (dd == "2") {
                m("sms_cmd_status_info", c8);
                da(cO.extend(V, {errorType: "deleteFail", errorText: "delete_fail_try_again"}))
            } else {
                if (dd == "3") {
                    m("sms_cmd_status_info", c8);
                    dc({result: true})
                }
            }
        }
    }

    function cA() {
        var db = arguments[1];
        var c9 = arguments[2] ? arguments[2] : db;
        return by(arguments, {}, c8, da, null, true);

        function c8(dd, de) {
            var dc = dd.ids.join(";") + ";";
            var df = {goformId: "DELETE_SMS", msg_id: dc, notCallback: true};
            return df
        }

        function da(dc) {
            if (!dc) {
                c9(cO.extend(V, {errorType: "deleteFail", errorText: "delete_fail_try_again"}));
                return
            }
            if (dc.result == "success") {
                cL({smsCmd: 6, errorType: "deleteFail", errorText: "delete_fail_try_again"}, db, c9)
            } else {
                c9(cO.extend(V, {errorType: "deleteFail", errorText: "delete_fail_try_again"}))
            }
        }
    }

    function cL(c9, da, c8) {
        c4({cmd: "sms_cmd_status_info", sms_cmd: c9.smsCmd}, function (dc) {
            if (dc) {
                var db = dc.sms_cmd_status_result;
                if (db == "2") {
                    c8(cO.extend(V, {errorType: c9.errorType, errorText: c9.errorText}))
                } else {
                    if (db == "3") {
                        da({result: "success"})
                    } else {
                        window.setTimeout(function () {
                            cL(c9, da, c8)
                        }, 1000)
                    }
                }
            } else {
                c8(cO.extend(V, {errorType: c9.errorType, errorText: c9.errorText}))
            }
        }, function (db) {
            c8(cO.extend(V, {errorType: c9.errorType, errorText: c9.errorText}))
        }, false)
    }

    function aH() {
        if (aF.smsIsReady) {
            var da = arguments[1];
            if (da) {
                return da({sms_cmd: "1", sms_cmd_status_result: "3"})
            } else {
                return {sms_cmd: "1", sms_cmd_status_result: "3"}
            }
        } else {
            return by(arguments, {}, c8, c9, null, false)
        }

        function c8(db, dc) {
            var dd = {};
            dd.cmd = "sms_cmd_status_info";
            dd.sms_cmd = 1;
            return dd
        }

        function c9(db) {
            if (db) {
                if (db.sms_cmd_status_result == "3") {
                    aF.smsIsReady = true
                }
                return db
            } else {
                return V
            }
        }
    }

    function ae() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(db, dc) {
            var da = db.ids.join(";");
            if (db.ids.length > 0) {
                da += ";"
            }
            var dd = {goformId: "SET_MSG_READ", msg_id: da, tag: 0};
            return dd
        }

        function c9(da) {
            if (da.result == "success") {
                return {result: true}
            } else {
                return {result: false}
            }
        }
    }

    function K() {
        return by(arguments, {}, c8, c9, {}, false);

        function c8(da, db) {
            var dc = {cmd: "sms_status_rpt_data", page: da.page, data_per_page: da.smsCount};
            return dc
        }

        function c9(da) {
            if (da) {
                return {messages: cK(da.messages, true)}
            } else {
                return V
            }
        }
    }

    function bt() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = cO.extend({}, da);
            dc.goformId = "LOGOUT";
            return dc
        }

        function c9(da) {
            if (da && da.result == "success") {
                bu.isLoggedIn = false;
                return {result: true}
            } else {
                return cO.extend(V, {errorType: "loggedOutError"})
            }
        }
    }

    function bY() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.newPassword = aF.PASSWORD_ENCODE ? Base64.encode(da.newValue) : da.newValue;
            dc.oldPassword = aF.PASSWORD_ENCODE ? Base64.encode(da.oldValue) : da.oldValue;
            dc.goformId = "CHANGE_PASSWORD";
            return dc
        }

        function c9(da) {
            if (da && da.result === "success") {
                return {result: true}
            } else {
                return cO.extend(V, {errorType: "badPassword"})
            }
        }
    }

    function cX() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "pinnumber,pin_status,puknumber";
            dc.multi_data = 1;
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function c7() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "ENABLE_PIN";
            dc.OldPinNumber = da.oldPin;
            return dc
        }

        function c9(da) {
            if (da && da.result === "success") {
                return {result: true}
            } else {
                return {result: false}
            }
        }
    }

    function b0() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "DISABLE_PIN";
            dc.OldPinNumber = da.oldPin;
            return dc
        }

        function c9(da) {
            if (da && da.result === "success") {
                return {result: true}
            } else {
                return {result: false}
            }
        }
    }

    function o() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "ENABLE_PIN";
            dc.OldPinNumber = da.oldPin;
            dc.NewPinNumber = da.newPin;
            return dc
        }

        function c9(da) {
            if (da && da.result === "success") {
                return {result: true}
            } else {
                return {result: false}
            }
        }
    }

    function bs() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "lan_ipaddr,lan_netmask,mac_address,dhcpEnabled,dhcpStart,dhcpEnd,dhcpLease_hour";
            dc.multi_data = 1;
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {};
                da.ipAddress = db.lan_ipaddr;
                da.subnetMask = db.lan_netmask;
                da.macAddress = db.mac_address;
                da.dhcpServer = db.dhcpEnabled;
                da.dhcpStart = db.dhcpStart;
                da.dhcpEnd = db.dhcpEnd;
                da.dhcpLease = parseInt(db.dhcpLease_hour, 10);
                return da
            } else {
                return V
            }
        }
    }

    function bO() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "dns_manual_enable,dhcpDns";
            dc.multi_data = 1;
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {};
                da.dnsServerMode = db.dns_manual_enable;
                da.dnsPrimary = db.dhcpDns;
                return da
            } else {
                return V
            }
        }
    }

    function cd() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "DHCP_SETTING";
            dc.lanIp = da.ipAddress;
            dc.lanNetmask = da.subnetMask;
            dc.lanDhcpType = da.dhcpServer == "1" ? "SERVER" : "DISABLE";
            if (dc.lanDhcpType == "SERVER") {
                dc.dhcpStart = da.dhcpStart;
                dc.dhcpEnd = da.dhcpEnd;
                dc.dhcpLease = da.dhcpLease
            }
            dc.dhcp_reboot_flag = 1;
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function cz() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "DNS_SETTING";
            dc.dns_manual_enable = da.dnsServerMode;
            dc.dhcpDns = da.dnsPrimary;
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function bN() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "cstm_webui_imei,cstm_webui_ttl,cstm_webui_dns,cstm_webui_bandselect,band_select_enable,ussd_enable,vpn_enable,dns_manual_func_enable,tr069_func_enable,cstm_wifi_sleep";
            dc.multi_data = 1;
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {};
                da.imeiFuncEnable = db.cstm_webui_imei;
                da.ttlFuncEnable = db.cstm_webui_ttl;
                da.dnsFuncEnable = db.cstm_webui_dns;
                da.bandSelectFuncEnable = db.cstm_webui_bandselect;
                da.bandSelectEnable = db.band_select_enable == "1";
                da.ussdEnable = db.ussd_enable == "1";
                da.vpnEnable = db.vpn_enable == "1";
                da.dnsManualEnable = db.dns_manual_func_enable == "1";
                da.wifiSleepEnable = db.cstm_wifi_sleep == "1";
                da.tr069FuncEnable = db.tr069_func_enable == "1";
                return da
            } else {
                return V
            }
        }
    }

    function b1() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "sms_parameter_info";
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {};
                da.centerNumber = db.sms_para_sca;
                da.memStroe = db.sms_para_mem_store;
                da.deliveryReport = db.sms_para_status_report;
                switch (parseInt(db.sms_para_validity_period, 10)) {
                    case 143:
                        da.validity = "twelve_hours";
                        break;
                    case 167:
                        da.validity = "one_day";
                        break;
                    case 173:
                        da.validity = "one_week";
                        break;
                    case 244:
                        da.validity = "largest";
                        break;
                    case 255:
                        da.validity = "largest";
                        break;
                    default:
                        da.validity = "twelve_hours";
                        break
                }
                return da
            } else {
                return V
            }
        }
    }

    function aO() {
        var db = arguments[1];
        var c9 = arguments[2] ? arguments[2] : db;
        return by(arguments, {}, c8, da, null, true);

        function c8(dc, dd) {
            var de = {};
            de.goformId = "SET_MESSAGE_CENTER";
            de.save_time = dc.validity;
            de.MessageCenter = dc.centerNumber;
            de.status_save = dc.deliveryReport;
            de.save_location = "native";
            de.notCallback = true;
            return de
        }

        function da(dc) {
            if (!dc) {
                c9(cO.extend(V, {errorType: "smsSettingFail", errorText: "error_info"}));
                return
            }
            if (dc.result == "success") {
                cL({smsCmd: 3, errorType: "smsSettingFail", errorText: "error_info"}, db, c9)
            } else {
                c9(cO.extend(V, {errorType: "deleteFail", errorText: "delete_fail_try_again"}))
            }
        }
    }

    function r() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "EXECUTE_AT_COMMAND";
            dc.at_cmd = cO("#txtAtCmd").val().replace(/\s*/g, "").toUpperCase();
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function aw() {
        var c9 = {};
        if (aF.HAS_PARENTAL_CONTROL && aF.currentUserInChildGroup != false) {
            c9 = {errorType: "no_auth"}
        }
        return by(arguments, c9, c8, da, null, true);

        function c8(db, dc) {
            var dd = {};
            dd.goformId = "RESTORE_FACTORY_SETTINGS";
            return dd
        }

        function da(db) {
            if (db) {
                return db
            } else {
                return V
            }
        }
    }

    function ab(c8) {
        var c9 = {};
        c9.cmd = "restore_flag";
        c9.multi_data = 1;
        c4(c9, function (da) {
            if (da && da.restore_flag === "1") {
                c8()
            } else {
                setTimeout(function () {
                    ab(c8)
                }, 5000)
            }
        }, function () {
            setTimeout(function () {
                ab(c8)
            }, 5000)
        }, false)
    }

    function cc() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "wifi_wps_index,WscModeOption,AuthMode,wifi_cur_state,EncrypType,wps_mode,WPS_SSID,m_ssid_enable,SSID1,m_SSID,m_EncrypType,m_AuthMode,wifi_sta_connection";
            dc.multi_data = 1;
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {};
                da.wpsFlag = db.WscModeOption;
                da.authMode = db.AuthMode;
                da.wpsType = db.wps_mode;
                da.radioFlag = db.wifi_cur_state == "1" ? "1" : "0";
                da.encrypType = db.EncrypType;
                da.wpsSSID = db.WPS_SSID;
                da.ssidEnable = db.m_ssid_enable;
                da.ssid = db.SSID1;
                da.multiSSID = db.m_SSID;
                da.m_encrypType = db.m_EncrypType;
                da.wifi_wps_index = db.wifi_wps_index;
                da.AuthMode = db.AuthMode;
                da.m_AuthMode = db.m_AuthMode;
                da.ap_station_enable = db.wifi_sta_connection;
                return da
            } else {
                return V
            }
        }
    }

    function q() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "WIFI_WPS_SET";
            dc.WPS_SSID = da.wpsSSID;
            dc.wps_mode = da.wpsType;
            dc.wifi_wps_index = da.wpsIndex;
            if (dc.wps_mode == "PIN") {
                dc.wps_pin = da.wpsPin
            }
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function ac() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "WIFI_M_WPS_SET";
            dc.m_WPS_SSID = da.wpsSSID;
            dc.m_wps_mode = da.wpsType;
            dc.m_wifi_wps_index = da.wpsIndex;
            if (dc.m_wps_mode == "PIN") {
                dc.m_wps_pin = da.wpsPin
            }
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function ck() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "Sleep_interval";
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {};
                da.sleepMode = db.Sleep_interval;
                return da
            } else {
                return V
            }
        }
    }

    function bf() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "SET_WIFI_SLEEP_INFO";
            dc.sysIdleTimeToSleep = da.sleepMode;
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function bX() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "RemoteManagement,WANPingFilter";
            dc.multi_data = 1;
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {};
                da.remoteFlag = db.RemoteManagement == "1" ? "1" : "0";
                da.pingFlag = db.WANPingFilter == "1" ? "1" : "0";
                return da
            } else {
                return V
            }
        }
    }

    function cE() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "FW_SYS";
            dc.remoteManagementEnabled = da.remoteFlag;
            dc.pingFrmWANFilterEnabled = da.pingFlag;
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function C() {
        return by(arguments, {}, c8, da, null, false);

        function c8(db, dc) {
            var dd = {};
            dd.cmd = "PortForwardEnable,PortForwardRules_0,PortForwardRules_1,PortForwardRules_2,PortForwardRules_3,PortForwardRules_4,PortForwardRules_5,PortForwardRules_6,PortForwardRules_7,PortForwardRules_8,PortForwardRules_9";
            dd.multi_data = 1;
            return dd
        }

        function da(dc) {
            if (dc) {
                var db = {};
                db.portForwardEnable = dc.PortForwardEnable;
                var dd = [];
                if (dc.PortForwardRules_0 != "") {
                    dd.push([0, dc.PortForwardRules_0])
                }
                if (dc.PortForwardRules_1 != "") {
                    dd.push([1, dc.PortForwardRules_1])
                }
                if (dc.PortForwardRules_2 != "") {
                    dd.push([2, dc.PortForwardRules_2])
                }
                if (dc.PortForwardRules_3 != "") {
                    dd.push([3, dc.PortForwardRules_3])
                }
                if (dc.PortForwardRules_4 != "") {
                    dd.push([4, dc.PortForwardRules_4])
                }
                if (dc.PortForwardRules_5 != "") {
                    dd.push([5, dc.PortForwardRules_5])
                }
                if (dc.PortForwardRules_6 != "") {
                    dd.push([6, dc.PortForwardRules_6])
                }
                if (dc.PortForwardRules_7 != "") {
                    dd.push([7, dc.PortForwardRules_7])
                }
                if (dc.PortForwardRules_8 != "") {
                    dd.push([8, dc.PortForwardRules_8])
                }
                if (dc.PortForwardRules_9 != "") {
                    dd.push([9, dc.PortForwardRules_9])
                }
                db.portForwardRules = c9(dd);
                return db
            } else {
                return V
            }
        }

        function c9(db) {
            var df = [];
            if (db && db.length > 0) {
                for (var dd = 0; dd < db.length; dd++) {
                    var dc = {};
                    var de = db[dd][1].split(",");
                    dc.index = db[dd][0];
                    dc.ipAddress = de[0];
                    dc.portRange = de[1] + " - " + de[2];
                    dc.protocol = transProtocol(de[3]);
                    dc.comment = de[4];
                    df.push(dc)
                }
            }
            return df
        }
    }

    function ap() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "FW_FORWARD_ADD";
            dc.ipAddress = da.ipAddress;
            dc.portStart = da.portStart;
            dc.portEnd = da.portEnd;
            dc.protocol = da.protocol;
            dc.comment = da.comment;
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function cD() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "FW_FORWARD_DEL";
            dc.delete_id = da.indexs.join(";") + ";";
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function aB() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "VIRTUAL_SERVER";
            dc.PortForwardEnable = da.portForwardEnable;
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function c(dd, dc, c8) {
        var db = dd + dc + "FFFFFFFFFFFFFFFFFFFFFFFF";
        var df;
        var de;
        df = db.substring(0, 24);
        de = db.substring(0, 16);
        var da = bv.enc.Latin1.parse(df);
        var c9 = bv.enc.Latin1.parse(de);
        var dg = bv.AES.decrypt(c8, da, {iv: c9, mode: bv.mode.CBC, padding: bv.pad.ZeroPadding}).toString(bv.enc.Utf8);
        return dg
    }

    function a3() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(db, dc) {
            var dd = {};
            var da = aF.PASSWORD_ENCODE ? ",WPAPSK1_encode" : ",imei,rnum_js,WPAPSK1_enaes";
            dd.cmd = "pdp_type,ipv6_pdp_type,wifi_cur_state,SSID1,HideSSID,AuthMode,WscModeOption,ppp_status,apn_index,ipv6_apn_index,ipv6_APN_index,m_profile_name,apn_mode,EncrypType,DefaultKeyID,Key1Str1,Key2Str1,Key3Str1,Key4Str1" + da + ",APN_configtmp0,APN_configtmp1,APN_configtmp2,APN_configtmp3,APN_configtmp4,APN_configtmp5,APN_configtmp6,APN_configtmp7,APN_configtmp8,APN_configtmp9,APN_configtmp10,APN_configtmp11,APN_configtmp12,APN_configtmp13,APN_configtmp14,APN_configtmp15,APN_configtmp16,APN_configtmp17,APN_configtmp18,APN_configtmp19,ipv6_APN_configtmp0,ipv6_APN_configtmp1,ipv6_APN_configtmp2,ipv6_APN_configtmp3,ipv6_APN_configtmp4,ipv6_APN_configtmp5,ipv6_APN_configtmp6,ipv6_APN_configtmp7,ipv6_APN_configtmp8,ipv6_APN_configtmp9,ipv6_APN_configtmp10,ipv6_APN_configtmp11,ipv6_APN_configtmp12,ipv6_APN_configtmp13,ipv6_APN_configtmp14,ipv6_APN_configtmp15,ipv6_APN_configtmp16,ipv6_APN_configtmp17,ipv6_APN_configtmp18,ipv6_APN_configtmp19";
            dd.multi_data = 1;
            return dd
        }

        function c9(da) {
            if (da) {
                if (aF.PASSWORD_ENCODE) {
                    da.WPAPSK1 = Base64.decode(da.WPAPSK1_encode)
                } else {
                    da.WPAPSK1 = c(da.rnum_js, da.imei, da.WPAPSK1_enaes)
                }
                return da
            } else {
                return V
            }
        }
    }

    function c3() {
        av(arguments, c8, c9);

        function c8(da) {
            var db = {
                goformId: "QUICK_SETUP_EX",
                index: da.apn_index,
                pdp_type: da.pdp_type,
                apn_mode: da.apnMode,
                profile_name: da.profile_name,
                wan_apn: da.wan_apn,
                ppp_auth_mode: da.ppp_auth_mode,
                ppp_username: da.ppp_username,
                ppp_passtmp: da.ppp_passtmp,
                ipv6_wan_apn: da.ipv6_wan_apn,
                ipv6_ppp_auth_mode: da.ipv6_ppp_auth_mode,
                ipv6_ppp_username: da.ipv6_ppp_username,
                ipv6_ppp_passtmp: da.ipv6_ppp_passtmp,
                SSID_name: da.SSID_name,
                SSID_Broadcast: da.SSID_Broadcast,
                Encryption_Mode_hid: da.Encryption_Mode_hid,
                security_shared_mode: da.security_shared_mode,
                WPA_PreShared_Key: aF.PASSWORD_ENCODE ? Base64.encode(da.WPA_PreShared_Key) : da.WPA_PreShared_Key,
                wep_default_key: da.wep_default_key,
                WPA_ENCRYPTION_hid: da.WPA_ENCRYPTION_hid
            };
            db.wep_key_1 = da.wep_key_1;
            db.wep_key_2 = da.wep_key_2;
            db.wep_key_3 = da.wep_key_3;
            db.wep_key_4 = da.wep_key_4;
            if (da.wep_default_key == "1") {
                db.WEP2Select = da.WEP2Select
            } else {
                if (da.wep_default_key == "2") {
                    db.WEP3Select = da.WEP3Select
                } else {
                    if (da.wep_default_key == "3") {
                        db.WEP4Select = da.WEP4Select
                    } else {
                        db.WEP1Select = da.WEP1Select
                    }
                }
            }
            return db
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return cO.extend(V, {errorType: "SetSetUpError"})
            }
        }
    }

    function av(dh, dc, da) {
        var dg = false;
        var c8 = false;
        var de = dc(dh[0]);
        var df = dh[1];
        var c9 = function (di) {
            dg = true;
            if (!c8 && df) {
                df(da(di))
            }
            c8 = true
        };
        var dd = dh[2];
        var db = function () {
            dg = true;
            if (dd) {
                dd()
            }
        };
        c4(de, c9, db, true);
        addTimeout(function () {
            if (dg == false) {
                var di = addInterval(function () {
                    if (dg == false) {
                        z({}, function (dj) {
                            window.clearInterval(di);
                            c9({result: "success"})
                        })
                    }
                }, 1000)
            }
        }, 5000)
    }

    function bT() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {
                cmd: "sdcard_mode_option,sd_card_state,HTTP_SHARE_STATUS,HTTP_SHARE_WR_AUTH,HTTP_SHARE_FILE",
                multi_data: 1
            };
            return dc
        }

        function c9(db) {
            if (db) {
                var dc;
                if ("mmc2" == db.HTTP_SHARE_FILE || "/mmc2" == db.HTTP_SHARE_FILE || "/mmc2/" == db.HTTP_SHARE_FILE) {
                    dc = "1"
                } else {
                    dc = "0"
                }
                var da = {
                    sd_mode: db.sdcard_mode_option == "1" ? "0" : "1",
                    sd_status: db.sd_card_state,
                    share_status: db.HTTP_SHARE_STATUS == "Enabled" ? "1" : "0",
                    share_auth: db.HTTP_SHARE_WR_AUTH == "readOnly" ? "0" : "1",
                    file_to_share: dc,
                    share_file: db.HTTP_SHARE_FILE
                };
                return da
            } else {
                return V
            }
        }
    }

    function cv() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {goformId: "HTTPSHARE_MODE_SET", mode_set: da.mode == "0" ? "http_share_mode" : "usb_mode"};
            return dc
        }

        function c9(da) {
            if (da && da.result == "success") {
                return {result: "success"}
            } else {
                if (da && da.result == "processing") {
                    return {result: "processing"}
                } else {
                    return {result: false}
                }
            }
        }
    }

    function L() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {goformId: "GOFORM_HTTPSHARE_CHECK_FILE", path_SD_CARD: da.path};
            return dc
        }

        function c9(da) {
            if (da) {
                if (da.result == "no_sdcard") {
                    return {status: "no_sdcard"}
                } else {
                    if (da.result == "noexist") {
                        return {status: "noexist"}
                    } else {
                        if (da.result == "processing") {
                            return {status: "processing"}
                        } else {
                            return {status: "exist"}
                        }
                    }
                }
            } else {
                return V
            }
        }
    }

    function ad() {
        return by(arguments, {}, c8, da, null, true);

        function c8(db, dc) {
            var dd = {goformId: "HTTPSHARE_ENTERFOLD", path_SD_CARD: db.path, indexPage: db.index};
            return dd
        }

        function da(db) {
            if (db) {
                if (db.result == "failure") {
                    return cO.extend(V, {errorType: "get_file_list_failure"})
                } else {
                    if (db.result == "no_sdcard") {
                        return cO.extend(V, {errorType: "no_sdcard"})
                    } else {
                        return c9(db.result)
                    }
                }
            } else {
                return V
            }
        }

        function c9(db) {
            var de = {};
            de.totalRecord = db.totalRecord;
            var dg = [];
            var dd = db.fileInfo;
            for (var dc = 0; dd && dc < dd.length; dc++) {
                if (dd[dc].fileName == "") {
                    continue
                }
                var df = {};
                df.fileName = dd[dc].fileName;
                df.attribute = dd[dc].attribute;
                df.size = dd[dc].size;
                df.lastUpdateTime = dd[dc].lastUpdateTime;
                dg.push(df)
            }
            de.details = dg;
            return de
        }
    }

    function bA() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dd = new Date();
            var dc = dd.getTime();
            var de = dd.getTimezoneOffset() * 60;
            return {
                goformId: "HTTPSHARE_FILE_RENAME",
                path_SD_CARD: da.path,
                OLD_NAME_SD_CARD: da.oldPath,
                NEW_NAME_SD_CARD: da.newPath,
                path_SD_CARD_time: transUnixTime(dc),
                path_SD_CARD_time_unix: Math.round((dc - de * 1000) / 1000)
            }
        }

        function c9(da) {
            if (da) {
                if (da.result == "success") {
                    return {result: true}
                } else {
                    if (da.result == "no_sdcard") {
                        return cO.extend(V, {errorType: "no_sdcard"})
                    } else {
                        if (da.result == "noexist") {
                            return cO.extend(V, {errorType: "no_exist"})
                        } else {
                            if (da.result == "processing") {
                                return cO.extend(V, {errorType: "sd_file_processing_cant_rename"})
                            } else {
                                return {result: false}
                            }
                        }
                    }
                }
            } else {
                return V
            }
        }
    }

    function A() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {cmd: "HTTPSHARE_GETCARD_VALUE"};
            return dc
        }

        function c9(da) {
            if (!da || (da.result && da.result == "no_sdcard")) {
                return cO.extend(V, {errorType: "no_sdcard"})
            } else {
                return {
                    totalMemorySize: da.sd_card_total_size == "" ? 0 : da.sd_card_total_size * 32 * 1024,
                    availableMemorySize: da.sd_card_avi_space == "" ? 0 : da.sd_card_avi_space * 32 * 1024
                }
            }
        }
    }

    function aU() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = new Date().getTime();
            var dd = {
                goformId: "HTTPSHARE_DEL",
                path_SD_CARD: da.path,
                name_SD_CARD: da.names,
                path_SD_CARD_time: transUnixTime(dc),
                path_SD_CARD_time_unix: Math.round(dc / 1000)
            };
            return dd
        }

        function c9(da) {
            if (da.result && da.result == "failure") {
                return {status: "failure"}
            } else {
                if (da.result && da.result == "no_sdcard") {
                    return {status: "no_sdcard"}
                } else {
                    if (da.result && da.result == "processing") {
                        return {status: "processing"}
                    } else {
                        if (da.result && da.result == "success") {
                            return {status: "success"}
                        } else {
                            return V
                        }
                    }
                }
            }
        }
    }

    function G() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dd = new Date();
            var dc = dd.getTime();
            var de = dd.getTimezoneOffset() * 60;
            return {
                goformId: "HTTPSHARE_NEW",
                path_SD_CARD: da.path,
                path_SD_CARD_time: transUnixTime(dc),
                path_SD_CARD_time_unix: Math.round((dc - de * 1000) / 1000)
            }
        }

        function c9(da) {
            if (da.result && da.result == "failure") {
                return cO.extend(V, {errorType: "create_folder_failure"})
            } else {
                if (da.result && da.result == "no_sdcard") {
                    return cO.extend(V, {errorType: "no_sdcard"})
                } else {
                    if (da.result && da.result == "success") {
                        return {result: true}
                    } else {
                        return V
                    }
                }
            }
        }
    }

    function cb() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {
                goformId: "HTTPSHARE_AUTH_SET",
                HTTP_SHARE_STATUS: da.share_status == "1" ? "Enabled" : "Disabled",
                HTTP_SHARE_WR_AUTH: da.share_auth == "1" ? "readWrite" : "readOnly",
                HTTP_SHARE_FILE: da.share_file
            };
            return dc
        }

        function c9(da) {
            if (da) {
                if (da.result == "no_sdcard") {
                    return cO.extend(V, {errorType: "no_sdcard"})
                } else {
                    return {result: true}
                }
            } else {
                return V
            }
        }
    }

    function be() {
        return by(arguments, {}, c9, da, null, false);

        function c9(db, dc) {
            var dd = {};
            dd.cmd = "IPPortFilterEnable,DefaultFirewallPolicy,IPPortFilterRules_0,IPPortFilterRules_1,IPPortFilterRules_2,IPPortFilterRules_3,IPPortFilterRules_4,IPPortFilterRules_5,IPPortFilterRules_6,IPPortFilterRules_7,IPPortFilterRules_8,IPPortFilterRules_9";
            dd.cmd += ",IPPortFilterRulesv6_0,IPPortFilterRulesv6_1,IPPortFilterRulesv6_2,IPPortFilterRulesv6_3,IPPortFilterRulesv6_4,IPPortFilterRulesv6_5,IPPortFilterRulesv6_6,IPPortFilterRulesv6_7,IPPortFilterRulesv6_8,IPPortFilterRulesv6_9";
            dd.multi_data = 1;
            return dd
        }

        function da(dc) {
            if (dc) {
                var db = {};
                db.portFilterEnable = dc.IPPortFilterEnable;
                db.defaultPolicy = dc.DefaultFirewallPolicy;
                var de = [];
                if (dc.IPPortFilterRules_0 != "") {
                    de.push([0, dc.IPPortFilterRules_0])
                }
                if (dc.IPPortFilterRules_1 != "") {
                    de.push([1, dc.IPPortFilterRules_1])
                }
                if (dc.IPPortFilterRules_2 != "") {
                    de.push([2, dc.IPPortFilterRules_2])
                }
                if (dc.IPPortFilterRules_3 != "") {
                    de.push([3, dc.IPPortFilterRules_3])
                }
                if (dc.IPPortFilterRules_4 != "") {
                    de.push([4, dc.IPPortFilterRules_4])
                }
                if (dc.IPPortFilterRules_5 != "") {
                    de.push([5, dc.IPPortFilterRules_5])
                }
                if (dc.IPPortFilterRules_6 != "") {
                    de.push([6, dc.IPPortFilterRules_6])
                }
                if (dc.IPPortFilterRules_7 != "") {
                    de.push([7, dc.IPPortFilterRules_7])
                }
                if (dc.IPPortFilterRules_8 != "") {
                    de.push([8, dc.IPPortFilterRules_8])
                }
                if (dc.IPPortFilterRules_9 != "") {
                    de.push([9, dc.IPPortFilterRules_9])
                }
                db.portFilterRules = c8(de, "IPv4");
                var dd = [];
                if (dc.IPPortFilterRulesv6_0 != "") {
                    dd.push([10, dc.IPPortFilterRulesv6_0])
                }
                if (dc.IPPortFilterRulesv6_1 != "") {
                    dd.push([11, dc.IPPortFilterRulesv6_1])
                }
                if (dc.IPPortFilterRulesv6_2 != "") {
                    dd.push([12, dc.IPPortFilterRulesv6_2])
                }
                if (dc.IPPortFilterRulesv6_3 != "") {
                    dd.push([13, dc.IPPortFilterRulesv6_3])
                }
                if (dc.IPPortFilterRulesv6_4 != "") {
                    dd.push([14, dc.IPPortFilterRulesv6_4])
                }
                if (dc.IPPortFilterRulesv6_5 != "") {
                    dd.push([15, dc.IPPortFilterRulesv6_5])
                }
                if (dc.IPPortFilterRulesv6_6 != "") {
                    dd.push([16, dc.IPPortFilterRulesv6_6])
                }
                if (dc.IPPortFilterRulesv6_7 != "") {
                    dd.push([17, dc.IPPortFilterRulesv6_7])
                }
                if (dc.IPPortFilterRulesv6_8 != "") {
                    dd.push([18, dc.IPPortFilterRulesv6_8])
                }
                if (dc.IPPortFilterRulesv6_9 != "") {
                    dd.push([19, dc.IPPortFilterRulesv6_9])
                }
                db.portFilterRules = cg.union(db.portFilterRules, c8(dd, "IPv6"));
                return db
            } else {
                return V
            }
        }

        function c8(db, dg) {
            var df = [];
            if (db && db.length > 0) {
                for (var dd = 0; dd < db.length; dd++) {
                    var dc = {};
                    var de = db[dd][1].split(",");
                    dc.index = db[dd][0];
                    dc.macAddress = de[11];
                    dc.destIpAddress = de[4] == "any/0" ? "" : de[4];
                    dc.sourceIpAddress = de[0] == "any/0" ? "" : de[0];
                    dc.destPortRange = de[6] == "0" ? "" : de[6] + " - " + de[7];
                    dc.sourcePortRange = de[2] == "0" ? "" : de[2] + " - " + de[3];
                    dc.action = de[9] == 1 ? "filter_accept" : "filter_drop";
                    dc.protocol = transProtocol(de[8]);
                    dc.comment = de[10];
                    dc.ipType = dg;
                    df.push(dc)
                }
            }
            return df
        }
    }

    function ai() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "BASIC_SETTING";
            dc.portFilterEnabled = da.portFilterEnable;
            dc.defaultFirewallPolicy = da.defaultPolicy;
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function T() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "ADD_IP_PORT_FILETER_V4V6";
            dc.ip_version = da.ipType;
            dc.mac_address = da.macAddress;
            dc.dip_address = da.destIpAddress;
            dc.sip_address = da.sourceIpAddress;
            dc.dFromPort = da.destPortStart;
            dc.dToPort = da.destPortEnd;
            dc.sFromPort = da.sourcePortStart;
            dc.sToPort = da.sourcePortEnd;
            dc.action = da.action;
            dc.protocol = da.protocol;
            dc.comment = da.comment;
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function az() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(db, dc) {
            var dd = {};
            var de = cg.filter(db.indexs, function (df) {
                return df.length == 1
            });
            dd.goformId = "DEL_IP_PORT_FILETER_V4V6";
            var da = [];
            cg.each(db.indexs, function (df) {
                if (df.length == 2) {
                    da.push(df.substring(1))
                }
            });
            dd.delete_id_v6 = da.length > 0 ? da.join(";") + ";" : "";
            dd.delete_id = de.length > 0 ? de.join(";") + ";" : "";
            return dd
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function co() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "WirelessMode,CountryCode,Channel,HT_MCS,wifi_band,wifi_11n_cap,MAX_Access_num,m_MAX_Access_num,MAX_Station_num,wifi_sta_connection";
            dc.multi_data = 1;
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {
                    mode: db.WirelessMode,
                    countryCode: db.CountryCode,
                    channel: db.Channel,
                    rate: db.HT_MCS,
                    wifiBand: db.wifi_band == "a" ? "a" : "b",
                    bandwidth: db.wifi_11n_cap,
                    MAX_Station_num: cO.isNumeric(db.MAX_Station_num) ? db.MAX_Station_num : aF.MAX_STATION_NUMBER,
                    MAX_Access_num: db.MAX_Access_num,
                    m_MAX_Access_num: db.m_MAX_Access_num,
                    ap_station_enable: db.wifi_sta_connection
                };
                return da
            } else {
                return V
            }
        }
    }

    function cY() {
        av(arguments, c8, c9);

        function c8(da) {
            var db = {
                goformId: "SET_WIFI_INFO",
                wifiMode: da.mode,
                countryCode: da.countryCode,
                MAX_Access_num: da.station,
                m_MAX_Access_num: da.m_station
            };
            if (aF.WIFI_BAND_SUPPORT) {
                db.wifi_band = da.wifiBand
            }
            if (aF.WIFI_BAND_SUPPORT && da.wifiBand == "a") {
                db.selectedChannel = "auto"
            } else {
                db.selectedChannel = da.channel;
                db.abg_rate = da.rate
            }
            if (aF.WIFI_BANDWIDTH_SUPPORT) {
                db.wifi_11n_cap = da.bandwidth
            }
            return db
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function a9() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(db, dc) {
            var da = aF.PASSWORD_ENCODE ? "WPAPSK1_encode,m_WPAPSK1_encode," : "rnum_js,WPAPSK1_enaes,m_WPAPSK1_enaes,";
            var dd = {
                cmd: "wifi_coverage,m_ssid_enable,imei,network_type,sub_network_type,rssi,rscp,lte_rsrp,ziccid,imsi,sim_imsi,cr_version,cstm_sw_version,hw_version,cstm_hw_version,MAX_Access_num," + da + "SSID1,AuthMode,m_SSID,m_AuthMode,m_HideSSID,m_MAX_Access_num,lan_ipaddr,mac_address,msisdn,LocalDomain,wan_ipaddr,static_wan_ipaddr,ipv6_wan_ipaddr,ipv6_pdp_type,pdp_type,ppp_status,sta_ip_status,rj45_state,ethwan_mode,detail_cell_rsrq,detail_cell_rssi,detail_cell_pci,detail_cell_sinr,detail_cell_id",
                multi_data: 1
            };
            return dd
        }

        function c9(da) {
            if (da) {
                return {
                    ssid: da.SSID1,
                    authMode: da.AuthMode,
                    passPhrase: aF.PASSWORD_ENCODE ? Base64.decode(da.WPAPSK1_encode) : c(da.rnum_js, da.imei, da.WPAPSK1_enaes),
                    m_ssid: da.m_SSID,
                    m_AuthMode: da.m_AuthMode,
                    m_passPhrase: aF.PASSWORD_ENCODE ? Base64.decode(da.m_WPAPSK1_encode) : c(da.rnum_js, da.imei, da.m_WPAPSK1_enaes),
                    m_max_access_num: da.m_MAX_Access_num,
                    multi_ssid_enable: da.m_ssid_enable,
                    ipAddress: da.lan_ipaddr,
                    wanIpAddress: da.wan_ipaddr,
                    staticWanIpAddress: da.static_wan_ipaddr,
                    ipv6WanIpAddress: da.ipv6_wan_ipaddr,
                    ipv6PdpType: da.ipv6_pdp_type,
                    macAddress: da.mac_address,
                    simSerialNumber: da.msisdn,
                    iccid: da.ziccid,
                    lanDomain: da.LocalDomain,
                    imei: da.imei,
                    signal: convertSignal(da),
                    imsi: da.imsi || da.sim_imsi,
                    sw_version: da.cstm_sw_version ? da.cstm_sw_version.split("-").join("‑") : da.cr_version ? da.cr_version.split("-").join("‑") : "",
                    hw_version: da.cstm_hw_version ? da.cstm_hw_version : da.hw_version,
                    max_access_num: da.MAX_Access_num,
                    wifiRange: da.wifi_coverage,
                    pdpType: da.pdp_type,
                    rj45ConnectStatus: (typeof da.rj45_state == "undefined" || da.rj45_state == "") ? "dead" : da.rj45_state,
                    blc_wan_mode: bu.blc_wan_mode,
                    connectStatus: da.ppp_status,
                    wifiConStatus: da.sta_ip_status,
                    ethwan_mode: da.ethwan_mode.toUpperCase(),
                    rsrp: da.lte_rsrp,
                    rsrq: da.detail_cell_rsrq,
                    rssi: da.detail_cell_rssi,
                    pci: da.detail_cell_pci,
                    sinr: da.detail_cell_sinr,
                    cellid: da.detail_cell_id
                }
            } else {
                return V
            }
        }
    }

    function cU() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {cmd: "imei,rnum_js", multi_data: 1};
            return dc
        }

        function c9(da) {
            if (da) {
                var dd = da.rnum_js + da.imei + "FFFFFFFFFFFFFFFFFFFFFFFF";
                var db;
                var dc;
                db = dd.substring(0, 24);
                dc = dd.substring(0, 16);
                return {skey: db, siv: dc}
            } else {
                return {skey: "FFFFFFFFFFFFFFFFFFFFFFFF", siv: "FFFFFFFFFFFFFFFF"}
            }
        }
    }

    function W() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "wifi_coverage";
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {};
                da.wifiRangeMode = db.wifi_coverage;
                return da
            } else {
                return V
            }
        }
    }

    function cW() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "SET_WIFI_COVERAGE";
            dc.wifi_coverage = da.wifiRangeMode;
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function ak() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "upnpEnabled";
            dc.multi_data = 1;
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {};
                da.upnpSetting = db.upnpEnabled == "1" ? "1" : "0";
                return da
            } else {
                return V
            }
        }
    }

    function a1() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "UPNP_SETTING";
            dc.upnp_setting_option = da.upnpSetting;
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function ay() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "DMZEnable,DMZIPAddress";
            dc.multi_data = 1;
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {};
                da.dmzSetting = db.DMZEnable == "1" ? "1" : "0";
                da.ipAddress = db.DMZIPAddress;
                return da
            } else {
                return V
            }
        }
    }

    function cS() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "DMZ_SETTING";
            dc.DMZEnabled = da.dmzSetting;
            if (dc.DMZEnabled == "1") {
                dc.DMZIPAddress = da.ipAddress
            }
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function a8() {
        return by(arguments, {}, c9, da, null, false);

        function c9(db, dc) {
            var dd = {};
            dd.cmd = "PortMapEnable,PortMapRules_0,PortMapRules_1,PortMapRules_2,PortMapRules_3,PortMapRules_4,PortMapRules_5,PortMapRules_6,PortMapRules_7,PortMapRules_8,PortMapRules_9", dd.multi_data = 1;
            return dd
        }

        function da(dc) {
            if (dc) {
                var db = {};
                db.portMapEnable = dc.PortMapEnable;
                var dd = [];
                if (dc.PortMapRules_0 != "") {
                    dd.push([0, dc.PortMapRules_0])
                }
                if (dc.PortMapRules_1 != "") {
                    dd.push([1, dc.PortMapRules_1])
                }
                if (dc.PortMapRules_2 != "") {
                    dd.push([2, dc.PortMapRules_2])
                }
                if (dc.PortMapRules_3 != "") {
                    dd.push([3, dc.PortMapRules_3])
                }
                if (dc.PortMapRules_4 != "") {
                    dd.push([4, dc.PortMapRules_4])
                }
                if (dc.PortMapRules_5 != "") {
                    dd.push([5, dc.PortMapRules_5])
                }
                if (dc.PortMapRules_6 != "") {
                    dd.push([6, dc.PortMapRules_6])
                }
                if (dc.PortMapRules_7 != "") {
                    dd.push([7, dc.PortMapRules_7])
                }
                if (dc.PortMapRules_8 != "") {
                    dd.push([8, dc.PortMapRules_8])
                }
                if (dc.PortMapRules_9 != "") {
                    dd.push([9, dc.PortMapRules_9])
                }
                db.portMapRules = c8(dd);
                return db
            } else {
                return V
            }
        }

        function c8(db) {
            var df = [];
            if (db && db.length > 0) {
                for (var dd = 0; dd < db.length; dd++) {
                    var dc = {};
                    var de = db[dd][1].split(",");
                    dc.index = db[dd][0];
                    dc.sourcePort = de[1];
                    dc.destIpAddress = de[0];
                    dc.destPort = de[2];
                    dc.protocol = transProtocol(de[3]);
                    dc.comment = de[4];
                    df.push(dc)
                }
            }
            return df
        }
    }

    function bE() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "ADD_PORT_MAP";
            dc.portMapEnabled = da.portMapEnable;
            dc.fromPort = da.sourcePort;
            dc.ip_address = da.destIpAddress;
            dc.toPort = da.destPort;
            dc.protocol = da.protocol;
            dc.comment = da.comment;
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function bB() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "ADD_PORT_MAP";
            dc.portMapEnabled = da.portMapEnable;
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function aW() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "DEL_PORT_MAP";
            dc.delete_id = da.indexs.join(";") + ";";
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function H() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            return {
                cmd: "data_volume_limit_switch,data_volume_limit_unit,data_volume_limit_size,data_volume_alert_percent,monthly_tx_bytes,monthly_rx_bytes,monthly_time,traffic_alined_delta",
                multi_data: 1
            }
        }

        function c9(db) {
            if (db) {
                var dc = db.data_volume_limit_unit == "data";
                var da = {
                    dataLimitChecked: db.data_volume_limit_switch,
                    dataLimitTypeChecked: dc ? "1" : "0",
                    limitDataMonth: dc ? db.data_volume_limit_size : "0",
                    alertDataReach: dc ? db.data_volume_alert_percent : "0",
                    limitTimeMonth: dc ? "0" : db.data_volume_limit_size,
                    alertTimeReach: dc ? "0" : db.data_volume_alert_percent,
                    monthlySent: db.monthly_tx_bytes == "" ? 0 : db.monthly_tx_bytes,
                    monthlyReceived: db.monthly_rx_bytes == "" ? 0 : db.monthly_rx_bytes,
                    monthlyConnectedTime: db.monthly_time == "" ? 0 : db.monthly_time,
                    traffic_alined_delta: db.traffic_alined_delta == "" ? 0 : db.traffic_alined_delta
                };
                return da
            } else {
                return V
            }
        }
    }

    function am() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dd = da.dataLimitTypeChecked == "1";
            var dc = {goformId: "DATA_LIMIT_SETTING", data_volume_limit_switch: da.dataLimitChecked};
            if (da.dataLimitChecked == "1") {
                dc.data_volume_limit_unit = dd ? "data" : "time";
                dc.data_volume_limit_size = dd ? da.limitDataMonth : da.limitTimeMonth;
                dc.data_volume_alert_percent = dd ? da.alertDataReach : da.alertTimeReach
            }
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function cy() {
        var da = arguments[1];
        return by(arguments, {}, c8, c9, null, true);

        function c8(db, dc) {
            if (db.sendOrReply == "send") {
                return {
                    goformId: "USSD_PROCESS",
                    USSD_operator: db.operator,
                    USSD_send_number: db.strUSSDCommand,
                    notCallback: true
                }
            } else {
                if (db.sendOrReply == "reply") {
                    return {
                        goformId: "USSD_PROCESS",
                        USSD_operator: db.operator,
                        USSD_reply_number: db.strUSSDCommand,
                        notCallback: true
                    }
                }
            }
        }

        function c9(db) {
            if (!db) {
                da(false, "ussd_fail");
                return
            }
            if (db.result == "success") {
                callbackTemp = da;
                b9()
            } else {
                da(false, "ussd_fail")
            }
        }
    }

    function b9() {
        cO.ajax({
            url: "/goform/goform_get_cmd_process",
            data: {cmd: "ussd_write_flag"},
            cache: false,
            async: true,
            dataType: "json",
            success: function (c8) {
                if (c8.ussd_write_flag == "1") {
                    callbackTemp(false, "ussd_no_service")
                } else {
                    if (c8.ussd_write_flag == "4" || c8.ussd_write_flag == "unknown" || c8.ussd_write_flag == "3") {
                        callbackTemp(false, "ussd_timeout")
                    } else {
                        if (c8.ussd_write_flag == "15") {
                            setTimeout(b9, 1000)
                        } else {
                            if (c8.ussd_write_flag == "10") {
                                callbackTemp(false, "ussd_retry")
                            } else {
                                if (c8.ussd_write_flag == "99") {
                                    callbackTemp(false, "ussd_unsupport")
                                } else {
                                    if (c8.ussd_write_flag == "41") {
                                        callbackTemp(false, "operation_not_supported")
                                    } else {
                                        if (c8.ussd_write_flag == "2") {
                                            callbackTemp(false, "network_terminated")
                                        } else {
                                            if (c8.ussd_write_flag == "16") {
                                                cO.ajax({
                                                    url: "/goform/goform_get_cmd_process",
                                                    data: {cmd: "ussd_data_info"},
                                                    dataType: "json",
                                                    async: true,
                                                    cache: false,
                                                    success: function (c9) {
                                                        var da = {};
                                                        da.data = c9.ussd_data;
                                                        da.ussd_action = c9.ussd_action;
                                                        da.ussd_dcs = c9.ussd_dcs;
                                                        callbackTemp(true, da)
                                                    },
                                                    error: function () {
                                                        callbackTemp(false, "ussd_info_error")
                                                    }
                                                })
                                            } else {
                                                callbackTemp(false, "ussd_fail")
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            error: function () {
                callbackTemp(false, "ussd_fail")
            }
        })
    }

    function p(c9) {
        cO.ajax({
            url: "/goform/goform_set_cmd_process",
            data: {goformId: "USSD_PROCESS", USSD_operator: "ussd_cancel"},
            cache: false,
            dataType: "json",
            success: function (da) {
                if (da.result == "success") {
                    c8()
                } else {
                    c9(false)
                }
            }
        });

        function c8() {
            cO.ajax({
                url: "/goform/goform_get_cmd_process",
                data: {cmd: "ussd_write_flag"},
                cache: false,
                async: true,
                dataType: "json",
                success: function (da) {
                    if (da.ussd_write_flag == "15") {
                        setTimeout(c8, 1000)
                    } else {
                        if (da.ussd_write_flag == "13") {
                            c9(true)
                        } else {
                            c9(false)
                        }
                    }
                },
                error: function () {
                    c9(false)
                }
            })
        }
    }

    function aK() {
        var dc = arguments[1];
        var db = 0;
        return by(arguments, {}, c8, c9, null, true);

        function c8(dd) {
            return {goformId: "UNLOCK_NETWORK", notCallback: true, unlock_network_code: dd.unlock_network_code}
        }

        function c9(dd) {
            if (dd && dd.result == "success") {
                cP(da)
            } else {
                dc({result: "fail"})
            }
        }

        function da() {
            if (db > 5) {
                B(da);
                dc({result: "fail"})
            } else {
                if (bu.simStatus != "modem_imsi_waitnck") {
                    B(da);
                    dc({result: "success"})
                }
            }
            db++
        }
    }

    function bK() {
        var dc = arguments[1];
        var db = 0;
        return by(arguments, {}, c8, da, null, true);

        function c8(dd) {
            return {goformId: "GORORM_UNLOCK_SIM", notCallback: true, sim_unlock_code: dd.sim_unlock_code}
        }

        function da(dd) {
            if (dd && dd.result == "success") {
                cP(c9)
            } else {
                dc({result: "fail"})
            }
        }

        function c9() {
            if (db > 5) {
                B(c9);
                dc({result: "fail"})
            } else {
                if (bu.simStatus != "modem_imsi_waitnck") {
                    B(c9);
                    dc({result: "success"})
                }
            }
            db++
        }
    }

    function ci() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            return {cmd: "unlock_nck_time"}
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function U() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            return {cmd: "sim_unlock_nck_time"}
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function aZ() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            return {cmd: "sim_lock_status,cstm_webui_unlocksim", multi_data: "1"}
        }

        function c9(da) {
            if (da) {
                var dc;
                var dd = bM().CurrentPasswd;
                var db = bM().RootPasswd;
                if (dd != db && dd != "xfnj1234") {
                    dc = da.cstm_webui_unlocksim
                } else {
                    if (da.cstm_webui_unlocksim == "2") {
                        dc = "1"
                    } else {
                        dc = da.cstm_webui_unlocksim
                    }
                }
                return {sim_lock_status: da.sim_lock_status, cstm_webui_unlocksim: dc}
            } else {
                return V
            }
        }
    }

    function c1() {
        var da = arguments[1];
        return by(arguments, {}, c8, c9, null, true);

        function c8(db) {
            return {goformId: "SET_UPGRADE_NOTICE", upgrade_notice_flag: db.upgrade_notice_flag, notCallback: true}
        }

        function c9(db) {
            if (db.result == "success") {
                da(true)
            } else {
                da(false)
            }
        }
    }

    function b2() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            return {cmd: "upgrade_notice_flag"}
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function at() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            return {multi_data: 1, cmd: "wifi_sta_connection,pswan_priority,wifiwan_priority,ethwan_priority"}
        }

        function c9(da) {
            if (da) {
                return {
                    ap_station_enable: da.wifi_sta_connection,
                    ap_station_mode: parseInt(da.wifiwan_priority, 10) > parseInt(da.pswan_priority, 10) ? "wifi_pref" : "dial_pref"
                }
            } else {
                return V
            }
        }
    }

    function bc() {
        var c9 = arguments[0];
        return by(arguments, {}, c8, da, null, true);

        function c8(db) {
            return {goformId: "WIFI_STA_CONTROL", wifi_sta_connection: db.ap_station_enable}
        }

        function da(db) {
            if (db && db.result == "success") {
                bu.ap_station_enable = c9.ap_station_enable == 1;
                return db
            } else {
                return V
            }
        }
    }

    function aa() {
        return at({}, function (c8) {
            bu.ap_station_enable = c8.ap_station_enable == 1;
            bu.ap_station_mode = c8.ap_station_mode
        })
    }

    function cl() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, dc) {
            var dd = "wifi_profile_num,wifi_profile";
            for (var db = 1; db < aF.AP_STATION_LIST_LENGTH; db++) {
                dd = dd + ",wifi_profile" + db
            }
            return {multi_data: 1, cmd: dd}
        }

        function c9(da) {
            if (da) {
                var df = [];
                for (var de = 0; de < aF.AP_STATION_LIST_LENGTH; de++) {
                    var dh = "";
                    if (de == 0) {
                        dh = da.wifi_profile
                    } else {
                        dh = da["wifi_profile" + de]
                    }
                    var dd = dh.split(";");
                    for (var dc = 0; dc < dd.length; dc++) {
                        var dg = dd[dc].split(",");
                        if (!dg[0]) {
                            break
                        }
                        var db = {
                            profileName: dg[0],
                            fromProvider: dg[1],
                            connectStatus: dg[2],
                            signal: dg[3],
                            ssid: dg[4],
                            authMode: dg[5],
                            encryptType: dg[6],
                            password: dg[7] == "0" ? "" : dg[7],
                            keyID: dg[8],
                            mac: dg[9]
                        };
                        df.push(db)
                    }
                }
                return {hotspotList: df}
            } else {
                return V
            }
        }
    }

    function an() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da) {
            return {goformId: "WLAN_SET_STA_REFRESH"}
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function X() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            return {multi_data: 1, cmd: "scan_finish,EX_APLIST,EX_APLIST1"}
        }

        function c9(da) {
            if (da) {
                if (da.scan_finish == "0") {
                    return {scan_finish: "0", hotspotList: []}
                }
                if (da.scan_finish == "2") {
                    return {scan_finish: "2", hotspotList: []}
                }
                var df = [];
                for (var de = 0; de <= 1; de++) {
                    var dh;
                    if (de == 0) {
                        dh = da.EX_APLIST
                    } else {
                        dh = da.EX_APLIST1
                    }
                    var dd = dh.split(";");
                    for (var dc = 0; dc < dd.length; dc++) {
                        var dg = dd[dc].split(",");
                        if (!dg[0]) {
                            break
                        }
                        var db = {
                            fromProvider: dg[0],
                            connectStatus: dg[1],
                            ssid: dg[2],
                            signal: dg[3],
                            channel: dg[4],
                            authMode: dg[5],
                            encryptType: dg[6],
                            mac: dg[7]
                        };
                        df.push(db)
                    }
                }
                return {scan_finish: "1", hotspotList: df}
            } else {
                return V
            }
        }
    }

    function cM(c9) {
        var c8 = [];
        c8.push(c9.profileName);
        c8.push(c9.fromProvider || "0");
        c8.push(c9.connectStatus || "0");
        c8.push(c9.signal);
        c8.push(c9.ssid);
        c8.push(c9.authMode);
        c8.push(c9.encryptType);
        c8.push(c9.password || "0");
        c8.push(c9.keyID);
        c8.push(c9.mac);
        return c8.join(",")
    }

    function aj() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(dj) {
            var dk = dj.apList;
            var da = "modify";
            if (dj.profileName == "") {
                da = "add";
                var df = (jQuery.fn.jquery + Math.random()).replace(/\D/g, "");
                dj.profileName = df;
                dk.push({
                    profileName: df,
                    fromProvider: "0",
                    connectStatus: "0",
                    signal: dj.signal,
                    ssid: dj.ssid,
                    authMode: dj.authMode,
                    encryptType: dj.encryptType,
                    password: dj.password || "0",
                    keyID: dj.keyID,
                    mac: dj.mac
                })
            }
            var dh = {profile0: []};
            for (var db = 1; db < aF.AP_STATION_LIST_LENGTH; db++) {
                dh["profile" + db] = []
            }
            var dc = "";
            for (var db = 0; db < dk.length; db++) {
                var de = "";
                if (dj.profileName == dk[db].profileName) {
                    de = cM(dj);
                    dc = de
                } else {
                    de = cM(dk[db])
                }
                var dd = parseInt(db % 10);
                dh["profile" + dd].push(de)
            }
            var dg = {wifi_profile: dh.profile0.join(";")};
            for (var db = 1; db < aF.AP_STATION_LIST_LENGTH; db++) {
                dg["wifi_profile" + db] = dh["profile" + db].join(";")
            }
            var di = cO.extend({
                goformId: "WIFI_SPOT_PROFILE_UPDATE",
                wifi_profile_num: dk.length,
                wifi_update_profile: dc,
                action: da
            }, dg);
            return di
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function cT() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(dj) {
            var dl = dj.apList;
            var dh = {profile0: []};
            for (var db = 1; db < aF.AP_STATION_LIST_LENGTH; db++) {
                dh["profile" + db] = []
            }
            var da = false;
            var dd = "";
            for (var db = 0; db < dl.length; db++) {
                var df = cM(dl[db]);
                if (dl[db].profileName == dj.profileName) {
                    da = true;
                    dd = df;
                    continue
                }
                var dk = db;
                if (da) {
                    dk = db - 1
                }
                var de = parseInt(dk % 10);
                dh["profile" + de].push(df)
            }
            var dc = da ? dl.length - 1 : dl.length;
            var dg = {wifi_profile: dh.profile0.join(";")};
            for (var db = 1; db < aF.AP_STATION_LIST_LENGTH; db++) {
                dg["wifi_profile" + db] = dh["profile" + db].join(";")
            }
            var di = cO.extend({
                goformId: "WIFI_SPOT_PROFILE_UPDATE",
                wifi_profile_num: dc,
                wifi_update_profile: dd,
                action: "delete"
            }, dg);
            return di
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function bD() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da) {
            return {
                goformId: "WLAN_SET_STA_CON",
                EX_SSID1: da.EX_SSID1,
                EX_AuthMode: da.EX_AuthMode,
                EX_EncrypType: da.EX_EncrypType,
                EX_DefaultKeyID: da.EX_DefaultKeyID,
                EX_WEPKEY: da.EX_WEPKEY,
                EX_WPAPSK1: da.EX_WPAPSK1,
                EX_wifi_profile: da.EX_wifi_profile,
                EX_mac: da.EX_mac
            }
        }

        function c9(da) {
            if (da && (da.result == "success" || da.result == "processing")) {
                return da
            } else {
                return V
            }
        }
    }

    function aI() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da) {
            return {goformId: "WLAN_SET_STA_DISCON"}
        }

        function c9(da) {
            if (da && da.result == "success") {
                return da
            } else {
                return V
            }
        }
    }

    function cR() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            return {multi_data: 1, cmd: "blc_wan_mode,blc_wan_auto_mode,loginfo,ppp_status,rj45_state,ethwan_mode"}
        }

        function c9(db) {
            if (db) {
                var da = {};
                if (db.blc_wan_mode == "AUTO") {
                    da.blc_wan_mode = db.blc_wan_auto_mode ? db.blc_wan_auto_mode : "AUTO_PPP"
                } else {
                    da.blc_wan_mode = db.blc_wan_mode ? db.blc_wan_mode : "PPP"
                }
                da.loginfo = db.loginfo;
                da.ppp_status = db.ppp_status;
                da.rj45_state = (typeof db.rj45_state == "undefined" || db.rj45_state == "") ? "dead" : db.rj45_state;
                da.ethwan_mode = db.ethwan_mode.toUpperCase();
                return da
            } else {
                return V
            }
        }
    }

    function a2() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            return {cmd: "rj45_plug"}
        }

        function c9(db) {
            if (db) {
                var da = {};
                da.rj45_plug = db.rj45_plug == "" ? "wan_lan_off" : db.rj45_plug;
                return da
            } else {
                return V
            }
        }
    }

    function cw(c8, c9) {
        if (aF.RJ45_SUPPORT) {
            if (c9 == "dead" || c9 == "") {
                return "PPP"
            } else {
                if (!c8 || c8 == "undefined") {
                    if (c9 == "working") {
                        return "PPPOE"
                    } else {
                        return "PPP"
                    }
                } else {
                    return c8
                }
            }
        } else {
            return "PPP"
        }
    }

    function bi(c8, db) {
        return by(arguments, {}, c9, da, null, true);

        function c9(dc) {
            var dd = cO.extend({goformId: "OPERATION_MODE"}, dc);
            return dd
        }

        function da(dc) {
            if (dc && dc.result == "success") {
                return dc
            } else {
                return V
            }
        }
    }

    function a5() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            return {
                multi_data: 1,
                cmd: "opms_wan_auto_mode,ethwan_mode,pppoe_username,pppoe_cc,ethwan_dialmode,ppp_status,static_wan_ipaddr,static_wan_netmask,static_wan_gateway,static_wan_primary_dns,static_wan_secondary_dns,rj45_state,lan_ipaddr,lan_netmask"
            }
        }

        function c9(da) {
            if (da) {
                return {
                    opms_wan_auto_mode: da.opms_wan_auto_mode,
                    ethwan_mode: da.ethwan_mode.toUpperCase(),
                    pppoe_username: da.pppoe_username,
                    pppoe_cc: da.pppoe_cc,
                    ethwan_dialmode: da.ethwan_dialmode == "manual" ? "manual_dial" : "auto_dial",
                    ppp_status: da.ppp_status,
                    static_wan_ipaddr: da.static_wan_ipaddr,
                    static_wan_netmask: da.static_wan_netmask,
                    static_wan_gateway: da.static_wan_gateway,
                    static_wan_primary_dns: da.static_wan_primary_dns,
                    static_wan_secondary_dns: da.static_wan_secondary_dns,
                    rj45_state: (typeof da.rj45_state == "undefined" || da.rj45_state == "") ? "dead" : da.rj45_state,
                    lan_ipaddr: da.lan_ipaddr,
                    lan_netmask: da.lan_netmask
                }
            } else {
                return V
            }
        }
    }

    function cB(c8, db) {
        return by(arguments, {}, c9, da, null, true);

        function c9(dc) {
            var dd = cO.extend({notCallback: true}, dc);
            return dd
        }

        function da(dc) {
            if (dc.result == "success") {
                db({result: true})
            } else {
                db({result: false})
            }
        }
    }

    function c5() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {
                cmd: "sim_switch_number,sim_auto_switch_enable,sim_current_type,sim_switch_running_detect,sim_default_type,sim_lock_status,cstm_webui_simswitch",
                multi_data: "1"
            };
            return dc
        }

        function c9(db) {
            if (db) {
                var da;
                var dd = bM().CurrentPasswd;
                var dc = bM().RootPasswd;
                if (dd != dc && dd != "xfnj1234") {
                    da = db.cstm_webui_simswitch
                } else {
                    if (db.cstm_webui_simswitch == "2") {
                        da = "1"
                    } else {
                        da = db.cstm_webui_simswitch
                    }
                }
                return {
                    sim_switch_number: db.sim_switch_number,
                    sim_auto_switch_enable: db.sim_auto_switch_enable,
                    sim_current_type: db.sim_current_type,
                    sim_default_type: db.sim_default_type,
                    sim_lock_status: db.sim_lock_status,
                    sim_switch_running_detect: db.sim_switch_running_detect,
                    cstm_webui_simswitch: da
                }
            } else {
                return V
            }
        }
    }

    function b8() {
        return by(arguments, {}, c8, c9, {}, true);

        function c8(da) {
            var db = {};
            db.goformId = "SIM_SWITCH";
            db.sim_auto_switch_enable = da.sim_mode;
            db.sim_default_type = da.sim_type;
            db.sim_switch_running_detect = da.sim_running;
            return db
        }

        function c9(da) {
            if (da && da.result === "success") {
                return {result: "success"}
            } else {
                if (da && da.result === "processing") {
                    return {result: "processing"}
                } else {
                    return {result: "failure"}
                }
            }
        }
    }

    function aq(c8, dc) {
        return by(arguments, {}, c9, da, null, false);

        function c9(dd, de) {
            return {
                multi_data: 1,
                cmd: "sntp_year,sntp_month,sntp_day,sntp_hour,sntp_minute,sntp_second,sntp_time_set_mode,sntp_static_server0,sntp_static_server1,sntp_static_server2,sntp_server0,sntp_server1,sntp_server2,sntp_server3,sntp_server4,sntp_server5,sntp_server6,sntp_server7,sntp_server8,sntp_server9,sntp_other_server0,sntp_other_server1,sntp_other_server2,sntp_timezone,sntp_timezone_index,sntp_dst_enable,ppp_status,sntp_process_result,rj45_state"
            }
        }

        function da(dd) {
            if (dd) {
                var de = db(dd);
                return {
                    sntp_year: dd.sntp_year,
                    sntp_month: dd.sntp_month,
                    sntp_day: dd.sntp_day,
                    sntp_hour: dd.sntp_hour,
                    sntp_minute: dd.sntp_minute,
                    sntp_second: dd.sntp_second,
                    sntp_time_set_mode: dd.sntp_time_set_mode,
                    sntp_servers: de,
                    sntp_server0: dd.sntp_server0,
                    sntp_server1: dd.sntp_server1,
                    sntp_server2: dd.sntp_server2,
                    sntp_static_server0: dd.sntp_static_server0,
                    sntp_static_server1: dd.sntp_static_server1,
                    sntp_static_server2: dd.sntp_static_server2,
                    sntp_other_server0: dd.sntp_other_server0,
                    sntp_other_server1: dd.sntp_other_server1,
                    sntp_other_server2: dd.sntp_other_server2,
                    sntp_timezone: dd.sntp_timezone,
                    sntp_timezone_index: dd.sntp_timezone_index ? dd.sntp_timezone_index : "0",
                    sntp_dst_enable: dd.sntp_dst_enable,
                    ppp_status: dd.ppp_status,
                    blc_wan_mode: bu.blc_wan_mode,
                    sntp_process_result: dd.sntp_process_result,
                    rj45_state: (typeof dd.rj45_state == "undefined" || dd.rj45_state == "") ? "dead" : dd.rj45_state
                }
            } else {
                return V
            }
        }

        function db(dd) {
            var dh = [];
            for (var dg = 0; dg < 3; dg++) {
                var df = "sntp_static_server" + (dg).toString();
                if (dd[df] != "") {
                    var dj = {};
                    dj.name = dd[df];
                    dj.value = dd[df];
                    dh.push(dj)
                }
            }
            var di = [{name: "Other", value: "Other"}, {name: "NONE", value: ""}];
            for (var de = 0; de < 2; de++) {
                dh.push(di[de])
            }
            return dh
        }
    }

    function b7(c8, db) {
        return by(arguments, {}, c9, da, null, true);

        function c9(dc) {
            var dd = cO.extend({}, dc);
            return dd
        }

        function da(dc) {
            if (dc && dc.result == "success") {
                return dc
            } else {
                return V
            }
        }
    }

    function g(c8, db) {
        var da = cO.extend({}, c8);
        cO.post("/goform/goform_set_cmd_process", da, function (dc) {
            if (dc && dc.result == "success") {
                if (c8.manualsettime == "auto") {
                    setTimeout(c9, 2000);
                    db(dc)
                } else {
                    db(true)
                }
            } else {
                if (dc && dc.result == "processing") {
                    db(dc)
                } else {
                    db(false)
                }
            }
        }, "json");

        function c9() {
            cO.ajax({
                url: "/goform/goform_get_cmd_process",
                dataType: "json",
                data: {cmd: "sntp_process_result"},
                cache: false,
                async: false,
                success: function (dc) {
                    if (dc.sntp_process_result == "failure") {
                        db(false)
                    } else {
                        if (dc.sntp_process_result == "success") {
                            db(true)
                        } else {
                            setTimeout(c9, 2000)
                        }
                    }
                },
                error: function () {
                    db(false)
                }
            })
        }
    }

    function ca(c8, db) {
        return by(arguments, {}, c9, da, null, true);

        function c9(dc) {
            var dd = cO.extend({}, dc);
            return dd
        }

        function da(dc) {
            if (dc && dc.result == "success") {
                return dc
            } else {
                return V
            }
        }
    }

    function bS() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            return {cmd: "websURLFilters"}
        }

        function c9(da) {
            var dd = [];
            if (da) {
                if (da.websURLFilters.length == 0) {
                    return {urlFilterRules: []}
                } else {
                    var de = da.websURLFilters.split(";");
                    for (var dc = 0; dc < de.length; dc++) {
                        var db = {};
                        db.index = dc;
                        db.url = de[dc];
                        dd.push(db)
                    }
                    return {urlFilterRules: dd}
                }
            } else {
                return V
            }
        }
    }

    function cn(c8, db) {
        return by(arguments, {}, c9, da, null, true);

        function c9(dc) {
            var dd = cO.extend({}, dc);
            return dd
        }

        function da(dc) {
            if (dc && dc.result == "success") {
                return dc
            } else {
                return V
            }
        }
    }

    function bF() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            return {
                multi_data: "1",
                cmd: "wifi_wds_mode,wifi_wds_ssid,wifi_wds_AuthMode,wifi_wds_EncrypType,wifi_wds_WPAPSK1,wifi_cur_state "
            }
        }

        function c9(da) {
            if (da) {
                return {
                    currentMode: da.wifi_wds_mode,
                    wdsSSID: da.wifi_wds_ssid,
                    wdsAuthMode: da.wifi_wds_AuthMode,
                    wdsEncrypType: da.wifi_wds_EncrypType,
                    wdsWPAPSK1: da.wifi_wds_WPAPSK1,
                    RadioOff: da.wifi_cur_state == "1" ? "1" : "0"
                }
            } else {
                return V
            }
        }
    }

    function ao(c8, db) {
        return by(arguments, {}, c9, da, null, true);

        function c9(dc) {
            var dd = cO.extend({}, dc);
            return dd
        }

        function da(dc) {
            if (dc && dc.result == "success") {
                return dc
            } else {
                return V
            }
        }
    }

    function x() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            return {multi_data: "1", cmd: "syslog_mode,debug_level"}
        }

        function c9(da) {
            if (da) {
                return {currentMode: da.syslog_mode, debugLevel: da.debug_level}
            } else {
                return V
            }
        }
    }

    function ba(c8, db) {
        return by(arguments, {}, c9, da, null, true);

        function c9(dc) {
            var dd = cO.extend({}, dc);
            return dd
        }

        function da(dc) {
            if (dc && dc.result == "success") {
                return dc
            } else {
                return V
            }
        }
    }

    function b6() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            return {
                multi_data: "1",
                cmd: "ACL_mode,wifi_mac_black_list,wifi_hostname_black_list,wifi_cur_state,user_ip_addr,client_mac_address,wifi_mac_white_list"
            }
        }

        function c9(da) {
            if (da) {
                return {
                    ACL_mode: da.ACL_mode,
                    wifi_mac_black_list: da.wifi_mac_black_list,
                    wifi_hostname_black_list: da.wifi_hostname_black_list,
                    RadioOff: da.wifi_cur_state == "1" ? "1" : "0",
                    user_ip_addr: da.user_ip_addr,
                    client_mac_address: da.client_mac_address,
                    wifi_mac_white_list: da.wifi_mac_white_list
                }
            } else {
                return V
            }
        }
    }

    function a6() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(dc, da) {
            var db = {};
            db.goformId = "SET_IMEI_NUM";
            db.imei = dc.imei;
            return db
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return unknownErrorObject
            }
        }
    }

    function aA() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da) {
            var db = cO.extend({goformId: "WIFI_MAC_FILTER"}, da);
            return db
        }

        function c9(da) {
            if (da && da.result == "success") {
                return da
            } else {
                return V
            }
        }
    }

    function ar() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da) {
            return {cmd: "mgmt_quicken_power_on,need_hard_reboot,need_sim_pin", multi_data: 1}
        }

        function c9(da) {
            return {
                fastbootEnabled: da.mgmt_quicken_power_on == "1" ? "1" : "0",
                need_hard_reboot: da.need_hard_reboot,
                need_sim_pin: da.need_sim_pin == "yes" ? "yes" : "no"
            }
        }
    }

    function bQ() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da) {
            return {goformId: "MGMT_CONTROL_POWER_ON_SPEED", mgmt_quicken_power_on: da.fastbootEnabled}
        }

        function c9(da) {
            if (da && da.result == "success") {
                return da
            } else {
                return V
            }
        }
    }

    function a4() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "TURN_OFF_DEVICE";
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function ah() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "REBOOT_DEVICE";
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function Y() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "fota_new_version_state,fota_current_upgrade_state,fota_package_already_download";
            dc.multi_data = 1;
            return dc
        }

        function c9(da) {
            if (da) {
                var db = (da.fota_new_version_state == "has_critical" || da.fota_new_version_state == "has_optional" || da.fota_new_version_state == "already_has_pkg");
                da.hasNewVersion = db;
                return da
            } else {
                return V
            }
        }
    }

    function bk() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            if (aF.UPGRADE_TYPE == "OTA") {
                dc.cmd = "is_mandatory"
            } else {
                dc.cmd = "fota_new_version_state"
            }
            return dc
        }

        function c9(da) {
            if (da) {
                if (aF.UPGRADE_TYPE == "OTA") {
                    return {is_mandatory: da.is_mandatory == "1"}
                } else {
                    return {is_mandatory: da.fota_new_version_state == "has_critical"}
                }
            } else {
                return V
            }
        }
    }

    function cC() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "upgrade_result";
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function bh() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "fota_current_upgrade_state";
            return dc
        }

        function c9(da) {
            if (da) {
                da.current_upgrade_state = da.fota_current_upgrade_state;
                return da
            } else {
                return V
            }
        }
    }

    function O() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "fota_pkg_total_size,fota_dl_pkg_size";
            dc.multi_data = 1;
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function M() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "IF_UPGRADE";
            dc.select_op = da.selectOp;
            if (dc.select_op == "check") {
                dc.ota_manual_check_roam_state = 1
            }
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function F() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "fota_updateMode,fota_updateIntervalDay,fota_allowRoamingUpdate";
            dc.multi_data = 1;
            return dc
        }

        function c9(da) {
            if (da) {
                return {
                    updateMode: da.fota_updateMode,
                    updateIntervalDay: da.fota_updateIntervalDay,
                    allowRoamingUpdate: da.fota_allowRoamingUpdate
                }
            } else {
                return V
            }
        }
    }

    function al() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "SetUpgAutoSetting";
            dc.UpgMode = da.updateMode;
            dc.UpgIntervalDay = da.updateIntervalDay;
            dc.UpgRoamPermission = da.allowRoamingUpdate;
            return dc
        }

        function c9(da) {
            if (da && da.result == "success") {
                return da
            } else {
                return V
            }
        }
    }

    function c6() {
        return cm({nv: ["dm_last_check_time"]}, arguments[1], arguments[2])
    }

    function h() {
        return cm({nv: ["network_type", "sub_network_type", "rssi", "rscp", "lte_rsrp"]}, arguments[1], arguments[2])
    }

    function j() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "RESULT_RESTORE";
            return dc
        }

        function c9(da) {
            if (da && da.result == "success") {
                return da
            } else {
                return V
            }
        }
    }

    function v() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {cmd: "childGroupList"};
            return dc
        }

        function c9(da) {
            if (da && (da.childGroupList || da.devices)) {
                return da
            } else {
                return {devices: []}
            }
        }
    }

    function cq() {
        return by(arguments, aF.currentUserInChildGroup == false ? {} : {errorType: "no_auth"}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {goformId: "ADD_DEVICE", mac: da.macAddress};
            return dc
        }

        function c9(da) {
            if (da && da.result == "success") {
                return da
            } else {
                return V
            }
        }
    }

    function cF() {
        return by(arguments, aF.currentUserInChildGroup == false ? {} : {errorType: "no_auth"}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {goformId: "DEL_DEVICE", mac: da.mac};
            return dc
        }

        function c9(da) {
            if (da && da.result == "success") {
                return da
            } else {
                return V
            }
        }
    }

    function s(c8) {
        if (typeof aF.currentUserInChildGroup == "undefined") {
            var db = [];
            if (typeof c8 != "undefined") {
                db = c8
            } else {
                db = v({}).devices
            }
            var c9 = a0({}).get_user_mac_addr;
            var da = cg.find(db, function (dc) {
                return dc.mac == c9
            });
            aF.currentUserInChildGroup = typeof da != "undefined";
            return {result: typeof da != "undefined"}
        }
        return {result: aF.currentUserInChildGroup}
    }

    function a0() {
        return cm({nv: "get_user_mac_addr"}, arguments[1], arguments[2])
    }

    function u() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {cmd: "hostNameList"};
            return dc
        }

        function c9(da) {
            if (da && (da.hostNameList || da.devices)) {
                return da
            } else {
                return {devices: []}
            }
        }
    }

    function bg() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {goformId: "EDIT_HOSTNAME", mac: da.mac, hostname: da.hostname};
            return dc
        }

        function c9(da) {
            if (da && da.result == "success") {
                return da
            } else {
                return V
            }
        }
    }

    function c0() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {cmd: "site_white_list"};
            return dc
        }

        function c9(da) {
            if (da && (da.site_white_list || da.siteList)) {
                return da
            } else {
                return {siteList: []}
            }
        }
    }

    function E() {
        return by(arguments, aF.currentUserInChildGroup == false ? {} : {errorType: "no_auth"}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {goformId: "REMOVE_WHITE_SITE", ids: da.ids.join(",")};
            return dc
        }

        function c9(da) {
            if (da && da.result == "success") {
                return da
            } else {
                return V
            }
        }
    }

    function bz() {
        return by(arguments, aF.currentUserInChildGroup == false ? {} : {errorType: "no_auth"}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {goformId: "ADD_WHITE_SITE", name: da.name, site: da.site};
            return dc
        }

        function c9(da) {
            if (da && da.result == "success") {
                return da
            } else {
                return V
            }
        }
    }

    function b5() {
        var db = {"0": [], "1": [], "2": [], "3": [], "4": [], "5": [], "6": []};
        return by(arguments, {}, c8, da, null, false);

        function c8(dc, dd) {
            var de = {cmd: "time_limited"};
            return de
        }

        function da(dc) {
            if (dc) {
                return c9(dc)
            } else {
                return db
            }
        }

        function c9(dc) {
            if (dc.time_limited == "") {
                return {time_limited: []}
            }
            var dd = dc.time_limited.split(";");
            cg.each(dd, function (de) {
                var df = de.split("+");
                if (df.length == 2) {
                    db[df[0]] = df[1].split(",")
                }
            });
            return db
        }
    }

    function n() {
        return by(arguments, aF.currentUserInChildGroup == false ? {} : {errorType: "no_auth"}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {goformId: "SAVE_TIME_LIMITED", time_limited: da.time};
            return dc
        }

        function c9(da) {
            if (da && da.result == "success") {
                return da
            } else {
                return V
            }
        }
    }

    function cr() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {cmd: "openEnable,closeEnable,openTime,closeTime", multi_data: "1"};
            return dc
        }

        function c9(da) {
            if (da) {
                if (da.openTime.indexOf(":") != -1) {
                    var db = da.openTime.split(":");
                    da.openH = leftInsert(db[0], 2, "0");
                    da.openM = leftInsert(db[1], 2, "0")
                } else {
                    da.openH = "06";
                    da.openM = "00"
                }
                if (da.closeTime.indexOf(":") != -1) {
                    var dc = da.closeTime.split(":");
                    da.closeH = leftInsert(dc[0], 2, "0");
                    da.closeM = leftInsert(dc[1], 2, "0")
                } else {
                    da.closeH = "22";
                    da.closeM = "00"
                }
                return da
            } else {
                return V
            }
        }
    }

    function bP() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {goformId: "SAVE_TSW", openEnable: da.openEnable, closeEnable: da.closeEnable};
            if (da.openEnable == "1") {
                dc.openTime = da.openTime;
                dc.closeTime = da.closeTime
            }
            return dc
        }

        function c9(da) {
            if (da && da.result == "success") {
                return da
            } else {
                if (da && da.result == "failure") {
                    return da
                } else {
                    return V
                }
            }
        }
    }

    function aL() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {
                goformId: "FLOW_CALIBRATION_MANUAL",
                calibration_way: da.way,
                time: da.way == "time" ? da.value : 0,
                data: da.way == "data" ? da.value : 0
            };
            return dc
        }

        function c9(da) {
            if (da && da.result == "success") {
                return da
            } else {
                return V
            }
        }
    }

    function cm() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            if (cg.isArray(da.nv)) {
                dc.cmd = da.nv.join(",");
                dc.multi_data = 1
            } else {
                dc.cmd = da.nv
            }
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function aN() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "vwim_mc_state,traffic_overrun,detect_new_version";
            dc.multi_data = 1;
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {};
                da.vwim_mc_state = db.vwim_mc_state;
                da.traffic_overrun = db.traffic_overrun;
                da.detect_new_version = db.detect_new_version;
                da.blc_wan_mode = bu.blc_wan_mode;
                return da
            } else {
                return V
            }
        }
    }

    function cI() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "CLEAR_REDIRECT_FLAG";
            dc.flag_id = da.redirectFlags;
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function b4() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "lock_zone_enable,pin_interlock_and_V4_lock";
            dc.multi_data = 1;
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function bJ() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "PIN_LOCK_V4_ENCODE";
            dc.pin_interlock_and_V4_lock = da.pin_interlock_and_V4_lock;
            dc.TspLock_key_data = da.TspLock_key_data;
            return dc
        }

        function c9(da) {
            if (da && da.result == "success") {
                return da
            } else {
                return V
            }
        }
    }

    function aE() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "cell_id_list,global_cell_id,network_type,sub_network_type,cell_not_correct";
            dc.multi_data = 1;
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function bZ() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "LOCK_ZONE";
            dc.lock_zone_enable = da.lock_zone_enable;
            return dc
        }

        function c9(da) {
            if (da && da.result == "success") {
                return da
            } else {
                return V
            }
        }
    }

    function cQ() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {cmd: "update_type"};
            return dc
        }

        function c9(da) {
            return {update_type: da.update_type ? da.update_type : "mifi_fota"}
        }
    }

    function f() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, db) {
            var dc = {};
            dc.cmd = "AuthMode,passPhrase";
            dc.multi_data = 1;
            return dc
        }

        function c9(db) {
            if (db) {
                var da = {};
                da.AuthMode = db.AuthMode;
                da.passPhrase = aF.PASSWORD_ENCODE ? Base64.decode(db.passPhrase) : db.passPhrase;
                return da
            } else {
                return V
            }
        }
    }

    function y() {
        return by(arguments, {}, c8, c9, null, true);

        function c8(da, db) {
            var dc = {};
            dc.goformId = "SET_WIFI_SECURITY_INFO";
            dc.AuthMode = da.AuthMode;
            if (dc.AuthMode == "WPAPSKWPA2PSK") {
                dc.passPhrase = aF.PASSWORD_ENCODE ? Base64.encode(da.passPhrase) : da.passPhrase
            }
            return dc
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function cf() {
        av(arguments, c8, c9);

        function c8(da) {
            var db = {
                goformId: "SET_WIFI_SSID1_SETTINGS",
                ssid: da.SSID,
                broadcastSsidEnabled: da.broadcast,
                MAX_Access_num: da.station,
                security_mode: da.AuthMode,
                cipher: da.cipher,
                NoForwarding: da.NoForwarding,
                show_qrcode_flag: da.show_qrcode_flag
            };
            if (aF.WIFI_WEP_SUPPORT) {
                db.wep_default_key = da.wep_default_key;
                db.wep_key_1 = da.wep_key_1;
                db.wep_key_2 = da.wep_key_2;
                db.wep_key_3 = da.wep_key_3;
                db.wep_key_4 = da.wep_key_4;
                if (da.wep_default_key == "1") {
                    db.WEP2Select = da.WEP2Select
                } else {
                    if (da.wep_default_key == "2") {
                        db.WEP3Select = da.WEP3Select
                    } else {
                        if (da.wep_default_key == "3") {
                            db.WEP4Select = da.WEP4Select
                        } else {
                            db.WEP1Select = da.WEP1Select
                        }
                    }
                }
            }
            if (da.AuthMode == "WPAPSK" || da.AuthMode == "WPA2PSK" || da.AuthMode == "WPAPSKWPA2PSK" || da.AuthMode == "WPA3Personal" || da.AuthMode == "WPA2WPA3") {
                db.security_shared_mode = da.cipher;
                db.passphrase = aF.PASSWORD_ENCODE ? Base64.encode(da.passPhrase) : da.passPhrase
            } else {
                if (da.AuthMode == "SHARED") {
                    db.security_shared_mode = "WEP";
                    db.security_mode = "SHARED"
                } else {
                    if (da.encryptType == "WEP") {
                        db.security_shared_mode = "WEP";
                        db.security_mode = "OPEN"
                    } else {
                        db.security_shared_mode = "NONE"
                    }
                }
            }
            return db
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function bH() {
        av(arguments, c8, c9);

        function c8(da) {
            var db = {
                goformId: "SET_WIFI_SSID2_SETTINGS",
                m_SSID: da.m_SSID,
                m_HideSSID: da.m_broadcast,
                m_MAX_Access_num: da.m_station,
                m_AuthMode: da.m_AuthMode,
                cipher: da.m_cipher,
                m_NoForwarding: da.m_NoForwarding,
                m_show_qrcode_flag: da.m_show_qrcode_flag
            };
            if (aF.WIFI_WEP_SUPPORT) {
                db.m_DefaultKeyID = da.m_wep_default_key;
                db.m_Key1Str1 = da.m_wep_key_1;
                db.m_Key2Str1 = da.m_wep_key_2;
                db.m_Key3Str1 = da.m_wep_key_3;
                db.m_Key4Str1 = da.m_wep_key_4;
                if (da.m_wep_default_key == "1") {
                    db.m_Key2Type = da.m_WEP2Select
                } else {
                    if (da.m_wep_default_key == "2") {
                        db.m_Key3Type = da.m_WEP3Select
                    } else {
                        if (da.m_wep_default_key == "3") {
                            db.m_Key4Type = da.m_WEP4Select
                        } else {
                            db.m_Key1Type = da.m_WEP1Select
                        }
                    }
                }
            }
            if (da.m_AuthMode == "WPAPSK" || da.m_AuthMode == "WPA2PSK" || da.m_AuthMode == "WPAPSKWPA2PSK" || da.m_AuthMode == "WPA3Personal" || da.m_AuthMode == "WPA2WPA3") {
                db.m_EncrypType = da.m_cipher;
                db.m_WPAPSK1 = aF.PASSWORD_ENCODE ? Base64.encode(da.m_passPhrase) : da.m_passPhrase
            } else {
                if (da.m_AuthMode == "SHARED") {
                    db.m_EncrypType = "WEP";
                    db.m_security_mode = "SHARED"
                } else {
                    if (da.m_encryptType == "WEP") {
                        db.m_EncrypType = "WEP";
                        db.m_security_mode = "OPEN"
                    } else {
                        db.m_EncrypType = "NONE"
                    }
                }
            }
            return db
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function d() {
        return by(arguments, {}, c8, c9, null, false);

        function c8(da, dc) {
            var dd = {};
            var db = aF.PASSWORD_ENCODE ? "WPAPSK1_encode,m_WPAPSK1_encode," : "imei,rnum_js,WPAPSK1_enaes,m_WPAPSK1_enaes,";
            dd.cmd = "m_ssid_enable,wifi_cur_state,NoForwarding,m_NoForwarding," + db + "MAX_Station_num,SSID1,AuthMode,HideSSID,MAX_Access_num,show_qrcode_flag,EncrypType,Key1Str1,Key2Str1,Key3Str1,Key4Str1,DefaultKeyID,m_SSID,m_AuthMode,m_HideSSID,m_MAX_Access_num,m_EncrypType,m_show_qrcode_flag,m_DefaultKeyID,m_Key1Str1,m_Key2Str1,m_Key3Str1,m_Key4Str1,rotationFlag,wifi_sta_connection";
            dd.multi_data = 1;
            return dd
        }

        function c9(db) {
            if (db) {
                var da = {
                    wifi_enable: db.wifi_cur_state == "1" ? "1" : "0",
                    multi_ssid_enable: db.m_ssid_enable,
                    MAX_Station_num: cO.isNumeric(db.MAX_Station_num) ? db.MAX_Station_num : aF.MAX_STATION_NUMBER,
                    AuthMode: db.AuthMode,
                    SSID: db.SSID1,
                    broadcast: db.HideSSID,
                    apIsolation: db.NoForwarding,
                    passPhrase: aF.PASSWORD_ENCODE ? Base64.decode(db.WPAPSK1_encode) : c(db.rnum_js, db.imei, db.WPAPSK1_enaes),
                    MAX_Access_num: db.MAX_Access_num,
                    cipher: db.EncrypType == "TKIP" ? "0" : db.EncrypType == "AES" ? 1 : 2,
                    encryptType: db.EncrypType,
                    show_qrcode_flag: db.show_qrcode_flag == "1" ? true : false,
                    keyID: db.DefaultKeyID,
                    Key1Str1: db.Key1Str1,
                    Key2Str1: db.Key2Str1,
                    Key3Str1: db.Key3Str1,
                    Key4Str1: db.Key4Str1,
                    m_SSID: db.m_SSID,
                    m_broadcast: db.m_HideSSID,
                    m_apIsolation: db.m_NoForwarding,
                    m_MAX_Access_num: db.m_MAX_Access_num,
                    m_AuthMode: db.m_AuthMode,
                    m_passPhrase: aF.PASSWORD_ENCODE ? Base64.decode(db.m_WPAPSK1_encode) : c(db.rnum_js, db.imei, db.m_WPAPSK1_enaes),
                    m_cipher: db.m_EncrypType == "TKIP" ? "0" : db.m_EncrypType == "AES" ? 1 : 2,
                    m_show_qrcode_flag: db.m_show_qrcode_flag == "1" ? true : false,
                    m_encryptType: db.m_EncrypType,
                    m_keyID: db.m_DefaultKeyID,
                    m_Key1Str1: db.m_Key1Str1,
                    m_Key2Str1: db.m_Key2Str1,
                    m_Key3Str1: db.m_Key3Str1,
                    m_Key4Str1: db.m_Key4Str1,
                    rotationFlag: db.rotationFlag,
                    ap_station_enable: db.wifi_sta_connection
                };
                return da
            } else {
                return V
            }
        }
    }

    function t() {
        av(arguments, c8, c9);

        function c8(da) {
            var dc = da;
            if (da.wifiEnabled == "0") {
                dc = {wifiEnabled: da.wifiEnabled}
            }
            var db = cO.extend({goformId: "SET_WIFI_INFO"}, dc);
            return db
        }

        function c9(da) {
            if (da) {
                return da
            } else {
                return V
            }
        }
    }

    function by(dd, dk, de, da, c9, db) {
        var dh = dd[0], dj = dd[1], dc = dd[2];
        var df;
        if (dk && typeof dk.errorType === "string") {
            df = cO.extend(V, dk);
            if (!dj) {
                return df
            }
            di(df, dj, dc)
        } else {
            df = cO.extend({}, dk);
            var dg;
            if (de) {
                dg = de(dh, db)
            } else {
                dg = dh
            }
            if (!dj) {
                if (dg && (dg.cmd || dg.goformId)) {
                    var c8 = cs(dg, db);
                    if (da) {
                        df = cO.extend({}, da(c8))
                    } else {
                        df = c8
                    }
                }
                return df
            } else {
                if (dg && (dg.cmd || dg.goformId)) {
                    c4(dg, function (dl) {
                        if (da) {
                            df = cO.extend({}, da(dl))
                        } else {
                            df = cO.extend({}, dl)
                        }
                        if (!dg.notCallback) {
                            di(df, dj, dc)
                        }
                    }, function () {
                        if (c9) {
                            df = cO.extend(V, c9)
                        } else {
                            df = cO.extend(V, {errorType: "Unknown"})
                        }
                        di(df, dj, dc)
                    }, db)
                } else {
                    di(df, dj, dc)
                }
            }
        }

        function di(dl, dn, dm) {
            dm = dm ? dm : dn;
            if (isErrorObject(dl)) {
                switch (dl.errorType) {
                    case"cellularNetworkError":
                    case"deviceError":
                    case"wifiConnectionError":
                        window.receivedNonSpecificError(dl);
                        break;
                    default:
                        dm(dl)
                }
            } else {
                dn(dl)
            }
        }
    }

    function cs(c8, c9) {
        return bj(c8, null, null, false, c9)
    }

    function c4(da, c8, c9, db) {
        bj(da, c8, c9, true, db)
    }

    function w(c8) {
        var da = /^[A-z0-9]+$/;
        var c9 = c8.match(da);
        if (c9 == null) {
            return "error"
        } else {
            return c8
        }
    }

    function bj(db, c9, da, dd, dc) {
        var c8 = null;
        cO.ajax({
            type: !!dc ? "POST" : "GET",
            url: dc ? "/goform/goform_set_cmd_process" : db.cmd ? "/goform/goform_get_cmd_process" : "/goform/goform_set_cmd_process",
            data: db,
            dataType: "json",
            async: !!dd,
            cache: false,
            error: function (de) {
                if (dd) {
                    da(de)
                } else {
                    if (de.status == 200) {
                        c8 = jQuery.parseJSON("(" + w(de.responseText) + ")")
                    }
                }
            },
            success: function (de) {
                if (dd) {
                    c9(de)
                } else {
                    c8 = de
                }
            }
        });
        if (!dd) {
            return c8
        }
    }

    var bu = {
        networkType: "",
        signalImg: "0",
        spn_b1_flag: "1",
        spn_name_data: "",
        spn_b2_flag: "1",
        networkOperator: "China Mobile",
        connectStatus: "ppp_disconnected",
        rj45ConnectStatus: "rj45_dead",
        attachedDevices: [],
        ssid1AttachedNum: 0,
        ssid2AttachedNum: 0,
        data_counter: {
            uploadRate: 0,
            downloadRate: 0,
            totalSent: 0,
            totalReceived: 0,
            totalConnectedTime: 0,
            currentSent: 0,
            currentReceived: 0,
            currentConnectedTime: 0,
            monthlySent: 0,
            monthlyReceived: 0,
            monthlyConnectedTime: 0,
            month: ""
        },
        newSmsReceived: false,
        smsReportReceived: false,
        smsUnreadCount: "0",
        isLoggedIn: undefined,
        limitVolumeEnable: false,
        limitVolumeType: "1",
        limitVolumePercent: "100",
        limitVolumeSize: "0",
        allowRoamingUpdate: "0",
        blc_wan_mode: "",
        ap_station_enable: undefined,
        ap_station_mode: undefined,
        dialMode: "",
        ethWanMode: "AUTO",
        fota_user_selector: "",
        defaultWanName: ""
    };
    var V = {errorType: "UnknownError", errorId: "123", errorText: "UnknownError"};
    var cN = true;
    return {
        clearRedirectFlag: cI,
        connect: a7,
        disconnect: P,
        getSIMPhoneBookCapacity: bR,
        getDevicePhoneBookCapacity: ag,
        getDevicePhoneBooks: c2,
        getSIMPhoneBooks: cH,
        getPhoneBooks: R,
        getPhoneBookReady: ch,
        getPhoneBooksByGroup: bW,
        deletePhoneBooks: bl,
        deleteAllPhoneBooks: aT,
        deleteAllPhoneBooksByGroup: Z,
        savePhoneBook: cG,
        deleteAllMessages: bV,
        deleteMessage: cA,
        setSmsRead: ae,
        sendSMS: aX,
        saveSMS: aG,
        getSMSReady: aH,
        getSMSMessages: aJ,
        getSMSDeliveryReport: K,
        getSmsCapability: b,
        resetNewSmsReceivedVar: D,
        resetSmsReportReceivedVar: b3,
        getSmsSetting: b1,
        setSmsSetting: aO,
        getBand: cp,
        getSetband: N,
        setBandlist: cu,
        getResideband: bI,
        getAttachedCableDevices: bC,
        getCurrentlyAttachedDevicesInfo: bq,
        getConnectionInfo: bx,
        getRedirectData: aN,
        getLanguage: z,
        setLanguage: k,
        getNetSelectInfo: Q,
        getSecurityInfo: f,
        setSecurityInfo: y,
        getStatusInfo: e,
        getConnectionMode: J,
        setConnectionMode: af,
        getWifiBasic: d,
        setWifiBasic: cf,
        setWifiBasic4SSID2: bH,
        setWifiBasicMultiSSIDSwitch: t,
        getWpsInfo: cc,
        setTTL: br,
        getTTLValue: cx,
        getExtraFunc: bN,
        openWps: q,
        getSleepMode: ck,
        setSleepMode: bf,
        getWifiAdvance: co,
        setWifiAdvance: cY,
        getWifiRange: W,
        setWifiRange: cW,
        setImeiNum: a6,
        getLoginStatus: bd,
        getLoginData: cj,
        login: aM,
        logout: bt,
        getPassword: bM,
        changeManageInfo: bY,
        getPinData: cX,
        enablePin: c7,
        disablePin: b0,
        changePin: o,
        enterPIN: I,
        enterPUK: S,
        getLanInfo: bs,
        setLanInfo: cd,
        getDnsInfo: bO,
        setDnsInfo: cz,
        getApnSettings: l,
        deleteApn: ax,
        setDefaultApn: bw,
        addOrEditApn: bo,
        getQuickSettingInfo: a3,
        setQuickSetting4IPv6: c3,
        scanForNetwork: aD,
        setBearerPreference: bG,
        editHostName: bg,
        getSiteWhiteList: c0,
        removeSiteWhite: E,
        saveSiteWhite: bz,
        setNetwork: bm,
        getUpnpSetting: ak,
        setUpnpSetting: a1,
        getDmzSetting: ay,
        setDmzSetting: cS,
        getDeviceInfo: a9,
        getDeviceInfoLow: cU,
        getPortForward: C,
        setPortForward: ap,
        getPortFilter: be,
        setPortFilterBasic: ai,
        setPortFilter: T,
        deleteFilterRules: az,
        getPortMap: a8,
        setPortMap: bE,
        enablePortMap: bB,
        deleteMapRules: aW,
        getTrafficAlertInfo: H,
        setTrafficAlertInfo: am,
        getCurrentUpgradeState: bh,
        setUpgradeSelectOp: M,
        addTimerThings: bb,
        removeTimerThings: m,
        getPackSizeInfo: O,
        getMandatory: bk,
        getOTAUpdateSetting: F,
        setOTAUpdateSetting: al,
        getSignalStrength: h,
        getOTAlastCheckTime: c6,
        clearUpdateResult: j,
        refreshAPStationStatus: aa,
        getSIMswitch: c5,
        setSIMswitch: b8,
        getSntpParams: aq,
        setSntpSetting: g,
        setSNTPDate: b7,
        executeAtCommand: r,
        restoreFactorySettings: aw,
        checkRestoreStatus: ab,
        getSysSecurity: bX,
        setSysSecurity: cE,
        deleteForwardRules: cD,
        enableVirtualServer: aB,
        getSDConfiguration: bT,
        setSdCardMode: cv,
        checkFileExists: L,
        getFileList: ad,
        fileRename: bA,
        getSdMemorySizes: A,
        deleteFilesAndFolders: aU,
        createFolder: G,
        setSdCardSharing: cb,
        setUpdateInfoWarning: c1,
        getUpdateInfoWarning: b2,
        getAPStationBasic: at,
        setAPStationBasic: bc,
        getWdsInfo: bF,
        setWDS: ao,
        addUrlFilterRule: ca,
        getUrlFilterList: bS,
        deleteSelectedRules: cn,
        getMacFilterInfo: b6,
        setMacFilter: aA,
        getFastbootSetting: ar,
        setFastbootSetting: bQ,
        turnOffDevice: a4,
        restart: ah,
        updateTimerFlag: cN,
        childGroupList: v,
        addChildGroup: cq,
        removeChildGroup: cF,
        checkCurrentUserInChildGroup: s,
        getTimeLimited: b5,
        saveTimeLimited: n,
        getHostNameList: u,
        getHotspotList: cl,
        searchHotspot: an,
        getSearchHotspotList: X,
        saveHotspot: aj,
        deleteHotspot: cT,
        connectHotspot: bD,
        disconnectHotspot: aI,
        getOpMode: cR,
        getRj45PlugState: a2,
        SetOperationMode: bi,
        getPppoeParams: a5,
        setPppoeDialMode: cB,
        getTsw: cr,
        saveTsw: bP,
        trafficCalibration: aL,
        getParams: cm,
        getNewVersionState: Y,
        getUpgradeResult: cC,
        getV4Switch: b4,
        setV4Switch: bJ,
        getCellId: aE,
        setCellIdSwitch: bZ,
        getDdnsParams: bU,
        setDDNSForward: aQ,
        getUpdateType: cQ,
        getCurretnMAC: aP,
        getUSSDResponse: cy,
        USSDReplyCancel: p,
        getNetworkUnlockTimes: ci,
        getSIMUnlockTimes: U,
        unlockNetwork: aK,
        unlockSim: bK,
        getLockSimStatus: aZ,
        getSyslogInfo: x,
        setSysLog: ba
    }
});
define("adm_lan", "jquery knockout set service".split(" "), function (c, b, q, s) {
    var r = "";

    function j() {
        return s.getLanInfo()
    }

    function d() {
        return s.getDnsInfo()
    }

    function f(u) {
        var t = (u - 0).toString(16);
        if (t.length == 1) {
            t = "0" + t
        }
        return t.toUpperCase()
    }

    function n() {
        var w = this;
        var v = j();
        var t = d();
        w.dhcpStart = b.observable(v.dhcpStart);
        w.dhcpEnd = b.observable(v.dhcpEnd);
        w.dhcpLease = b.observable(v.dhcpLease);
        w.ipAddress = b.observable(v.ipAddress);
        w.subnetMask = b.observable(v.subnetMask);
        w.dhcpServer = b.observable(v.dhcpServer);
        w.macAddress = b.observable(v.macAddress);
        w.showMacAddress = b.observable(q.SHOW_MAC_ADDRESS);
        w.dnsServerMode = b.observable(t.dnsServerMode);
        w.dnsPrimary = b.observable(t.dnsPrimary);
        w.hasWifi = b.observable(q.HAS_WIFI);
        w.hasDdns = q.DDNS_SUPPORT;
        w.hasUpdateCheck = q.HAS_UPDATE_CHECK;
        var u = checkCableMode(s.getOpMode().blc_wan_mode);
        var x = s.getExtraFunc();
        w.bandSelectFuncEnable = b.observable(x.bandSelectFuncEnable);
        if (w.bandSelectFuncEnable() == "2" && !u) {
            c(".bandSelect").attr("id", "rootBandSelect")
        } else {
            if (w.bandSelectFuncEnable() == "1" && !u) {
                c(".bandSelect").attr("id", "bandSelect")
            } else {
                c(".bandSelect").attr("id", "removeBandSelect");
                c("#removeBandSelect").css("display", "none")
            }
        }
        w.hasManualDns = x.dnsManualEnable;
        w.dnsFuncEnable = b.observable(x.dnsFuncEnable);
        if (w.dnsFuncEnable() == "2") {
            c(".frmDns").attr("id", "rootFrmDns")
        } else {
            if (w.dnsFuncEnable() == "1") {
                c(".frmDns").attr("id", "frmDns")
            } else {
                c(".frmDns").attr("id", "removeFrmDns");
                c("#removeFrmDns").css("display", "none")
            }
        }
        w.clear = function () {
            clearTimer();
            m();
            clearValidateMsg()
        };
        w.refreshStatus = function () {
            var y = s.getConnectionInfo();
            if (y.connectStatus == "ppp_disconnected") {
                c("input", "#frmLan").each(function () {
                    c(this).attr("disabled", false)
                })
            } else {
                c("input", "#frmLan").each(function () {
                    c(this).attr("disabled", true)
                })
            }
        };
        w.saveAct = function () {
            showLoading();
            var y = {
                ipAddress: w.ipAddress(),
                subnetMask: w.subnetMask(),
                dhcpServer: w.dhcpServer(),
                dhcpStart: w.dhcpStart(),
                dhcpEnd: w.dhcpEnd(),
                dhcpLease: w.dhcpLease()
            };
            s.setLanInfo(y, function (z) {
                if (z.result == "success") {
                    successOverlay();
                    w.clear()
                } else {
                    errorOverlay()
                }
            })
        };
        w.save = function () {
            var y = c("#frmLan").serialize();
            if (y == r) {
                showAlert("setting_no_change");
                return false
            }
            if (q.RJ45_SUPPORT) {
                var z = s.getPppoeParams();
                if (a(z.static_wan_ipaddr, w.ipAddress(), w.subnetMask())) {
                    showAlert("lan_tip_staticip_notsame");
                    return false
                }
            }
            showConfirm("lan_confirm_reopen", function () {
                w.saveAct()
            })
        };
        w.refreshStatus();
        w.dhcpServerHandler = function () {
            c("#txtIpAddress").parent().find(".error").hide();
            c("#txtIpAddress").show();
            return true
        };
        w.dnsServerHandler = function () {
            c("#txtPrimaryDns").parent().find(".error").hide();
            c("#txtPrimaryDns").show();
            return true
        };
        w.saveDnsPara = function () {
            showLoading();
            var y = {dnsServerMode: w.dnsServerMode(), dnsPrimary: w.dnsPrimary()};
            s.setDnsInfo(y, function (z) {
                if (z.result == "success") {
                    successOverlay();
                    w.clear()
                } else {
                    errorOverlay()
                }
            })
        };
        w.saveDnsAct = function () {
            showConfirm("lan_confirm_reopen", function () {
                w.saveDnsPara()
            })
        };
        addTimeout(function () {
            r = c("#frmLan").serialize()
        }, 500)
    }

    function e(y, w) {
        var u;
        var x = [];
        var v = [];
        var t = "0x";
        for (u = 2, index_tmp = 0; u < 10; u += 2, index_tmp++) {
            x[index_tmp] = "0x" + y.substring(u, u + 2);
            v[index_tmp] = "0x" + w.substring(u, u + 2)
        }
        for (u = 0; u < 4; u++) {
            t = t + f(x[u] & v[u])
        }
        return t - 0
    }

    c.validator.addMethod("dhcp_check", function (v, w, x) {
        var u = x == "start" ? c("#txtDhcpIpPoolStart").val() : c("#txtDhcpIpPoolEnd").val();
        var t = k(c("#txtIpAddress").val(), c("#txtSubnetMask").val(), u);
        return this.optional(w) || t
    });
    c.validator.addMethod("dhcpCompare", function (u, v, w) {
        var t;
        if (w == "#txtDhcpIpPoolStart") {
            t = g(c("#txtIpAddress").val(), c("#txtSubnetMask").val(), c(w).val(), u)
        } else {
            t = g(c("#txtIpAddress").val(), c("#txtSubnetMask").val(), u, c(w).val())
        }
        return t != 1
    });
    c.validator.addMethod("ipRange", function (u, w, x) {
        var v = false;
        if (c("#dhcpEnable").is(":checked")) {
            v = true
        }
        var t = g(u, c("#txtSubnetMask").val(), c("#txtDhcpIpPoolStart").val(), c("#txtDhcpIpPoolEnd").val(), v);
        return t != 2
    });
    c.validator.addMethod("subnetmask_check", function (u, v, w) {
        var t = l(u);
        return this.optional(v) || t
    });

    function a(y, z, u) {
        if (!y || !z || !u) {
            return false
        }
        if (y == z) {
            return true
        }
        var x = [];
        var w = [];
        var t = [];
        ip_array = y.split(".");
        lanIp_array = z.split(".");
        t = u.split(".");
        for (var v = 0; v < ip_array.length; v += 1) {
            x.push(parseInt(t[v]) & parseInt(ip_array[v]));
            w.push(parseInt(t[v]) & parseInt(lanIp_array[v]))
        }
        if (w.join(".") != x.join(".")) {
            return false
        } else {
            return true
        }
    }

    function h(t) {
        return (t == 255 || t == 254 || t == 252 || t == 248 || t == 240 || t == 224 || t == 192 || t == 128 || t == 0)
    }

    function o(w) {
        var v = w.indexOf(".");
        var u = w.indexOf(".", (v + 1));
        var t = w.indexOf(".", (u + 1));
        o_ip = f(w.substring(0, v)) + f(w.substring((v + 1), u)) + f(w.substring((u + 1), t)) + f(w.substring((t + 1), w.length));
        o_ip = "0x" + o_ip;
        return o_ip
    }

    function p(x) {
        var w = x.indexOf(".");
        var v = x.indexOf(".", (w + 1));
        var u = x.indexOf(".", (v + 1));
        var t = x.substring((u + 1), x.length) - 0;
        return t
    }

    function k(t, D, C) {
        var z = o(t);
        var x = p(t);
        var v = o(D);
        var B = p(D);
        var y = o(C);
        var A = p(C);
        var w;
        var u;
        if (e(z, v) != e(y, v)) {
            return false
        }
        w = (x & B);
        u = (x & B) + (255 - B);
        return !(A == w || A == u)
    }

    function l(t) {
        var u = t.split(".");
        if ("0.0.0.0" == t || "255.255.255.255" == t) {
            return false
        }
        if (u.length != 4) {
            return false
        }
        u[0] = parseInt(u[0]);
        u[1] = parseInt(u[1]);
        u[2] = parseInt(u[2]);
        u[3] = parseInt(u[3]);
        if (u[3] != 0) {
            if (u[0] != 255 || u[1] != 255 || u[2] != 255) {
                return false
            } else {
                if (!h(u[3])) {
                    return false
                }
            }
        }
        if (u[2] != 0) {
            if (u[0] != 255 || u[1] != 255) {
                return false
            } else {
                if (!h(u[2])) {
                    return false
                }
            }
        }
        if (u[1] != 0) {
            if (u[0] != 255) {
                return false
            } else {
                if (!h(u[1])) {
                    return false
                }
            }
        }
        if (u[0] != 255) {
            return false
        }
        return true
    }

    function g(v, x, t, u, w) {
        s_startIp = o(t);
        s_endIp = o(u);
        s_lanIp = o(v);
        if (s_startIp > s_endIp) {
            return 1
        }
        if (s_lanIp >= s_startIp && s_lanIp <= s_endIp) {
            return 2
        }
        return 0
    }

    function m() {
        var t = c("#container");
        b.cleanNode(t[0]);
        var w = new n();
        b.applyBindings(w, t[0]);
        var v = s.getPassword().CurrentPasswd;
        var u = s.getPassword().RootPasswd;
        if (v != u && v != "xfnj1234") {
            c("#rootFrmDns").css("display", "none");
            c("#rootBandSelect").css("display", "none")
        }
        addInterval(w.refreshStatus, 1000);
        c("#frmLan").validate({
            submitHandler: function () {
                w.save()
            },
            rules: {
                txtIpAddress: {lanip_check: true, ipRange: true},
                txtSubnetMask: {ipv4: true, subnetmask_check: true},
                txtDhcpIpPoolStart: {lanip_check: true, dhcp_check: "start", dhcpCompare: "#txtDhcpIpPoolEnd"},
                txtDhcpIpPoolEnd: {lanip_check: true, dhcp_check: "end", dhcpCompare: "#txtDhcpIpPoolStart"},
                txtDhcpLease: {range: [1, 65535], digits: true}
            },
            groups: {lanip_check: "txtDhcpIpPoolStart txtDhcpIpPoolEnd"},
            errorPlacement: function (x, y) {
                if (y.attr("name") == "txtDhcpLease") {
                    x.insertAfter("#errorHolder")
                } else {
                    if (y.attr("name") == "txtDhcpIpPoolStart") {
                        x.insertAfter("#txtDhcpIpPoolEnd")
                    } else {
                        x.insertAfter(y)
                    }
                }
            }
        });
        c(".frmDns").validate({
            submitHandler: function () {
                w.saveDnsAct()
            }, rules: {txtPrimaryDns: "dns_server_check"}
        })
    }

    return {init: m}
});
define("adm_others", "jquery knockout set service underscore".split(" "), function (c, a, r, t, s) {
    var d = s.map(r.sntpTimeSetMode, function (u) {
        return new Option(u.name, u.value)
    });
    var e = s.map(r.timeZone, function (u) {
        return new Option(u.name, u.value)
    });
    var h = s.map(r.daylightSave, function (u) {
        return new Option(u.name, u.value)
    });
    var k = [];
    var g = [];
    var b = [];
    var m = [];
    var j = [];
    var q = [1, 3, 5, 7, 8, 10, 12];
    var l = [4, 6, 9, 11];

    function p(y, u, x) {
        var w = {};
        for (var v = y; v <= u; v++) {
            w.name = v;
            w.value = v;
            x.push(new Option(w.name, w.value))
        }
    }

    p(2000, 2030, k);
    p(1, 12, g);
    p(0, 23, m);
    p(0, 59, j);

    function o() {
        var C = this;
        var E = false;
        var H = t.getSIMswitch();
        C.hasSIMCardChoose = a.observable(H.cstm_webui_simswitch);
        C.hasOtherSIM = a.observable(H.sim_switch_number > 1 ? true : false);
        C.currentSIM0 = a.observable(H.sim_current_type == 0 ? true : false);
        C.currentSIM1 = a.observable(H.sim_current_type == 1 ? true : false);
        C.currentSIM2 = a.observable(H.sim_current_type == 2 ? true : false);
        C.switchRunningDetect = a.observable(H.sim_switch_running_detect);
        C.SIMislock = a.observable(H.sim_lock_status == "lock" ? (H.sim_current_type == 0 ? true : false) : false);
        C.enableFlag = a.observable(H.sim_lock_status == "lock" ? (H.sim_current_type == 0 ? false : true) : true);
        c("#swithMode").val(H.sim_auto_switch_enable);
        C.swithMode = a.observable(c("#swithMode").val());
        if (H.sim_auto_switch_enable == 0) {
            c("#swithCard").val(H.sim_current_type)
        } else {
            c("#swithCard").val(H.sim_default_type)
        }
        var v = t.getExtraFunc();
        C.imeiFuncEnable = a.observable(v.imeiFuncEnable);
        if (C.imeiFuncEnable() == "2") {
            c(".setImei").attr("id", "rootSetImei")
        } else {
            if (C.imeiFuncEnable() == "1") {
                c(".setImei").attr("id", "setImei")
            } else {
                c(".setImei").attr("id", "removeSetImei");
                c("#removeSetImei").css("display", "none")
            }
        }
        var A = t.getTTLValue();
        document.getElementById("daylight_saving_TTL_select").value = A.ttlValue;
        C.ttlFuncEnable = a.observable(v.ttlFuncEnable);
        if (C.ttlFuncEnable() == "2") {
            c(".setTTLForm").attr("id", "rootSetTTLForm")
        } else {
            if (C.ttlFuncEnable() == "1") {
                c(".setTTLForm").attr("id", "setTTLForm")
            } else {
                c(".setTTLForm").attr("id", "removeSetTTLForm");
                c("#removeSetTTLForm").css("display", "none")
            }
        }
        C.fastbootSupport = r.FAST_BOOT_SUPPORT;
        C.turnOffSupport = r.TURN_OFF_SUPPORT;
        C.SNTPSupport = r.HAS_SNTP;
        C.hasDdns = r.DDNS_SUPPORT;
        C.hasUpdateCheck = r.HAS_UPDATE_CHECK;
        var u = checkCableMode(t.getOpMode().blc_wan_mode);
        var v = t.getExtraFunc();
        C.bandSelectFuncEnable = a.observable(v.bandSelectFuncEnable);
        if (C.bandSelectFuncEnable() == "2" && !u) {
            c(".bandSelect").attr("id", "rootBandSelect")
        } else {
            if (C.bandSelectFuncEnable() == "1" && !u) {
                c(".bandSelect").attr("id", "bandSelect")
            } else {
                c(".bandSelect").attr("id", "removeBandSelect");
                c("#removeBandSelect").css("display", "none")
            }
        }
        if (r.HAS_PARENTAL_CONTROL) {
            E = t.checkCurrentUserInChildGroup().result
        }
        C.currentUserInChildGroup = a.observable(E);
        var F = t.getFastbootSetting();
        C.fastbootEnableFlag = a.observable(r.RJ45_SUPPORT ? (F.need_sim_pin != "yes" && t.getRj45PlugState().rj45_plug == "wan_lan_off") : F.need_sim_pin != "yes");
        C.fastbootSetting = a.observable(F.fastbootEnabled);
        addInterval(function () {
            C.fastbootEnableFlag(r.RJ45_SUPPORT ? (F.need_sim_pin != "yes" && t.getRj45PlugState().rj45_plug == "wan_lan_off") : F.need_sim_pin != "yes")
        }, 1000);
        C.executeAtCmd = function () {
            var J = c("#txtAtCmd").val().replace(/\s*/g, "").toUpperCase();
            var I = new RegExp("^AT");
            if (!I.test(J)) {
                alert("please input the correct at command . \n eg: at+cgsn");
                c("#txtAtCmd").focus();
                return
            }
            showLoading("waiting");
            t.executeAtCommand({}, function (K) {
                hideLoading();
                if (K) {
                    c("#txtCmdRsp").append("\n" + c("#txtAtCmd").val() + K.result);
                    c("#txtCmdRsp").scrollTop(c("#txtCmdRsp")[0].scrollHeight)
                } else {
                    errorOverlay()
                }
            })
        };
        C.cleanCon = function () {
            c("#txtCmdRsp").text("");
            c("#atCleanBtn").blur()
        };
        C.restore = function () {
            showConfirm("restore_confirm", function () {
                showLoading("restoring");
                t.restoreFactorySettings({}, function (I) {
                    if (I && I.result == "success") {
                        successOverlay()
                    } else {
                        errorOverlay()
                    }
                }, function (I) {
                    if (isErrorObject(I) && I.errorType == "no_auth") {
                        errorOverlay()
                    }
                })
            })
        };
        C.restart = function () {
            showConfirm("restart_confirm", function () {
                restartDevice(t)
            })
        };
        C.saveFastBoot = function () {
            showLoading();
            var I = {fastbootEnabled: C.fastbootSetting(), need_hard_reboot: F.need_hard_reboot};
            t.setFastbootSetting(I, function (J) {
                if (J.result == "success") {
                    successOverlay()
                } else {
                    errorOverlay()
                }
            })
        };
        C.turnoff = function () {
            showConfirm("turnoff_confirm", function () {
                showLoading("turnoff");
                t.turnOffDevice({}, function (I) {
                    if (I && I.result == "success") {
                        successOverlay()
                    } else {
                        errorOverlay()
                    }
                }, c.noop)
            })
        };
        C.saveSIMSwitch = function () {
            var J = c("#swithMode").val();
            var L = c("#swithCard").val();
            var I = c("input:radio[name='switch_running']:checked").val();
            var K = {sim_mode: J, sim_type: L, sim_running: I};
            showLoading();
            t.setSIMswitch(K, function (M) {
                var N = t.getSIMswitch();
                if (M.result == "success") {
                    hideLoading();
                    successOverlay();
                    if (N.sim_current_type == 0) {
                        C.currentSIM0(true);
                        C.currentSIM1(false);
                        C.currentSIM2(false)
                    } else {
                        if (N.sim_current_type == 1) {
                            C.currentSIM0(false);
                            C.currentSIM1(true);
                            C.currentSIM2(false)
                        } else {
                            C.currentSIM0(false);
                            C.currentSIM1(false);
                            C.currentSIM2(true)
                        }
                    }
                } else {
                    if (M.result == "processing") {
                        showAlert("sim_executing_try_again")
                    } else {
                        errorOverlay()
                    }
                }
            })
        };
        C.moitorSelectSIMMode = function (J) {
            var I = t.getSIMswitch();
            if (J == 0 || J == 1) {
                c("#swithCard").val(I.sim_default_type)
            }
        };
        C.moitorSelectSIMCard = function (J) {
            var I = t.getSIMswitch();
            if (J && I.sim_lock_status == "lock") {
                C.SIMislock(true);
                C.enableFlag(false)
            } else {
                C.SIMislock(false);
                C.enableFlag(true)
            }
        };
        var C = this;
        var z = t.getSntpParams();
        globalTime = new Date(parseInt(z.sntp_year, 10), parseInt(z.sntp_month, 10) - 1, parseInt(z.sntp_day, 10), parseInt(z.sntp_hour, 10), parseInt(z.sntp_minute, 10), parseInt(z.sntp_second, 10));
        C.day = a.observable();
        C.localTime = a.observable();
        C.timeSetModes = a.observableArray(d);
        C.isManualSetTime = a.observable(false);
        C.isAutoSntpTime = a.observable(false);
        C.currentMode = a.observable(z.sntp_time_set_mode);
        y();
        C.changeSetTimeMode = function () {
            y()
        };
        C.currentYear = a.observable(parseInt(z.sntp_year, 10));
        C.currentMonth = a.observable(parseInt(z.sntp_month, 10));
        C.currentDate = a.observable(parseInt(z.sntp_day, 10));
        C.currentHour = a.observable(parseInt(z.sntp_hour, 10));
        C.currentMinute = a.observable(parseInt(z.sntp_minute, 10));
        C.years = a.observableArray(k);
        C.months = a.observableArray(g);
        C.initDateList = function () {
            B();
            C.dates(b)
        };
        B();
        C.dates = a.observableArray(b);
        C.hours = a.observableArray(m);
        C.minutes = a.observableArray(j);
        var D = s.map(z.sntp_servers, function (I) {
            return new Option(I.name, I.value)
        });
        C.serverList = a.observableArray(D);
        C.currentServer0 = a.observable(z.sntp_server0);
        C.currentServer1 = a.observable(z.sntp_server1);
        C.currentServer2 = a.observable(z.sntp_server2);
        C.customServer0 = a.observable(z.sntp_other_server0);
        C.customServer1 = a.observable(z.sntp_other_server1);
        C.customServer2 = a.observable(z.sntp_other_server2);
        C.isOther0 = a.observable(false);
        C.isOther1 = a.observable(false);
        C.isOther2 = a.observable(false);
        w();
        C.changeServerSelect = function () {
            w()
        };
        C.timeZones = a.observableArray(e);
        C.currentTimeZone = a.observable(z.sntp_timezone + "_" + z.sntp_timezone_index);
        C.daylightSaves = a.observableArray(h);
        C.currentDaylightSave = a.observable(z.sntp_dst_enable);
        C.updateCurrentTime = function () {
            var I = globalTime.getDay();
            switch (I) {
                case 6:
                    C.day(c.i18n.prop("saturday"));
                    break;
                case 5:
                    C.day(c.i18n.prop("friday"));
                    break;
                case 4:
                    C.day(c.i18n.prop("thursday"));
                    break;
                case 3:
                    C.day(c.i18n.prop("wednesday"));
                    break;
                case 2:
                    C.day(c.i18n.prop("tuesday"));
                    break;
                case 1:
                    C.day(c.i18n.prop("monday"));
                    break;
                case 0:
                    C.day(c.i18n.prop("sunday"));
                    break;
                default:
                    break
            }
            var J = globalTime.getFullYear() + "-" + getTwoDigit(globalTime.getMonth() + 1) + "-" + getTwoDigit(globalTime.getDate()) + " " + getTwoDigit(globalTime.getHours()) + ":" + getTwoDigit(globalTime.getMinutes()) + ":" + getTwoDigit(globalTime.getSeconds());
            C.localTime(J);
            globalTime.setTime(globalTime.getTime() + 1000)
        };
        C.updateCurrentSim = function () {
            var J = null;
            var I = t.getSIMswitch();
            if (I.sim_current_type != J) {
                if (I.sim_current_type == 0) {
                    C.currentSIM0(true);
                    C.currentSIM1(false);
                    C.currentSIM2(false);
                    J = I.sim_current_type
                } else {
                    if (I.sim_current_type == 1) {
                        C.currentSIM0(false);
                        C.currentSIM1(true);
                        C.currentSIM2(false);
                        J = I.sim_current_type
                    } else {
                        C.currentSIM0(false);
                        C.currentSIM1(false);
                        C.currentSIM2(true);
                        J = I.sim_current_type
                    }
                }
            }
        };
        C.apply = function () {
            var J = [];
            for (var I = 0; I < z.sntp_servers.length; I++) {
                J.push(z.sntp_servers[I].value)
            }
            var L = t.getStatusInfo();
            var M = t.getOpMode();
            if (!checkConnectedStatus(L.connectStatus, M.rj45_state, L.connectWifiStatus) && C.currentMode() == "auto") {
                showAlert("sntp_syn_time_wan_connected");
                return
            } else {
                if (C.currentServer0() == "" && C.currentServer1() == "" && C.currentServer2() == "") {
                    showAlert("three_sntp_servers_note");
                    return
                }
            }
            showLoading("");
            var K = {
                goformId: "SNTP",
                manualsettime: C.currentMode(),
                sntp_server1_ip: C.currentServer0(),
                sntp_server2_ip: C.currentServer1(),
                sntp_server3_ip: C.currentServer2(),
                sntp_other_server0: C.customServer0(),
                sntp_other_server1: C.customServer1(),
                sntp_other_server2: C.customServer2(),
                timezone: C.currentTimeZone().split("_")[0],
                sntp_timezone_index: C.currentTimeZone().split("_")[1],
                DaylightEnabled: C.currentDaylightSave(),
                time_year: C.currentYear(),
                time_month: C.currentMonth(),
                time_day: C.currentDate(),
                time_hour: C.currentHour(),
                time_minute: C.currentMinute()
            };
            t.setSntpSetting(K, function (N) {
                if (N) {
                    if (N.result == "success" && C.currentMode() == "auto") {
                        successOverlay("sntp_req_success")
                    } else {
                        if (N.result == "processing" && C.currentMode() == "auto") {
                            successOverlay("sntp_processing")
                        } else {
                            t.setSNTPDate({goformId: "SNTP_Getdatastatic"}, function (O) {
                                var P = t.getSntpParams();
                                globalTime = new Date(parseInt(P.sntp_year, 10), parseInt(P.sntp_month, 10) - 1, parseInt(P.sntp_day, 10), parseInt(P.sntp_hour, 10), parseInt(P.sntp_minute, 10), parseInt(P.sntp_second, 10));
                                successOverlay()
                            })
                        }
                    }
                } else {
                    errorOverlay()
                }
            })
        };
        C.unlock_sim_code = a.observable("");
        C.simLockStatus = a.observable();
        var G = t.getLockSimStatus();
        C.hasLockSim = a.observable(G.cstm_webui_unlocksim);
        if (G.sim_lock_status == "unlock") {
            C.simLockStatus = a.observable(false)
        } else {
            if (G.sim_lock_status == "lock") {
                C.simLockStatus = a.observable(true)
            }
        }
        var x = t.getSIMUnlockTimes();
        C.simTimes = a.observable(x.sim_unlock_nck_time);
        C.sim_unlock = function () {
            t.unlockSim({sim_unlock_code: C.unlock_sim_code()}, function (I) {
                if (I && I.result == "success") {
                    C.SIMislock(false);
                    C.enableFlag(true);
                    C.simLockStatus = a.observable(false);
                    c("#id_sim_unlock").css("display", "none");
                    c("#id_nlocked_status").css("display", "block");
                    c("#id_sim_times").css("display", "none");
                    c("#id_sim_lock").val("");
                    successOverlay()
                } else {
                    var J = t.getSIMUnlockTimes();
                    C.simTimes(J.sim_unlock_nck_time);
                    c("#id_sim_unlock").val("");
                    c("#id_span_sim_times").text(C.simTimes());
                    errorOverlay()
                }
            }, c.noop)
        };
        C.applyTTL = function () {
            showConfirm("lan_confirm_reopen", function () {
                var J = document.getElementById("daylight_saving_TTL_select");
                var I = J.selectedIndex;
                var K = J.options[I].text;
                t.setTTL(K, function (L) {
                    if (L.result) {
                        successOverlay()
                    } else {
                        errorOverlay()
                    }
                })
            })
        };

        function y() {
            if (C.currentMode() == "manual") {
                C.isManualSetTime(true);
                C.isAutoSntpTime(false)
            } else {
                C.isManualSetTime(false);
                C.isAutoSntpTime(true)
            }
            return true
        }

        function B() {
            b = [];
            if (c.inArray(parseInt(C.currentMonth(), 10), l) != -1) {
                p(1, 30, b)
            } else {
                if (c.inArray(parseInt(C.currentMonth(), 10), q) != -1) {
                    p(1, 31, b)
                } else {
                    if (parseInt(C.currentYear(), 10) % 4 == 0) {
                        p(1, 29, b)
                    } else {
                        p(1, 28, b)
                    }
                }
            }
        }

        function w() {
            C.isOther0(C.currentServer0() == "Other");
            C.isOther1(C.currentServer1() == "Other");
            C.isOther2(C.currentServer2() == "Other");
            !C.isOther0() && c("#sntp_server0").find(".error").hide();
            !C.isOther1() && c("#sntp_server1").find(".error").hide();
            !C.isOther2() && c("#sntp_server2").find(".error").hide()
        }
    }

    var f = t.getDeviceInfo();
    self.imei_num = a.observable(f.imei);
    self.set_imei = function () {
        showConfirm("set_imei_reboot", function () {
            t.setImeiNum({imei: c("#id_imei_set").val()}, function (u) {
                if (u && u.result == "success") {
                    successOverlay()
                } else {
                    errorOverlay()
                }
            }, c.noop)
        })
    };

    function n() {
        var x = new o();
        var u = c("#container")[0];
        a.cleanNode(u);
        a.applyBindings(x, u);
        x.updateCurrentTime();
        x.updateCurrentSim();
        var w = t.getPassword().CurrentPasswd;
        var v = t.getPassword().RootPasswd;
        if (w != v && w != "xfnj1234") {
            c("#rootSetTTLForm").css("display", "none");
            c("#rootSetImei").css("display", "none");
            c("#rootBandSelect").css("display", "none");
            c("#frmAtCmd").css("display", "none")
        } else {
            var y = t.getDeviceInfo();
            x.imei_num = a.observable(y.imei)
        }
        c("#swithMode").change(function () {
            var z = c(this).children("option:selected").val();
            if (z == 0) {
                x.moitorSelectSIMMode(0);
                x.swithMode(0)
            } else {
                x.moitorSelectSIMMode(1);
                x.swithMode(1)
            }
        });
        c("#swithCard").change(function () {
            var z = c(this).children("option:selected").val();
            if (z == 0) {
                x.moitorSelectSIMCard(true)
            } else {
                x.moitorSelectSIMCard(false)
            }
        });
        addInterval(function () {
            x.updateCurrentTime();
            x.updateCurrentSim()
        }, 1000);
        c("#sntpForm").validate({
            submitHandler: function () {
                x.apply()
            },
            rules: {
                sntp_other_server0: "sntp_invalid_server_name",
                sntp_other_server1: "sntp_invalid_server_name",
                sntp_other_server2: "sntp_invalid_server_name"
            }
        });
        c(".setTTLForm").validate({
            submitHandler: function () {
                x.applyTTL()
            }
        })
    }

    return {init: n}
});
define("adm_management", "jquery knockout set service underscore CryptoJS".split(" "), function (f, e, d, a, c, b) {
    function g() {
        var l = this;
        l.currentValue = e.observable();
        l.newValue = e.observable();
        l.confirmValue = e.observable();

        function k() {
            var s = {};
            if (d.PASSWORD_ENCODE) {
                s.oldValue = l.currentValue();
                s.newValue = l.newValue()
            } else {
                var r = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,32}");
                if (!r.test(l.newValue())) {
                    showConfirm("password_note_too_low", function () {
                        var v = a.getDeviceInfoLow();
                        var w = b.enc.Latin1.parse(v.skey);
                        var t = b.enc.Latin1.parse(v.siv);
                        var x = b.AES.encrypt(l.currentValue(), w, {
                            iv: t,
                            mode: b.mode.CBC,
                            padding: b.pad.ZeroPadding
                        }).toString();
                        var u = b.AES.encrypt(l.newValue(), w, {
                            iv: t,
                            mode: b.mode.CBC,
                            padding: b.pad.ZeroPadding
                        }).toString();
                        s.oldValue = x;
                        s.newValue = u;
                        showLoading();
                        a.changeManageInfo(s, function (y) {
                            l.cancel();
                            if (y && y.result == true) {
                                successOverlay()
                            } else {
                                if (y && y.errorType == "badPassword") {
                                    hideLoading();
                                    showAlert("current_password_error", function () {
                                        f("#txtCurrent").focus()
                                    })
                                } else {
                                    errorOverlay()
                                }
                            }
                        })
                    });
                    return
                }
                var o = a.getDeviceInfoLow();
                var p = b.enc.Latin1.parse(o.skey);
                var m = b.enc.Latin1.parse(o.siv);
                var q = b.AES.encrypt(l.currentValue(), p, {
                    iv: m,
                    mode: b.mode.CBC,
                    padding: b.pad.ZeroPadding
                }).toString();
                var n = b.AES.encrypt(l.newValue(), p, {
                    iv: m,
                    mode: b.mode.CBC,
                    padding: b.pad.ZeroPadding
                }).toString();
                s.oldValue = q;
                s.newValue = n
            }
            showLoading();
            a.changeManageInfo(s, function (t) {
                l.cancel();
                if (t && t.result == true) {
                    successOverlay()
                } else {
                    if (t && t.errorType == "badPassword") {
                        hideLoading();
                        showAlert("current_password_error", function () {
                            f("#txtCurrent").focus()
                        })
                    } else {
                        errorOverlay()
                    }
                }
            })
        }

        function j() {
            l.currentValue("");
            l.newValue("");
            l.confirmValue("")
        }

        l.cancel = j;
        l.changeValue = k
    }

    function h() {
        var j = f("#container");
        e.cleanNode(j[0]);
        var k = new g();
        e.applyBindings(k, j[0]);
        f("#frmPassword").validate({
            submitHandler: function () {
                k.changeValue()
            }, rules: {txtCurrent: "manage_info_check", txtNew: "manage_info_check", txtConfirm: {equalTo: "#txtNew"}}
        })
    }

    return {init: h}
});
define("adm_pin", "jquery knockout set service".split(" "), function (g, d, c, b) {
    var e = {common: 0, requirePin: 1, modifyPin: 2, requirePuk: 3, destroyed: 4};
    var f = {enable: "1", disable: "0"};

    function a() {
        var q = this;
        var n = b.getPinData();
        q.isDataCard = c.PRODUCT_TYPE == "DATACARD";
        q.originPinStatus = d.observable(n.pin_status);
        q.pinStatus = d.observable(n.pin_status);
        q.pinNumber = d.observable(n.pinnumber);
        q.pukNumber = d.observable(n.puknumber);
        q.currentPin = d.observable();
        q.newPin = d.observable();
        q.confirmPin = d.observable();
        q.puk = d.observable();
        q.pageState = d.observable();
        q.operateSuccessFlag = true;
        q.callback = s;

        function s(u) {
            if (u && u.result == true) {
                q.operateSuccessFlag = true;
                successOverlay()
            } else {
                q.operateSuccessFlag = false;
                if (q.pinNumber() == 2) {
                    showAlert("last_enter_pin")
                } else {
                    if (q.pukNumber() == 2) {
                        showAlert("last_enter_puk")
                    } else {
                        errorOverlay()
                    }
                }
            }
            h(q)
        }

        function o() {
            if (q.isConnectedNetWork()) {
                showAlert("cannot_operate_when_connected");
                return
            }
            if (q.pageState() == e.common) {
                return
            }
            var u = {oldPin: q.currentPin(), newPin: q.newPin()};
            showLoading();
            if (q.pageState() == e.modifyPin) {
                b.changePin(u, q.callback)
            } else {
                if (q.pageState() == e.requirePuk) {
                    u = {PinNumber: q.newPin(), PUKNumber: q.puk()};
                    b.enterPUK(u, q.callback)
                } else {
                    if (q.pinStatus() == f.enable) {
                        b.enablePin(u, q.callback)
                    } else {
                        b.disablePin(u, q.callback)
                    }
                }
            }
        }

        function r() {
            q.pageState(e.common);
            q.pinStatus(q.originPinStatus());
            q.clear()
        }

        function l() {
            q.confirmPin("");
            q.currentPin("");
            q.newPin("");
            q.puk("");
            clearValidateMsg()
        }

        function k(u) {
            if (u.pinnumber > 0) {
                if (q.operateSuccessFlag) {
                    q.cancel()
                } else {
                    q.clear()
                }
            } else {
                q.clear();
                if (u.puknumber > 0) {
                    q.pageState(e.requirePuk)
                } else {
                    q.pageState(e.destroyed)
                }
            }
        }

        function p() {
            if (q.isConnectedNetWork()) {
                showAlert("cannot_operate_when_connected");
                return
            }
            q.pinStatus(q.originPinStatus());
            q.pageState(e.modifyPin);
            q.clear()
        }

        function m() {
            if (q.isConnectedNetWork()) {
                g("#frmPin :input").each(function () {
                    disableBtn(g(this))
                });
                clearValidateMsg()
            } else {
                g("#frmPin :input").each(function () {
                    if (this.id == "txtPin" || this.id == "btnPinApply") {
                        if (q.pageState() == e.common) {
                            disableBtn(g(this));
                            return
                        }
                    }
                    if (this.id == "btnModifyPin") {
                        if (q.originPinStatus() != f.enable) {
                            disableBtn(g(this));
                            return
                        }
                    }
                    if (this.id == "pinEnable" || this.id == "pinDisable") {
                        if (q.pageState() == e.modifyPin) {
                            disableBtn(g(this));
                            return
                        }
                    }
                    enableBtn(g(this))
                })
            }
        }

        function t() {
            var u = b.getConnectionInfo();
            return u.connectStatus == "ppp_connected"
        }

        function j() {
            if (q.pinStatus() == q.originPinStatus()) {
                q.pageState(e.common)
            } else {
                q.pageState(e.requirePin)
            }
            q.clear()
        }

        q.changePin = o;
        q.cancel = r;
        q.clear = l;
        q.computePageState = k;
        q.computePageState(n);
        q.displayModifyPinPage = p;
        q.fixPageEnable = m;
        q.isConnectedNetWork = t;
        q.pinStatusChangeEvent = d.dependentObservable(j, this)
    }

    function h(m) {
        var k = m;
        if (k) {
            var l = b.getPinData();
            k.originPinStatus(l.pin_status);
            k.pinNumber(l.pinnumber);
            k.pukNumber(l.puknumber);
            k.computePageState(l)
        } else {
            k = new a();
            addInterval(function () {
                k.fixPageEnable()
            }, 1000)
        }
        var j = g("#container")[0];
        d.cleanNode(j);
        d.applyBindings(k, j);
        k.fixPageEnable();
        g("#frmPin").validate({
            submitHandler: function () {
                k.changePin()
            },
            rules: {
                txtPuk: "puk_check",
                txtPin: "pin_check",
                txtNewPin: "pin_check",
                txtConfirmPin: {equalToPin: "#txtNewPin"}
            }
        })
    }

    return {init: h}
});
define("adm_quick_set", "jquery knockout set service underscore CryptoJS".split(" "), function (g, o, c, k, m, l) {
    var a = {ok: 0, wps_on: 1, wifi_off: 2};
    var h = {auto: "auto", manual: "manual"};
    var j = 1;
    var b = 5;

    function d() {
        return m.map(c.APN_AUTH_MODES, function (p) {
            return new Option(p.name, p.value)
        })
    }

    var e = m.map(c.WIFI_WEP_SUPPORT ? c.AUTH_MODES_WEP : c.AUTH_MODES, function (p) {
        return new Option(p.name, p.value)
    });

    function f() {
        var K = this;
        var q = k.getQuickSettingInfo();
        K.currentStep = o.observable(j);
        K.ipType = o.observable(q.pdp_type == "IP" ? "IP" : q.ipv6_pdp_type);
        K.supportIPv6 = c.IPV6_SUPPORT;
        K.supportIpv4AndIpv6 = c.IPV4_AND_V6_SUPPORT;
        K.wpsFlag = o.observable(q.WscModeOption);

        function H() {
            return (q.apn_index < c.defaultApnSize || q.ppp_status == "ppp_connected" || q.ppp_status == "ppp_connecting")
        }

        function p() {
            return (q.ppp_status == "ppp_connected" || q.ppp_status == "ppp_connecting" || (!K.profileName() && K.apnMode() == h.auto))
        }

        function F() {
            var O = q["APN_configtmp" + q.apn_index];
            var N = q["ipv6_APN_configtmp" + q.apn_index];
            var M = [];
            var L = [];
            if (O) {
                M = O.split("($)")
            }
            if (N) {
                L = N.split("($)")
            }
            return {
                m_profile_name: M[0],
                wan_apn: M[1],
                ppp_auth_mode: M[4] == "" || typeof (M[4]) == "undefined" ? "" : M[4].toLowerCase(),
                ppp_username: M[5],
                ppp_passtmp: M[6],
                pdp_type: M[7],
                ipv6_wan_apn: L[1],
                ipv6_ppp_auth_mode: typeof (L[4]) == "undefined" || L[4] == "" ? "" : L[4].toLowerCase(),
                ipv6_ppp_username: L[5],
                ipv6_ppp_passtmp: L[6],
                ipv6_pdp_type: L[7]
            }
        }

        K.currAPN = o.computed(F);
        K.apn = o.observable(K.currAPN().wan_apn);
        K.ipv6_apn = o.observable(K.currAPN().ipv6_wan_apn);
        K.ipv6_selectedAuthMode = o.observable(K.currAPN().ipv6_ppp_auth_mode);
        K.ipv6_username = o.observable(K.currAPN().ipv6_ppp_username);
        K.ipv6_password = o.observable(K.currAPN().ipv6_ppp_passtmp);
        K.profileName = o.observable(K.currAPN().m_profile_name);
        K.selectedAuthMode = o.observable(K.currAPN().ppp_auth_mode);
        K.username = o.observable(K.currAPN().ppp_username);
        K.password = o.observable(K.currAPN().ppp_passtmp);
        K.ipType = o.observable(K.currAPN().pdp_type == "IP" ? "IP" : K.currAPN().ipv6_pdp_type);
        K.transAPN = o.observable("apn_ipv4_apn");
        K.transAPNIPv6 = o.observable("apn_ipv6_apn");
        K.transAuthMode = o.observable("apn_authentication_ipv4");
        K.transAuthModeIPv6 = o.observable("apn_authentication_ipv6");
        K.transUserName = o.observable("apn_user_name_ipv4");
        K.transPassword = o.observable("apn_password_ipv4");
        K.transUserNameIPv6 = o.observable("apn_user_name_ipv6");
        K.transPasswordIPv6 = o.observable("apn_password_ipv6");
        K.apnDisabled = o.computed(H);
        K.apnMode = o.observable(q.apn_mode);
        K.apnModeDisabled = o.computed(p);
        K.authModes = o.observableArray(d());
        if (K.ipType() == "IPv6") {
            K.showIPv4 = false;
            K.showIPv6 = true;
            K.transAPNIPv6("apn");
            K.transAuthModeIPv6("apn_authentication");
            K.transUserNameIPv6("apn_user_name");
            K.transPasswordIPv6("apn_password")
        } else {
            if (c.IPV4_AND_V6_SUPPORT && K.ipType() == "IPv4v6") {
                K.showIPv4 = true;
                K.showIPv6 = true
            } else {
                if (K.ipType() == "IP" || K.ipType() == "IPv4") {
                    K.showIPv4 = true;
                    K.showIPv6 = false;
                    K.transAPN("apn");
                    K.transAuthMode("apn_authentication");
                    K.transUserName("apn_user_name");
                    K.transPassword("apn_password")
                } else {
                    K.showIPv4 = true;
                    K.showIPv6 = false;
                    K.transAPN("apn");
                    K.transAuthMode("apn_authentication");
                    K.transUserName("apn_user_name");
                    K.transPassword("apn_password")
                }
            }
        }
        K.wifiDisabled = (q.wifi_cur_state != "1");
        K.ssid = o.observable(q.SSID1);
        K.broadcast = o.observable(q.HideSSID);
        K.hasWifiWep = c.WIFI_WEP_SUPPORT;
        K.securityModes = o.observableArray(e);
        K.selectedSecurityMode = o.observable(q.AuthMode);
        K.WPAKey = o.observable(q.WPAPSK1);
        K.apnMode_display = o.observable("");
        K.apnMode_trans = o.computed(I);
        K.selectedAuthMode_display = o.computed(y);
        K.ipv6_selectedAuthMode_display = o.computed(C);
        K.showWifiPassword = o.observable(false);
        K.showWifiPasswordHandler = r;
        var v = k.getWifiAdvance();
        K.adBand = o.observable(v.wifiBand);
        K.adMode = o.observable(v.mode);
        K.encryptType = o.observable(q.EncrypType);
        K.keyID = o.observable(q.DefaultKeyID);
        K.wepPassword = o.observable("");
        K.getWepPassword = z;
        K.wepPassword(K.getWepPassword());
        K.profileChangeHandler = G;
        K.broadcast_display = o.observable("");
        K.broadcast_trans = o.computed(w);
        K.selectedSecurityMode_display = o.observable();
        K.selectedSecurityMode_trans = o.computed(B);
        K.callback = u;
        K.next = E;
        K.previous = D;
        K.save = J;

        function I() {
            if (h.auto == K.apnMode()) {
                K.apnMode_display(g.i18n.prop("apn_auto_apn"));
                return "apn_auto_apn"
            } else {
                K.apnMode_display(g.i18n.prop("apn_manual_apn"));
                return "apn_manual_apn"
            }
        }

        function w() {
            if ("0" == K.broadcast()) {
                K.broadcast_display(g.i18n.prop("enable"));
                return "enable"
            } else {
                K.broadcast_display(g.i18n.prop("disable"));
                return "disable"
            }
        }

        function E() {
            var L = K.currentStep();
            var M = K.currentStep() + 1;
            s(M);
            if (L == 1 && K.apnMode() == h.auto) {
                M = K.currentStep() + 1;
                s(M)
            }
        }

        function D() {
            var L = K.currentStep();
            var M = K.currentStep() - 1;
            s(M);
            if (L == 3 && K.apnMode() == h.auto) {
                M = K.currentStep() - 1;
                s(M)
            }
        }

        function J() {
            var M = function () {
                t()
            };
            var L = x();
            if (L == a.wifi_off) {
                showConfirm("quick_setting_wifi_disable_confirm", M)
            } else {
                if (L == a.wps_on) {
                    showAlert("wps_on_info")
                } else {
                    showConfirm("quick_setting_param_changed_confirm", M)
                }
            }
        }

        function u(L) {
            if (L.result == "success") {
                successOverlay();
                location.hash = "#network_choose"
            } else {
                errorOverlay()
            }
        }

        function s(L) {
            if (L > b) {
                L = b
            } else {
                if (L < j) {
                    L = j
                }
            }
            K.currentStep(L);
            return true
        }

        function C() {
            var L = K.ipv6_selectedAuthMode();
            return A(L)
        }

        function A(M) {
            for (var L = 0; L < c.APN_AUTH_MODES.length; L++) {
                if (M == c.APN_AUTH_MODES[L].value) {
                    return c.APN_AUTH_MODES[L].name
                }
            }
        }

        function z() {
            return K.keyID() == "3" ? q.Key4Str1 : (K.keyID() == "2" ? q.Key3Str1 : K.keyID() == "1" ? q.Key2Str1 : q.Key1Str1)
        }

        function x() {
            var L = k.getWpsInfo();
            if (L.radioFlag == "0") {
                return a.wifi_off
            } else {
                if (L.wpsFlag == "1") {
                    return a.wps_on
                }
            }
            return a.ok
        }

        function G(M, L) {
            g("#pwdWepKey").parent().find("label[class='error']").hide();
            K.wepPassword(K.getWepPassword());
            return true
        }

        function t() {
            showLoading();
            var N = c.IPV4V6_SUPPORT && K.currAPN().pdp_type == "IPv4v6";
            var O = "";
            if (c.PASSWORD_ENCODE) {
                O = K.WPAKey()
            } else {
                var M = k.getDeviceInfoLow();
                var P = l.enc.Latin1.parse(M.skey);
                var L = l.enc.Latin1.parse(M.siv);
                O = l.AES.encrypt(K.WPAKey(), P, {iv: L, mode: l.mode.CBC, padding: l.pad.ZeroPadding}).toString()
            }
            var Q = {
                apn_index: q.apn_index,
                apnMode: K.apnMode(),
                Encryption_Mode_hid: K.selectedSecurityMode(),
                ipv6_ppp_auth_mode: N ? K.selectedAuthMode() : K.ipv6_selectedAuthMode(),
                ipv6_ppp_username: N ? K.username() : K.ipv6_username(),
                ipv6_ppp_passtmp: N ? K.password() : K.ipv6_password(),
                ipv6_wan_apn: N ? K.apn() : K.ipv6_apn(),
                pdp_type: K.ipType(),
                ppp_auth_mode: K.selectedAuthMode(),
                ppp_username: K.username(),
                ppp_passtmp: K.password(),
                profile_name: K.profileName(),
                security_shared_mode: "NONE",
                SSID_Broadcast: K.broadcast(),
                SSID_name: K.ssid(),
                wan_apn: K.apn(),
                wep_default_key: 0,
                WPA_ENCRYPTION_hid: K.selectedSecurityMode() == "OPEN" ? "NONE" : K.selectedSecurityMode() == "WPA2PSK" ? 1 : 2,
                WPA_PreShared_Key: O
            };
            Q.wep_default_key = K.keyID();
            if (K.encryptType() == "SHARED" || K.selectedSecurityMode() == "WEP") {
                Q.security_shared_mode = "WEP";
                Q.wep_key_1 = q.Key1Str1;
                Q.wep_key_2 = q.Key2Str1;
                Q.wep_key_3 = q.Key3Str1;
                Q.wep_key_4 = q.Key4Str1;
                var R = "0";
                if (K.wepPassword().length == "5" || K.wepPassword().length == "13") {
                    R = "1"
                } else {
                    R = "0"
                }
                if (K.keyID() == "3") {
                    Q.wep_key_4 = K.wepPassword();
                    Q.WEP4Select = R
                } else {
                    if (K.keyID() == "2") {
                        Q.wep_key_3 = K.wepPassword();
                        Q.WEP3Select = R
                    } else {
                        if (K.keyID() == "1") {
                            Q.wep_key_2 = K.wepPassword();
                            Q.WEP2Select = R
                        } else {
                            Q.wep_key_1 = K.wepPassword();
                            Q.WEP1Select = R
                        }
                    }
                }
            } else {
                if (K.encryptType() == "WPAPSKWPA2PSK") {
                    Q.security_shared_mode = "NONE"
                } else {
                    Q.security_shared_mode = "NONE"
                }
            }
            k.setQuickSetting4IPv6(Q, K.callback)
        }

        function y() {
            var L = K.selectedAuthMode();
            return A(L)
        }

        function B() {
            var N = K.selectedSecurityMode();
            var M = c.WIFI_WEP_SUPPORT ? c.AUTH_MODES_WEP : c.AUTH_MODES;
            for (var L = 0; L < M.length; L++) {
                if (N == M[L].value) {
                    K.selectedSecurityMode_display(g.i18n.prop("security_mode_" + M[L].value));
                    return "security_mode_" + M[L].value
                }
            }
        }

        function r() {
            g("#pwdWepKey").parent().find(".error").hide();
            g("#codeWPAKey").parent().find(".error").hide();
            var L = g("#showWifiPassword:checked");
            if (L && L.length == 0) {
                K.showWifiPassword(true)
            } else {
                K.showWifiPassword(false)
            }
        }
    }

    function n() {
        var p = g("#container");
        o.cleanNode(p[0]);
        var q = new f();
        o.applyBindings(q, p[0]);
        g("#quickSettingForm").validate({
            submitHandler: function () {
                if (q.currentStep() < 5) {
                    q.next()
                } else {
                    q.save()
                }
            },
            rules: {
                txtAPN: "apn_check",
                txtIPv6APN: "apn_check",
                txtSSID: "ssid",
                pwdWepKey: {wifi_wep_password_check: true, wifi_password_check: true},
                txtWepKey: {wifi_wep_password_check: true, wifi_password_check: true},
                txtWPAKey: "wifi_password_check",
                codeWPAKey: "wifi_password_check",
                txtUserName: "ppp_username_check",
                txtIPv6UserName: "ppp_username_check",
                txtSecretCode: "ppp_secretcode_check",
                txtIPv6SecretCode: "ppp_secretcode_check"
            },
            errorPlacement: function (r, s) {
                var t = s.attr("id");
                if (t == "pwdWepKey" || t == "txtWepKey") {
                    r.insertAfter("#lblShowWepPassword")
                } else {
                    if (t == "txtWPAKey" || t == "codeWPAKey") {
                        r.insertAfter("#lblShowWifiPassword")
                    } else {
                        r.insertAfter(s)
                    }
                }
            }
        })
    }

    return {init: n}
});
define("main", "set service knockout underscore jquery statusBar echarts".split(" "), function (k, f, e, l, h, g, c) {
    var d = {
        color: ["red", "red", "red", "red", "red"],
        series: [{
            name: "流量控制",
            type: "pie",
            radius: ["0", "72"],
            itemStyle: {normal: {label: {show: false}, labelLine: {show: false}}},
            data: [],
            selectedOffset: 3
        }],
        animation: false,
        title: {
            text: "",
            x: "center",
            y: "center",
            itemGap: 0,
            textStyle: {color: "#FFF", fontFamily: "微软雅黑", fontSize: 20, fontWeight: "bolder"},
            subtextStyle: {color: "#FFF", fontFamily: "微软雅黑", fontSize: 16, fontWeight: "bolder"}
        },
        tooltip: {formatter: "{b}"}
    };
    var m = window.language;
    var a = 0;
    var j = null;
    var b = {CONNECTED: 1, DISCONNECTED: 2, CONNECTING: 3, DISCONNECTING: 4};

    function o() {
        a = 0;
        n.oldUsedData = null;
        n.oldAlarmData = null;
        j = c.init(h("#traffic_graphic")[0]);
        var q = h("#container")[0];
        e.cleanNode(q);
        var r = new p();
        e.applyBindings(r, q);
        var t = f.getLoginData();
        var s = t.psw_changed;
        if (s != "1") {
            showConfirm("password_note_first_change", function () {
                window.location.hash = "#pwd_mode"
            });
            return
        }
    }

    var n = {
        initStatus: null,
        initShownStatus: function (q) {
            this.initStatus = {};
            var r = q.ipv6PdpType.toLowerCase().indexOf("v6") > 0;
            if (k.RJ45_SUPPORT) {
                var s = checkCableMode(q.blc_wan_mode);
                if (s) {
                    this.initStatus.showIpv6WanIpAddr = false;
                    this.initStatus.showIpv4WanIpAddr = true
                } else {
                    if (k.IPV6_SUPPORT) {
                        if (q.pdpType == "IP") {
                            this.initStatus.showIpv6WanIpAddr = false;
                            this.initStatus.showIpv4WanIpAddr = true
                        } else {
                            if (r) {
                                if (q.ipv6PdpType == "IPv6") {
                                    this.initStatus.showIpv6WanIpAddr = true;
                                    this.initStatus.showIpv4WanIpAddr = false
                                } else {
                                    this.initStatus.showIpv6WanIpAddr = true;
                                    this.initStatus.showIpv4WanIpAddr = true
                                }
                            }
                        }
                    } else {
                        this.initStatus.showIpv6WanIpAddr = false;
                        this.initStatus.showIpv4WanIpAddr = true
                    }
                }
            } else {
                if (k.IPV6_SUPPORT) {
                    if (q.pdpType == "IP") {
                        this.initStatus.showIpv6WanIpAddr = false;
                        this.initStatus.showIpv4WanIpAddr = true
                    } else {
                        if (r) {
                            if (q.ipv6PdpType == "IPv6") {
                                this.initStatus.showIpv6WanIpAddr = true;
                                this.initStatus.showIpv4WanIpAddr = false
                            } else {
                                this.initStatus.showIpv6WanIpAddr = true;
                                this.initStatus.showIpv4WanIpAddr = true
                            }
                        }
                    }
                } else {
                    this.initStatus.showIpv6WanIpAddr = false;
                    this.initStatus.showIpv4WanIpAddr = true
                }
            }
        },
        wanIpGet: function (r) {
            var q = {wanIpAddress: "", ipv6WanIpAddress: ""};
            q.wanIpAddress = verifyDeviceInfo(r.wanIpAddress);
            q.ipv6WanIpAddress = verifyDeviceInfo(r.ipv6WanIpAddress);
            return q
        },
        cachedAPStationBasic: null,
        cachedConnectionMode: null,
        getCanConnectNetWork: function (s) {
            var q = f.getStatusInfo();
            if (q.simStatus != "modem_init_complete") {
                return false
            }
            var r = q.networkType.toLowerCase();
            if (r == "searching") {
                return false
            }
            if (r == "" || r == "limited service") {
                r = "limited_service"
            }
            if (r == "no service") {
                r = "no_service"
            }
            if (r == "limited_service" || r == "no_service") {
                if (s.cStatus() != b.CONNECTED) {
                    return false
                }
            }
            if (k.AP_STATION_SUPPORT) {
                if (q.connectWifiStatus == "connect") {
                    if (q.ap_station_mode == "wifi_pref") {
                        return false
                    }
                }
            }
            return true
        },
        doConnect: function () {
            showLoading("connecting");
            f.connect({}, function (q) {
                if (q.result) {
                    successOverlay()
                } else {
                    errorOverlay()
                }
            })
        },
        refreshHomeData: function (r) {
            var q = f.getConnectionInfo();
            r.connectStatus(q.connectStatus);
            r.canConnect(this.getCanConnectNetWork(r));
            r.networkType(n.getNetworkType(q.networkType));
            if (q.connectStatus == "ppp_connected") {
                r.current_Flux(transUnit(parseInt(q.data_counter.currentReceived, 10) + parseInt(q.data_counter.currentSent, 10), false));
                r.connected_Time(transSecond2Time(q.data_counter.currentConnectedTime));
                r.up_Speed(transUnit(q.data_counter.uploadRate, true));
                r.down_Speed(transUnit(q.data_counter.downloadRate, true))
            } else {
                r.current_Flux(transUnit(0, false));
                r.connected_Time(transSecond2Time(0));
                r.up_Speed(transUnit(0, true));
                r.down_Speed(transUnit(0, true))
            }
            r.trafficAlertEnable(q.limitVolumeEnable);
            if (q.limitVolumeEnable) {
                if (q.limitVolumeType == "1") {
                    r.trafficUsed(transUnit(parseInt(q.data_counter.monthlySent, 10) + parseInt(q.data_counter.monthlyReceived, 10), false));
                    r.trafficLimited(transUnit(q.limitDataMonth, false))
                } else {
                    r.trafficUsed(transSecond2Time(q.data_counter.monthlyConnectedTime));
                    r.trafficLimited(transSecond2Time(q.limitTimeMonth))
                }
            }
            if (m != window.language) {
                m = window.language;
                a = 1
            }
            if (r.showTraffic()) {
                n.updateEcharts(q)
            } else {
                n.allFreeEcharts()
            }
            n.refreshStationInfo(r)
        },
        allFreeEcharts: function () {
            var q = n.data.free;
            q.value = 1;
            q.selected = false;
            q.name = h.i18n.prop("echarts_no");
            d.series[0].data = [q];
            d.title.text = "";
            n.setEcharts(d, h.i18n.prop("echarts_no"))
        },
        getNetworkType: function (q) {
            var r = q.toLowerCase();
            if (r == "" || r == "limited service") {
                r = "limited_service"
            }
            if (r == "no service") {
                r = "no_service"
            }
            if (r == "limited_service" || r == "no_service") {
                return h.i18n.prop("network_type_" + r)
            } else {
                return q
            }
        },
        data: {
            full: {value: 30, name: "流量超出", itemStyle: {normal: {color: "#DF4313"}}},
            used: {value: 30, name: "已使用", itemStyle: {normal: {color: "#8CC916"}}},
            left1: {value: 50, name: "提醒值内未使用", itemStyle: {normal: {color: "#D8D8D8"}}},
            free: {value: 50, name: "未使用", itemStyle: {normal: {color: "#D8D8D8"}}},
            alert: {value: 1, name: "提醒值", itemStyle: {normal: {color: "#FF5500"}}},
            alarm: {value: 19.7, name: "警戒区", itemStyle: {normal: {color: "#8CC916"}}},
            start: {value: 50, name: "提醒值内未使用", itemStyle: {normal: {color: "#D8D8D8"}}}
        },
        getDataInfo: function (q) {
            return {data: /\d+(.\d+)?/.exec(q)[0], unit: /[A-Z]{1,2}/.exec(q)[0]}
        },
        oldAlarmData: null,
        oldUsedData: null,
        updateEcharts: function (K) {
            var u = h.i18n.prop("echarts_no");
            a++;
            if (a % 10 != 2) {
                return false
            }
            var N = 0, v = 0, C = 0, t = 0, q = 0, D = 0;
            if (K.limitVolumeEnable) {
                u = h.i18n.prop("echarts_used");
                d.series[0].data = [];
                if (K.limitVolumeType == "1") {
                    var L = transUnit(K.limitDataMonth, false);
                    d.series[0].data = [];
                    if (K.limitDataMonth == 0) {
                        var I = n.data.used;
                        I.value = 1;
                        I.selected = false;
                        I.name = h.i18n.prop("echarts_used");
                        d.series[0].data.push(I)
                    } else {
                        var z = n.getDataInfo(L);
                        N = z.data * n.getUnitValue(z.unit) * 1048576;
                        v = parseInt(K.data_counter.monthlySent, 10) + parseInt(K.data_counter.monthlyReceived, 10);
                        C = N * K.limitVolumePercent / 100;
                        if (v >= N) {
                            var M = n.data.full;
                            M.value = 100;
                            M.name = h.i18n.prop("echarts_full");
                            d.series[0].data.push(M);
                            u = h.i18n.prop("echarts_full")
                        } else {
                            if (C - v > 0) {
                                D = C - v;
                                t = N - C
                            } else {
                                q = v - C;
                                t = N - v
                            }
                            var I = n.data.used;
                            if (C - v > 0) {
                                I.value = v
                            } else {
                                I.value = C
                            }
                            I.name = h.i18n.prop("echarts_used");
                            d.series[0].data.push(I);
                            if (D > 0) {
                                var B = n.data.left1;
                                B.value = D;
                                B.name = h.i18n.prop("echarts_left1");
                                d.series[0].data.push(B)
                            }
                            var y = n.data.alert;
                            y.value = N / 200;
                            y.name = h.i18n.prop("echarts_alert");
                            d.series[0].data.push(y);
                            if (q > 0) {
                                var w = n.data.alarm;
                                w.value = q;
                                w.name = h.i18n.prop("echarts_alarm");
                                d.series[0].data.push(w)
                            }
                            var A = n.data.free;
                            A.value = t;
                            A.name = h.i18n.prop("echarts_free");
                            d.series[0].data.push(A)
                        }
                    }
                } else {
                    d.series[0].data = [];
                    if (K.limitTimeMonth == 0) {
                        var I = n.data.used;
                        I.value = 1;
                        I.selected = false;
                        I.name = h.i18n.prop("echarts_used");
                        d.series[0].data.push(I)
                    } else {
                        N = K.limitTimeMonth;
                        v = K.data_counter.monthlyConnectedTime;
                        C = N * K.limitVolumePercent / 100;
                        if (v >= N) {
                            var x = n.data.full;
                            x.value = 100;
                            x.name = h.i18n.prop("echarts_full");
                            d.series[0].data.push(x);
                            u = h.i18n.prop("echarts_full")
                        } else {
                            if (C - v > 0) {
                                D = C - v;
                                t = N - C
                            } else {
                                q = v - C;
                                t = N - v
                            }
                            var r = n.data.used;
                            if (C - v > 0) {
                                r.value = v
                            } else {
                                r.value = C
                            }
                            r.name = h.i18n.prop("echarts_used");
                            d.series[0].data.push(r);
                            if (D > 0) {
                                var J = n.data.left1;
                                J.value = D;
                                J.name = h.i18n.prop("echarts_left1");
                                d.series[0].data.push(J)
                            }
                            var G = n.data.alert;
                            G.value = N / 200;
                            G.name = h.i18n.prop("echarts_alert");
                            d.series[0].data.push(G);
                            if (q > 0) {
                                var E = n.data.alarm;
                                E.value = q;
                                E.name = h.i18n.prop("echarts_alarm");
                                d.series[0].data.push(E)
                            }
                            var H = n.data.free;
                            H.value = t;
                            H.name = h.i18n.prop("echarts_free");
                            d.series[0].data.push(H)
                        }
                    }
                }
            } else {
                var I = n.data.used;
                I.value = 1;
                I.selected = false;
                I.name = h.i18n.prop("echarts_no");
                d.series[0].data = [I];
                d.title.text = ""
            }
            var s = l.find(d.series[0].data, function (O) {
                return O.name == h.i18n.prop("echarts_used")
            });
            var F = l.find(d.series[0].data, function (O) {
                return O.name == h.i18n.prop("echarts_alarm")
            });
            if (!F) {
                F = {value: 0}
            }
            if (typeof s == "undefined") {
                n.setEcharts(d, u)
            } else {
                if (n.oldUsedData != s.value || n.oldAlarmData != F.value) {
                    n.oldUsedData = s.value;
                    n.oldAlarmData = F.value;
                    n.setEcharts(d, u)
                }
            }
        },
        getUnitValue: function (q) {
            q = q.toUpperCase();
            if (q == "GB") {
                return "1024"
            } else {
                if (q == "TB") {
                    return "1048576"
                } else {
                    return "1"
                }
            }
        },
        setEcharts: function (t, s) {
            var r = n.data.start;
            r.value = 0;
            r.name = s;
            r.selected = false;
            var q = [r].concat(t.series[0].data);
            t.series[0].data = q;
            j.setOption(t, true);
            addTimeout(function () {
                j.resize()
            }, 1000)
        },
        refreshStationInfo: function (q) {
            q.wirelessDeviceNum(f.getStatusInfo().wirelessDeviceNum);
            if (a % 10 == 2) {
                f.getAttachedCableDevices({}, function (r) {
                    q.wireDeviceNum(r.attachedDevices.length)
                })
            }
        },
        getUnit: function (q) {
            if (q == "1024") {
                return "GB"
            } else {
                if (q == "1048576") {
                    return "TB"
                } else {
                    return "MB"
                }
            }
        },
        refreshOpmodeInfo: function (w) {
            var u = f.getOpMode();
            w.isLoggedIn(u.loginfo == "ok");
            var t = checkCableMode(u.blc_wan_mode);
            if (w.opCurMode() && !t) {
                var s = f.getLoginData();
                var r = s.modem_main_state;
                if (r == "modem_sim_undetected" || r == "modem_undetected" || r == "modem_sim_destroy" || r == "modem_waitpin" || r == "modem_waitpuk" || r == "modem_imsi_waitnck") {
                    window.location.reload();
                    return
                }
            }
            w.opCurMode(t);
            if (t && u.ethwan_mode == "DHCP") {
                w.enableFlag(false)
            } else {
                if ((!t && u.ppp_status != "ppp_disconnected") || (t && u.rj45_state != "idle" && u.rj45_state != "dead")) {
                    w.enableFlag(true)
                } else {
                    w.enableFlag(false)
                }
            }
            var v = (u.blc_wan_mode == "AUTO_PPP" || u.blc_wan_mode == "AUTO_PPPOE") ? "AUTO" : u.blc_wan_mode;
            var q = "";
            switch (v) {
                case"AUTO":
                    q = "opmode_auto";
                    break;
                case"PPPOE":
                    q = "opmode_cable";
                    break;
                case"PPP":
                    q = "opmode_gateway";
                    break;
                default:
                    break
            }
            h("#opmode").attr("data-trans", q).text(h.i18n.prop(q));
            w.isShowHomeConnect(!t);
            w.showTraffic(k.TRAFFIC_SUPPORT && !t);
            w.isSupportQuicksetting(k.HAS_QUICK_SETTING && !t)
        }
    };

    function p() {
        var w = this;
        w.hasSms = k.HAS_SMS;
        w.hasPhonebook = k.HAS_PHONEBOOK;
        w.isSupportSD = k.SD_CARD_SUPPORT;
        var r = f.getExtraFunc();
        w.hasUssd = r.ussdEnable;
        w.isCPE = k.PRODUCT_TYPE == "CPE";
        w.hasRj45 = k.RJ45_SUPPORT;
        w.notDataCard = k.PRODUCT_TYPE != "DATACARD";
        w.hasParentalControl = k.HAS_PARENTAL_CONTROL;
        var t = f.getWifiBasic();
        if (k.WIFI_SUPPORT_QR_SWITCH) {
            w.showQRCode = k.WIFI_SUPPORT_QR_CODE && t.show_qrcode_flag
        } else {
            w.showQRCode = k.WIFI_SUPPORT_QR_CODE
        }
        if (k.WIFI_SUPPORT_QR_CODE) {
            w.qrcodeSrc = "./pic/qrcode_ssid_wifikey.png?_=" + h.now()
        } else {
            w.qrcodeSrc = "./pic/res_blacktrans.png"
        }
        if (w.hasRj45) {
            var q = checkCableMode(f.getOpMode().blc_wan_mode);
            w.opCurMode = e.observable(q);
            w.isShowHomeConnect = e.observable(!q);
            w.showTraffic = e.observable(k.TRAFFIC_SUPPORT && !q);
            w.isSupportQuicksetting = e.observable(k.HAS_QUICK_SETTING && !q)
        } else {
            w.isShowHomeConnect = e.observable(true);
            w.showTraffic = e.observable(k.TRAFFIC_SUPPORT);
            w.isSupportQuicksetting = e.observable(k.HAS_QUICK_SETTING)
        }
        if (k.PRODUCT_TYPE == "DATACARD") {
            h("#home_image").addClass("data-card")
        }
        var s = f.getConnectionInfo();
        w.networkType = e.observable(n.getNetworkType(s.networkType));
        w.connectStatus = e.observable(s.connectStatus);
        w.canConnect = e.observable(false);
        w.cStatus = e.computed(function () {
            if (w.connectStatus().indexOf("_connected") != -1) {
                return b.CONNECTED
            } else {
                if (w.connectStatus().indexOf("_disconnecting") != -1) {
                    return b.DISCONNECTING
                } else {
                    if (w.connectStatus().indexOf("_connecting") != -1) {
                        return b.CONNECTING
                    } else {
                        return b.DISCONNECTED
                    }
                }
            }
        });
        w.current_Flux = e.observable(transUnit(0, false));
        w.connected_Time = e.observable(transSecond2Time(0));
        w.up_Speed = e.observable(transUnit(0, true));
        w.down_Speed = e.observable(transUnit(0, true));
        w.isLoggedIn = e.observable(false);
        w.enableFlag = e.observable(true);
        w.simSerialNumber = e.observable("");
        w.iccid = e.observable("");
        w.rsrq = e.observable("");
        w.sinr = e.observable("");
        w.pci = e.observable("");
        w.imei = e.observable("");
        w.imsi = e.observable("");
        w.ssid = e.observable("");
        w.hasWifi = k.HAS_WIFI;
        w.showMultiSsid = e.observable(k.HAS_MULTI_SSID && t.multi_ssid_enable == "1");
        w.trafficAlertEnable = e.observable(false);
        w.trafficUsed = e.observable("");
        w.trafficLimited = e.observable("");
        w.wireDeviceNum = e.observable(f.getAttachedCableDevices().attachedDevices.length);
        w.wirelessDeviceNum = e.observable(f.getStatusInfo().wirelessDeviceNum);
        w.showOpModeWindow = function () {
            if (w.enableFlag()) {
                return
            }
            showSettingWindow("change_mode", "opmode_popup", "opmode_popup", 400, 300, function () {
            })
        };
        w.currentOpMode = e.observable("0");
        var u = false;
        h("#showDetailInfo").popover({
            html: true, placement: "top", trigger: "focus", title: function () {
                return h.i18n.prop("device_info")
            }, content: function () {
                return v()
            }
        }).on("shown.bs.popover", function () {
            u = true
        }).on("hidden.bs.popover", function () {
            u = false
        });

        function x() {
            var z = f.getDeviceInfo();
            w.simSerialNumber(verifyDeviceInfo(z.simSerialNumber));
            w.iccid(verifyDeviceInfo(z.iccid));
            w.imei(verifyDeviceInfo(z.imei));
            w.imsi(verifyDeviceInfo(z.imsi));
            w.rsrq(verifyDeviceInfo(z.rsrq));
            w.sinr(verifyDeviceInfo(z.sinr));
            w.pci(verifyDeviceInfo(z.pci));
            w.ssid(verifyDeviceInfo(z.ssid));
            w.showMultiSsid(k.HAS_MULTI_SSID && z.multi_ssid_enable == "1");
            return z
        }

        x();

        function y() {
            var z = f.getResideband();
            if (checkCableMode(f.getOpMode().blc_wan_mode) || z.reside_band == "band_invalid") {
                return "— —"
            } else {
                return z.reside_band
            }
        }

        function v() {
            var B = x();
            n.initShownStatus(B);
            var z = n.wanIpGet(B);
            var C = l.template(h("#detailInfoTmpl").html());
            var A = C({
                simSerialNumber: verifyDeviceInfo(B.simSerialNumber),
                iccid: verifyDeviceInfo(B.iccid),
                imei: verifyDeviceInfo(B.imei),
                imsi: verifyDeviceInfo(B.imsi),
                signal: signalFormat(B.signal),
                hasWifi: k.HAS_WIFI,
                isCPE: k.PRODUCT_TYPE == "CPE",
                hasRj45: k.RJ45_SUPPORT,
                showMultiSsid: k.HAS_MULTI_SSID && B.multi_ssid_enable == "1",
                ssid: verifyDeviceInfo(B.ssid),
                max_access_num: verifyDeviceInfo(B.max_access_num),
                m_ssid: verifyDeviceInfo(B.m_ssid),
                m_max_access_num: verifyDeviceInfo(B.m_max_access_num),
                wifi_long_mode: "wifi_des_" + B.wifiRange,
                lanDomain: verifyDeviceInfo(B.lanDomain),
                ipAddress: verifyDeviceInfo(B.ipAddress),
                showMacAddress: k.SHOW_MAC_ADDRESS,
                macAddress: verifyDeviceInfo(B.macAddress),
                showIpv4WanIpAddr: n.initStatus.showIpv4WanIpAddr,
                wanIpAddress: z.wanIpAddress,
                showIpv6WanIpAddr: n.initStatus.showIpv6WanIpAddr,
                ipv6WanIpAddress: z.ipv6WanIpAddress,
                sw_version: verifyDeviceInfo(B.sw_version),
                hw_version: verifyDeviceInfo(B.hw_version),
                rsrp: signalFormat(B.rsrp),
                rsrq: verifyRsrqSign(B.rsrq),
                rssi: signalFormat(B.rssi),
                sinr: verifyDeviceInfo(B.sinr),
                cellid: verifyDeviceInfo(B.cellid),
                pci: verifyDeviceInfo(B.pci),
                reside_band: y()
            });
            return h(A).translate()
        }

        w.connectHandler = function () {
            if (w.connectStatus() == "ppp_connected") {
                showLoading("disconnecting");
                f.disconnect({}, function (z) {
                    if (z.result) {
                        successOverlay()
                    } else {
                        errorOverlay()
                    }
                })
            } else {
                if (f.getStatusInfo().roamingStatus) {
                    showConfirm("dial_roaming_connect", function () {
                        w.connect()
                    })
                } else {
                    w.connect()
                }
            }
        };
        w.connect = function () {
            var A = f.getStatusInfo();
            var B = g.getTrafficResult(A);
            if (A.limitVolumeEnable && B.showConfirm) {
                var z = null;
                if (B.usedPercent > 100) {
                    z = {msg: "traffic_beyond_connect_msg"};
                    g.setTrafficAlertPopuped(true)
                } else {
                    z = {msg: "traffic_limit_connect_msg", params: [B.limitPercent]};
                    g.setTrafficAlert100Popuped(false)
                }
                showConfirm(z, function () {
                    n.doConnect()
                })
            } else {
                n.doConnect()
            }
        };
        f.getSignalStrength({}, function (A) {
            var z = signalFormat(convertSignal(A));
            h("#fresh_signal_strength").text(z);
            h("#fresh_rsrq_strength").text(A.rsrq);
            h("#fresh_sinr_strength").text(A.sinr);
            h("#fresh_pci_strength").text(A.pci);
            if (u) {
                h("#popoverSignalTxt").text(z)
            }
        });
        n.refreshHomeData(w);
        addInterval(function () {
            f.getSignalStrength({}, function (A) {
                var z = signalFormat(convertSignal(A));
                h("#fresh_signal_strength").text(z);
                h("#fresh_rsrq_strength").text(A.rsrq);
                h("#fresh_sinr_strength").text(A.sinr);
                h("#fresh_pci_strength").text(A.pci);
                if (u) {
                    h("#popoverSignalTxt").text(z)
                }
            });
            n.refreshHomeData(w)
        }, 1000);
        if (w.hasRj45) {
            n.refreshOpmodeInfo(w);
            addInterval(function () {
                n.refreshOpmodeInfo(w)
            }, 1000)
        }
        w.showNetworkSettingsWindow = function () {
            if (w.hasRj45) {
                f.getOpMode({}, function (z) {
                    var A = checkCableMode(z.blc_wan_mode);
                    if (A) {
                        window.location.hash = "#network_set"
                    } else {
                        window.location.hash = "#conn_set"
                    }
                })
            } else {
                window.location.hash = "#conn_set"
            }
        }
    }

    return {init: o}
});
define("language", "knockout service jquery set underscore".split(" "), function (j, f, d, c, g) {
    function a() {
        return f.getLanguage()
    }

    function b(k) {
        window.CURRENT_LANGUAGE = k;
        d("body").attr("lang", k);
        d.i18n.properties({
            name: "Messages",
            path: "i18n/",
            mode: "map",
            cache: true,
            language: k,
            callback: function () {
                jQuery.validator.messages = d.i18n.map;
                d("body").translate()
            }
        })
    }

    window.language = null;

    function e() {
        var m = this;
        var l = a();
        var k = g.map(c.LANGUAGES, function (n) {
            return new Option(n.name, n.value)
        });
        document.title = c.WEBUI_TITLE;
        if (d("#webui_title")[0]) {
            d("#webui_title").html(c.WEBUI_TITLE)
        }
        m.languages = j.observableArray(k);
        m.currentLan = j.observable(l.Language);
        window.language = m.currentLan();
        m.langChangeHandler = function (o, n) {
            clearValidateMsg();
            f.setLanguage({Language: m.currentLan()}, function () {
                b(m.currentLan());
                window.language = m.currentLan()
            })
        };
        b(m.currentLan())
    }

    function h() {
        j.applyBindings(new e(), d("#language")[0])
    }

    return {init: h}
});
define("entry", "jquery knockout set service underscore menu logout CryptoJS".split(" "), function (f, p, d, g, n, c, q, m) {
    var l = {LOGIN: 0, WAIT_PIN: 1, WAIT_PUK: 2, PUK_LOCKED: 3, LOGGEDIN: 4, LOADING: 5};
    var b = h();
    var e = 0;
    var k = "0";

    function j() {
        var y = this;
        var v = g.getLoginData();
        var t = g.getLoginStatus();
        y.confirmPIN = p.observable();
        y.leftSeconds = p.observable(0);
        y.loginCount = p.observable(0);
        y.loginSecuritySupport = p.observable(d.LOGIN_SECURITY_SUPPORT);
        y.newPIN = p.observable();
        y.password = p.observable();
        y.PIN = p.observable();
        y.pinNumber = p.observable(v.pinnumber);
        y.PUK = p.observable();
        y.pukNumber = p.observable(v.puknumber);
        y.showEntrance = p.observable(false);
        y.sharePathInvalid = p.observable(false);
        y.uiLoginTimer = p.observable(300);
        y.accountLocked = p.computed(function () {
            return y.loginCount() == d.MAX_LOGIN_COUNT && y.leftSeconds() != "-1"
        });
        y.leftUnlockTime = p.computed(function () {
            y.leftSeconds();
            var A = transSecond2Time(y.uiLoginTimer());
            return A.substring(A.indexOf(":") + 1, A.length)
        });
        if (d.SD_CARD_SUPPORT) {
            g.getSDConfiguration({}, function (A) {
                y.showEntrance(A.sd_status == "1" && A.share_status == "1" && A.sd_mode == "0");
                if (y.showEntrance()) {
                    g.checkFileExists({path: A.share_file}, function (B) {
                        if (B.status == "exist" || B.status == "processing") {
                            y.sharePathInvalid(false)
                        } else {
                            y.sharePathInvalid(true)
                        }
                    })
                }
            })
        }
        var r = s(t, v);
        y.pageState = p.observable(r);
        if (r == l.LOADING) {
            addTimeout(u, 500)
        }
        x();
        y.login = function () {
            if (d.LOGIN_SECURITY_SUPPORT && y.accountLocked()) {
                showAlert("password_error_account_lock_time", function () {
                    x()
                });
                return false
            }
            y.pageState(l.LOADING);
            window.clearInterval(b);
            var C = "";
            if (d.PASSWORD_ENCODE) {
                C = y.password()
            } else {
                var B = g.getDeviceInfoLow();
                var D = m.enc.Latin1.parse(B.skey);
                var A = m.enc.Latin1.parse(B.siv);
                C = m.AES.encrypt(y.password(), D, {iv: A, mode: m.mode.CBC, padding: m.pad.ZeroPadding}).toString()
            }
            g.login({password: C}, function (E) {
                setTimeout(function () {
                    b = h()
                }, 1300);
                if (E.result) {
                    y.pageState(l.LOGGEDIN);
                    if (d.LOGIN_SECURITY_SUPPORT) {
                        y.loginCount(0);
                        y.uiLoginTimer(300);
                        clearInterval(e)
                    }
                    f("#container").empty();
                    window.location.hash = "#main";
                    q.init()
                } else {
                    y.password("");
                    if (d.LOGIN_SECURITY_SUPPORT) {
                        y.checkLoginData(function () {
                            if (y.loginCount() == d.MAX_LOGIN_COUNT) {
                                showAlert("password_error_five_times", function () {
                                    x()
                                });
                                y.startLoginLockInterval()
                            } else {
                                showAlert({
                                    msg: "password_error_left",
                                    params: [d.MAX_LOGIN_COUNT - y.loginCount()]
                                }, function () {
                                    x()
                                })
                            }
                        })
                    } else {
                        showAlert("password_error", function () {
                            x()
                        })
                    }
                    y.pageState(l.LOGIN)
                }
            })
        };
        y.checkLoginData = function (A) {
            g.getLoginData({}, function (C) {
                var B = parseInt(C.psw_fail_num_str, 10);
                y.loginCount(d.MAX_LOGIN_COUNT - B);
                y.leftSeconds(C.login_lock_time);
                y.uiLoginTimer(C.login_lock_time);
                if (f.isFunction(A)) {
                    A()
                } else {
                    if (y.loginCount() == d.MAX_LOGIN_COUNT) {
                        y.startLoginLockInterval()
                    }
                }
            })
        };
        y.startLoginLockInterval = function () {
            e = setInterval(function () {
                g.getLoginData({}, function (A) {
                    if (A.login_lock_time <= 0 || A.psw_fail_num_str == 5) {
                        y.loginCount(0);
                        clearInterval(e)
                    }
                    if (y.leftSeconds() != A.login_lock_time) {
                        y.leftSeconds(A.login_lock_time);
                        y.uiLoginTimer(A.login_lock_time)
                    } else {
                        y.uiLoginTimer(y.uiLoginTimer() > 0 ? y.uiLoginTimer() - 1 : 0)
                    }
                })
            }, 1000)
        };
        y.checkLoginData();
        y.enterPIN = function () {
            y.pageState(l.LOADING);
            var A = y.PIN();
            g.enterPIN({PinNumber: A}, function (B) {
                if (!B.result) {
                    showAlert("pin_error", function () {
                        u()
                    });
                    y.PIN("")
                } else {
                    u()
                }
            })
        };

        function x() {
            setTimeout(function () {
                var A = f("#txtAdmin:visible");
                var B = f("#txtPIN:visible");
                var C = f("#txtPUK:visible");
                if (A.length > 0) {
                    A.focus()
                } else {
                    if (B.length > 0) {
                        B.focus()
                    } else {
                        if (C.length > 0) {
                            C.focus()
                        }
                    }
                }
            }, 100)
        }

        function u() {
            var C = g.getLoginData();
            var A = g.getLoginStatus();
            var B = s(A, C);
            if (B == l.LOADING) {
                addTimeout(u, 500)
            } else {
                y.pageState(B);
                y.pinNumber(C.pinnumber);
                y.pukNumber(C.puknumber)
            }
            x()
        }

        y.enterPUK = function () {
            y.pageState(l.LOADING);
            var C = y.newPIN();
            var A = y.confirmPIN();
            var B = {};
            B.PinNumber = C;
            B.PUKNumber = y.PUK();
            g.enterPUK(B, function (D) {
                if (!D.result) {
                    showAlert("puk_error", function () {
                        u()
                    });
                    y.PUK("");
                    y.newPIN("");
                    y.confirmPIN("")
                } else {
                    u()
                }
            })
        };

        function z(A, C) {
            if (A.status == "loggedIn") {
                var B = C.modem_main_state;
                if (B == "modem_waitpin") {
                    return l.WAIT_PIN
                } else {
                    if ((B == "modem_waitpuk" || C.pinnumber == 0) && (C.puknumber != 0)) {
                        return l.WAIT_PUK
                    } else {
                        if ((C.puknumber == 0 || B == "modem_sim_destroy") && B != "modem_sim_undetected" && B != "modem_undetected") {
                            return l.PUK_LOCKED
                        } else {
                            return l.LOGGEDIN
                        }
                    }
                }
            } else {
                var B = C.modem_main_state;
                if (f.inArray(B, d.TEMPORARY_MODEM_MAIN_STATE) != -1) {
                    return l.LOADING
                } else {
                    return l.LOGIN
                }
            }
        }

        function s(A, B) {
            if (d.LOGIN_THEN_CHECK_PIN) {
                return z(A, B)
            } else {
                return w(A, B)
            }
        }

        function w(A, C) {
            if (A.status == "loggedIn") {
                return l.LOGGEDIN
            } else {
                var B = C.modem_main_state;
                if (f.inArray(B, d.TEMPORARY_MODEM_MAIN_STATE) != -1) {
                    return l.LOADING
                } else {
                    if (B == "modem_waitpin") {
                        return l.WAIT_PIN
                    } else {
                        if ((B == "modem_waitpuk" || parseInt(C.pinnumber) === 0) && (parseInt(C.puknumber) != 0)) {
                            return l.WAIT_PUK
                        } else {
                            if ((parseInt(C.puknumber) === 0 || B == "modem_sim_destroy") && B != "modem_sim_undetected" && B != "modem_undetected") {
                                return l.PUK_LOCKED
                            } else {
                                return l.LOGIN
                            }
                        }
                    }
                }
            }
        }
    }

    function a() {
        if (window.location.hash != d.defaultRoute && n.indexOf(d.GUEST_HASH, window.location.hash) == -1) {
            if (!manualLogout && k == "1") {
                manualLogout = false;
                k = "UNREAL";
                showAlert("need_login_again", function () {
                    window.location = "index.html"
                })
            } else {
                if (k == "UNREAL") {
                    return
                } else {
                    window.location = "index.html"
                }
            }
        }
    }

    function h() {
        return setInterval(function () {
            var r = g.getStatusInfo();
            if (!r.isLoggedIn) {
                a();
                return
            }
            k = g.getStatusInfo().isLoggedIn ? "1" : "0"
        }, 1000)
    }

    function o() {
        var t = g.getStatusInfo();
        if (t.isLoggedIn) {
            window.location.hash = "#main";
            return
        }
        var r = f("#container")[0];
        p.cleanNode(r);
        var s = new j();
        p.applyBindings(s, r);
        f("#frmLogin").validate({
            submitHandler: function () {
                s.login()
            }, rules: {txtAdmin: "login_password_length_check"}
        });
        f("#frmPIN").validate({
            submitHandler: function () {
                s.enterPIN()
            }, rules: {txtPIN: "pin_check"}
        });
        f("#frmPUK").validate({
            submitHandler: function () {
                s.enterPUK()
            }, rules: {txtNewPIN: "pin_check", txtConfirmPIN: {equalToPin: "#txtNewPIN"}, txtPUK: "puk_check"}
        })
    }

    return {init: o, gotoLogin: a}
});
define("logout", "set service knockout underscore jquery".split(" "), function (b, f, j, g, d) {
    function c() {
        var l = this;
        var k = function () {
            var m = f.getLoginStatus();
            return (m.status == "loggedIn")
        }();
        l.loggedIn = j.observable(k);
        l.logout = function () {
            showConfirm("confirm_logout", function () {
                manualLogout = true;
                f.logout({}, a())
            })
        };
        l.showLogout = function () {
            if (b.HAS_LOGIN) {
                return l.loggedIn()
            } else {
                return false
            }
        }
    }

    function a() {
        window.location = "index.html"
    }

    function e() {
        var k = new c();
        h(k)
    }

    function h(l) {
        var k = d("#logout")[0];
        j.cleanNode(k);
        j.applyBindings(l, k)
    }

    return {init: e}
});
define("opmode", "knockout service jquery set underscore".split(" "), function (d, a, f, c, b) {
    function e() {
        var h = this;
        h.isLoggedIn = d.observable(false);
        h.enableFlag = d.observable(false);
        h.showOpModeWindow = function () {
            showSettingWindow("change_mode", "opmode_popup", "opmode_popup", 400, 300, function () {
            })
        };
        h.currentOpMode = d.observable("0");
        a.getOpMode({}, function (l) {
            h.isLoggedIn(l.loginfo == "ok");
            if (l.opms_wan_mode != "PPP" && l.rj45_state != "idle" && l.rj45_state != "dead") {
                h.enableFlag(false)
            } else {
                if (l.opms_wan_mode == "PPP" && l.ppp_status != "ppp_disconnected") {
                    h.enableFlag(false)
                } else {
                    if (l.opms_wan_mode == "DHCP") {
                        h.enableFlag(true)
                    } else {
                        h.enableFlag(true)
                    }
                }
            }
            var k = (l.opms_wan_mode == "DHCP" || l.opms_wan_mode == "STATIC") ? "PPPOE" : l.opms_wan_mode;
            var j = "";
            switch (k) {
                case"BRIDGE":
                    j = "opmode_bridge";
                    break;
                case"PPP":
                    j = "opmode_gateway";
                    break;
                case"PPPOE":
                    j = "opmode_cable";
                    break;
                default:
                    break
            }
            f("#opmode").attr("data-trans", j).text(f.i18n.prop(j))
        });
        setInterval(function () {
            var j = a.getConnectionInfo();
            if (j.opms_wan_mode == "DHCP") {
                h.enableFlag(true)
            } else {
                if ((j.opms_wan_mode == "PPP" && j.ppp_status != "ppp_disconnected") || (j.opms_wan_mode != "PPP" && j.rj45_state != "idle" && j.rj45_state != "dead")) {
                    h.enableFlag(false)
                } else {
                    h.enableFlag(true)
                }
            }
        }, 1000)
    }

    function g() {
        var h = f("#currentOpMode")[0];
        d.cleanNode(h);
        var j = new e();
        d.applyBindings(j, h)
    }

    return {init: g}
});
define("opmode_popup", "knockout service jquery set underscore".split(" "), function (d, a, f, c, b) {
    function e() {
        var j = this;
        var h = "";
        j.selectedMode = d.observable("0");
        a.getOpMode({}, function (k) {
            if (k.blc_wan_mode == "AUTO_PPP") {
                h = "AUTO"
            } else {
                if (k.blc_wan_mode == "AUTO_PPPOE") {
                    h = "AUTO"
                } else {
                    if (k.blc_wan_mode == "PPPOE") {
                        h = "PPPOE"
                    } else {
                        h = k.blc_wan_mode
                    }
                }
            }
            j.selectedMode(h)
        });
        j.changeOpMode = function () {
            var k = f('input:radio[name="opMode"]:checked').val();
            var l = "";
            if (k == h) {
                hidePopupSettingWindow();
                return
            }
            if (k == "LTE_BRIDGE") {
                l = "opmode_msg3"
            } else {
                l = "opmode_msg2"
            }
            showConfirm(l, function () {
                showLoading();
                a.SetOperationMode({opMode: k}, function (n) {
                    if (n && n.result == "success") {
                        var m = "";
                        switch (k) {
                            case"AUTO":
                                m = "opmode_auto";
                                break;
                            case"PPP":
                                m = "opmode_gateway";
                                break;
                            case"PPPOE":
                                m = "opmode_cable";
                                break;
                            default:
                                break
                        }
                        f("#opmode").attr("data-trans", m).text(f.i18n.prop(m));
                        successOverlay()
                    } else {
                        errorOverlay()
                    }
                })
            })
        }
    }

    function g() {
        var h = new e();
        d.applyBindings(h, f("#popupSettingWindow")[0]);
        f("#opmode_form").validate({
            submitHandler: function () {
                h.changeOpMode()
            }
        })
    }

    return {init: g}
});
define("router", "underscore jquery menu set service".split(" "), function (j, f, b, c, g) {
    var e = "";
    var a = f("#container");
    checkFormContentModify = function (o) {
        if (c.CONTENT_MODIFIED.modified && window.location.hash != o) {
            if (c.CONTENT_MODIFIED.message == "sms_to_save_draft") {
                c.CONTENT_MODIFIED.callback.ok(c.CONTENT_MODIFIED.data);
                c.resetContentModifyValue();
                window.location.hash = o
            } else {
                showConfirm(c.CONTENT_MODIFIED.message, {
                    ok: function () {
                        c.CONTENT_MODIFIED.callback.ok(c.CONTENT_MODIFIED.data);
                        c.resetContentModifyValue();
                        window.location.hash = o
                    }, no: function () {
                        var p = c.CONTENT_MODIFIED.callback.no(c.CONTENT_MODIFIED.data);
                        if (!p) {
                            window.location.hash = o;
                            c.resetContentModifyValue()
                        }
                    }
                })
            }
            return false
        } else {
            return true
        }
    };

    function n() {
        setInterval(function () {
            var t = g.getStatusInfo();
            var o = b.findMenu();
            if (o.length == 0) {
                return false
            }
            var s = ["phonebook", "sms_list"];
            var p = (f.inArray(o[0].path, s) != -1);
            if (o[0].checkSIMStatus === true) {
                var r = t.simStatus == "modem_sim_undetected" || t.simStatus == "modem_sim_destroy" || t.simStatus == "modem_waitpin" || t.simStatus == "modem_waitpuk";
                var q = t.simStatus == "modem_imsi_waitnck";
                if (t.isLoggedIn && ((f("#div-nosimcard")[0] == undefined && r) || (f("#div-network-lock")[0] == undefined && q) || ((f("#div-nosimcard")[0] != undefined || f("#div-network-lock")[0] != undefined) && t.simStatus == "modem_init_complete"))) {
                    d(o[0], t.simStatus, p)
                }
            }
        }, 1000)
    }

    function m() {
        var p = window.location.hash;
        if (p == "#entry" || j.indexOf(c.GUEST_HASH, p) != -1) {
            f("#manageContainer").attr("style", "margin-top:-36px;")
        } else {
            f("#manageContainer").attr("style", "margin-top:0px;")
        }
        if (window.location.hash == "#entry") {
            f("#mainContainer").addClass("loginBackgroundBlue")
        } else {
            var o = f("#mainContainer");
            if (o.hasClass("loginBackgroundBlue")) {
                f("#container").css({margin: 0});
                o.removeClass("loginBackgroundBlue").height("auto")
            }
        }
    }

    function d(q, o, p) {
        var r = {};
        f.extend(r, q);
        if (o == "modem_sim_undetected" || o == "modem_sim_destroy") {
            if (!p) {
                r.path = "sim_abnormal"
            }
        } else {
            if (o == "modem_waitpin" || o == "modem_waitpuk") {
                r.path = "sim_abnormal"
            } else {
                if (o == "modem_imsi_waitnck") {
                    r.path = "locknet"
                }
            }
        }
        l(r)
    }

    function l(q) {
        var p = q.path.replace(/\//g, "_");
        var r = f("body").removeClass();
        if (p != "entry" && p != "main") {
            r.addClass("beautiful_bg page_" + p)
        } else {
            r.addClass("page_" + p)
        }
        clearTimer();
        hideLoading();
        var o = "text!tmpl/" + q.path + ".html";
        require([o, q.path], function (s, t) {
            a.stop(true, true);
            a.hide();
            a.html(s);
            t.init();
            b.refreshMenu();
            f("#container").translate();
            b.activeSubMenu();
            f("form").attr("autocomplete", "off");
            a.fadeIn()
        })
    }

    function h() {
        if (window.location.hash != e) {
            var t = g.getStatusInfo();
            if (window.location.hash == c.defaultRoute || j.indexOf(c.GUEST_HASH, window.location.hash) != -1) {
                if (t.isLoggedIn) {
                    window.location.hash = e == "" ? "#main" : e;
                    return
                }
            }
            var q = b.findMenu();
            if (q.length == 0) {
                window.location.hash = c.defaultRoute
            } else {
                if (c.RJ45_SUPPORT && window.location.hash == "#main") {
                    if ((q[0].checkSIMStatus && checkCableMode(t.blc_wan_mode)) || (!q[0].checkSIMStatus && !checkCableMode(t.blc_wan_mode))) {
                        window.location.reload();
                        return
                    }
                }
                var o = b.findMenu(e);
                e = q[0].hash;
                if (e == "#entry") {
                    f("#indexContainer").addClass("login-page-bg");
                    b.rebuild()
                } else {
                    f("#indexContainer").removeClass("login-page-bg")
                }
                if (o.length != 0 && q[0].path == o[0].path && q[0].level != o[0].level && q[0].level != "1" && o[0].level != "1") {
                    return
                }
                m();
                var s = ["phonebook", "sms_list"];
                var r = (f.inArray(q[0].path, s) != -1);
                if (q[0].checkSIMStatus === true || r) {
                    if (t.simStatus == undefined) {
                        showLoading("waiting");

                        function p() {
                            var u = g.getStatusInfo();
                            if (u.simStatus == undefined || f.inArray(u.simStatus, c.TEMPORARY_MODEM_MAIN_STATE) != -1) {
                                addTimeout(p, 500)
                            } else {
                                d(q[0], u.simStatus, r);
                                hideLoading()
                            }
                        }

                        p()
                    } else {
                        d(q[0], t.simStatus, r)
                    }
                } else {
                    l(q[0])
                }
            }
        }
    }

    function k() {
        n();
        window.location.hash = window.location.hash || "#main";
        if (("onhashchange" in window) && ((typeof document.documentMode === "undefined") || document.documentMode == 8)) {
            window.onhashchange = h;
            h()
        } else {
            setInterval(h, 200)
        }
        f("a[href^='#']").die("click").live("click", function () {
            var o = f(this);
            c.CONTENT_MODIFIED.checkChangMethod();
            return checkFormContentModify(o.attr("href"))
        })
    }

    return {init: k}
});
define("statusBar", "knockout jquery underscore service set menu tooltip".split(" "), function (V, G, ac, g, L, W, I) {
    var h = false;
    var s = false;
    var z = false;
    var q = null;
    var T = 0;
    var c = [];
    var X = false;
    var w = true;
    var S = true;
    var Y = {};
    var H = null;
    var x = false;
    var K = null;
    var O = null;
    var l = false;
    var u = false;
    var U = 0;
    var J = function () {
        return g.getStatusInfo()
    };

    function M() {
        var ai = this;
        var ah = J();
        var ae = ah.roamingStatus ? true : false;
        var ag = G("#langLogoBar");

        function ad() {
            showLoading("connecting");
            g.connect({}, function (aj) {
                if (aj.result) {
                    refreshWifiConnectStatus(ai, aj.status)
                }
                successOverlay()
            }, function (aj) {
                errorOverlay()
            })
        }

        function af() {
            showLoading("disconnecting");
            g.disconnect({}, function (aj) {
                if (aj.result) {
                    refreshWifiConnectStatus(ai, aj.status)
                }
                successOverlay()
            }, function (aj) {
                errorOverlay()
            })
        }

        if (ah.isLoggedIn) {
            if (!ag.hasClass("langborderBg")) {
                ag.addClass("langborderBg")
            }
            G("#statusBar:hidden").show()
        } else {
            if (ag.hasClass("langborderBg")) {
                ag.removeClass("langborderBg")
            }
            G("#statusBar:visible").hide()
        }
        ai.batteryLevel = V.observable(ah.batteryLevel + "%");
        ai.batteryPers = V.observable(n(ah.batteryPers, ah.batteryStatus, ah.batteryShow));
        ai.batteryStatus = V.observable(ah.batteryStatus);
        ai.connectionCssClass = V.observable("");
        ai.connectStatus = V.observable(ah.connectStatus);
        ai.connectStatusText = V.observable();
        ai.connectStatusTrans = V.observable();
        ai.hasWifi = V.observable(L.HAS_WIFI);
        ai.isLoggedIn = V.observable(ah.isLoggedIn);
        ai.isShowConnectionIcon = V.observable(false);
        ai.isShowFotaNewversionIcon = V.observable(ah.new_version_state && ah.fota_package_already_download != "yes" && !L.isShowFotaIcon);
        ai.isShowRj45ConnectionIcon = V.observable(false);
        ai.networkOperator = V.observable(o(ah.spn_b1_flag, ah.spn_name_data, ah.spn_b2_flag, ah.networkOperator, ae));
        ai.networkType = V.observable(getNetworkType(ah.networkType));
        ai.pinStatus = V.observable(ah.pinStatus);
        ai.pinStatusText = V.observable();
        ai.rj45ConnectionCssClass = V.observable("");
        ai.roamingStatus = V.observable(ah.roamingStatus ? "R" : "");
        ai.showAttachedDevices = V.observable(ah.wifiStatus);
        ai.showSmsDeleteConfirm = V.observable(false);
        ai.smsUnreadCount = V.observable(0);
        ai.simStatus = V.observable(D(ah.simStatus));
        ai.signalCssClass = V.observable(F(ah.signalImg, ah.networkType, ah.simStatus));
        ai.updateType = V.observable(g.getUpdateType().update_type);
        ai.wifiStatusCssClass = V.observable(m(ah.wifiStatus, ah.wirelessDeviceNum));
        ai.wifiStatusImg = V.observable(e(ah.wifiStatus, ah.wirelessDeviceNum));
        k(ai, ah.connectStatus, ah.data_counter, ah.connectWifiSSID, ah.connectWifiStatus, ah.rj45ConnectStatus);
        ai.connect = ad;
        ai.disconnect = af
    }

    function aa() {
        var ad = "#msg_main";
        if (window.location.hash == "#msg_main") {
            ad = "#msg_list"
        }
        L.CONTENT_MODIFIED.checkChangMethod();
        if (checkFormContentModify(ad)) {
            window.location.hash = ad
        }
    }

    gotoSmsList = aa;

    function o(ah, ad, ag, af, ae) {
        if (ad == "") {
            return af
        } else {
            ad = decodeMessage(ad);
            if (ah == "0" && ag == "0") {
                if (ae) {
                    return ad == af ? af : (ad + "  " + af)
                } else {
                    return ad
                }
            } else {
                if (ah == "1" && ag == "1") {
                    if (ae) {
                        return af
                    } else {
                        return ad == af ? af : (ad + "  " + af)
                    }
                } else {
                    if (ah == "1") {
                        return ad == af ? af : (ad + "  " + af)
                    } else {
                        if (ag == "1") {
                            if (ae) {
                                return af
                            } else {
                                return ad
                            }
                        }
                    }
                }
            }
            return ""
        }
    }

    function y(au, ak, an) {
        L.smsMaxId = au.id;
        var af = G.now();
        Y["m" + af] = af;
        var av = au.number;
        if (w && L.phonebook && L.phonebook.length == 0) {
            w = false;
            if (L.HAS_PHONEBOOK) {
                Z()
            } else {
                L.phonebook = []
            }
        }
        for (ap in L.phonebook) {
            if (getLastNumber(L.phonebook[ap].pbm_number, L.SMS_MATCH_LENGTH) == getLastNumber(au.number, L.SMS_MATCH_LENGTH)) {
                av = L.phonebook[ap].pbm_name;
                break
            }
        }
        var ai = {
            mark: "m" + af,
            name: av,
            title: G.i18n.prop("sms"),
            titleTrans: "sms",
            tag: au.tag,
            content: au.content,
            datetime: au.time
        };
        if (H == null) {
            H = G.template("newMessagePopTmpl", G("#newMessagePopTmpl"))
        }
        G(".bubbleItem:not(.report)", "#buttom-bubble").remove();
        G.tmpl("newMessagePopTmpl", ai).appendTo("#buttom-bubble");
        if ((window.location.hash == "#msg_main" || window.location.hash == "#msg_list") && an == "1") {
            var ag = L.currentChatObject && L.currentChatObject == getLastNumber(au.number, L.SMS_MATCH_LENGTH);
            var ao = getLastNumber(au.number, L.SMS_MATCH_LENGTH);
            var at = G("#smslist-item-" + ao);
            if (at && at.length > 0) {
                for (var ap = 0; L.listMsgs && ap < L.listMsgs.length; ap++) {
                    if (getLastNumber(L.listMsgs[ap].number, L.SMS_MATCH_LENGTH) == getLastNumber(au.number, L.SMS_MATCH_LENGTH)) {
                        L.listMsgs[ap].id = au.id;
                        L.listMsgs[ap].latestId = au.id;
                        L.listMsgs[ap].latestSms = au.content;
                        L.listMsgs[ap].latestTime = au.time;
                        if (!ak) {
                            L.listMsgs[ap].newCount++;
                            L.listMsgs[ap].totalCount++
                        }
                        break
                    }
                }
                at.find(".smslist-item-checkbox p.checkbox").attr("id", au.id);
                at.find(".smslist-item-checkbox input:checkbox").val(au.id).attr("id", "checkbox" + au.id);
                if (!ak) {
                    var ah = at.find(".smslist-item-total-count").text();
                    ah = Number(ah.substring(1, ah.length - 1));
                    at.find(".smslist-item-total-count").text("(" + (ah + 1) + ")");
                    if (!L.currentChatObject || L.currentChatObject != getLastNumber(au.number, L.SMS_MATCH_LENGTH)) {
                        var aj = at.find(".smslist-item-new-count").removeClass("hide");
                        if (aj && aj.text().length > 0) {
                            aj.text(Number(aj.text()) + 1)
                        } else {
                            aj.text(1)
                        }
                    }
                }
                if (at.find(".smslist-item-draft-flag").length > 0) {
                    if (L.currentChatObject && L.currentChatObject == getLastNumber(au.number, L.SMS_MATCH_LENGTH)) {
                        at.find(" td:nth-child(2)").removeClass("font-weight-bold")
                    } else {
                        at.find(" td:nth-child(2)").addClass("font-weight-bold")
                    }
                } else {
                    var ae = at.find(".smslist-item-msg").text(au.content);
                    ae.closest("td").prop("title", au.content);
                    at.find("span.clock-time").text(au.time);
                    if (L.currentChatObject && L.currentChatObject == getLastNumber(au.number, L.SMS_MATCH_LENGTH)) {
                        ae.closest("tr").removeClass("font-weight-bold")
                    } else {
                        ae.closest("tr").addClass("font-weight-bold")
                    }
                }
                at.find(".smslist-item-repeat span").die().click(function () {
                    forwardClickHandler(au.id)
                });
                var ar = at;
                at.hide().remove();
                G("#smslist-table").prepend(ar.show())
            } else {
                var al = "";
                if (L.phonebook && L.phonebook.length > 0) {
                    for (ap in L.phonebook) {
                        if (getLastNumber(L.phonebook[ap].pbm_number, L.SMS_MATCH_LENGTH) == getLastNumber(au.number, L.SMS_MATCH_LENGTH)) {
                            al = L.phonebook[ap].pbm_name;
                            break
                        }
                    }
                }
                var aq = {
                    id: au.id,
                    name: al,
                    number: au.number,
                    latestId: au.id,
                    totalCount: 1,
                    newCount: ag ? 0 : 1,
                    latestSms: au.content,
                    latestTime: au.time,
                    checked: false,
                    hasDraft: false,
                    itemId: getLastNumber(au.number, L.SMS_MATCH_LENGTH)
                };
                if (O == null) {
                    O = G.template("smsTableTmpl", G("#smsTableTmpl"))
                }
                G.tmpl("smsTableTmpl", {data: [aq]}).prependTo("#smslist-table")
            }
            if (L.HAS_PHONEBOOK) {
                G(".sms-add-contact-icon").removeClass("hide")
            } else {
                G(".sms-add-contact-icon").addClass("hide")
            }
            if (ag) {
                var ad = G("#talk-item-" + au.id, "#chatlist");
                if (ad && ad.length > 0) {
                    G(".J_content pre", ad).html(dealContent(au.content));
                    G(".time .smslist-item-time", ad).text(au.time);
                    G(".smslist-item-repeat", ad).die().click(function () {
                        forwardClickHandler(au.id)
                    });
                    G(".smslist-item-delete", ad).die().click(function () {
                        deleteSingleItemClickHandler(au.id)
                    })
                } else {
                    G("#smsOtherTmpl").tmpl(au).appendTo("#chatlist");
                    G(".clear-container", "#chatpanel").animate({scrollTop: G("#chatlist").height()})
                }
                if (!L.SMS_SET_READ_WHEN_COMPLETE) {
                    g.setSmsRead({ids: [au.id]}, G.noop)
                } else {
                    if (L.SMS_SET_READ_WHEN_COMPLETE && au.receivedAll) {
                        g.setSmsRead({ids: [au.id]}, G.noop)
                    }
                }
            }
            enableCheckbox(G("#smslist-checkAll"))
        }
        if (window.location.hash == "#msg_sim" && an == "0") {
            var al = "";
            if (L.phonebook && L.phonebook.length > 0) {
                for (ap in L.phonebook) {
                    if (getLastNumber(L.phonebook[ap].pbm_number, L.SMS_MATCH_LENGTH) == getLastNumber(au.number, L.SMS_MATCH_LENGTH)) {
                        al = L.phonebook[ap].pbm_name;
                        break
                    }
                }
            }
            var aq = {
                id: au.id,
                name: al,
                number: au.number,
                content: au.content,
                time: au.time,
                tag: au.tag,
                checked: false,
                itemId: getLastNumber(au.number, L.SMS_MATCH_LENGTH)
            };
            if (ak) {
                var am = G(".simMsgList-item-class-" + aq.id);
                am.hide().remove()
            }
            if (K == null) {
                K = G.template("ssimMessageListTemplate", G("#simMessageListTemplate"))
            }
            G.tmpl("simMessageListTemplate", {data: [aq]}).prependTo("#simMsgList_container")
        }
    }

    function a() {
        var ad = g.getCurrentUpgradeState();
        if (ad.current_upgrade_state == "low_battery") {
            showInfo("ota_low_battery");
            clearInterval(T)
        }
    }

    function D(ad) {
        var ae;
        switch (ad) {
            case"modem_destroy":
                ae = "./pic/simcard_undetected.png";
                break;
            case"modem_imsi_waitnck":
                ae = "./pic/simcard_undetected.png";
                break;
            case"modem_init_complete":
                ae = "./pic/simcard_detected.png";
                break;
            case"modem_sim_destroy":
                ae = "./pic/simcard_undetected.png";
                break;
            case"modem_sim_undetected":
                ae = "./pic/simcard_undetected.png";
                break;
            case"modem_undetected":
                ae = "./pic/simcard_undetected.png";
                break;
            case"modem_waitpin":
                ae = "./pic/simcard_undetected.png";
                break;
            case"modem_waitpuk":
                ae = "./pic/simcard_undetected.png";
                break;
            default:
                ae = "./pic/simcard_detected.png";
                break
        }
        return ae
    }

    function B(ad, ae) {
        setTimeout(function () {
            var ag = G("#chosenUserSelect");
            var ah = G("option", ag);
            for (var af = 0; af < ah.length; af++) {
                if (getLastNumber(ae, L.SMS_MATCH_LENGTH) == ah[af].value) {
                    ah[af].text = ad + "/" + ae;
                    ah[af].value = ae;
                    break
                }
            }
            ag.trigger("liszt:updated")
        }, 0)
    }

    function t(ad) {
        if (G.isArray(ad.pbm_data) && ad.pbm_data.length > 0) {
            L.phonebook = ad.pbm_data
        }
    }

    function j(ad, ae) {
        if (!L.dbMsgs) {
            L.dbMsgs = []
        }
        if (c.length == 0) {
            G.each(L.dbMsgs, function (af, ag) {
                c.push(ag.id)
            })
        }
        G.each(ad, function (af, ah) {
            if (G.inArray(ah.id, c) == -1) {
                c.push(ah.id);
                L.dbMsgs.push(ah);
                if (ah.tag == "1") {
                    y(ah, false, ae)
                }
            } else {
                for (var ag = 0; ag < L.dbMsgs.length; ag++) {
                    if (L.dbMsgs[ag].id == ah.id && L.dbMsgs[ag].content != ah.content && ah.tag == "1") {
                        L.dbMsgs[ag].content = ah.content;
                        y(ah, true, ae);
                        break
                    }
                }
            }
        })
    }

    function n(ag, ad, ae) {
        var af = null;
        if (ae == "0") {
            G("#batteryCharging").css("display", "none")
        } else {
            G("#batteryCharging").css("display", "inline");
            if ("0" == ad) {
                if ("1" == ag) {
                    af = "pic/power_one.png"
                } else {
                    if ("2" == ag) {
                        af = "pic/power_two.png"
                    } else {
                        if ("3" == ag) {
                            af = "pic/power_three.png"
                        } else {
                            if ("4" == ag) {
                                af = "pic/power_full.png"
                            } else {
                                af = "pic/power_out.png"
                            }
                        }
                    }
                }
            } else {
                af = "pic/power_charging.gif"
            }
        }
        return af
    }

    function k(ae, ad, ak, af, aj, ai) {
        var ah = "icon_connection ";
        var ag = "icon_connection ";
        if (ai == "connect") {
            ah += "connecting"
        } else {
            if (ai == "working") {
                ah += "rj45_connected"
            } else {
                ah += "disconnect"
            }
        }
        if (ad == "ppp_connecting" || ad == "wifi_connecting") {
            ag += "connecting"
        } else {
            if (ad == "ppp_connected") {
                if (ak.uploadRate != "0" && ak.downloadRate != "0") {
                    ag += "connectionBoth"
                } else {
                    if (ak.uploadRate != "0" && ak.downloadRate == "0") {
                        ag += "connectionUp"
                    } else {
                        if (ak.uploadRate == "0" && ak.downloadRate != "0") {
                            ag += "connectionDown"
                        } else {
                            ag += "connectionNone"
                        }
                    }
                }
            } else {
                if (ad == "ppp_disconnected") {
                    if (af && aj == "connect") {
                        g.getHotspotList({}, function (ap) {
                            var ao = "icon_connection ";
                            var am = "connecting ";
                            for (var an = 0, al = ap.hotspotList.length; an < al; an++) {
                                if (ap.hotspotList[an].connectStatus == "1") {
                                    am = "wifi_connected";
                                    break
                                }
                            }
                            ao += am;
                            ae.connectionCssClass(ao)
                        });
                        ae.rj45ConnectionCssClass(ah);
                        return
                    } else {
                        if (af && (aj == "connecting" || aj == "dhcping")) {
                            ag += "connecting"
                        } else {
                            ag += "disconnect"
                        }
                    }
                } else {
                    ag += "disconnect"
                }
            }
        }
        ae.connectionCssClass(ag);
        ae.rj45ConnectionCssClass(ah)
    }

    function Z() {
        var ad = g.getPhoneBooks({page: 0, data_per_page: 2000, orderBy: "id", isAsc: false});
        t(ad)
    }

    function F(af, ae, ad) {
        ae = ae.toLowerCase();
        ad = ad ? ad.toLowerCase() : "";
        if (ae == "" || ae == "limited_service" || ae == "no_service" || ae == "limited service" || ae == "no service" || ad != "modem_init_complete") {
            af = "_none"
        }
        return "signal signal" + af
    }

    function m(ad, ae) {
        if (ad) {
            if (ae == 0) {
                return "wifi_status0"
            } else {
                return "wifi_status" + ae
            }
        } else {
            return "wifi_status_off"
        }
    }

    function e(ad, ae) {
        if (ad) {
            if (ae == 0) {
                return "./pic/wlan0.png"
            } else {
                return "./pic/wlan" + ae + ".png"
            }
        } else {
            return "./pic/wlan_off.png"
        }
    }

    function Q() {
        g.getPackSizeInfo({}, function (ae) {
            var ad;
            if (parseInt(ae.fota_pkg_total_size) == 0) {
                ad = 0
            } else {
                ad = parseInt(parseInt(ae.fota_dl_pkg_size) * 100 / parseInt(ae.fota_pkg_total_size))
            }
            if (ad > 100) {
                ad = 100
            }
            if (ad >= 0) {
                if (ad > 95) {
                    showProgressBar("ota_update", "<br/>" + G.i18n.prop("ota_update_warning"))
                }
                setProgressBar(ad)
            }
        })
    }

    function A() {
        if (w && L.phonebook && L.phonebook.length == 0) {
            w = false;
            if (L.HAS_PHONEBOOK) {
                Z()
            } else {
                L.phonebook = []
            }
        }
        g.getSMSDeliveryReport({page: 0, smsCount: 10}, function (af) {
            var ae = af.messages;
            var ad = [];
            G.each(ae, function (ag, ah) {
                if (G.inArray(ah.number, ad) == -1) {
                    ad.push(ah.number);
                    window.setTimeout(function () {
                        var ai = G.now();
                        Y["m" + ai] = ai;
                        ah.name = ah.number;
                        for (ag in L.phonebook) {
                            if (getLastNumber(L.phonebook[ag].pbm_number, L.SMS_MATCH_LENGTH) == getLastNumber(ah.number, L.SMS_MATCH_LENGTH)) {
                                ah.name = L.phonebook[ag].pbm_name;
                                break
                            }
                        }
                        var aj = G.i18n.prop("sms_delivery_report_" + ah.content);
                        var ak = {
                            mark: "m" + ai,
                            name: ah.name,
                            title: G.i18n.prop("sms_report"),
                            titleTrans: "sms_report",
                            content: aj,
                            datetime: ah.time,
                            report: "report"
                        };
                        if (H == null) {
                            H = G.template("newMessagePopTmpl", G("#newMessagePopTmpl"))
                        }
                        G(".report", "#buttom-bubble").remove();
                        G.tmpl("newMessagePopTmpl", ak).appendTo("#buttom-bubble")
                    }, 100)
                }
            })
        }, function () {
        })
    }

    function N(ad) {
        return ad == "modem_sim_undetected" || ad == "modem_undetected" || ad == "modem_sim_destroy" || ad == "modem_waitpin" || ad == "modem_waitpuk" || ad == "modem_imsi_waitnck"
    }

    function E() {
        q = true;
        var ad = g.getNewVersionState();

        function ag() {
            var ah = ["downloading"];
            var ai = g.getCurrentUpgradeState();
            if (ai.current_upgrade_state.toLowerCase() == "idle") {
                addTimeout(ag, 1000)
            } else {
                if ((G.inArray(ai.current_upgrade_state, ah) != -1) && (ad.fota_new_version_state != "already_has_pkg")) {
                    hideLoading();
                    p()
                }
            }
        }

        if (!(G("#progress").is(":visible"))) {
            ag()
        }
        var af = 0;
        var ae = function () {
            var ai = null;
            if (af <= 3) {
                af = af + 1;
                ai = g.getCurrentUpgradeState()
            } else {
                ai = J()
            }
            var ah = ai.current_upgrade_state;
            if (q && S == true) {
                if (ad.fota_new_version_state == "already_has_pkg") {
                    if (ah == "low_battery") {
                        hideProgressBar();
                        q = false;
                        g.removeTimerThings("fota_current_upgrade_state", function () {
                        });
                        showInfo("ota_pkg_low_battery");
                        window.clearTimeout(U);
                        return
                    } else {
                        if (ah == "prepare_install") {
                            hideProgressBar();
                            q = false;
                            g.removeTimerThings("fota_current_upgrade_state", function () {
                            });
                            showInfo("ota_pkg_download_success");
                            window.clearTimeout(U);
                            T = setInterval(function () {
                                a()
                            }, 1000);
                            return
                        }
                    }
                } else {
                    if (ah == "downloading") {
                        Q()
                    } else {
                        if (ah == "download_failed") {
                            hideProgressBar();
                            q = false;
                            showAlert("ota_download_failed");
                            window.clearTimeout(U);
                            return
                        } else {
                            if (ah == "low_battery") {
                                hideProgressBar();
                                q = false;
                                g.removeTimerThings("fota_current_upgrade_state", function () {
                                });
                                showInfo("ota_low_battery");
                                window.clearTimeout(U);
                                return
                            } else {
                                if (ah == "prepare_install") {
                                    hideProgressBar();
                                    q = false;
                                    g.removeTimerThings("fota_current_upgrade_state", function () {
                                    });
                                    showInfo("ota_download_success");
                                    window.clearTimeout(U);
                                    T = setInterval(function () {
                                        a()
                                    }, 1000);
                                    return
                                } else {
                                    q = false;
                                    hideProgressBar();
                                    window.clearTimeout(U);
                                    return
                                }
                            }
                        }
                    }
                }
                U = window.setTimeout(ae, 1000)
            }
        };
        if (q && S == true) {
            U = window.setTimeout(ae, 100)
        } else {
            window.clearTimeout(U)
        }
    }

    function r(ae) {
        if ((!(G("#loading").is(":visible"))) && (!(G("#confirm").is(":visible")))) {
            var ad = ae ? "ota_update_success" : "ota_update_failed";
            X = true;
            showAlert(ad, function () {
                X = false;
                if (L.UPGRADE_TYPE == "OTA") {
                    g.clearUpdateResult({}, G.noop())
                }
            })
        } else {
            window.setTimeout(function () {
                r(ae)
            }, 1000)
        }
    }

    function p() {
        var ae = g.getMandatory();
        var ad = ae.is_mandatory;
        var af = g.getPackSizeInfo();
        var ag;
        if (parseInt(af.fota_pkg_total_size) == 0) {
            ag = 0
        } else {
            ag = parseInt(parseInt(af.fota_dl_pkg_size) * 100 / parseInt(af.fota_pkg_total_size))
        }
        if (ag > 100) {
            ag = 100
        }
        if (ad) {
            showProgressBar("ota_update", "<br/>" + G.i18n.prop("ota_update_warning"))
        } else {
            var ah = "";
            if (L.UPGRADE_TYPE == "OTA") {
                ah = "<br/><br/><button id='btnStopUpgrade' onclick='stopOTAUpgrade();' class='btn-1 btn-primary'>" + G.i18n.prop("cancel") + "</button>"
            }
            showProgressBar("ota_update", "<br/>" + G.i18n.prop("ota_update_warning") + ah)
        }
        if (ag >= 0) {
            setProgressBar(ag)
        }
    }

    function P() {
        g.setUpgradeSelectOp({selectOp: "1"}, function (ad) {
            if (ad.result == "success") {
                E()
            }
        })
    }

    function d() {
        g.setUpgradeSelectOp({selectOp: "0"}, function (ad) {
        })
    }

    function C(ad) {
        var af = J();
        if (ad) {
            var ae = g.getOpMode();
            if (!checkConnectedStatus(af.connectStatus, ae.rj45_state, af.connectWifiStatus)) {
                showAlert("ota_network_disconnected");
                return
            }
            if (af.fota_user_selector == "none") {
                P()
            } else {
                if (af.fota_user_selector == "accept") {
                    E()
                } else {
                    if (af.fota_user_selector == "cancel") {
                        showAlert("ota_have_cancel")
                    } else {
                        if (af.fota_user_selector == "downloading_cancel") {
                            showAlert("ota_have_cancel")
                        }
                    }
                }
            }
        } else {
            if (af.fota_user_selector == "none") {
                d()
            } else {
                if (af.fota_user_selector == "accept") {
                    E()
                } else {
                    if (af.fota_user_selector == "cancel") {
                    } else {
                        if (af.fota_user_selector == "downloading_cancel") {
                        }
                    }
                }
            }
        }
    }

    function b(af) {
        var ae = af.current_upgrade_state;
        if (ae == "upgrade_pack_redownload") {
            showConfirm("ota_interrupted", {
                ok: function () {
                    C(1)
                }, no: function () {
                    C(0)
                }
            })
        } else {
            var ad = ["prepare_install", "low_battery", "connecting_server", "connect_server_success", "downloading", "accept"];
            if (G.inArray(ae, ad) != -1) {
                E()
            } else {
                showConfirm(G.i18n.prop("ota_new_version"), {
                    ok: function () {
                        C(1);
                        L.ISNOW_NOTICE = false
                    }, no: function () {
                        C(0);
                        L.ISNOW_NOTICE = false
                    }
                })
            }
        }
    }

    showOTAAlert = function () {
        L.ISNOW_NOTICE = true;
        var ad = g.getMandatory().is_mandatory;
        if (ad) {
            E()
        } else {
            var ae = {};
            ae = g.getCurrentUpgradeState();
            b(ae)
        }
    };
    stopOTAUpgrade = function () {
        g.setUpgradeSelectOp({selectOp: "2"}, function (ad) {
        });
        q = false;
        window.clearTimeout(U);
        hideLoading();
        showAlert("ota_cancel")
    };

    function f(ad) {
        u = !!ad;
        l = !!ad;
        if (!ad) {
            x = true
        }
    }

    function v(ad) {
        l = !!ad;
        if (!ad) {
            x = true
        }
    }

    function ab(af) {
        var ad = {showConfirm: false, limitPercent: af.limitVolumePercent};
        if (af.limitVolumeType == "1") {
            var ae = parseInt(af.data_counter.monthlySent, 10) + parseInt(af.data_counter.monthlyReceived, 10);
            ad.usedPercent = ae / af.limitVolumeSize * 100;
            if (ad.usedPercent > ad.limitPercent) {
                ad.showConfirm = true;
                ad.type = "data"
            }
        } else {
            ad.usedPercent = af.data_counter.monthlyConnectedTime / af.limitVolumeSize * 100;
            if (ad.usedPercent > ad.limitPercent) {
                ad.showConfirm = true;
                ad.type = "time"
            }
        }
        return ad
    }

    function R() {
        if (L.PRODUCT_TYPE == "DATACARD") {
            G("#statusBar").addClass("padding-right-90");
            G("#language").addClass("data-card-language")
        }
        var ag = G("<img />").attr("src", "pic/res_alert.png");
        var af = G("<img />").attr("src", "pic/res_confirm.png");
        var aj = G("<img />").attr("src", "pic/res_info.png");
        window.setTimeout(function () {
            var al = new M();
            V.applyBindings(al, G("#statusBar")[0]);
            window.setInterval(function () {
                var ap = J();
                var an = ap.roamingStatus ? true : false;
                var ao = G("#langLogoBar");
                S = ap.isLoggedIn;
                al.batteryLevel(ap.batteryLevel + "%");
                al.batteryPers(n(ap.batteryPers, ap.batteryStatus, ap.batteryShow));
                al.batteryStatus(ap.batteryStatus);
                al.isShowFotaNewversionIcon(ap.new_version_state && ap.fota_user_selector && ap.fota_package_already_download != "yes" && L.ISNOW_NOTICE && al.updateType() == "mifi_fota");
                al.isShowRj45ConnectionIcon(L.RJ45_SUPPORT);
                al.networkOperator(o(ap.spn_b1_flag, ap.spn_name_data, ap.spn_b2_flag, ap.networkOperator, an));
                al.networkType(getNetworkType(ap.networkType));
                al.pinStatus(ap.pinStatus);
                al.roamingStatus(ap.roamingStatus ? "R" : "");
                al.showAttachedDevices(ap.wifiStatus);
                al.simStatus(D(ap.simStatus));
                al.signalCssClass(F(ap.signalImg, ap.networkType, ap.simStatus));
                al.isLoggedIn(ap.isLoggedIn);
                al.wifiStatusCssClass(m(ap.wifiStatus, ap.wirelessDeviceNum));
                al.wifiStatusImg(e(ap.wifiStatus, ap.wirelessDeviceNum));
                if (L.HAS_SMS) {
                    if (!h && ap.isLoggedIn) {
                        ak(ap.smsUnreadCount)
                    } else {
                        al.smsUnreadCount(ap.smsUnreadCount)
                    }
                }
                k(al, ap.connectStatus, ap.data_counter, ap.connectWifiSSID, ap.connectWifiStatus, ap.rj45ConnectStatus);
                ae(al, ap.connectStatus, ap.connectWifiSSID, ap.connectWifiStatus);
                checkTrafficLimitAlert(al, ap);
                ad({
                    simStatus: ap.simStatus,
                    wifiStatus: ap.wifiStatus,
                    deviceSize: ap.wirelessDeviceNum,
                    networkType: ap.networkType
                });
                if (ap.isLoggedIn) {
                    G("#statusBar:hidden").show()
                } else {
                    G("#statusBar:visible").hide()
                }
            }, 500);
            if (L.HAS_SMS) {
                window.setInterval(function () {
                    if (al.isLoggedIn()) {
                        ak()
                    }
                }, 10000);
                ai()
            }
            window.setInterval(function () {
                var ao = J();
                var an = ["prepare_install", "low_battery", "download_success", "downloading"];
                if (al.isLoggedIn() == true && !(G("#progress").is(":visible")) && ao.defaultWanName != "") {
                    if (G.inArray(ao.current_upgrade_state, an) != -1) {
                        if (null == q) {
                            if (!ao.is_mandatory) {
                                G.modal.close()
                            }
                            E()
                        } else {
                            if (false == q) {
                                q = null
                            }
                        }
                    }
                }
            }, 1000);
            var am = function () {
                var an = g.getStatusInfo();
                if (an.isLoggedIn) {
                    g.getUpgradeResult({}, function (ao) {
                        if (ao.upgrade_result == "success") {
                            r(true)
                        } else {
                            if (ao.upgrade_result == "fail") {
                                r(false)
                            } else {
                                window.setTimeout(am, 1000)
                            }
                        }
                    }, function () {
                        window.setTimeout(am, 1000)
                    })
                } else {
                    window.setTimeout(am, 1000)
                }
            };
            if (al.updateType() == "mifi_fota") {
                am();
                window.setInterval(function () {
                    var an = J();
                    if (an.isLoggedIn && an.defaultWanName != "") {
                        if (an.new_version_state && an.fota_package_already_download != "yes" && !L.ALREADY_NOTICE) {
                            g.getUpgradeResult({}, function (ao) {
                                if (ao.upgrade_result == "success") {
                                    r(true)
                                } else {
                                    if (ao.upgrade_result == "fail") {
                                        r(false)
                                    } else {
                                        if (X == false) {
                                            L.ALREADY_NOTICE = true;
                                            showOTAAlert()
                                        }
                                    }
                                }
                            })
                        }
                    }
                }, 1000)
            }

            function ak(an) {
                g.getSmsCapability({}, function (ao) {
                    var ap = false;
                    if (ao.nvTotal != 0 && ao.nvUsed >= ao.nvTotal) {
                        G("#sms_unread_count").attr("tipTitle", "sms_capacity_is_full");
                        ap = true
                    } else {
                        if (ao.nvTotal != 0 && ao.nvUsed + 5 >= ao.nvTotal) {
                            G("#sms_unread_count").attr("tipTitle", "sms_capacity_will_full");
                            ap = true
                        } else {
                            G("#sms_unread_count").attr("tipTitle", "sms_unread_count")
                        }
                    }
                    al.showSmsDeleteConfirm(ap);
                    if (typeof an != "undefined") {
                        al.smsUnreadCount(an)
                    }
                    h = true
                })
            }
        }, 1200);
        I.init();

        function ai() {
            var ak = J();
            if (ak.isLoggedIn) {
                g.getSMSReady({}, function (al) {
                    if (al.sms_cmd_status_result == "1") {
                        window.setTimeout(function () {
                            ai()
                        }, 1000)
                    } else {
                        s = true
                    }
                })
            } else {
                window.setTimeout(function () {
                    ai()
                }, 1000)
            }
        }

        checkTrafficLimitAlert = function (an, ao) {
            if (window.location.hash == "#entry") {
                return false
            }
            var ak = L.AP_STATION_SUPPORT ? g.getStatusInfo().ap_station_enable : "undefined";
            var ap = ab(ao);
            var am = G("#confirm-container:visible").length > 0;
            var al = (L.PRODUCT_TYPE == "CPE" && checkCableMode(ao.blc_wan_mode)) ? true : false;
            if (L.AP_STATION_SUPPORT && (typeof ak == "undefined" || ak === "")) {
                g.refreshAPStationStatus({}, G.noop());
                return false
            }
            ak = ak == 1;
            if (!ao.isLoggedIn || am || (u && l) || !ao.limitVolumeEnable || (!ak && !(ao.connectStatus == "ppp_connected")) || al) {
                return false
            }
            if (x) {
                window.setTimeout(function () {
                    x = false
                }, 2000);
                return false
            }
            if (ap.showConfirm) {
                var aq = null;
                if (ap.usedPercent > 100 && !l) {
                    u = true;
                    l = true;
                    aq = {msg: ak ? "traffic_beyond_msg" : "traffic_beyond_disconnect_msg"}
                } else {
                    if (!u) {
                        u = true;
                        l = false;
                        aq = {msg: ak ? "traffic_limit_msg" : "traffic_limit_disconnect_msg", params: [ap.limitPercent]}
                    }
                }
                if (aq != null) {
                    if (ak) {
                        showAlert(aq)
                    } else {
                        showConfirm(aq, function () {
                            showLoading("disconnecting");
                            g.disconnect({}, function (ar) {
                                if (ar.result) {
                                    successOverlay()
                                } else {
                                    errorOverlay()
                                }
                            })
                        })
                    }
                }
            }
            return true
        };

        function ad(ak) {
            G("#statusItemSimStatus").attr("tipTitle", "sim_status_" + ak.simStatus);
            if (ak.wifiStatus) {
                if (ak.deviceSize == 0) {
                    G("#wifi_status").attr("tipTitle", "wifi_status_on")
                } else {
                    G("#wifi_status").attr("tipTitle", "wifi_status" + ak.deviceSize)
                }
            } else {
                G("#wifi_status").attr("tipTitle", "wifi_status_off")
            }
        }

        function ae(am, ak, al, an) {
            am.connectStatus(ak);
            if (ak == "ppp_disconnecting") {
                am.connectStatusTrans("disconnecting");
                am.connectStatusText(G.i18n.prop("disconnecting"))
            } else {
                if (ak == "ppp_connecting") {
                    am.connectStatusTrans("connecting");
                    am.connectStatusText(G.i18n.prop("connecting"))
                } else {
                    if (ak == "ppp_connected") {
                        am.connectStatusTrans("connected");
                        am.connectStatusText(G.i18n.prop("connected"))
                    } else {
                        if (al) {
                            if (an == "dhcping" || an == "connecting") {
                                am.connectStatus("wifi_connecting");
                                am.connectStatusTrans("connecting");
                                am.connectStatusText(G.i18n.prop("connecting"))
                            } else {
                                if (an == "connect") {
                                    am.connectStatus("wifi_connect");
                                    am.connectStatusTrans("connected");
                                    am.connectStatusText(G.i18n.prop("connected"))
                                } else {
                                    am.connectStatus("ppp_disconnected");
                                    am.connectStatusTrans("disconnected");
                                    am.connectStatusText(G.i18n.prop("disconnected"))
                                }
                            }
                        } else {
                            am.connectStatusTrans("disconnected");
                            am.connectStatusText(G.i18n.prop("disconnected"))
                        }
                    }
                }
            }
        }

        getNetworkType = function (al) {
            var ak = al.toLowerCase();
            if (ak == "" || ak == "limited service") {
                ak = "limited_service"
            }
            if (ak == "no service") {
                ak = "no_service"
            }
            if (ak == "limited_service" || ak == "no_service") {
                G("#networkType", "#statusBar").attr("data-trans", "network_type_" + ak);
                return G.i18n.prop("network_type_" + ak)
            } else {
                G("#networkType", "#statusBar").removeAttr("data-trans");
                return al
            }
        };
        if (L.HAS_SMS && W.checkIsMenuExist("sms_list")) {
            window.setInterval(function () {
                var al = J();
                if (window.location.hash == "#entry" || N(al.simStatus)) {
                    return
                }
                for (key in Y) {
                    var am = Y[key];
                    if (G.now() - am > 5000) {
                        delete (Y["m" + am]);
                        var ak = G(".bubbleItem#m" + am, "#buttom-bubble");
                        ak.fadeOut(1000, function () {
                            G(this).remove()
                        })
                    }
                }
                if (al.isLoggedIn) {
                    if (al.newSmsReceived && !z) {
                        z = true;
                        g.resetNewSmsReceivedVar();
                        ah()
                    }
                    if (al.smsReportReceived) {
                        g.resetSmsReportReceivedVar();
                        A()
                    }
                }
            }, 1000);
            if (L.SMS_DATABASE_SORT_SUPPORT) {
                window.setInterval(function () {
                    if (W.checkIsMenuExist("sms_list")) {
                        var ak = J();
                        if (ak.isLoggedIn && s && !z && !N(ak.simStatus)) {
                            z = true;
                            ah()
                        }
                    }
                }, 20001)
            }
        }

        function ah() {
            var al = 1;
            var ak = 5;
            if (!L.dbMsgs || L.dbMsgs.length == 0) {
                ak = 500;
                al = 10
            }
            g.getSMSMessages({
                page: 0,
                smsCount: ak,
                nMessageStoreType: 0,
                tags: al,
                orderBy: "order by id desc"
            }, function (am) {
                if (am && am.messages) {
                    j(am.messages, 0)
                }
                z = false
            });
            g.getSMSMessages({
                page: 0,
                smsCount: ak,
                nMessageStoreType: 1,
                tags: al,
                orderBy: "order by id desc"
            }, function (am) {
                if (am && am.messages) {
                    j(am.messages, 1)
                }
                z = false
            })
        }

        if (L.HAS_SMS) {
            G(".bubbleItem", "#buttom-bubble").live("mouseover", function () {
                var ak = G(this);
                delete (Y[ak.attr("id")])
            }).live("mouseout", function () {
                var al = G(this);
                var ak = G.now();
                Y["m" + ak] = ak;
                al.attr("id", "m" + ak);
                G(".bubbleItem h3 a.bubbleCloseBtn", "#buttom-bubble").data("targetid", "m" + ak)
            });
            G(".bubbleItem h3 a.bubbleCloseBtn", "#buttom-bubble").die().live("click", function () {
                var al = G(this).data("targetid");
                delete (Y[al]);
                var ak = G(".bubbleItem#" + al, "#buttom-bubble");
                ak.fadeOut(1000, function () {
                    G(this).remove()
                })
            })
        }
    }

    return {
        init: R,
        setTrafficAlertPopuped: f,
        setTrafficAlert100Popuped: v,
        getTrafficResult: ab,
        showOTAAlert: showOTAAlert
    }
});
define("status_traffic_alert", "jquery knockout service statusBar echarts".split(" "), function (h, n, k, f, e) {
    var l = null;
    var o = null;
    var b = false;
    var d = false;
    var j = {
        data: {
            alarm: {itemStyle: {normal: {color: "#8CC916"}}, name: "警戒区", value: 19.7},
            alert: {itemStyle: {normal: {color: "#FF5500"}}, name: "提醒值", value: 1},
            free: {itemStyle: {normal: {color: "#D8D8D8"}}, name: "未使用", value: 50},
            full: {itemStyle: {normal: {color: "#DF4313"}}, name: "流量超出", value: 30},
            left1: {itemStyle: {normal: {color: "#D8D8D8"}}, name: "提醒值内未使用", value: 50},
            start: {itemStyle: {normal: {color: "#D8D8D8"}}, name: "提醒值内未使用", value: 50},
            used: {itemStyle: {normal: {color: "#8CC916"}}, name: "已使用", value: 30}
        }, cacheEle: {}, getEle: function (p) {
            if (this.cacheEle.hasOwnProperty("id")) {
                return this.cacheEle[p]
            } else {
                this.cacheEle[p] = h("#" + p);
                return this.cacheEle[p]
            }
        }, fetchTrafficAlertInfo: function () {
            o = g();
            return o
        }, getTrafficStatisticalDatalnfo: function (p) {
            return {data: /\d+(.\d+)?/.exec(p)[0], unit: /[A-Z]{1,2}/.exec(p)[0]}
        }, getTrafficTimeHours: function (p) {
            var q = p.split(":");
            return {h: parseInt(q[0], 10), m: parseInt(q[1], 10), s: parseInt(q[2], 10)}
        }, getTrafficTimeInfo: function (p) {
            return {data: /\d+(.\d+)?/.exec(p)[0], unit: /[a-z]{4,6}/.exec(p)[0]}
        }, getTrafficTimeToSeconds: function (q) {
            var p = this.getTrafficTimeHours(q);
            return p.h * 3600 + p.m * 60 + p.s
        }, getTrafficUnitByScale: function (p) {
            if (p == "1024") {
                return "GB"
            } else {
                if (p == "1048576") {
                    return "TB"
                } else {
                    return "MB"
                }
            }
        }, getTrafficValueByStatisticalUnit: function (p) {
            p = p.toLowerCase();
            if (p == "minute") {
                return "60"
            } else {
                if (p == "gb") {
                    return "1024"
                } else {
                    if (p == "hour") {
                        return "3600"
                    } else {
                        if (p == "tb") {
                            return "1048576"
                        } else {
                            return "1"
                        }
                    }
                }
            }
        }, isFormEditable: function (s) {
            var r = s.dataLimitTypeChecked() == "1" && (s.viewEditUsedData() || s.viewEditAlertData() || s.viewEditTotalData());
            var p = s.dataLimitTypeChecked() == "0" && (s.viewEditUsedTime() || s.viewEditAlertTime() || s.viewEditTotalTime());
            if (r || p) {
                h(".border-color-transition:visible").addClass("attention-focus");
                addTimeout(function () {
                    h(".border-color-transition:visible").removeClass("attention-focus")
                }, 1500);
                return true
            } else {
                var q = false;
                if (s.dataLimitTypeChecked() == 1) {
                    if (s.alertDataReach() == "0") {
                        s.editAlertDataHandler();
                        q = true
                    }
                    if (s.limitDataMonth() == "0") {
                        s.editTotalDataHandler();
                        q = true
                    }
                } else {
                    if (s.alertTimeReach() == "0") {
                        s.editAlertTimeHandler();
                        q = true
                    }
                    if (s.limitTimeMonth() == "0") {
                        s.editTotalTimeHandler();
                        q = true
                    }
                }
                if (q) {
                    h(".border-color-transition:visible").addClass("attention-focus");
                    addTimeout(function () {
                        h(".border-color-transition:visible").removeClass("attention-focus")
                    }, 1500)
                }
                return q
            }
        }, refreshFlowDiagramInfo: function (H) {
            var F = 0;
            var G = 0;
            var w = 0;
            var u = 0;
            var D = 0;
            var p = 0;
            var q = h.i18n.prop("echarts_no");
            if (o.dataLimitChecked == "1") {
                q = h.i18n.prop("echarts_used");
                a.series[0].data = [];
                if (H.dataLimitTypeChecked() == "1") {
                    a.title.text = "";
                    a.series[0].data = [];
                    if (H.limitDataMonth() == 0) {
                        var I = j.data.used;
                        I.value = 1;
                        I.name = h.i18n.prop("echarts_used");
                        I.selected = false;
                        a.series[0].data.push(I)
                    } else {
                        D = H.limitDataMonth() * H.selectedDataUnit() * 1048576;
                        p = parseInt(o.monthlySent, 10) + parseInt(o.monthlyReceived, 10);
                        u = D * H.alertDataReach() / 100;
                        if (p >= D) {
                            var s = j.data.full;
                            s.value = 100;
                            s.name = h.i18n.prop("echarts_full");
                            a.series[0].data.push(s);
                            q = h.i18n.prop("echarts_full")
                        } else {
                            if (u > p) {
                                w = u - p;
                                G = D - u
                            } else {
                                F = p - u;
                                G = D - p
                            }
                            var I = j.data.used;
                            if (u - p > 0) {
                                I.value = p
                            } else {
                                I.value = u
                            }
                            I.name = h.i18n.prop("echarts_used");
                            a.series[0].data.push(I);
                            if (w > 0) {
                                var z = j.data.left1;
                                z.value = w;
                                z.name = h.i18n.prop("echarts_left1");
                                a.series[0].data.push(z)
                            }
                            var v = j.data.alert;
                            v.value = D / 200;
                            v.name = h.i18n.prop("echarts_alert");
                            a.series[0].data.push(v);
                            if (F > 0) {
                                var r = j.data.alarm;
                                r.value = F;
                                r.name = h.i18n.prop("echarts_alarm");
                                a.series[0].data.push(r)
                            }
                            var t = j.data.free;
                            t.value = G;
                            t.name = h.i18n.prop("echarts_free");
                            a.series[0].data.push(t)
                        }
                    }
                } else {
                    a.series[0].data = [];
                    if (H.limitTimeMonth() == 0) {
                        var I = j.data.used;
                        I.value = 1;
                        I.selected = false;
                        I.name = h.i18n.prop("echarts_used");
                        a.series[0].data.push(I)
                    } else {
                        D = H.limitTimeMonth() * H.selectedTimeUnit();
                        p = o.monthlyConnectedTime;
                        u = D * H.alertTimeReach() / 100;
                        if (p >= D) {
                            var x = j.data.full;
                            x.value = 100;
                            x.name = h.i18n.prop("echarts_full");
                            a.series[0].data.push(x);
                            q = h.i18n.prop("echarts_full")
                        } else {
                            if (u - p > 0) {
                                w = u - p;
                                G = D - u
                            } else {
                                F = p - u;
                                G = D - p
                            }
                            var y = j.data.used;
                            if (u - p > 0) {
                                y.value = p
                            } else {
                                y.value = u
                            }
                            y.name = h.i18n.prop("echarts_used");
                            a.series[0].data.push(y);
                            if (w > 0) {
                                var E = j.data.left1;
                                E.value = w;
                                E.name = h.i18n.prop("echarts_left1");
                                a.series[0].data.push(E)
                            }
                            var C = j.data.alert;
                            C.value = D / 200;
                            C.name = h.i18n.prop("echarts_alert");
                            a.series[0].data.push(C);
                            if (F > 0) {
                                var A = j.data.alarm;
                                A.value = F;
                                A.name = h.i18n.prop("echarts_alarm");
                                a.series[0].data.push(A)
                            }
                            var B = j.data.free;
                            B.value = G;
                            B.name = h.i18n.prop("echarts_free");
                            a.series[0].data.push(B)
                        }
                    }
                }
            } else {
                var I = j.data.used;
                I.value = 1;
                I.selected = false;
                I.name = h.i18n.prop("echarts_no");
                a.series[0].data = [I];
                a.title.text = ""
            }
            j.setFlowDiagramInfo(a, q)
        }, setFlowDiagramInfo: function (p, q) {
            var s = j.data.start;
            s.name = q;
            s.selected = false;
            s.value = 0;
            var r = [s].concat(p.series[0].data);
            p.series[0].data = r;
            l.setOption(p, true);
            addTimeout(function () {
                l.resize()
            }, 1000)
        }
    };
    var a = {
        animation: false,
        color: ["red", "red", "red", "red", "red"],
        series: [{
            name: "流量控制",
            radius: ["0", "75"],
            selectedOffset: 3,
            type: "pie",
            data: [],
            itemStyle: {normal: {labelLine: {show: false}, label: {show: false}}}
        }],
        title: {
            itemGap: 0,
            text: "",
            subtextStyle: {color: "#FFF", fontFamily: "微软雅黑", fontSize: 16, fontWeight: "bolder"},
            textStyle: {color: "#FFF", fontFamily: "微软雅黑", fontSize: 20, fontWeight: "bolder"},
            x: "center",
            y: "center"
        },
        tooltip: {formatter: "{b}"}
    };

    function g() {
        return k.getTrafficAlertInfo()
    }

    function c() {
        var p = this;
        var V = j.fetchTrafficAlertInfo();
        var A = V.limitDataMonth.split("_");
        b = false;
        d = false;
        p.alertDataReach = n.observable(V.alertDataReach || 0);
        p.alertTimeReach = n.observable(V.alertTimeReach || 0);
        p.dataLimitChecked = n.observable(V.dataLimitChecked == "0" ? "0" : "1");
        p.dataLimitTypeChecked = n.observable(V.dataLimitTypeChecked == "0" ? "0" : "1");
        p.limitTimeMonth = n.observable(V.limitTimeMonth || 0);
        p.usedDataText = n.observable(transUnit(parseInt(V.monthlySent, 10) + parseInt(V.monthlyReceived, 10), false));
        var r = j.getTrafficStatisticalDatalnfo(p.usedDataText());
        var F = r.data;
        p.dataUsed = n.observable(F);
        var B = r.unit;
        p.selectedDataUsedUnit = n.observable(j.getTrafficValueByStatisticalUnit(B));
        p.usedDataTextDescData = n.observable("");
        p.limitDataMonth = n.observable(A[0] || 0);
        p.selectedDataUnit = n.observable(A[1] || 1);
        var I = transUnit(p.limitDataMonth() * p.selectedDataUnit() * 1024 * 1024, false);
        var t = I.substring(I.length - 2);
        p.limitDataMonth(I.substring(0, I.length - 2));
        p.selectedDataUnit(j.getTrafficValueByStatisticalUnit(t));
        p.usedDataTextDesc = n.computed(H);
        p.limitDataMonthDescData = n.observable("");
        p.limitDataMonthDesc = n.computed(Y);
        p.alertDataReachDescData = n.observable("");
        p.alertDataReachDesc = n.computed(R);
        p.leftDataDescData = n.observable("");
        p.leftDataDesc = n.computed(N);
        p.monthlyConnectedTime = n.observable(transSecond2Time(V.monthlyConnectedTime));
        var S = j.getTrafficTimeInfo(transTimeUnit(V.monthlyConnectedTime));
        p.usedTime = n.observable(S.data);
        p.selectedTimeUsedUnit = n.observable(j.getTrafficValueByStatisticalUnit(S.unit));
        p.usedTimeTextDescData = n.observable("");
        p.usedTimeTextDesc = n.computed(T);
        var X = j.getTrafficTimeInfo(transTimeUnit(parseFloat(p.limitTimeMonth()) * 3600));
        p.selectedTimeUnit = n.observable(j.getTrafficValueByStatisticalUnit(X.unit));
        p.limitTimeMonth(X.data);
        p.limitTimeMonthDescData = n.observable("");
        p.limitTimeMonthDescText = n.observable("traffic_limit_time_h");
        p.limitTimeMonthDesc = n.computed(w);
        p.alertTimeReachDescData = n.observable("");
        p.alertTimeReachDesc = n.computed(u);
        p.leftTimeDescData = n.observable("");
        p.leftTimeDesc = n.computed(y);
        p.save = z;
        p.viewEditUsedData = n.observable(false);
        p.editUsedDataHandler = x;
        p.editUsedDataSaveHandler = aa;
        p.saveUsedData = M;
        p.editUsedDataCancelHandler = G;
        p.viewEditTotalData = n.observable(false);
        p.editTotalDataHandler = E;
        p.editTotalDataSaveHandler = s;
        p.editTotalDataCancelHandler = Q;
        p.viewEditAlertData = n.observable(false);
        p.editAlertDataHandler = L;
        p.editAlertDataSaveHandler = q;
        p.editAlertDataCancelHandler = Z;
        p.viewEditUsedTime = n.observable(false);
        p.editUsedTimeHandler = v;
        p.saveUsedTime = J;
        p.editUsedTimeSaveHandler = O;
        p.editUsedTimeCancelHandler = C;
        p.viewEditTotalTime = n.observable(false);
        p.editTotalTimeHandler = D;
        p.editTotalTimeSaveHandler = ab;
        p.editTotalTimeCancelHandler = P;
        p.viewEditAlertTime = n.observable(false);
        p.editAlertTimeHandler = K;
        p.editAlertTimeSaveHandler = U;
        p.editAlertTimeCancelHandler = W;
        j.refreshFlowDiagramInfo(p);

        function R() {
            if (isNaN(p.limitDataMonth() * p.selectedDataUnit() * p.alertDataReach())) {
                p.alertDataReachDescData(p.alertDataReach() + ", ");
                return h.i18n.prop("traffic_alert_reach_text", p.alertDataReach(), " ")
            }
            var ac = transUnit(p.limitDataMonth() * p.selectedDataUnit() * p.alertDataReach() * 1048576 / 100, false);
            p.alertDataReachDescData(p.alertDataReach() + "," + ac);
            return h.i18n.prop("traffic_alert_reach_text", p.alertDataReach(), ac)
        }

        function u() {
            if (isNaN(p.limitTimeMonth() * p.alertTimeReach())) {
                p.alertTimeReachDescData(p.alertTimeReach() + ", ");
                return h.i18n.prop("traffic_alert_reach_text", p.alertTimeReach(), " ")
            }
            var ac = transSecond2Time(p.limitTimeMonth() * p.selectedTimeUnit() * p.alertTimeReach() / 100);
            p.alertTimeReachDescData(p.alertTimeReach() + "," + ac);
            return h.i18n.prop("traffic_alert_reach_text", p.alertTimeReach(), ac)
        }

        function Z() {
            p.alertDataReach(j.getEle("editAlertData").data("oldValue"));
            p.viewEditAlertData(false)
        }

        function L() {
            j.getEle("editAlertData").data("oldValue", p.alertDataReach());
            p.viewEditAlertData(true)
        }

        function q() {
            if (j.getEle("alertDataReach").valid()) {
                p.viewEditAlertData(false)
            }
        }

        function W() {
            p.alertTimeReach(j.getEle("editAlertTime").data("oldValue"));
            p.viewEditAlertTime(false)
        }

        function K() {
            j.getEle("editAlertTime").data("oldValue", p.alertTimeReach());
            p.viewEditAlertTime(true)
        }

        function U() {
            if (j.getEle("alertTimeReach").valid()) {
                p.viewEditAlertTime(false)
            }
        }

        function E() {
            j.getEle("editTotalData").data("oldValue", p.limitDataMonth());
            j.getEle("selectedDataUnit").data("oldValue", p.selectedDataUnit());
            p.viewEditTotalData(true)
        }

        function s() {
            if (j.getEle("limitDataMonth").valid()) {
                p.usedDataText(transUnit(p.limitDataMonth() * p.selectedDataUnit() * 1048576, false));
                p.viewEditTotalData(false)
            }
        }

        function Q() {
            p.limitDataMonth(j.getEle("editTotalData").data("oldValue"));
            p.selectedDataUnit(j.getEle("selectedDataUnit").data("oldValue"));
            p.viewEditTotalData(false)
        }

        function P() {
            p.limitTimeMonth(j.getEle("editTotalTime").data("oldValue"));
            p.viewEditTotalTime(false)
        }

        function D() {
            j.getEle("editTotalTime").data("oldValue", p.limitTimeMonth());
            p.viewEditTotalTime(true)
        }

        function ab() {
            if (j.getEle("limitTimeMonth").valid()) {
                p.viewEditTotalTime(false)
            }
        }

        function G() {
            p.dataUsed(j.getEle("editUsedData").data("oldValue"));
            p.selectedDataUsedUnit(j.getEle("selectedDataUsedUnit").data("oldValue"));
            j.getEle("editUsedDataCancel").siblings("label.error").hide();
            p.viewEditUsedData(false)
        }

        function x() {
            j.getEle("editUsedData").data("oldValue", p.dataUsed());
            j.getEle("selectedDataUsedUnit").data("oldValue", p.selectedDataUsedUnit());
            p.dataUsed(p.dataUsed());
            p.viewEditUsedData(true)
        }

        function aa() {
            if (j.getEle("dataUsed").valid()) {
                b = true;
                p.viewEditUsedData(false)
            }
        }

        function C() {
            p.usedTime(j.getEle("editUsedTime").data("oldValue"));
            p.viewEditUsedTime(false)
        }

        function v() {
            j.getEle("editUsedTime").data("oldValue", p.usedTime());
            p.viewEditUsedTime(true)
        }

        function O() {
            if (j.getEle("usedTime").valid()) {
                p.monthlyConnectedTime(transSecond2Time(parseFloat(p.usedTime()) * p.selectedTimeUsedUnit()));
                p.viewEditUsedTime(false);
                d = true
            }
        }

        function N() {
            var ac = (p.limitDataMonth() * p.selectedDataUnit() - p.dataUsed() * p.selectedDataUsedUnit()) * 1048576;
            if (ac < 0) {
                ac = 0
            }
            if (isNaN(ac)) {
                p.leftDataDescData("");
                return h.i18n.prop("traffic_data_left_text", " ")
            }
            p.leftDataDescData(transUnit(ac, false));
            return h.i18n.prop("traffic_data_left_text", transUnit(ac, false))
        }

        function y() {
            var ac = p.limitTimeMonth() * p.selectedTimeUnit() - j.getTrafficTimeToSeconds(p.monthlyConnectedTime());
            if (ac < 0) {
                ac = 0
            }
            if (isNaN(ac)) {
                p.leftTimeDescData(" ");
                return h.i18n.prop("traffic_data_left_text", " ")
            }
            p.leftTimeDescData(transSecond2Time(ac));
            return h.i18n.prop("traffic_data_left_text", transSecond2Time(ac))
        }

        function Y() {
            if (isNaN(p.limitDataMonth())) {
                p.limitDataMonthDescData("");
                return h.i18n.prop("traffic_limit_data_text", " ")
            } else {
            }
            p.limitDataMonthDescData(p.limitDataMonth() + j.getTrafficUnitByScale(p.selectedDataUnit()));
            return h.i18n.prop("traffic_limit_data_text", p.limitDataMonth() + j.getTrafficUnitByScale(p.selectedDataUnit()))
        }

        function w() {
            if (isNaN(p.limitTimeMonth())) {
                p.limitTimeMonthDescData(" ");
                p.limitTimeMonthDescText("traffic_limit_time_h");
                return h.i18n.prop("traffic_limit_time_h", " ")
            } else {
            }
            p.limitTimeMonthDescData(p.limitTimeMonth());
            if (p.selectedTimeUnit() == "60") {
                p.limitTimeMonthDescText("traffic_limit_time_m");
                return h.i18n.prop("traffic_limit_time_m", p.limitTimeMonth())
            } else {
                p.limitTimeMonthDescText("traffic_limit_time_h");
                return h.i18n.prop("traffic_limit_time_h", p.limitTimeMonth())
            }
        }

        function z() {
            if (j.isFormEditable(p) && p.dataLimitChecked() == "1") {
                return false
            }
            if (p.selectedDataUnit() == "1" && p.selectedDataUsedUnit() == "1048576" && p.dataLimitTypeChecked() == "1" && p.dataLimitChecked() == "1" && !(parseInt(p.dataUsed(), 10) < parseInt("4096", 10))) {
                showAlert("traffic_over_note");
                return false
            }
            showLoading();
            k.setTrafficAlertInfo({
                alertDataReach: parseInt(p.alertDataReach(), 10),
                alertTimeReach: parseInt(p.alertTimeReach(), 10),
                dataLimitChecked: p.dataLimitChecked(),
                dataLimitTypeChecked: p.dataLimitTypeChecked(),
                limitDataMonth: p.limitDataMonth() + "_" + p.selectedDataUnit(),
                limitTimeMonth: p.selectedTimeUnit() == "60" ? p.limitTimeMonth() / 60 : p.limitTimeMonth()
            }, function (ac) {
                if (ac.result == "success") {
                    if (p.dataLimitTypeChecked() == "1" && b) {
                        p.saveUsedData()
                    } else {
                        if (p.dataLimitTypeChecked() == "0" && d) {
                            p.saveUsedTime()
                        } else {
                            j.fetchTrafficAlertInfo();
                            j.refreshFlowDiagramInfo(p);
                            f.setTrafficAlertPopuped(false);
                            successOverlay()
                        }
                    }
                } else {
                    errorOverlay()
                }
            }, function () {
                j.refreshFlowDiagramInfo(p);
                errorOverlay()
            })
        }

        function M() {
            var ac = p.dataUsed() * p.selectedDataUsedUnit();
            k.trafficCalibration({way: "data", value: ac}, function () {
                j.fetchTrafficAlertInfo();
                j.refreshFlowDiagramInfo(p);
                successOverlay();
                p.viewEditUsedData(false);
                f.setTrafficAlertPopuped(false);
                b = false
            }, function () {
                j.fetchTrafficAlertInfo();
                j.refreshFlowDiagramInfo(p);
                errorOverlay()
            })
        }

        function J() {
            k.trafficCalibration({
                way: "time",
                value: p.selectedTimeUsedUnit() == "60" ? parseFloat(p.usedTime()) / 60 : p.usedTime()
            }, function () {
                j.fetchTrafficAlertInfo();
                j.refreshFlowDiagramInfo(p);
                successOverlay();
                p.monthlyConnectedTime(transSecond2Time(parseFloat(p.usedTime()) * p.selectedTimeUsedUnit()));
                p.viewEditUsedTime(false);
                f.setTrafficAlertPopuped(false);
                d = false
            }, function () {
                j.fetchTrafficAlertInfo();
                j.refreshFlowDiagramInfo(p);
                errorOverlay()
            })
        }

        function H() {
            if (isNaN(p.dataUsed())) {
                p.usedDataTextDescData("");
                return h.i18n.prop("traffic_used_text", " ")
            }
            p.usedDataTextDescData(p.dataUsed() + j.getTrafficUnitByScale(p.selectedDataUsedUnit()));
            return h.i18n.prop("traffic_used_text", p.dataUsed() + j.getTrafficUnitByScale(p.selectedDataUsedUnit()))
        }

        function T() {
            p.usedTimeTextDescData(p.monthlyConnectedTime());
            return h.i18n.prop("traffic_used_text", p.monthlyConnectedTime())
        }
    }

    function m() {
        l = e.init(h("#traffic_graphic")[0]);
        window.onresize = l.resize;
        var r = h("#container");
        n.cleanNode(r[0]);
        var q = new c();
        n.applyBindings(q, r[0]);
        h("#trafficAlertForm").validate({
            submitHandler: function () {
                q.save()
            },
            errorPlacement: function (t, s) {
                if (s.attr("name") == "alertDataReach") {
                    t.insertAfter("#editAlertDataDiv")
                } else {
                    if (s.attr("name") == "alertTimeReach") {
                        t.insertAfter("#editAlertTimeDiv")
                    } else {
                        if (s.attr("name") == "dataUsed") {
                            t.insertAfter("#editUsedDataDiv")
                        } else {
                            if (s.attr("name") == "limitDataMonth") {
                                t.insertAfter("#editTotalDataDiv")
                            } else {
                                if (s.attr("name") == "limitTimeMonth") {
                                    t.insertAfter("#editTotalTimeDiv")
                                } else {
                                    if (s.attr("name") == "usedTime") {
                                        t.insertAfter("#editUsedTimeDiv")
                                    } else {
                                        t.insertAfter(s)
                                    }
                                }
                            }
                        }
                    }
                }
            },
            rules: {
                alertDataReach: {range: [1, 100], digits: true},
                alertTimeReach: {range: [1, 100], digits: true},
                dataUsed: {range: [0, 9999], decimalRange: true},
                limitDataMonth: {range: [1, 9999], decimalRange: true},
                limitTimeMonth: {range: [1, 9999], decimalRange: true},
                usedTime: {range: [0, 9999], decimalRange: true}
            }
        });
        var p = window.language;
        window.setInterval(function () {
            if (p != window.language) {
                p = window.language;
                j.refreshFlowDiagramInfo(q)
            }
        }, 1000)
    }

    return {init: m}
});
define("tooltip", ["jquery"], function (b) {
    function a(g, j, f) {
        var l = g.offset().top;
        var k = g.offset().left;
        var e = f.position[0];
        var d = j.outerHeight() + g.outerHeight();
        var h = j.outerWidth() + g.outerWidth();
        l -= j.outerHeight() - f.offset[0];
        k += g.outerWidth() + f.offset[1];
        if (/iPad/i.test(navigator.userAgent)) {
            l -= b(window).scrollTop()
        }
        if (e == "center") {
            l += d / 2
        }
        if (e == "bottom") {
            l += d
        }
        e = f.position[1];
        if (e == "center") {
            k -= h / 2
        } else {
            if (e == "left") {
                k -= h
            }
        }
        return {top: l, left: k}
    }

    function c() {
        b(".statusItem", "#statusBar").each(function (d, f) {
            var e = b(this);
            e.attr("tipTitle", e.attr("title")).removeAttr("title")
        }).hover(function () {
            var e = b(this);
            var f = e.attr("tipTitle");
            var d = b("<div>").addClass("tooltip in").appendTo(document.body).hide().append(e.attr("i18n") ? b.i18n.prop(f) : f);
            if (e.attr("i18n")) {
                d.attr("data-trans", f).attr("id", "tooltip_" + e.attr("id"))
            }
            var g = a(e, d, {position: ["bottom", "center"], offset: [0, 0]});
            d.css({position: "absolute", top: g.top, left: g.left}).show()
        }, function () {
            b(".tooltip").hide().remove()
        })
    }

    return {init: c}
});
define("menu", "set service knockout underscore jquery".split(" "), function (p, r, q, u, j) {
    var k = false;
    var e;
    var f = [];
    var b = "";

    function l(w) {
        for (var v = 0; v < f.length; v++) {
            if (f[v].path == w) {
                return true
            }
        }
        return false
    }

    function m() {
        var v = r.getLoginStatus();
        return (v.status == "loggedIn")
    }

    function s() {
        var v = m();
        var w = u.filter(f, function (x) {
            return (x.level == "1" && ((x.requireLogin && v) || !x.requireLogin) && x.hash != "#entry")
        });
        e.menuMain(w);
        e.loggedIn(v);
        g(e.menuMain().length);
        e.showMenu(v || k);
        j("#nav").translate()
    }

    function g(v) {
        var w = 100 / v;
        j("ul#list-nav li").each(function () {
            j(this).css("width", w + "%")
        })
    }

    function n() {
        var w = window.location.hash;
        var x = u.find(f, function (y) {
            return y.hash == w
        });
        while (x.parent) {
            x = u.find(f, function (y) {
                return y.hash == x.parent
            })
        }
        if (!x.parent) {
            j("#list-nav li").removeClass("active");
            var v = x.hash.substring(1, x.hash.length);
            j("#list-nav li[mid=" + v + "]").addClass("active")
        }
        e.changeMenu(x)
    }

    function o(w) {
        w = w || window.location.hash;
        var v = m();
        return u.filter(f, function (x) {
            return (w == x.hash && ((x.requireLogin && v) || !x.requireLogin))
        })
    }

    function h(x, w) {
        var v = u.find(f, function (y) {
            return y.parent == w.hash && y.path == w.path
        });
        j(".menu-" + x + "-level").removeClass("active");
        if (v) {
            if (x == "two") {
                h("three", v);
                a(v.hash, x)
            }
            j(".menu-" + x + "-level." + v.hash.substring(1)).addClass("active")
        }
    }

    function t() {
        var v = window.location.hash;
        var w = u.find(f, function (x) {
            return x.hash == v
        });
        if (w.level == 1) {
            h("two", w)
        }
        if (w.level == 2) {
            h("three", w);
            a(w.hash, w.level)
        }
        if (w.level == 3) {
            a(w.parent, w.level);
            j(".menu-three-level").removeClass("active");
            j(".menu-three-level." + w.hash.substring(1)).addClass("active")
        }
    }

    function a(w, x) {
        libjqobj = j(".menu-two-level." + w.substring(1));
        var v = ["3", "three", "2", "two"];
        if (u.indexOf(v, x) != -1 && libjqobj.hasClass("active")) {
            return
        }
        libjqobj.siblings().removeClass("active");
        libjqobj.addClass("active");
        libjqobj.siblings().not(".menu-two-level").slideUp();
        libjqobj.next().has("ul li").slideDown()
    }

    p.blc_wan_mode = r.getOpMode().blc_wan_mode;
    if (!p.RJ45_SUPPORT) {
        b = "menu"
    } else {
        switch (p.blc_wan_mode) {
            case"PPPOE":
            case"AUTO_PPPOE":
                b = "menu_pppoe";
                break;
            default:
                b = "menu";
                break
        }
    }
    require([p.DEVICE + "/" + b], function (v) {
        f = v;
        if (p.SD_CARD_SUPPORT) {
            f = f.concat([{
                hash: "#httpshare_guest",
                path: "sd_httpshare",
                level: "",
                requireLogin: false,
                checkSIMStatus: false
            }, {hash: "#sdcard", path: "sd", level: "", requireLogin: true, checkSIMStatus: false}, {
                hash: "#httpshare",
                path: "sd_httpshare",
                level: "",
                requireLogin: true,
                checkSIMStatus: false
            }])
        }
    });

    function d() {
        e = new c()
    }

    function c() {
        var v = m();
        var x = this;
        x.loggedIn = q.observable(v);
        x.showMenu = q.observable(v || k);
        var y = u.filter(f, function (z) {
            return (z.level == "1" && ((z.requireLogin && x.loggedIn()) || !z.requireLogin) && z.hash != "#entry")
        });
        x.menuMain = q.observableArray(y);
        x.secondMenu = q.observableArray([]);
        x.changeMenu = function (z) {
            var A = w(z);
            if (A.length == 0) {
                j("#container").addClass("fixContainerWidth")
            } else {
                j("#container").removeClass("fixContainerWidth")
            }
            x.secondMenu(A);
            return true
        };
        x.thirdMenu = function () {
            return x.curThirdMenu
        };
        x.getThirdMenu = function (z) {
            x.curThirdMenu = w(z)
        };

        function w(z) {
            return u.filter(f, function (A) {
                return ((A.parent && A.parent == z.hash) && ((A.requireLogin && x.loggedIn()) || !A.requireLogin))
            })
        }
    }

    return {activeSubMenu: t, checkIsMenuExist: l, findMenu: o, rebuild: s, refreshMenu: n, init: d}
});