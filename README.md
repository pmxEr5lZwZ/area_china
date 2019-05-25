# area_china
本数据采用2019年3月中华人民共和国县以上行政区划代码

AJAX+JQery简单的城市三级联动插件（可自己根据最新行政编码维护更新），不通过后台实现，不占用后台资源。



首先在数据库中建立province，city，district三个表。
举例：
省——区：
如行政编码110000，北京市，则写入数据库province：11，city：空，district：空
如行政编码110108，北京市海淀区，则写入数据库province：11，city：空，district：0108
省——市：
如行政编码130100，河北省石家庄市，则写入数据库province：13，city：01，district：00
如行政编码411700，河南省驻马店市，则写入数据库province：41，city：17，district：空
如行政编码419001，河南省济源市，则写入数据库province：41，city：9091，district：空（此项特殊，因为没有下级市区，所以city有四位数）
省——市——区
如行政编码130102，河北省石家庄市长安区，则写入数据库province：13，city：01，district：02
省：
如行政编码820000，澳门特别行政区，则写入数据库province：82，city：空，district：空










安装：（温馨提示：请先安装JQery.js，这里不提供下载。）

1.meta设置：
(1)下载area_china.js与area_china.json，并放入程序前台资源文件夹中,在前台模板只引用area_china.js一个文件，并把路径保存在meta的path中 [<meta name="path" content="你的文件路径">]
(2)设置当提交错误的表单，造成页面返回时，原先提交表单时选择的省市区数据（数据保持），建立三个meta，[<meta name="province" content="省数据">],[<meta name="city" content="市数据">],[<meta name="district" content="区数据">]（在后端设置下三个数据若不存在则为空）

2.打开area_chian.js设置参数
（1）path：area_china.json的文件路径，
（2）default_value： 下拉框默认展示的值<option value="">default_value</option>
（3）parent_div： 若你的三级联动的每个下拉框都嵌套在各自的父级div的时候，设置父级div的ID（parent_div:"#xxx"）/CLASS(parent_div:".xxx")或直接（parent_div:"div"），若三个框都不在各自的div中，则可以改为[parent_div：false]

3.在前台页面中，省、市、区三个下拉框select中分别添加id=province，id=city，id=district，若需要自定义id请在area_china.js手动更改。














自己维护配置更新说明：
1.访问2019年3月中华人民共和国县以上行政区划代码网址，获取最新编码
http://www.mca.gov.cn/article/sj/xzqh/2019/201901-06/201904301706.html

2.把110000 	北京市粘贴到EXCEL中，并批量改为'110000'=>'北京市',并把改好的数据粘贴到tool/test.php文件中替换原数据。

3.执行test.php文件，并把输出的json替换到area_china.json文件中。

4.把河南省济源市（因为该市无下级市区区）这个特殊的市，json把括号打开，由41-90-01架构变为41-9001。

5.查看民政部的行政区编码改动，并把数据库原先记录的老的编码更新。
