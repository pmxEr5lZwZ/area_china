/*2019年3月中华人民共和国县以上行政区划代码http://www.mca.gov.cn/article/sj/xzqh/2019/201901-06/201904301706.html*/


//Setting Start
var current_province = $('meta[name="province"]').attr('content');
var current_city = $('meta[name="city"]').attr('content');
var current_district = $('meta[name="district"]').attr('content');
var path = $('meta[name="path"]').attr('content'); //Setting area_china.json path
var default_index = "";  // option default value <option value=""></option>
var default_value = "- Unknow -"; //option default value <option value="xxx">- Unknow -</option>
var parent_div = "div";  //You can set a class/id in <select></select> parent div,at same time please change this setting value as same.
//If you don't have parent div in <select></select>. Please setting false, [var parent_div = false;].
//Setting End

//Variable - Don't change it.
var province = document.getElementById('province');
var city = document.getElementById('city');
var district = document.getElementById('district');
var option_list = {};
city.style.display = "none";
district.style.display = "none";



$.getJSON(path,function (data) {

    //show the province
    getProvince();
    showOption(province);
    if(current_province != "" && current_province != default_index){
        $(province).val(current_province);
        if(Object.keys(data[current_province]).length > 1 && Object.keys(data[current_province]).length <= 3){
            district.style.display = "";
            getCity(current_province);
            if(current_district != "" && current_district != default_index){
                $(district).val(current_district);
            }
        }else if(Object.keys(data[current_province]).length > 3){
            city.style.display = "";
            getCity(current_province);
            if(current_city != "" && current_city != default_index){
                district.style.display = "";
                $(city).val(current_city);
                getDistrict(current_province,current_city);
                if(current_district != "" && current_district != default_index){
                    $(district).val(current_district);
                }
            }

        }
    }

    //select province and show the city
    $(province).change(function () {
        if(province.value === default_index){
            closeList(city);
            closeList(district);
            return;
        }
        getCity(province.value);
    });


    //select city and show the district
    $(city).change(function () {
        if(city.value === default_index){
            closeList(district);
            return;
        }
        getDistrict(province.value,city.value);
    });

    function getProvince() {
        //show the province
        $.each(data,function (index,value) {
            CreateOptionList(index,value);
        });
    }
    //Get City List
    function getCity(province_id) {
        //港澳台
        if(Object.keys(data[province_id]).length === 1){
            closeList(city);
            closeList(district);
            //北京 直辖市
        }else if(Object.keys(data[province_id]).length > 1 && Object.keys(data[province_id]).length <= 3){
            closeList(city);
            getNewList(district);
            $.each(data[province_id],function (index,value) {
                if(typeof(data[province_id][index]) == "object" ){
                    $.each(data[province_id][index],function (index_2,value_2) {
                        CreateOptionList(index+index_2,value_2);
                    });
                }
            });
            showOption(district);
            //三级城市
        }else if(Object.keys(data[province_id]).length > 3){
            closeList(district);
            getNewList(city);
            $.each(data[province_id],function (index,value) {
                if(typeof(data[province_id][index]) == "object" ){
                    CreateOptionList(index,value);
                }
            });
            showOption(city);
        }else{
            alert('error');
        }
    }

    //Get District List
    function getDistrict(province_id,city_id) {
        //example 河南 济源市9091
        if(Object.keys(data[province_id][city_id]) == 'name'){
            closeList(district);
            return
        }
        getNewList(district);
        $.each(data[province_id][city_id],function (index,value) {
            if(typeof(data[province_id][city_id][index]) == "object" ){
                CreateOptionList(index,value);
            }
        });
        showOption(district);
    }


});

//Get New List
function getNewList(obj) {
    if(parent_div !== false){
        $(obj).parents(parent_div).show();
    }
    obj.style.display = "";
    initList(obj);
}

//Close List
function closeList(obj) {
    if(parent_div !== false){
        $(obj).parent(parent_div).hide();
    }
    obj.style.display = "none";
    initList(obj);
}

//Init List
function initList(obj) {
    $(obj).empty();
    $(obj).append("<option value='"+default_index+"'>"+default_value+"</option>");
}

//create option html
function CreateOptionList(index,value) {
    //sort list
    if(index.substr(0,1) === "0"){
        var key = index.substr(1);
        option_list[key] = "<option value='"+index+"'>"+value.name+"</option>";
    }else{
        option_list[index] = "<option value='"+index+"'>"+value.name+"</option>";
    }
}

//Show option
function showOption(obj) {
    $.each(option_list,function (index,value) {
        $(obj).append(value);
    });
    option_list = [];
}


