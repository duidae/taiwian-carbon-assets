// 1kWp equals to 0.509 mt (509 kg) equivalent weight of CO2
export const CO2_EQ = 0.509;

export const TAIPEI_CENTER = {lat: 25.026054, lng: 121.543439};

export enum LayerType {
    Border,
    Building,
    PublicBuilding,
    PublicAsset,
    GreenFacility,
    Matching,
    Others
}

export const FindLayerStyleByName = (jsonName: string): LayerType => {
    if (jsonName.includes("界")) {
        return LayerType.Border;
    } else if (jsonName.includes("公有建物")) {
        return LayerType.PublicBuilding;
    } else if (jsonName.includes("建物")) {
        return LayerType.Building;
    } else if (jsonName.includes("公有")) {
        return LayerType.PublicAsset;
    } else if (jsonName.includes("既有") || jsonName.includes("水力")) {
        return LayerType.GreenFacility;
    } else if (jsonName.includes("媒合")) {
        return LayerType.Matching;
    }
    return LayerType.Others;
};

export enum FieldName {
    Name = "方案名稱",
    Type = "減碳行動類別",
    Means = "減碳方式",
    Effect = "場域效益",
    Method = "抵換方法學",
    Quota = "年度減量額度(tCO2e/yr)",
    Cost = "推動經費(萬元)",
    Unit = "聯繫單位",
    Link = "案件連結"
}

export enum ReduecCarbonMethod {
    All = "全部",
    Green = "綠資源",
    Solar = "光電設施",
    Wind = "小風機",
    Manage = "設備經營管理",
    Water = "小水力",
    Biomass = "生質能",
    WaterEnv = "水環境",
    Fish = "再生農漁業",
    Community = "低碳社區",
    Regeneration = "地方創生",
    College = "大學合作",
    Development = "園區開發",
    UR = "都市更新",
    Redevelopment = "重劃區"
}

type caseID = number;
export const SITE_INFO = new Map<caseID, any>([
    [
        1,
        {
            name: "台積電植樹團隊於桃園市公有土地植樹",
            type: "已執行案例",
            quota: 14.81,
            cost: 500,
            means: "綠資源",
            effect: "地區示範案例",
            method: "無",
            unit: "桃園市政府養護工程處",
            link: "https://www.tycg.gov.tw/ch/home.jsp?id=10412&parentpath=0,10401&mcustomize=news_view.jsp&dataserno=202103120001&aplistdn=ou=news,ou=chinese,ou=ap_root,o=tycg,c=tw&toolsflag=Y",
            comment: ""
        }
    ],
    [
        2,
        {
            name: "大安森林公園之友基金會投入大安森林公園的樹木健檢與小型濕地經營",
            type: "已執行案例",
            quota: 0,
            cost: 500,
            means: "綠資源",
            effect: "地區示範案例",
            method: "無",
            unit: "大安森林公園之友基金會",
            link: "https://www.daanforestpark.org.tw/",
            comment: ""
        }
    ],
    [
        3,
        {
            name: "大同公司南投、澎湖與桃園太陽能發電系統專案(B0000197)",
            type: "已執行案例",
            quota: 8560,
            cost: 20000,
            means: "光電設施",
            effect: "地區示範案例",
            method: "AMS-I.D. 併網的可再生能源發電",
            unit: "大同公司",
            link: "https://airtable.com/shrcpgvjxMsX7GIhw/tblEsxVIPFrCC1azI/viwiGpK0F1lONnvpa/recovpBrV0OZsww2J?blocks=hide",
            comment: ""
        }
    ],
    [
        4,
        {
            name: "吉安鄉干城社區太陽能光電照明系統",
            type: "已執行案例",
            quota: 0,
            cost: 100,
            means: "光電設施",
            effect: "地區示範案例",
            method: "無",
            unit: "花蓮縣初英山文化產業交流協會",
            link: "http://sixstar.moc.gov.tw/blog/u120109593/communityResultListAction.do?method=doRead&type=1&resultId=29060",
            comment: ""
        }
    ],
    [
        5,
        {
            name: "屏東基督教勝利之家-綠能公益屋頂",
            type: "已執行案例",
            quota: 3.66,
            cost: 500,
            means: "光電設施",
            effect: "地區示範案例",
            method: "無",
            unit: "台灣綠能公益發展協會",
            link: "https://www.sunnyfounder.com/charity/vhome",
            comment: ""
        }
    ],
    [
        6,
        {
            name: "標準檢驗局花蓮分局設置垂直軸風力機",
            type: "已執行案例",
            quota: 0.03,
            cost: 200,
            means: "小風機",
            effect: "地區示範案例",
            method: "無",
            unit: "經濟部標準檢驗局花蓮分局",
            link: "https://airtable.com/shrcpgvjxMsX7GIhw/tblJjkyRlbGH4dSGH/viwjQ8KO5LcIjheno/recEVQiLTSrDHzOWa?blocks=hide",
            comment: ""
        }
    ],
    [
        7,
        {
            name: "臺南市私立德光高級中學-換裝高效率空調(B0000271-001)",
            type: "已執行案例",
            quota: 23,
            cost: 1000,
            means: "設備經營管理",
            effect: "地區示範案例",
            method: "AMS-II.C. 需求端利用特定技術的能源效率活動",
            unit: "臺南市政府環境保護局",
            link: "https://airtable.com/shrcpgvjxMsX7GIhw/tblEsxVIPFrCC1azI/viwiGpK0F1lONnvpa/recz06IefO4YeMuFr?blocks=hide",
            comment: ""
        }
    ],
    [
        8,
        {
            name: "財團法人崑山科技大學-換裝高效率燈具(B0000271-002)",
            type: "已執行案例",
            quota: 4,
            cost: 800,
            means: "設備經營管理",
            effect: "地區示範案例",
            method: "AMS-II.C. 需求端利用特定技術的能源效率活動",
            unit: "臺南市政府環境保護局",
            link: "https://airtable.com/shrcpgvjxMsX7GIhw/tblEsxVIPFrCC1azI/viwiGpK0F1lONnvpa/recnC2jNPTsIEkWuA?blocks=hide",
            comment: ""
        }
    ],
    [
        9,
        {
            name: "金門縣政府節能燈具及路燈汰換溫室氣體減量專案(B0000076)",
            type: "已執行案例",
            quota: 60,
            cost: 1000,
            means: "設備經營管理",
            effect: "地區示範案例",
            method: "AMS-II.L. 需求端: 高效率室外及街燈照明技術",
            unit: "金門縣政府",
            link: "https://airtable.com/shrcpgvjxMsX7GIhw/tblEsxVIPFrCC1azI/viwiGpK0F1lONnvpa/rechoaJqQwqpvTANf?blocks=hide",
            comment: ""
        }
    ],
    [
        10,
        {
            name: "大安區公有建物設置光電設施",
            type: "設置再生能源",
            quota: 13143,
            cost: 20000,
            means: "光電設施",
            effect: "可用於抵換專案的案場",
            method: "AMS-I.D. 併網的可再生能源發電",
            unit: "臺北市政府產業發展局公用事業科",
            link: "https://goo.gl/maps/p3BS5zpA2eaFVaTv6",
            comment: ""
        }
    ],
    [
        11,
        {
            name: "吉安鄉南華村公有建物設置光電設施",
            type: "設置再生能源",
            quota: 91,
            cost: 1000,
            means: "光電設施",
            effect: "可用於抵換專案的案場",
            method: "AMS-I.D. 併網的可再生能源發電",
            unit: "花蓮縣觀光處工業管理科",
            link: "https://goo.gl/maps/p3BS5zpA2eaFVaTv6",
            comment: ""
        }
    ],
    [
        12,
        {
            name: "吉安圳小水力裝置設置",
            type: "設置再生能源",
            quota: 778,
            cost: 2000,
            means: "小水力",
            effect: "可用於抵換專案的案場",
            method: "AMS-I.L 鄉村社區再生能源電氣化",
            unit: "花蓮縣初英山文化產業交流協會",
            link: "http://sixstar.moc.gov.tw/blog/chuinsan/communityAction.do?method=doCommunityView",
            comment: ""
        }
    ],
    [
        13,
        {
            name: "花蓮遊客中心評估小風機設施",
            type: "設置再生能源",
            quota: 0.16,
            cost: 500,
            means: "小風機",
            effect: "可用於抵換專案的案場",
            method: "AMS-I.L 鄉村社區再生能源電氣化",
            unit: "交通部觀光局東部海岸國家風景區管理處花蓮遊客中心",
            link: "http://www.small-wind.org.tw/content/wind/wind_notice.aspx",
            comment: ""
        }
    ],
    [
        14,
        {
            name: "吉安鄉干城村地區沼氣發電設施評估",
            type: "設置再生能源",
            quota: 2.04,
            cost: 800,
            means: "生質能",
            effect: "可用於抵換專案的案場",
            method: "AMS-I.L 鄉村社區再生能源電氣化",
            unit: "行政院農業委員會畜產試驗所花蓮種畜繁殖場",
            link: "https://www.biogas.com.tw/benefit/",
            comment: ""
        }
    ],
    [
        15,
        {
            name: "臺南市七股鹽田濕地",
            type: "經營地景碳匯",
            quota: 65.8,
            cost: 2000,
            means: "水環境",
            effect: "適合研發抵換方法的案場",
            method: "無",
            unit: "內政部營建署城鄉發展分署",
            link: "https://airtable.com/shrcpgvjxMsX7GIhw/tblEsxVIPFrCC1azI/viwiGpK0F1lONnvpa/recnr0e5n9HzzhUNm?blocks=hide",
            comment: ""
        }
    ],
    [
        16,
        {
            name: "臺南市仁德區-嘉南藥理科技大學人工濕地",
            type: "經營地景碳匯",
            quota: 0.21,
            cost: 500,
            means: "水環境",
            effect: "適合研發抵換方法的案場",
            method: "無",
            unit: "嘉南藥理科技大學",
            link: "https://airtable.com/shrcpgvjxMsX7GIhw/tblEsxVIPFrCC1azI/viwiGpK0F1lONnvpa/reck6DXHrOMd8nbdj?blocks=hide",
            comment: ""
        }
    ],
    [
        17,
        {
            name: "臺灣大學校內水域及周邊環境(醉月湖、生態池、瑠公圳水路復育系統)",
            type: "經營地景碳匯",
            quota: 0,
            cost: 1000,
            means: "水環境",
            effect: "適合研發抵換方法的案場",
            method: "無",
            unit: "國立臺灣大學",
            link: "https://youtu.be/2VlgaDaxqi0?t=81",
            comment: ""
        }
    ],
    [
        18,
        {
            name: "東華大學校內水域及周邊環境(東湖、華湖、小華湖)",
            type: "經營地景碳匯",
            quota: 0,
            cost: 1000,
            means: "水環境",
            effect: "適合研發抵換方法的案場",
            method: "無",
            unit: "國立東華大學",
            link: "https://rb001.ndhu.edu.tw/p/132-1001-2245.php",
            comment: ""
        }
    ],
    [
        19,
        {
            name: "木瓜溪華隆護岸及初英一號堤段河川環境與臺灣火刺木復育計畫",
            type: "經營地景碳匯",
            quota: 40.8,
            cost: 500,
            means: "水環境",
            effect: "適合研發抵換方法的案場",
            method: "無",
            unit: "經濟部水利署第九河川局",
            link: "https://www.wra.gov.tw/News_Content.aspx?n=6431&s=93748",
            comment: ""
        }
    ],
    [
        20,
        {
            name: "桃園市 2021 年可提供民間公益植樹公有土地",
            type: "經營地景碳匯",
            quota: 424,
            cost: 8000,
            means: "綠資源",
            effect: "適合研發抵換方法的案場",
            method: "無",
            unit: "桃園市政府養護工程處",
            link: "https://www.tycg.gov.tw/ch/home.jsp?id=10412&parentpath=0,10401&mcustomize=news_view.jsp&dataserno=202103120001&aplistdn=ou=news,ou=chinese,ou=ap_root,o=tycg,c=tw&toolsflag=Y",
            comment: ""
        }
    ],
    [
        21,
        {
            name: "大安森林公園-公園生態化經營",
            type: "經營地景碳匯",
            quota: 386,
            cost: 800,
            means: "綠資源",
            effect: "適合研發抵換方法的案場",
            method: "無",
            unit: "臺北市政府工務局公園路燈工程管理處",
            link: "https://youtube.com/playlist?list=PLLhKX7btG59cCUgTbgSV6sfBhOLqcgIm4",
            comment: ""
        }
    ],
    [
        22,
        {
            name: "知卡宣綠森林親水公園-公園生態化經營",
            type: "經營地景碳匯",
            quota: 104.9,
            cost: 800,
            means: "綠資源",
            effect: "適合研發抵換方法的案場",
            method: "無",
            unit: "花蓮縣政府吉安鄉公所",
            link: "https://www.facebook.com/%E7%9F%A5%E5%8D%A1%E5%AE%A3%E7%B6%A0%E6%A3%AE%E6%9E%97%E8%A6%AA%E6%B0%B4%E5%85%AC%E5%9C%92-113463993763171/",
            comment: ""
        }
    ],
    [
        23,
        {
            name: "南華林業園區-公園生態化經營",
            type: "經營地景碳匯",
            quota: 195.9,
            cost: 800,
            means: "綠資源",
            effect: "適合研發抵換方法的案場",
            method: "無",
            unit: "林務局花蓮林區管理處",
            link: "https://tour-hualien.hl.gov.tw/POI/157",
            comment: ""
        }
    ],
    [
        24,
        {
            name: "大安區山坡地保護區範圍經營措施",
            type: "經營地景碳匯",
            quota: 12480,
            cost: 5000,
            means: "綠資源",
            effect: "適合研發抵換方法的案場",
            method: "無",
            unit: "臺北市政府大安區公所",
            link: "https://dado.gov.taipei/News.aspx?n=83E25322F56372E8&sms=DD0C9C3CF31B1E8E",
            comment: ""
        }
    ],
    [
        25,
        {
            name: "花蓮林管處吉安鄉與壽豐鄉範圍內的保安林與保育屬性國有林班地",
            type: "經營地景碳匯",
            quota: 606816,
            cost: 10000,
            means: "綠資源",
            effect: "適合研發抵換方法的案場",
            method: "無",
            unit: "林務局花蓮林區管理處",
            link: "https://hualien.forest.gov.tw/",
            comment: ""
        }
    ],
    [
        26,
        {
            name: "花蓮林管處吉安鄉與壽豐鄉內屬於林木經營區之國有林班地",
            type: "經營地景碳匯",
            quota: 0,
            cost: 500,
            means: "綠資源",
            effect: "適合研發抵換方法的案場",
            method: "無",
            unit: "林務局花蓮林區管理處",
            link: "https://hualien.forest.gov.tw/",
            comment: ""
        }
    ],
    [
        27,
        {
            name: "臺灣大學臺大農場 (土耕)",
            type: "經營地景碳匯",
            quota: 8.45,
            cost: 800,
            means: "再生農漁業",
            effect: "適合研發抵換方法的案場",
            method: "無",
            unit: "國立臺灣大學",
            link: "https://www.farm.ntu.edu.tw/index.aspx?lang=TW",
            comment: ""
        }
    ],
    [
        28,
        {
            name: "壽豐鄉養殖專區 (養殖魚塭)",
            type: "經營地景碳匯",
            quota: 0,
            cost: 500,
            means: "再生農漁業",
            effect: "適合研發抵換方法的案場",
            method: "無",
            unit: "花蓮縣養殖漁業生產區發展協會",
            link: "https://www.fish1996.com.tw/hualien-county.html",
            comment: ""
        }
    ],
    [
        29,
        {
            name: "花蓮縣初英山文化產業交流協會",
            type: "社會共創模式",
            quota: 0,
            cost: 100,
            means: "低碳社區",
            effect: "推動低碳社區",
            method: "無",
            unit: "花蓮縣初英山文化產業交流協會",
            link: "https://www.facebook.com/%E5%88%9D%E8%8B%B1%E5%B1%B1Mia-672808719483863/",
            comment: ""
        }
    ],
    [
        30,
        {
            name: "大安區錦安里",
            type: "社會共創模式",
            quota: 0,
            cost: 100,
            means: "低碳社區",
            effect: "推動低碳社區",
            method: "無",
            unit: "臺北市大安區錦安里辦公處",
            link: "https://lcss.epa.gov.tw/LcssViewPage/Responsive/AreaResult.aspx?CityID=63000&DistrictId=6300300&VillageID=6300300016",
            comment: ""
        }
    ],
    [
        31,
        {
            name: "新北市八里區-淨零碳示範區政策目標",
            type: "社會共創模式",
            quota: 0,
            cost: 500,
            means: "地方創生",
            effect: "結合地方創生",
            method: "無",
            unit: "新北市政府八里區公所",
            link: "https://www.epd.ntpc.gov.tw/Journal/Content?c=11005&t=policy",
            comment: ""
        }
    ],
    [
        32,
        {
            name: "花蓮縣鳳林鎮-國際慢城認證",
            type: "社會共創模式",
            quota: 0,
            cost: 500,
            means: "地方創生",
            effect: "結合地方創生",
            method: "無",
            unit: "花蓮縣鳳林鎮北林三村社區發展協會",
            link: "https://2019smalltown.taiwan.net.tw/News/Detail/79779d97-e768-4c75-b5fd-0cf03c5317f5?CategoryId=a3130fe3-eabe-47a5-8826-ca8370b2be43",
            comment: ""
        }
    ],
    [
        33,
        {
            name: "東華大學總務處減碳小組",
            type: "社會共創模式",
            quota: 0,
            cost: 500,
            means: "大學合作",
            effect: "推動永續校園",
            method: "無",
            unit: "國立東華大學",
            link: "https://ga.ndhu.edu.tw/p/412-1006-13976.php?Lang=zh-tw",
            comment: ""
        }
    ],
    [
        34,
        {
            name: "台大氣候行動社",
            type: "社會共創模式",
            quota: 0,
            cost: 100,
            means: "大學合作",
            effect: "推動永續校園",
            method: "無",
            unit: "台大氣候行動社",
            link: "https://www.facebook.com/NTUClimateAction",
            comment: ""
        }
    ],
    [
        35,
        {
            name: "舊空軍總部再開發案",
            type: "土地開發評估",
            quota: 0,
            cost: 200,
            means: "園區開發",
            effect: "落實低碳營建",
            method: "無",
            unit: "文化部",
            link: "https://clab.org.tw/about/",
            comment: ""
        }
    ],
    [
        36,
        {
            name: "台灣觀光學院學產地用地轉型-15.6公頃校地",
            type: "土地開發評估",
            quota: 0,
            cost: 200,
            means: "園區開發",
            effect: "落實低碳營建",
            method: "無",
            unit: "教育部",
            link: "https://www.cna.com.tw/news/firstnews/202106050038.aspx",
            comment: ""
        }
    ],
    [
        37,
        {
            name: "捷運大安站周邊更新地區",
            type: "土地開發評估",
            quota: 0,
            cost: 500,
            means: "都市更新",
            effect: "落實低碳營建",
            method: "無",
            unit: "臺北市政府都市更新處",
            link: "https://twur.cpami.gov.tw/zh/urban/area/view/506",
            comment: ""
        }
    ],
    [
        38,
        {
            name: "花蓮縣第1期(吉安鄉住一住宅)自辦市地重市地重劃",
            type: "土地開發評估",
            quota: 0,
            cost: 200,
            means: "重劃區",
            effect: "落實低碳營建",
            method: "無",
            unit: "花蓮縣政府地政處",
            link: "https://la.hl.gov.tw/Detail_sp/cd893dc0e3c44ed980a74702e13662dc",
            comment: ""
        }
    ]
]);
