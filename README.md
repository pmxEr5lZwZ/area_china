# AKxtsLz

AJAX+JQery简单的城市三级联动插件（可自己维护更新），不通过后台实现，不占用后台资源。












安装：（温馨提示：请先安装JQery.js，这里不提供下载。）

1.下载area_china.js与area_china.json，并放入程序前台资源文件夹中

2.打开area_chian.js设置参数(只需4步)
（1）path：area_china.json的文件路径，
（2）default_index： 下拉框默认的值<option value="default_index">xxx</option>，
（3）default_value： 下拉框默认展示的值<option value="xxx">default_value</option>
（4）parent_div： 若你的三级联动的每个下拉框都嵌套在各自的父级div的时候，设置父级div的ID（parent_div:"#xxx"）/CLASS(parent_div:".xxx")或直接（parent_div:"div"），若三个框都不在各自的div中，则可以改为[parent_div：false]

3.在前台页面中，省、市、区三个下拉框select中分别添加id=province，id=city，id=district，若需要自定义id请在area_china.js手动更改。














更新说明：
1.访问2019年3月中华人民共和国县以上行政区划代码网址，获取最新编码
http://www.mca.gov.cn/article/sj/xzqh/2019/201901-06/201904301706.html

2.把110000 	北京市粘贴到EXCEL中，并批量改为'110000'=>'北京市',并把改好的数据粘贴到tool/test.php文件中替换原数据。

3.执行test.php文件，并把输出的json替换到area_china.json文件中。

4.查看民政部的行政区编码改动，并把数据库原先记录的老的编码更新。
